const CONTRACT_CONFIG = {
    test: false, 
    testnet: {
        contractAddress: '', 
        chainId: 97, 
        usdtAddress: '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
        hdTokenAddress: '0x117c72489DC709c970B2E3f087a8dF11c4038a4d', 
    },
    mainnet: {
        contractAddress: '0x061114e4855ff61A16F220F98E2bA723978d4184', 
        chainId: 56, 
        usdtAddress: '0x55d398326f99059ff775485246999027b3197955',
        hdTokenAddress: '', 
    }
};

const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "getAllParams",
        "outputs": [
            {"internalType": "uint256[]", "name": "uintParam", "type": "uint256[]"},
            {"internalType": "address", "name": "addrParam", "type": "address"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "_minBuyValue", "type": "uint256"},
            {"internalType": "uint256", "name": "_maxBuyValue", "type": "uint256"},
            {"internalType": "uint256", "name": "_minSellValue", "type": "uint256"},
            {"internalType": "uint256", "name": "_maxSellValue", "type": "uint256"},
            {"internalType": "uint256", "name": "_minPrice", "type": "uint256"},
            {"internalType": "uint256", "name": "_maxPrice", "type": "uint256"},
            {"internalType": "uint256", "name": "_randomMinTime", "type": "uint256"},
            {"internalType": "uint256", "name": "_randomMaxTime", "type": "uint256"},
            {"internalType": "uint256", "name": "_buyProbability", "type": "uint256"},
            {"internalType": "uint256", "name": "_targetPrice", "type": "uint256"}
        ],
        "name": "setMarketParams",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// ERC20 代币ABI (用于授权操作)
const ERC20_ABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "spender", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "owner", "type": "address"},
            {"internalType": "address", "name": "spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

let web3;
let contract;
let currentAccount;
let fundingAddress; // 资金地址
let usdtContract; // USDT合约实例
let hdTokenContract; // HD代币合约实例
let hdTokenAddress; // HD代币地址

// 常量
const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
let currentBuyProbability = 50;

// 初始化
window.addEventListener('load', async () => {
    setupProbabilitySlider();

    // 从URL参数或环境变量获取合约地址
    const urlParams = new URLSearchParams(window.location.search);
    const contractAddr = urlParams.get('contract') || 
                       (CONTRACT_CONFIG.test ? CONTRACT_CONFIG.testnet.contractAddress : CONTRACT_CONFIG.mainnet.contractAddress);
    
    if (contractAddr) {
        const config = CONTRACT_CONFIG.test ? CONTRACT_CONFIG.testnet : CONTRACT_CONFIG.mainnet;
        CONTRACT_CONFIG.contractAddress = contractAddr;
        console.log('合约地址:', contractAddr);
    }

    // 自动连接钱包
    if (typeof window.ethereum !== 'undefined') {
        await connectWallet();
    } else {
        showMessage('请安装MetaMask钱包', 'error');
    }
});

// 连接钱包
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('请安装MetaMask钱包');
        }

        showLoading(true);
        
        // 请求连接钱包
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        currentAccount = accounts[0];
        
        // 初始化Web3
        web3 = new Web3(window.ethereum);
        
        // 检查网络
        const chainId = await web3.eth.getChainId();
        console.log(chainId)
        const expectedChainId = CONTRACT_CONFIG.test ? CONTRACT_CONFIG.testnet.chainId : CONTRACT_CONFIG.mainnet.chainId;
        
        if (chainId != expectedChainId) {
            const networkName = CONTRACT_CONFIG.test ? 'BSC测试网' : 'BSC主网';
            throw new Error(`请切换到${networkName} (Chain ID: ${expectedChainId})`);
        }
        
        // 初始化合约
        const config = CONTRACT_CONFIG.test ? CONTRACT_CONFIG.testnet : CONTRACT_CONFIG.mainnet;
        if (!config.contractAddress) {
            throw new Error('请设置合约地址');
        }
        
        CONTRACT_CONFIG.contractAddress = config.contractAddress; // 确保全局变量正确设置
        contract = new web3.eth.Contract(CONTRACT_ABI, config.contractAddress);
        
        // 更新UI
        updateWalletUI();
        
        // 加载参数
        await loadParams();
        
        showMessage('钱包连接成功', 'success');
        
        // 监听账户变化
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                // 钱包断开连接
                currentAccount = null;
                updateWalletUI();
            } else {
                currentAccount = accounts[0];
                updateWalletUI();
                loadParams();
            }
        });
        
        // 监听网络变化
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
        
    } catch (error) {
        console.error('连接钱包失败:', error);
        showMessage(`连接失败: ${error.message}`, 'error');
    } finally {
        showLoading(false);
    }
}

// 更新钱包UI
function updateWalletUI() {
    const addressElement = document.getElementById('wallet-address');
    const statusElement = document.getElementById('connection-status');
    const fundingAddressElement = document.getElementById('funding-address');
    // const networkElement = document.getElementById('network-info');
    const updateBtn = document.getElementById('update-btn');
    
    if (currentAccount) {
        addressElement.textContent = `${currentAccount.substring(0, 6)}...${currentAccount.substring(38)}`;
        // addressElement.textContent = `${currentAccount}`;
        statusElement.textContent = '🟢 已连接';
        
        // const networkName = CONTRACT_CONFIG.test ? 'BSC测试网' : 'BSC主网';
        // networkElement.textContent = networkName;
        
        updateBtn.disabled = false;
    } else {
        addressElement.textContent = '未连接';
        statusElement.textContent = '🔴 未连接';
        // 钱包未连接时重置资金地址显示
        if (fundingAddressElement) {
            fundingAddressElement.textContent = '-';
        }
        // networkElement.textContent = '-';
        updateBtn.disabled = true;
    }
    
    // 更新授权按钮状态
    updateAuthButtons();
}

// 加载合约参数
async function loadParams() {
    if (!contract) {
        showMessage('请先连接钱包', 'error');
        return;
    }

    try {
        showLoading(true);
        
        // 调用getAllParams函数
        const result = await contract.methods.getAllParams().call();
        const uintParam = result[0]; // uint256数组
        const addrParam = result[1]; // address (资金地址)
        
        console.log('合约参数:', { uintParam, addrParam });
        
        // 更新资金地址显示和存储
        fundingAddress = addrParam;
        const fundingAddressElement = document.getElementById('funding-address');
        if (fundingAddressElement && addrParam) {
            fundingAddressElement.textContent = `${addrParam.substring(0, 6)}...${addrParam.substring(38)}`;
        }

        const routerAddressElement = document.getElementById('router-address');
        if (routerAddressElement) {
            routerAddressElement.textContent = `${CONTRACT_CONFIG.contractAddress.substring(0, 6)}...${CONTRACT_CONFIG.contractAddress.substring(38)}`;
        }

        
        // 获取HD代币地址并初始化合约
        try {
            // hdTokenAddress = await contract.methods.tokenAddress().call();
            // 初始化代币合约
            const config = CONTRACT_CONFIG.test ? CONTRACT_CONFIG.testnet : CONTRACT_CONFIG.mainnet;
            hdTokenAddress = config.hdTokenAddress;
            usdtContract = new web3.eth.Contract(ERC20_ABI, config.usdtAddress);
            hdTokenContract = new web3.eth.Contract(ERC20_ABI, hdTokenAddress);
            console.log('HD代币地址:', hdTokenAddress);

            // 更新授权按钮状态
            updateAuthButtons();
            
        } catch (error) {
            console.error('获取HD代币地址失败:', error);
        }
        
        // 更新统计信息
        document.getElementById('buy-cost-value').textContent = parseFloat(web3.utils.fromWei(uintParam[0], 'ether')).toFixed(2);
        document.getElementById('buy-got-tokens').textContent = parseFloat(web3.utils.fromWei(uintParam[1], 'ether')).toFixed(2);
        document.getElementById('sell-got-value').textContent = parseFloat(web3.utils.fromWei(uintParam[2], 'ether')).toFixed(2);
        document.getElementById('sell-token-amount').textContent = parseFloat(web3.utils.fromWei(uintParam[3], 'ether')).toFixed(2);
        document.getElementById('current-price').textContent = parseFloat(web3.utils.fromWei(uintParam[13], 'ether')).toFixed(6);
        document.getElementById('gas-value').textContent = parseFloat(web3.utils.fromWei(uintParam[4], 'ether')).toFixed(2);
        
        // 填充表单
        document.getElementById('min-buy-value').value = parseFloat(web3.utils.fromWei(uintParam[5], 'ether'));
        document.getElementById('max-buy-value').value = parseFloat(web3.utils.fromWei(uintParam[6], 'ether'));
        document.getElementById('min-sell-value').value = parseFloat(web3.utils.fromWei(uintParam[7], 'ether'));
        document.getElementById('max-sell-value').value = parseFloat(web3.utils.fromWei(uintParam[8], 'ether'));
        document.getElementById('random-min-time').value = uintParam[9];
        document.getElementById('random-max-time').value = uintParam[10];
        document.getElementById('min-price').value = parseFloat(web3.utils.fromWei(uintParam[11], 'ether'));
        document.getElementById('max-price').value = parseFloat(web3.utils.fromWei(uintParam[12], 'ether'));

        const onChainProbability = uintParam.length > 14 ? Number(uintParam[14]) : currentBuyProbability;
        console.log(`买入概率(链上): ${onChainProbability}% / 卖出概率: ${100 - onChainProbability}%`);
        syncProbabilityFromParams(uintParam);
        const targetPrice = uintParam.length > 15 ? Number(uintParam[15]) : '0';
        document.getElementById('target-price').value = parseFloat(web3.utils.fromWei(targetPrice, 'ether'));
        showMessage('参数加载成功', 'success');
        
    } catch (error) {
        console.error('加载参数失败:', error);
        showMessage(`加载失败: ${error.message}`, 'error');
    } finally {
        showLoading(false);
    }
}

// 更新参数
async function updateParams() {
    if (!contract || !currentAccount) {
        showMessage('请先连接钱包', 'error');
        return;
    }

    try {
        showLoading(true);
        
        // 获取表单数据
        const minBuyValue = web3.utils.toWei(document.getElementById('min-buy-value').value || '0', 'ether');
        const maxBuyValue = web3.utils.toWei(document.getElementById('max-buy-value').value || '0', 'ether');
        const minSellValue = web3.utils.toWei(document.getElementById('min-sell-value').value || '0', 'ether');
        const maxSellValue = web3.utils.toWei(document.getElementById('max-sell-value').value || '0', 'ether');
        const minPrice = web3.utils.toWei(document.getElementById('min-price').value || '0', 'ether');
        const maxPrice = web3.utils.toWei(document.getElementById('max-price').value || '0', 'ether');
        const randomMinTime = document.getElementById('random-min-time').value || '0';
        const randomMaxTime = document.getElementById('random-max-time').value || '0';
        const buyProbability = currentBuyProbability;
        const targetPrice = web3.utils.toWei(document.getElementById('target-price').value || '0', 'ether');
        // 验证数据
        if (parseFloat(minBuyValue) >= parseFloat(maxBuyValue)) {
            throw new Error('买入最小值必须小于最大值');
        }
        if (parseFloat(minSellValue) >= parseFloat(maxSellValue)) {
            throw new Error('卖出最小值必须小于最大值');
        }
        if (parseFloat(minPrice) >= parseFloat(maxPrice)) {
            throw new Error('价格最小值必须小于最大值');
        }
        if (parseInt(randomMinTime) >= parseInt(randomMaxTime)) {
            throw new Error('时间间隔最小值必须小于最大值');
        }
        
        console.log('更新参数:', {
            minBuyValue, maxBuyValue, minSellValue, maxSellValue,
            minPrice, maxPrice, randomMinTime, randomMaxTime,
            buyProbability, targetPrice,
            sellProbability: 100 - buyProbability
        });
        
        // 调用合约函数
        const gasEstimate = await contract.methods.setMarketParams(
            minBuyValue, maxBuyValue, minSellValue, maxSellValue,
            minPrice, maxPrice, randomMinTime, randomMaxTime, buyProbability, targetPrice
        ).estimateGas({ from: currentAccount });
        
        const tx = await contract.methods.setMarketParams(
            minBuyValue, maxBuyValue, minSellValue, maxSellValue,
            minPrice, maxPrice, randomMinTime, randomMaxTime, buyProbability, targetPrice
        ).send({
            from: currentAccount,
            gas: Math.floor(Number(gasEstimate) * 1.2) // 增加20%的gas
        });
        

        console.log('交易成功:', tx.transactionHash);
        showMessage(`参数更新成功! 交易hash: ${tx.transactionHash}`, 'success');
        
        // 重新加载参数
        setTimeout(() => {
            loadParams();
        }, 2000);
        
    } catch (error) {
        console.error('更新参数失败:', error);
        let errorMsg = error.message;
        if (error.message.includes('revert')) {
            errorMsg = '交易被拒绝，请检查权限或参数是否正确';
        } else if (error.message.includes('insufficient funds')) {
            errorMsg = 'BNB余额不足，请充值后重试';
        } else if (error.message.includes('User denied')) {
            errorMsg = '用户取消了交易';
        }
        showMessage(`更新失败: ${errorMsg}`, 'error');
    } finally {
        showLoading(false);
    }
}

// 显示加载状态
function showLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'block' : 'none';
}

// 显示消息
function showMessage(message, type = 'info') {
    const messageArea = document.getElementById('message-area');
    const className = type === 'error' ? 'error' : (type === 'success' ? 'success' : 'info');
    
    messageArea.innerHTML = `<div class="${className}">${message}</div>`;
    
    // 8秒后自动清除消息 (延长显示时间)
    setTimeout(() => {
        messageArea.innerHTML = '';
    }, 8000);
}

// 工具函数：格式化地址
function formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
}

// 工具函数：格式化数字
function formatNumber(value, decimals = 2) {
    if (!value) return '0';
    return parseFloat(value).toFixed(decimals);
}

// 更新授权按钮状态
function updateAuthButtons() {
    const approveUsdtBtn = document.getElementById('approve-usdt-btn');
    const approveHdBtn = document.getElementById('approve-hd-btn');
    const revokeUsdtBtn = document.getElementById('revoke-usdt-btn');
    const revokeHdBtn = document.getElementById('revoke-hd-btn');
    
    // 检查是否连接钱包
    const isConnected = !!currentAccount;
    
    // 检查是否是资金地址（仅资金地址可以授权）
    const isFundingAddress = currentAccount && fundingAddress && 
                           currentAccount.toLowerCase() === fundingAddress.toLowerCase();
    
    // 授权按钮：仅资金地址可用
    if (approveUsdtBtn) approveUsdtBtn.disabled = !isFundingAddress;
    if (approveHdBtn) approveHdBtn.disabled = !isFundingAddress;
    
    // 取消授权按钮：任何连接的地址都可用
    if (revokeUsdtBtn) revokeUsdtBtn.disabled = !isConnected;
    if (revokeHdBtn) revokeHdBtn.disabled = !isConnected;
}

// 授权代币
async function approveToken(tokenType) {
    if (!currentAccount || !fundingAddress) {
        showMessage('请先连接钱包并加载参数', 'error');
        return;
    }
    
    // 检查是否是资金地址
    if (currentAccount.toLowerCase() !== fundingAddress.toLowerCase()) {
        showMessage('只有资金地址可以进行授权操作', 'error');
        return;
    }
    
    try {
        showLoading(true);
        
        let tokenContract;
        let tokenName;
        
        if (tokenType === 'USDT') {
            tokenContract = usdtContract;
            tokenName = 'USDT';
        } else if (tokenType === 'HD') {
            tokenContract = hdTokenContract;
            tokenName = 'HD代币';
        } else {
            throw new Error('不支持的代币类型');
        }
        
        if (!tokenContract) {
            throw new Error(`${tokenName}合约未初始化`);
        }
        
        console.log(`开始授权${tokenName}...`);
        console.log('Spender地址:', CONTRACT_CONFIG.contractAddress);
        console.log('授权数量:', MAX_UINT256);
        
        // 估算gas
        const gasEstimate = await tokenContract.methods.approve(
            CONTRACT_CONFIG.contractAddress,
            MAX_UINT256
        ).estimateGas({ from: currentAccount });
        
        // 发送授权交易
        const tx = await tokenContract.methods.approve(
            CONTRACT_CONFIG.contractAddress,
            MAX_UINT256
        ).send({
            from: currentAccount,
            gas: Math.floor(Number(gasEstimate) * 1.2)
        });
        
        console.log(`${tokenName}授权交易成功:`, tx.transactionHash);
        showMessage(`${tokenName}授权成功! 交易hash: ${tx.transactionHash.substring(0, 10)}...`, 'success');
        
    } catch (error) {
        console.error(`授权${tokenType}失败:`, error);
        let errorMsg = error.message;
        
        if (error.message.includes('User denied')) {
            errorMsg = '用户取消了交易';
        } else if (error.message.includes('insufficient funds')) {
            errorMsg = 'BNB余额不足，请充值后重试';
        }
        
        showMessage(`授权失败: ${errorMsg}`, 'error');
    } finally {
        showLoading(false);
    }
}

// 取消授权代币
async function revokeToken(tokenType) {
    if (!currentAccount) {
        showMessage('请先连接钱包', 'error');
        return;
    }
    
    try {
        showLoading(true);
        
        let tokenContract;
        let tokenName;
        
        if (tokenType === 'USDT') {
            tokenContract = usdtContract;
            tokenName = 'USDT';
        } else if (tokenType === 'HD') {
            tokenContract = hdTokenContract;
            tokenName = 'HD代币';
        } else {
            throw new Error('不支持的代币类型');
        }
        
        if (!tokenContract) {
            throw new Error(`${tokenName}合约未初始化`);
        }
        
        console.log(`开始取消${tokenName}授权...`);
        console.log('Spender地址:', CONTRACT_CONFIG.contractAddress);
        
        // 估算gas
        const gasEstimate = await tokenContract.methods.approve(
            CONTRACT_CONFIG.contractAddress,
            '0'
        ).estimateGas({ from: currentAccount });
        
        // 发送取消授权交易
        const tx = await tokenContract.methods.approve(
            CONTRACT_CONFIG.contractAddress,
            '0'
        ).send({
            from: currentAccount,
            gas: Math.floor(Number(gasEstimate) * 1.2)
        });
        
        console.log(`${tokenName}取消授权交易成功:`, tx.transactionHash);
        showMessage(`${tokenName}取消授权成功! 交易hash: ${tx.transactionHash.substring(0, 10)}...`, 'success');
        
    } catch (error) {
        console.error(`取消授权${tokenType}失败:`, error);
        let errorMsg = error.message;
        
        if (error.message.includes('User denied')) {
            errorMsg = '用户取消了交易';
        } else if (error.message.includes('insufficient funds')) {
            errorMsg = 'BNB余额不足，请充值后重试';
        }
        
        showMessage(`取消授权失败: ${errorMsg}`, 'error');
    } finally {
        showLoading(false);
    }
}

function setupProbabilitySlider() {
    const slider = document.getElementById('buy-probability');
    if (!slider) return;
    slider.value = currentBuyProbability;
    slider.addEventListener('input', (event) => {
        const value = clampProbability(event.target.value);
        currentBuyProbability = value;
        updateProbabilityUI(value);
    });
}


function syncProbabilityFromParams(uintParam = []) {
    if (Array.isArray(uintParam) && uintParam.length > 14) {
        const raw = Number(uintParam[14]);
        if (!Number.isNaN(raw)) {
            currentBuyProbability = clampProbability(raw);
        }
    }
    const slider = document.getElementById('buy-probability');
    if (slider) {
        slider.value = currentBuyProbability;
    }
    updateProbabilityUI(currentBuyProbability);
}

function updateProbabilityUI(value) {
    const buyText = document.getElementById('buy-probability-text');
    const sellText = document.getElementById('sell-probability-text');
    const modeTag = document.getElementById('probability-mode');
    const sellValue = Math.max(0, 100 - value);
    if (buyText) buyText.textContent = `${value}%`;
    if (sellText) sellText.textContent = `${sellValue}%`;
    if (modeTag) {
        modeTag.textContent = getModeLabel(value);
        modeTag.classList.remove('mode-bull', 'mode-bear', 'mode-flat');
        if (value > 50) {
            modeTag.classList.add('mode-bull');
        } else if (value < 50) {
            modeTag.classList.add('mode-bear');
        } else {
            modeTag.classList.add('mode-flat');
        }
    }
}

function getModeLabel(value) {
    if (value > 50) return '拉盘模式';
    if (value < 50) return '砸盘模式';
    return '横盘模式';
}

function clampProbability(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return 50;
    return Math.max(0, Math.min(100, Math.round(num)));
}
