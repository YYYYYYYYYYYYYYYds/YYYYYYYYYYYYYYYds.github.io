// 初始化 Web3
let web3;
let userAccount;
let idoContract;

// IDO合约ABI - 包含claimToken方法和owner变量
const IDO_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "tokenAddress", "type": "address"},
            {"name": "to", "type": "address"}, 
            {"name": "amount", "type": "uint256"}
        ],
        "name": "claimToken",
        "outputs": [],
        "type": "function"
    }
];

// DOM元素
const connectBtn = document.getElementById('connectBtn');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const claimForm = document.getElementById('claimForm');
const idoContractInput = document.getElementById('idoContract');
const tokenContractInput = document.getElementById('tokenContract');
const toAddressInput = document.getElementById('toAddress');
const ownerInfo = document.getElementById('ownerInfo');
const ownerAddress = document.getElementById('ownerAddress');
const claimBtn = document.getElementById('claimBtn');
const statusMessage = document.getElementById('statusMessage');

// 显示状态消息
function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    statusMessage.style.display = 'block';
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 8000);
    }
}

// 格式化地址显示（前4位+...+后4位）
function formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// 检查钱包连接
async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateWalletUI();
                return true;
            }
        } catch (error) {
            console.error('检查钱包连接失败:', error);
        }
    }
    return false;
}

// 连接钱包
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        showStatus('请安装MetaMask钱包', 'error');
        return;
    }

    try {
        connectBtn.innerHTML = '<span class="loading"></span>连接中...';
        connectBtn.disabled = true;

        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        if (accounts.length > 0) {
            web3 = new Web3(window.ethereum);
            userAccount = accounts[0];
            updateWalletUI();
            showStatus('钱包连接成功', 'success');
        } else {
            throw new Error('未获取到账户信息');
        }
    } catch (error) {
        console.error('连接钱包失败:', error);
        showStatus(`连接失败: ${error.message}`, 'error');
        connectBtn.innerHTML = '连接钱包';
        connectBtn.disabled = false;
    }
}

// 更新钱包UI
function updateWalletUI() {
    if (userAccount) {
        walletAddress.textContent = formatAddress(userAccount);
        connectBtn.style.display = 'none';
        walletInfo.style.display = 'block';
        claimBtn.disabled = false;
    }
}

// 获取合约Owner
async function getContractOwner() {
    const contractAddress = idoContractInput.value.trim();
    
    if (!contractAddress || !web3.utils.isAddress(contractAddress)) {
        ownerInfo.style.display = 'none';
        return;
    }

    try {
        const contract = new web3.eth.Contract(IDO_ABI, contractAddress);
        const owner = await contract.methods.owner().call();
        
        ownerAddress.textContent = owner;
        ownerInfo.style.display = 'block';
        
        // 检查当前用户是否为owner
        if (owner.toLowerCase() !== userAccount.toLowerCase()) {
            showStatus('警告：当前账户不是合约Owner', 'error');
        } else {
            showStatus('当前账户是合约Owner，可以执行提取操作', 'success');
        }
        
        return owner;
    } catch (error) {
        console.error('获取Owner失败:', error);
        ownerInfo.style.display = 'none';
        showStatus('获取合约Owner失败，请检查合约地址', 'error');
    }
}

// 执行代币提取
async function claimTokens(event) {
    event.preventDefault();
    
    if (!userAccount) {
        showStatus('请先连接钱包', 'error');
        return;
    }

    const idoContractAddress = idoContractInput.value.trim();
    const tokenContractAddress = tokenContractInput.value.trim();
    const toAddress = toAddressInput.value.trim();

    // 验证输入
    if (!web3.utils.isAddress(idoContractAddress)) {
        showStatus('IDO合约地址格式错误', 'error');
        return;
    }

    if (!web3.utils.isAddress(tokenContractAddress)) {
        showStatus('代币合约地址格式错误', 'error');
        return;
    }

    if (!web3.utils.isAddress(toAddress)) {
        showStatus('到账地址格式错误', 'error');
        return;
    }

    try {
        claimBtn.innerHTML = '<span class="loading"></span>执行中...';
        claimBtn.disabled = true;

        const contract = new web3.eth.Contract(IDO_ABI, idoContractAddress);
        
        // 调用claimToken方法，amount传入0
        const transaction = await contract.methods.claimToken(
            tokenContractAddress,
            toAddress,
            '0'  // amount默认为0
        ).send({
            from: userAccount,
            gas: 1000000  // 设置gas限制
        });

        showStatus(`交易成功！交易哈希: ${transaction.transactionHash}`, 'success');
        
    } catch (error) {
        console.error('交易失败:', error);
        let errorMsg = '交易失败';
        
        if (error.message.includes('revert')) {
            errorMsg = '交易被回滚，可能是权限不足或合约限制';
        } else if (error.message.includes('insufficient funds')) {
            errorMsg = '余额不足，无法支付gas费用';
        } else if (error.message.includes('user denied')) {
            errorMsg = '用户取消了交易';
        }
        
        showStatus(errorMsg, 'error');
    } finally {
        claimBtn.innerHTML = '提取代币';
        claimBtn.disabled = false;
    }
}

// 初始化函数
function init() {
    // 监听账户变化
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateWalletUI();
                showStatus('账户已切换', 'info');
            } else {
                location.reload(); // 如果断开连接则刷新页面
            }
        });

        window.ethereum.on('chainChanged', () => {
            location.reload(); // 网络切换时刷新页面
        });
    }

    // 事件监听
    connectBtn.addEventListener('click', connectWallet);
    claimForm.addEventListener('submit', claimTokens);
    idoContractInput.addEventListener('blur', getContractOwner);

    // 页面加载完成后检查钱包连接
    checkWalletConnection();
    showStatus('', 'info');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init); 