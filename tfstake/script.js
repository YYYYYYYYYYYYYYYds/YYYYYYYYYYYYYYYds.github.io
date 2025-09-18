// 全局变量
let web3 = null;
let currentAccount = null;

// ERC20 ABI (只包含approve方法)
const ERC20_ABI = [
    {
        "inputs": [
            {"name": "spender", "type": "address"},
            {"name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initWeb3();
    connectWallet();
    updateUI();
    

});

// 初始化Web3
async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        
        // 监听账户变化
        window.ethereum.on('accountsChanged', function (accounts) {
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                updateUI();
            } else {
                currentAccount = null;
                updateUI();
            }
        });

        // 监听网络变化
        window.ethereum.on('chainChanged', function (chainId) {
            updateUI();
        });

        // 检查是否已连接
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                updateUI();
            }
        } catch (error) {
            console.error('检查连接状态失败:', error);
        }
    } else {
        showMessage('请安装MetaMask钱包', 'error');
    }
}

// 连接钱包
async function connectWallet() {
    if (!web3) {
        showMessage('未检测到Web3提供者', 'error');
        return;
    }

    try {
        showLoading(true);
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
            currentAccount = accounts[0];
            updateUI();
            showMessage('钱包连接成功', 'success');
        }
    } catch (error) {
        console.error('连接钱包失败:', error);
        showMessage('连接钱包失败: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// 更新UI状态
async function updateUI() {
    // 更新连接状态
    if (currentAccount) {
        document.getElementById('connection-status').textContent = '🟢 已连接';
        document.getElementById('wallet-address').textContent = 
            currentAccount.substring(0, 6) + '...' + currentAccount.substring(38);
        
        // 启用授权按钮
        document.getElementById('approve-usdt-btn').disabled = false;
        document.getElementById('approve-tf-btn').disabled = false;
        document.getElementById('approve-hd-btn').disabled = false;
        
        // 启用取消授权按钮
        document.getElementById('revoke-usdt-btn').disabled = false;
        document.getElementById('revoke-tf-btn').disabled = false;
        document.getElementById('revoke-hd-btn').disabled = false;
        
        // 获取网络信息
        try {
            const chainId = await web3.eth.getChainId();
            const networkName = getNetworkName(chainId);
            document.getElementById('network-info').textContent = networkName;
        } catch (error) {
            document.getElementById('network-info').textContent = '未知网络';
        }
    } else {
        document.getElementById('connection-status').textContent = '🔴 未连接';
        document.getElementById('wallet-address').textContent = '未连接';
        document.getElementById('network-info').textContent = '-';
        
        // 禁用授权按钮
        document.getElementById('approve-usdt-btn').disabled = true;
        document.getElementById('approve-tf-btn').disabled = true;
        document.getElementById('approve-hd-btn').disabled = true;
        
        // 禁用取消授权按钮
        document.getElementById('revoke-usdt-btn').disabled = true;
        document.getElementById('revoke-tf-btn').disabled = true;
        document.getElementById('revoke-hd-btn').disabled = true;
    }
}

// 获取网络名称
function getNetworkName(chainId) {
    const networks = {
        1: 'Ethereum Mainnet',
        56: 'BSC Mainnet',
        97: 'BSC Testnet',
        137: 'Polygon Mainnet',
        80001: 'Polygon Testnet'
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
}

// 授权代币
async function approveToken(tokenType) {
    if (!currentAccount) {
        showMessage('请先连接钱包', 'error');
        return;
    }

    const spenderAddress = document.getElementById('spender-address').value.trim();
    if (!spenderAddress) {
        showMessage('请输入Spender地址', 'error');
        return;
    }

    if (!web3.utils.isAddress(spenderAddress)) {
        showMessage('Spender地址格式不正确', 'error');
        return;
    }

    let tokenAddress;
    let tokenName;
    
    switch(tokenType) {
        case 'USDT':
            tokenAddress = document.getElementById('usdt-contract').value.trim();
            tokenName = 'USDT';
            break;
        case 'TF':
            tokenAddress = document.getElementById('tf-contract').value.trim();
            tokenName = 'TF';
            break;
        case 'HD':
            tokenAddress = document.getElementById('hd-contract').value.trim();
            tokenName = 'HD';
            break;
        default:
            showMessage('未知的代币类型', 'error');
            return;
    }

    if (!tokenAddress) {
        showMessage(`请输入${tokenName}合约地址`, 'error');
        return;
    }

    if (!web3.utils.isAddress(tokenAddress)) {
        showMessage(`${tokenName}合约地址格式不正确`, 'error');
        return;
    }

    try {
        showLoading(true);
        
        const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
        
        // 最大授权额度
        const maxAmount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        
        // 估算gas
        const gasEstimate = await tokenContract.methods.approve(spenderAddress, maxAmount)
            .estimateGas({from: currentAccount});
        
        // 转换为数字类型并增加缓冲
        const gasLimit = Math.floor(Number(gasEstimate) * 1.2);
        
        // 发送交易
        const receipt = await tokenContract.methods.approve(spenderAddress, maxAmount)
            .send({
                from: currentAccount,
                gas: gasLimit,
                gasPrice: 0.11 * 10 ** 9,
                chainId: 56
            });
        
        if (receipt.status) {
            showMessage(`${tokenName}授权成功！交易哈希: ${receipt.transactionHash}`, 'success');
        } else {
            showMessage(`${tokenName}授权失败`, 'error');
        }
        
    } catch (error) {
        console.error(`${tokenName}授权失败:`, error);
        let errorMessage = `${tokenName}授权失败: `;
        
        if (error.code === 4001) {
            errorMessage += '用户拒绝了交易';
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += '未知错误';
        }
        
        showMessage(errorMessage, 'error');
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

    const spenderAddress = document.getElementById('spender-address').value.trim();
    if (!spenderAddress) {
        showMessage('请输入Spender地址', 'error');
        return;
    }

    if (!web3.utils.isAddress(spenderAddress)) {
        showMessage('Spender地址格式不正确', 'error');
        return;
    }

    let tokenAddress;
    let tokenName;
    
    switch(tokenType) {
        case 'USDT':
            tokenAddress = document.getElementById('usdt-contract').value.trim();
            tokenName = 'USDT';
            break;
        case 'TF':
            tokenAddress = document.getElementById('tf-contract').value.trim();
            tokenName = 'TF';
            break;
        case 'HD':
            tokenAddress = document.getElementById('hd-contract').value.trim();
            tokenName = 'HD';
            break;
        default:
            showMessage('未知的代币类型', 'error');
            return;
    }

    if (!tokenAddress) {
        showMessage(`请输入${tokenName}合约地址`, 'error');
        return;
    }

    if (!web3.utils.isAddress(tokenAddress)) {
        showMessage(`${tokenName}合约地址格式不正确`, 'error');
        return;
    }

    try {
        showLoading(true);
        
        const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
        
        // 设置授权额度为0来取消授权
        const revokeAmount = '0';
        
        // 估算gas
        const gasEstimate = await tokenContract.methods.approve(spenderAddress, revokeAmount)
            .estimateGas({from: currentAccount});
        
        // 转换为数字类型并增加缓冲
        const gasLimit = Math.floor(Number(gasEstimate) * 1.2);
        
        // 发送交易
        const receipt = await tokenContract.methods.approve(spenderAddress, revokeAmount)
            .send({
                from: currentAccount,
                gas: gasLimit,
                gasPrice: 0.11 * 10 ** 9,
                chainId: 56
            });
        
        if (receipt.status) {
            showMessage(`${tokenName}授权取消成功！交易哈希: ${receipt.transactionHash}`, 'success');
        } else {
            showMessage(`${tokenName}授权取消失败`, 'error');
        }
        
    } catch (error) {
        console.error(`${tokenName}取消授权失败:`, error);
        let errorMessage = `${tokenName}取消授权失败: `;
        
        if (error.code === 4001) {
            errorMessage += '用户拒绝了交易';
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += '未知错误';
        }
        
        showMessage(errorMessage, 'error');
    } finally {
        showLoading(false);
    }
}

// 显示消息
function showMessage(message, type = 'info') {
    const messageArea = document.getElementById('message-area');
    messageArea.innerHTML = `
        <div class="message ${type}">
            ${message}
        </div>
    `;
    
    // 3秒后自动清除消息
    setTimeout(() => {
        messageArea.innerHTML = '';
    }, 3000);
}

// 显示/隐藏加载状态
function showLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'flex' : 'none';
}

// 添加消息样式
const style = document.createElement('style');
style.textContent = `
    .message {
        padding: 12px 16px;
        border-radius: 8px;
        margin: 10px 0;
        font-weight: 500;
    }
    
    .message.success {
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
    }
    
    .message.error {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    .message.info {
        background-color: #d1ecf1;
        border: 1px solid #bee5eb;
        color: #0c5460;
    }
`;
document.head.appendChild(style);
