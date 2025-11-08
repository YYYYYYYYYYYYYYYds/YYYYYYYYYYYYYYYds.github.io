# 🔐 LPStake 授权管理工具

## 📖 功能说明

这是一个简单的授权管理网页，用于方便地管理 LPStake 合约相关地址的代币授权。

### 管理的授权

1. **LP Vault → USDT** 授权给 LPStake
2. **LP Vault → HDLP** 授权给 LPStake
3. **Community Wallet → USDT** 授权给 LPStake
4. **Exclude From Fee → HD** 授权给 LPStake

---

## 🚀 使用步骤

### 1. 打开网页

双击 `index.html` 或通过本地服务器打开：

```bash
# 方法 1：直接打开
open index.html

# 方法 2：使用 Python 服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000

# 方法 3：使用 Node.js 服务器
npx http-server -p 8000
```

### 2. 连接钱包

点击 **"连接钱包"** 按钮，在 MetaMask 中授权连接。

### 3. 输入合约地址

在输入框中输入 **LPStake 合约地址**，然后点击 **"加载合约信息"**。

### 4. 查看授权状态

网页会自动显示：
- 📍 **关键地址**（LP Vault、Community Wallet 等）
- ✅ **授权状态**（已授权 / 未授权）

### 5. 执行授权

如果显示"未授权"：
1. **切换钱包**到对应的地址（如 LP Vault 地址）
2. 点击 **"立即授权"** 按钮
3. 在 MetaMask 中确认交易
4. 等待交易确认
5. 页面会自动刷新状态

---

## 🎯 使用场景

### 场景 1：LP Vault 授权

**目的**：让 LPStake 合约能从 LP Vault 转出代币进行分红

**操作**：
1. 切换钱包到 **LP Vault 地址**
2. 授权 **USDT** 给 LPStake
3. 授权 **HDLP** 给 LPStake

### 场景 2：Community Wallet 授权

**目的**：让 LPStake 合约能从社区钱包获取 USDT 用于购买子币

**操作**：
1. 切换钱包到 **Community Wallet 地址**
2. 授权 **USDT** 给 LPStake

### 场景 3：Exclude From Fee 授权

**目的**：让 LPStake 合约能使用白名单地址转账 HD（避免扣税）

**操作**：
1. 切换钱包到 **Exclude From Fee 地址**
2. 授权 **HD** 给 LPStake

---

## 🎨 界面说明

### 状态指示器

- ✅ **已授权**（绿色）- 授权额度充足，无需操作
- ❌ **未授权**（红色）- 需要授权
- 🔄 **检查中...**（灰色）- 正在查询状态

### 按钮状态

- **立即授权**（可点击）- 当前钱包是对应地址，可以授权
- **请切换到对应地址**（禁用）- 需要先切换钱包
- **已授权**（禁用）- 无需重复授权

---

## ⚙️ 技术细节

### 授权阈值

授权额度 ≥ 10^24 时视为"已授权"

```javascript
const threshold = 1000000000000000000000000; // 10^24
```

### 授权金额

点击授权时，会授权 **最大值**（2^256 - 1），这样不需要重复授权：

```javascript
const maxAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
```

### 合约调用

```javascript
// 读取合约信息
await lpStakeContract.methods.getAllWalletsAndAllowances().call();

// 执行授权
await tokenContract.methods.approve(lpStakeAddress, maxAmount).send({ from: currentAccount });
```

---

## 📋 检查清单

部署后需要确保以下授权全部完成：

- [ ] LP Vault 授权 USDT
- [ ] LP Vault 授权 HDLP
- [ ] Community Wallet 授权 USDT
- [ ] Exclude From Fee 授权 HD

---

## ⚠️ 注意事项

### 1. 钱包切换

每个授权需要使用**对应的钱包地址**：

| 授权 | 需要的钱包 |
|------|-----------|
| LP Vault → USDT | LP Vault 的私钥 |
| LP Vault → HDLP | LP Vault 的私钥 |
| Community Wallet → USDT | Community Wallet 的私钥 |
| Exclude From Fee → HD | Exclude From Fee 的私钥 |

### 2. 网络选择

确保 MetaMask 连接到正确的网络：
- 测试环境：BSC Testnet
- 生产环境：BSC Mainnet

### 3. Gas 费用

每次授权需要消耗少量 Gas（约 50,000 Gas）

### 4. 安全提示

- ✅ 只授权给**你部署的 LPStake 合约**
- ✅ 确认合约地址正确无误
- ✅ 妥善保管各个钱包的私钥
- ❌ 不要授权给未知合约

---

## 🐛 常见问题

### Q1: 显示"请安装 MetaMask 钱包"
**A**: 安装 MetaMask 浏览器扩展

### Q2: 显示"请先连接钱包"
**A**: 点击"连接钱包"按钮

### Q3: 显示"请输入有效的合约地址"
**A**: 检查输入的地址格式是否正确（0x 开头，42 位字符）

### Q4: 按钮显示"请切换到对应地址"
**A**: 在 MetaMask 中切换到对应的钱包地址

### Q5: 授权失败
**A**: 检查：
- 钱包是否有足够的 BNB 支付 Gas
- 是否在正确的网络
- 合约地址是否正确

---

## 📱 移动端支持

支持在移动端使用（MetaMask 移动App 浏览器）：
1. 打开 MetaMask App
2. 在应用内浏览器打开网页
3. 按照同样步骤操作

---

## 🔧 开发说明

### 文件结构

```
便于操作授权的网页/
├── index.html      # 主页面
├── style.css       # 样式文件
├── web3.min.js     # Web3 库
└── README.md       # 本文档
```

### 技术栈

- **Web3.js** - 与区块链交互
- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **Vanilla JavaScript** - 无框架依赖

### 自定义修改

如需修改样式，编辑 `style.css`：

```css
/* 修改主题色 */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 修改按钮颜色 */
.button-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## 📞 技术支持

如有问题，请检查：
1. 浏览器控制台（F12）查看错误信息
2. MetaMask 是否正确连接
3. 网络是否正确
4. 合约地址是否正确

---

**最后更新**: 2025-11-05  
**版本**: v1.0.0  
**兼容**: MetaMask, WalletConnect  
**浏览器**: Chrome, Firefox, Safari, Edge

