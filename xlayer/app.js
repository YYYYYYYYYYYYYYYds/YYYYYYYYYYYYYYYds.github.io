// 代币合约ABI
const TOKEN_ABI = [{"constant":false,"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"__totalSupply","type":"uint256"},{"internalType":"uint256[3]","name":"_buyfees","type":"uint256[3]"},{"internalType":"uint256[3]","name":"_sellfees","type":"uint256[3]"},{"internalType":"uint256","name":"mushHoldTokenAmount","type":"uint256"},{"internalType":"address","name":"marketWallet_1","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lpBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"AutoNukeLP","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"accounts","type":"address[]"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeMultipleAccountsFromFees","payable":false,"type":"event"},{"constant":false,"inputs":[],"name":"Failed_addLiquidityETH","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"","type":"uint8"}],"name":"Failed_buyBack","payable":false,"type":"event"},{"constant":false,"inputs":[],"name":"Failed_swapExactTokensForETHSupportingFeeOnTransferTokens","payable":false,"type":"event"},{"constant":false,"inputs":[],"name":"Failed_swapExactTokensForTokensSupportingFeeOnTransferTokens","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"newValue","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"oldValue","type":"uint256"}],"name":"GasForProcessingUpdated","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"newLiquidityWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldLiquidityWallet","type":"address"}],"name":"LiquidityWalletUpdated","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"iterations","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claims","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastProcessedIndex","type":"uint256"},{"indexed":true,"internalType":"bool","name":"automatic","type":"bool"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":true,"internalType":"address","name":"processor","type":"address"}],"name":"ProcessedDividendTracker","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SendDividends","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateDividendTracker","payable":false,"type":"event"},{"constant":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","payable":false,"type":"event"},{"constant":false,"inputs":[],"name":"ETH","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"s","type":"bool"},{"internalType":"uint256","name":"muchB","type":"uint256"}],"name":"L","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isbclisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"_marketingWalletAddress_1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"_tokenDistributor","outputs":[{"internalType":"contract TokenDistributor","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"airDropEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"burnEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy_ETHRewardsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy_burnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy_marketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy_totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deadWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"dividendTokenBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"dividendTracker","outputs":[{"internalType":"contract ETHBackDividendTracker","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromDividends","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeMultipleAccountsFromFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"gasForProcessing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountDividendsInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAccountDividendsInfoAtIndex","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getClaimWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getLastProcessedIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getNumberOfDividendTokenHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getTotalDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"isL","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"killNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"lastLpBurnTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"launch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"lpBurnEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"lpBurnFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"lunachB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"maxWalletAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"percentForLPBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"processDividendTracker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"sell_ETHRewardsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sell_burnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sell_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sell_marketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sell_totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"status","type":"bool"}],"name":"setAirDropEnable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_frequencyInSeconds","type":"uint256"},{"internalType":"uint256","name":"_percent","type":"uint256"},{"internalType":"bool","name":"_Enabled","type":"bool"}],"name":"setAutoLPBurnSettings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"status","type":"bool"}],"name":"setBurnEnable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newBuyBurnFee","type":"uint256"},{"internalType":"uint256","name":"newSellBurnFee","type":"uint256"}],"name":"setBurnFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"to","type":"address"}],"name":"setClaims","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setETHRewardsFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setETHRewardsFee_2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setLiquiditFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setLiquiditFee_2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setMarketingFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setMarketingFee_2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"setMarketingWallet_1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setMaxWalletAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"status","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setSwapTokensAtAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setTransferFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"swapAndLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"transferFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateGasForProcessing","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawableDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"payable":false,"stateMutability":"payable","type":"receive"}];

// 全局变量
let web3;
let userAccount;
let tokenContract;
let contractAddress;

// xLayer网络配置
const XLAYER_NETWORK = {
    chainId: '0xC4', // 196 in hex
    chainName: 'X Layer Mainnet',
    nativeCurrency: {
        name: 'OKB',
        symbol: 'OKB',
        decimals: 18
    },
};

// DOM元素
const walletStatus = document.getElementById('wallet-status');
const walletAddress = document.getElementById('wallet-address');
const contractAddressInput = document.getElementById('contract-address');
const loadContractBtn = document.getElementById('load-contract');
const tokenName = document.getElementById('token-name');
const tokenSymbol = document.getElementById('token-symbol');
const tokenDecimals = document.getElementById('token-decimals');
const tokenSupply = document.getElementById('token-supply');
const contractOwner = document.getElementById('contract-owner');
const launchBtn = document.getElementById('launch-btn');
const addressesInput = document.getElementById('addresses-input');
const addWhitelistBtn = document.getElementById('add-whitelist-btn');
const removeWhitelistBtn = document.getElementById('remove-whitelist-btn');
const renounceBtn = document.getElementById('renounce-btn');
const logContainer = document.getElementById('log-container');
const loadingOverlay = document.getElementById('loading-overlay');

// 工具函数
function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

function addLog(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `
        <span>${new Date().toLocaleTimeString()}: ${message}</span>
    `;
    
    if (logContainer.querySelector('p')) {
        logContainer.innerHTML = '';
    }
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
}

function formatAddress(address) {
    if (!address) return '-';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    // return `${address}`;
}

function formatNumber(number, decimals = 18) {
    if (!number) return '0';
    const formatted = (parseInt(number) / Math.pow(10, decimals)).toLocaleString();
    return formatted;
}

// 从URL获取合约地址
function getContractAddressFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const ca = urlParams.get('ca');
    if (ca && ca.startsWith('0x') && ca.length === 42) {
        return ca;
    }
    
    // 检查URL中是否包含ca=0x...格式
    const url = window.location.href;
    const match = url.match(/ca=(0x[a-fA-F0-9]{40})/);
    if (match) {
        return match[1];
    }
    
    return null;
}

// 检查当前网络
async function getCurrentChainId() {
    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        return chainId;
    } catch (error) {
        console.error('获取当前网络失败:', error);
        return null;
    }
}

// 切换到xLayer网络
async function switchToXLayer() {
    try {
        // 首先尝试切换到xLayer网络
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: XLAYER_NETWORK.chainId }],
        });
        
        addLog('成功切换到xLayer网络', 'success');
        return true;
        
    } catch (switchError) {

        console.error('切换网络失败:', switchError);
        addLog(`切换网络失败: ${switchError.message}`, 'error');
        return false;
        
    }
}

// 连接钱包
async function connectWallet() {
    try {
        // 设置连接中状态
        walletStatus.textContent = '连接中...';
        walletStatus.className = 'connecting';
        
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            
            // 请求账户访问
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            userAccount = accounts[0];
            walletStatus.textContent = '钱包已连接';
            walletStatus.className = '';
            walletAddress.textContent = formatAddress(userAccount);
            
            addLog('钱包连接成功', 'success');
            
            // 检查当前网络并自动切换到xLayer
            const currentChainId = await getCurrentChainId();
            if (currentChainId !== XLAYER_NETWORK.chainId) {
                walletStatus.textContent = '切换网络中...';
                walletStatus.className = 'connecting';
                addLog('检测到非xLayer网络，正在自动切换...', 'pending');
                
                const switched = await switchToXLayer();
                if (switched) {
                    walletStatus.textContent = '已连接';
                    walletStatus.className = '';
                } else {
                    walletStatus.textContent = '网络切换失败';
                    walletStatus.className = 'error';
                }
            } else {
                addLog('已在xLayer网络', 'success');
            }
            
            // 监听账户变化
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    walletStatus.textContent = '钱包未连接';
                    walletStatus.className = 'error';
                    walletAddress.textContent = '';
                    userAccount = null;
                } else {
                    userAccount = accounts[0];
                    walletStatus.textContent = '钱包已连接';
                    walletStatus.className = '';
                    walletAddress.textContent = formatAddress(userAccount);
                }
            });
            
            // 监听网络变化
            window.ethereum.on('chainChanged', (chainId) => {
                if (chainId === XLAYER_NETWORK.chainId) {
                    addLog('已切换到xLayer网络', 'success');
                    walletStatus.textContent = '已连接xLayer';
                    walletStatus.className = '';
                } else {
                    addLog('网络已切换，建议使用xLayer网络', 'pending');
                    walletStatus.textContent = '非xLayer网络';
                    walletStatus.className = 'error';
                }
                // 重新创建web3实例
                web3 = new Web3(window.ethereum);
            });
            
            return true;
        } else {
            walletStatus.textContent = '未检测到MetaMask';
            walletStatus.className = 'error';
            walletAddress.textContent = '请安装MetaMask钱包';
            addLog('请安装MetaMask钱包', 'error');
            return false;
        }
    } catch (error) {
        console.error('连接钱包失败:', error);
        walletStatus.textContent = '连接失败';
        walletStatus.className = 'error';
        walletAddress.textContent = error.message;
        addLog(`连接钱包失败: ${error.message}`, 'error');
        return false;
    }
}

// 加载合约
async function loadContract(address) {
    try {
        if (!web3) {
            throw new Error('请先连接钱包');
        }
        
        if (!address || !web3.utils.isAddress(address)) {
            throw new Error('无效的合约地址');
        }
        
        showLoading();
        
        contractAddress = address;
        tokenContract = new web3.eth.Contract(TOKEN_ABI, address);
        
        // 获取代币信息
        const [name, symbol, decimals, totalSupply, owner] = await Promise.all([
            tokenContract.methods.name().call(),
            tokenContract.methods.symbol().call(),
            tokenContract.methods.decimals().call(),
            tokenContract.methods.totalSupply().call(),
            tokenContract.methods.owner().call()
        ]);
        
        // 更新UI
        tokenName.textContent = name;
        tokenSymbol.textContent = symbol;
        tokenDecimals.textContent = decimals;
        tokenSupply.textContent = formatNumber(totalSupply, decimals);
        contractOwner.textContent = formatAddress(owner);
        
        // 检查是否为合约所有者
        const isOwner = owner.toLowerCase() === userAccount.toLowerCase();
        
        launchBtn.disabled = !isOwner;
        addWhitelistBtn.disabled = !isOwner;
        removeWhitelistBtn.disabled = !isOwner;
        renounceBtn.disabled = !isOwner;
        
        if (!isOwner) {
            addLog('您不是合约所有者，无法执行管理操作', 'error');
        } else {
            addLog('合约加载成功，您可以执行管理操作', 'success');
        }
        
        addLog(`合约加载成功: ${name} (${symbol})`, 'success');
        
    } catch (error) {
        console.error('加载合约失败:', error);
        addLog(`加载合约失败: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

// 启动交易
async function launchToken() {
    try {
        if (!tokenContract || !userAccount) {
            throw new Error('请先连接钱包并加载合约');
        }
        
        showLoading();
        addLog('正在启动交易...', 'pending');
        
        const gasEstimate = await tokenContract.methods.launch().estimateGas({
            from: userAccount
        });
        
        const tx = await tokenContract.methods.launch().send({
            from: userAccount,
            gas: Math.floor(gasEstimate * 1.2) // 增加20%的gas
        });
        
        addLog(`交易启动成功! 交易哈希: ${tx.transactionHash}`, 'success');
        
    } catch (error) {
        console.error('启动交易失败:', error);
        addLog(`启动交易失败: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

// 验证地址输入
function validateAddresses() {
    const addresses = addressesInput.value
        .split('\n')
        .map(addr => addr.trim())
        .filter(addr => addr.length > 0);
        
    if (addresses.length === 0) {
        throw new Error('请输入至少一个地址');
    }
    
    // 验证地址格式
    for (const addr of addresses) {
        if (!web3.utils.isAddress(addr)) {
            throw new Error(`无效地址: ${addr}`);
        }
    }
    
    return addresses;
}

// 添加到白名单
async function addToWhitelist() {
    try {
        if (!tokenContract || !userAccount) {
            throw new Error('请先连接钱包并加载合约');
        }
        
        const addresses = validateAddresses();
        
        showLoading();
        addLog('正在添加到白名单...', 'pending');
        
        const gasEstimate = await tokenContract.methods.excludeMultipleAccountsFromFees(addresses, true).estimateGas({
            from: userAccount
        });
        
        const tx = await tokenContract.methods.excludeMultipleAccountsFromFees(addresses, true).send({
            from: userAccount,
            gas: Math.floor(gasEstimate * 1.2)
        });
        
        addLog(`成功添加到白名单! 处理了${addresses.length}个地址。交易哈希: ${tx.transactionHash}`, 'success');
        addressesInput.value = '';
        
    } catch (error) {
        console.error('添加白名单失败:', error);
        addLog(`添加白名单失败: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

// 从白名单移除
async function removeFromWhitelist() {
    try {
        if (!tokenContract || !userAccount) {
            throw new Error('请先连接钱包并加载合约');
        }
        
        const addresses = validateAddresses();
        
        showLoading();
        addLog('正在从白名单移除...', 'pending');
        
        const gasEstimate = await tokenContract.methods.excludeMultipleAccountsFromFees(addresses, false).estimateGas({
            from: userAccount
        });
        
        const tx = await tokenContract.methods.excludeMultipleAccountsFromFees(addresses, false).send({
            from: userAccount,
            gas: Math.floor(gasEstimate * 1.2)
        });
        
        addLog(`成功从白名单移除! 处理了${addresses.length}个地址。交易哈希: ${tx.transactionHash}`, 'success');
        addressesInput.value = '';
        
    } catch (error) {
        console.error('移除白名单失败:', error);
        addLog(`移除白名单失败: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

// 放弃所有权
async function renounceOwnership() {
    try {
        if (!tokenContract || !userAccount) {
            throw new Error('请先连接钱包并加载合约');
        }
        
        showLoading();
        addLog('正在放弃所有权...', 'pending');
        
        const gasEstimate = await tokenContract.methods.renounceOwnership().estimateGas({
            from: userAccount
        });
        
        const tx = await tokenContract.methods.renounceOwnership().send({
            from: userAccount,
            gas: Math.floor(gasEstimate * 1.2)
        });
        
        addLog(`所有权已放弃! 交易哈希: ${tx.transactionHash}`, 'success');
        
        // 禁用所有按钮
        launchBtn.disabled = true;
        addWhitelistBtn.disabled = true;
        removeWhitelistBtn.disabled = true;
        renounceBtn.disabled = true;
        
        // 更新所有者显示
        contractOwner.textContent = '0x0000...0000';
        
    } catch (error) {
        console.error('放弃所有权失败:', error);
        addLog(`放弃所有权失败: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

// 事件监听器
document.addEventListener('DOMContentLoaded', async () => {
    // 自动连接钱包
    await connectWallet();
    
    // 自动获取合约地址
    const urlContractAddress = getContractAddressFromURL();
    if (urlContractAddress) {
        contractAddressInput.value = urlContractAddress;
        await loadContract(urlContractAddress);
    }
});

// 按钮事件监听
loadContractBtn.addEventListener('click', () => {
    const address = contractAddressInput.value.trim();
    if (address) {
        loadContract(address);
    } else {
        addLog('请输入合约地址', 'error');
    }
});

launchBtn.addEventListener('click', launchToken);
addWhitelistBtn.addEventListener('click', addToWhitelist);
removeWhitelistBtn.addEventListener('click', removeFromWhitelist);
renounceBtn.addEventListener('click', renounceOwnership);

// 合约地址输入框回车事件
contractAddressInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadContractBtn.click();
    }
});

// 自动检测URL变化
window.addEventListener('hashchange', () => {
    const urlContractAddress = getContractAddressFromURL();
    if (urlContractAddress && urlContractAddress !== contractAddress) {
        contractAddressInput.value = urlContractAddress;
        loadContract(urlContractAddress);
    }
});
