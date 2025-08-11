// 配置信息
const CONFIG = {
    // 请修改为实际的合约地址
    CONTRACT_ADDRESS: '0x397105Da90ce9fDE1a3fc44B8642e99370e91fC5',
    CHAIN_ID: 56, // BSC主网
    MIN_ALLOWANCE: '1000000' // 100万，单位按token decimals
};

// 合约ABI
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "lpAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lpFromAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address[]", "name": "recipients", "type": "address[]"}],
        "name": "multiTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// ERC20 ABI (用于检查和授权)
const ERC20_ABI = [
    {
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }
];

let web3;
let contract;
let userAccount;
let lpAddress;
let lpFromAddress;
let lpTokenContract;

// DOM元素
const elements = {
    lpAddressEl: document.getElementById('lpAddress'),
    lpFromAddressEl: document.getElementById('lpFromAddress'),
    authStatusEl: document.getElementById('authStatus'),
    allowanceAmountEl: document.getElementById('allowanceAmount'),
    connectBtn: document.getElementById('connectBtn'),
    checkBtn: document.getElementById('checkBtn'),
    authorizeBtn: document.getElementById('authorizeBtn'),
    errorMessage: document.getElementById('errorMessage'),
    successMessage: document.getElementById('successMessage'),
    networkStatus: document.getElementById('networkStatus')
};

// 工具函数
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.remove('hidden');
    elements.successMessage.classList.add('hidden');
}

function showSuccess(message) {
    elements.successMessage.textContent = message;
    elements.successMessage.classList.remove('hidden');
    elements.errorMessage.classList.add('hidden');
}

function hideMessages() {
    elements.errorMessage.classList.add('hidden');
    elements.successMessage.classList.add('hidden');
}

function formatAddress(address) {
    if (!address) return '未获取';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function setButtonLoading(button, loading) {
    if (loading) {
        button.innerHTML = '<span class="loading"></span>处理中...';
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

// 初始化Web3
async function initWeb3() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            elements.networkStatus.textContent = '已检测到钱包';
            return true;
        } else {
            elements.networkStatus.textContent = '未检测到Web3钱包';
            showError('请安装MetaMask或其他Web3钱包');
            return false;
        }
    } catch (error) {
        console.error('初始化Web3失败:', error);
        showError('初始化失败，请刷新页面重试');
        return false;
    }
}

// 连接钱包
async function connectWallet() {
    try {
        setButtonLoading(elements.connectBtn, true);
        hideMessages();

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts.length === 0) {
            throw new Error('未获取到账户');
        }

        userAccount = accounts[0];
        
        console.log(userAccount)
        // 检查网络
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });
        
        console.log(parseInt(chainId, 16), CONFIG.CHAIN_ID)
        if (parseInt(chainId, 16) !== CONFIG.CHAIN_ID) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${CONFIG.CHAIN_ID.toString(16)}` }],
                });
            } catch (switchError) {
                throw new Error('请切换到BSC网络');
            }
        }
        console.log('连接完成')
        elements.networkStatus.textContent = `已连接: ${formatAddress(userAccount)}`;
        elements.connectBtn.textContent = '重新连接';
        elements.checkBtn.classList.remove('hidden');

        // 初始化合约
        contract = new web3.eth.Contract(CONTRACT_ABI, CONFIG.CONTRACT_ADDRESS);
        console.log('合约初始化完成')
        // 加载合约信息
        await loadContractInfo();
        
        showSuccess('钱包连接成功！');

    } catch (error) {
        console.error('连接钱包失败:', error);
        showError(error.message || '连接钱包失败');
        elements.connectBtn.innerHTML = '连接钱包';
    }
}

// 加载合约信息
async function loadContractInfo() {
    try {
        // 获取LP地址和来源地址
        lpAddress = await contract.methods.lpAddress().call();
        lpFromAddress = await contract.methods.lpFromAddress().call()
        // [lpAddress, lpFromAddress] = await Promise.all([
        //     contract.methods.lpAddress().call(),
        //     contract.methods.lpFromAddress().call()
        // ]);
        console.log(lpAddress, lpFromAddress);
        elements.lpAddressEl.textContent = lpAddress;
        elements.lpFromAddressEl.textContent = lpFromAddress;

        // 初始化LP token合约
        lpTokenContract = new web3.eth.Contract(ERC20_ABI, lpAddress);

        // 自动检查授权
        await checkAllowance();

    } catch (error) {
        console.error('加载合约信息失败:', error);
        showError('加载合约信息失败');
        elements.lpAddressEl.textContent = '加载失败';
        elements.lpFromAddressEl.textContent = '加载失败';
    }
}

// 检查授权额度
async function checkAllowance() {
    try {
        setButtonLoading(elements.checkBtn, true);
        hideMessages();

        if (!lpTokenContract || !lpFromAddress || !userAccount) {
            throw new Error('信息不完整，请重新连接钱包');
        }

        const allowance = await lpTokenContract.methods.allowance(lpFromAddress, CONFIG.CONTRACT_ADDRESS).call();
        // const decimals = await lpTokenContract.methods.decimals().call();
        
        const allowanceNumber = parseFloat(web3.utils.fromWei(allowance, 'ether'));
        const minAllowance = parseFloat(CONFIG.MIN_ALLOWANCE);
        
        elements.allowanceAmountEl.textContent = `当前授权额度: ${allowanceNumber.toLocaleString()} LP`;

        if (allowanceNumber >= minAllowance) {
            elements.authStatusEl.textContent = '已授权';
            elements.authStatusEl.className = 'status-badge status-authorized';
            elements.authorizeBtn.classList.add('hidden');
            showSuccess('授权额度充足！');
        } else {
            elements.authStatusEl.textContent = '未授权';
            elements.authStatusEl.className = 'status-badge status-unauthorized';
            elements.authorizeBtn.classList.remove('hidden');
            showError('授权额度不足，需要进行授权');
        }

        elements.checkBtn.innerHTML = '重新检查';

    } catch (error) {
        console.error('检查授权失败:', error);
        showError('检查授权失败: ' + error.message);
        elements.checkBtn.innerHTML = '检查授权';
        elements.authStatusEl.textContent = '检查失败';
        elements.authStatusEl.className = 'status-badge status-unauthorized';
    }
}

// 进行授权
async function authorize() {
    try {
        setButtonLoading(elements.authorizeBtn, true);
        hideMessages();

        if (!lpTokenContract || !userAccount) {
            throw new Error('信息不完整，请重新连接钱包');
        }
        
        // 检查当前钱包是否为lpFromAddress
        if (userAccount !== lpFromAddress) {
            throw new Error('当前钱包不是LP分发来源地址');
        }

        // 使用最大uint256值进行授权
        const maxAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        
        const tx = await lpTokenContract.methods.approve(CONFIG.CONTRACT_ADDRESS, maxAmount).send({
            from: userAccount,
            gas: 100000
        });

        showSuccess('授权成功！交易哈希: ' + tx.transactionHash);
        
        // 重新检查授权状态
        setTimeout(() => {
            checkAllowance();
        }, 2000);

    } catch (error) {
        console.error('授权失败:', error);
        showError('授权失败: ' + (error.message || '未知错误'));
        elements.authorizeBtn.innerHTML = '授权 LP Token';
    }
}

// 事件监听
function initEventListeners() {
    elements.connectBtn.addEventListener('click', connectWallet);
    elements.checkBtn.addEventListener('click', checkAllowance);
    elements.authorizeBtn.addEventListener('click', authorize);

    // 监听账户变化
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                location.reload();
            } else if (accounts[0] !== userAccount) {
                location.reload();
            }
        });

        window.ethereum.on('chainChanged', () => {
            location.reload();
        });
    }
}

// 页面加载完成后初始化
window.addEventListener('load', async () => {
    // 初始化事件监听
    initEventListeners();
    
    const web3Available = await initWeb3();
    if (web3Available) {
        // 检查是否已经连接
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            if (accounts.length > 0) {
                connectWallet();
            }
        } catch (error) {
            console.log('未连接钱包');
        }
    }
});
