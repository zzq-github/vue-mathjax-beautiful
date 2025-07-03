# Vue MathJax Beautiful - 打包发布指南

本文档详细说明了如何构建、打包和发布 `vue-mathjax-beautiful` 到 npm 的完整流程。

## 📋 发布前检查清单

### 1. 环境准备

确保您的开发环境满足以下要求：

- [x] Node.js >= 16.0.0
- [x] npm >= 8.0.0 或 pnpm >= 7.0.0
- [x] Git 已配置
- [x] npm 账户已注册并登录

### 2. 验证环境

```bash
# 检查Node.js版本
node --version

# 检查npm版本  
npm --version

# 检查npm登录状态
npm whoami

# 如果未登录，请先登录
npm login
```

## 🏗️ 项目结构说明

```
vue-mathjax-beautiful/
├── packages/
│   └── core/                 # 核心包目录
│       ├── src/              # 源代码
│       ├── dist/             # 构建产物（自动生成）
│       ├── package.json      # 包配置文件
│       ├── vite.config.ts    # 构建配置
│       └── README.md         # 包文档
├── examples/                 # 示例项目
├── LICENSE                   # 许可证文件
└── README.md                 # 项目文档
```

## 🔧 构建流程

### 1. 安装依赖

```bash
# 在项目根目录
pnpm install

# 或者在核心包目录
cd packages/core
npm install
```

### 2. 代码质量检查

```bash
# 在项目根目录运行
npm run lint        # 代码格式检查
npm run type-check  # 类型检查
```

### 3. 构建包

```bash
# 切换到核心包目录
cd packages/core

# 清理之前的构建产物
rm -rf dist/

# 执行构建
npm run build
```

构建完成后会生成以下文件：

- `dist/vue-mathjax-beautiful.js` - ES模块版本 (~90KB)
- `dist/vue-mathjax-beautiful.umd` - UMD版本 (~71KB)
- `dist/style.css` - 样式文件 (~47KB)
- `dist/index.d.ts` - TypeScript类型定义 (~20KB)

### 4. 验证构建产物

```bash
# 检查dist目录内容
ls -la dist/

# 验证包结构
npm pack --dry-run
```

预期输出：
```
📦  vue-mathjax-beautiful@1.0.0
=== Tarball Contents ===
10.0kB README.md
20.3kB dist/index.d.ts
48.2kB dist/style.css
92.0kB dist/vue-mathjax-beautiful.js
72.4kB dist/vue-mathjax-beautiful.umd
1.6kB  package.json
```

## 📦 版本管理

### 1. 版本号规范

遵循 [语义化版本控制](https://semver.org/lang/zh-CN/) 规范：

- **MAJOR.MINOR.PATCH** (例如: 1.0.0)
- **MAJOR**: 不兼容的API修改
- **MINOR**: 向下兼容的功能性新增
- **PATCH**: 向下兼容的问题修正

### 2. 更新版本

```bash
# 在 packages/core 目录中

# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)  
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major

# 预发布版本 (1.0.0 -> 1.0.1-beta.0)
npm version prerelease --preid=beta
```

### 3. 标签和提交

版本更新会自动：
- 更新 `package.json` 中的版本号
- 创建一个 git 提交
- 创建一个 git 标签

## 🚀 发布流程

### 1. 预发布检查

```bash
# 在 packages/core 目录中

# 最终构建检查
npm run build

# 运行测试（如果有）
npm test

# 检查包内容
npm pack --dry-run

# 检查包大小
npm pack
ls -la *.tgz
```

### 2. 发布到 npm

```bash
# 正式发布
npm publish

# 如果是 scoped 包（@username/package-name）
npm publish --access public

# 发布测试版本
npm publish --tag beta
```

### 3. 发布后验证

```bash
# 检查包是否发布成功
npm view vue-mathjax-beautiful

# 在新目录中测试安装
mkdir test-install && cd test-install
npm init -y
npm install vue-mathjax-beautiful
```

## 🔍 质量保证

### 1. 包大小优化

监控包大小，确保合理：

```bash
# 分析包大小
npm pack
tar -tzf vue-mathjax-beautiful-*.tgz

# 检查依赖大小
npm ls --depth=0
```

当前包大小参考：
- 压缩包: ~53KB
- 解压后: ~245KB

### 2. 依赖检查

```bash
# 检查依赖漏洞
npm audit

# 修复可修复的漏洞
npm audit fix

# 检查过时的依赖
npm outdated
```

### 3. 兼容性测试

确保包在不同环境中正常工作：

```bash
# 测试ES模块导入
node -e "import('./dist/vue-mathjax-beautiful.js').then(console.log)"

# 测试CommonJS导入
node -e "console.log(require('./dist/vue-mathjax-beautiful.umd'))"
```

## 📚 文档更新

### 1. 更新 README

在发布前确保以下文档是最新的：

- [ ] 安装说明
- [ ] 使用示例
- [ ] API 文档
- [ ] 更新日志

### 2. 生成更新日志

```bash
# 手动维护 CHANGELOG.md
# 或使用工具生成
npx conventional-changelog -p angular -i CHANGELOG.md -s
```

## ⚠️ 常见问题解决

### 1. 构建失败

```bash
# 清理缓存和重新安装
rm -rf node_modules package-lock.json
npm install

# 清理构建缓存
rm -rf dist/
npm run build
```

### 2. 类型定义问题

如果 TypeScript 类型定义有问题：

```bash
# 检查 tsconfig.json 配置
npx tsc --noEmit

# 重新生成类型定义
rm -rf dist/
npm run build
```

### 3. 发布权限问题

```bash
# 确认登录状态
npm whoami

# 重新登录
npm logout
npm login

# 检查包名是否已被占用
npm view vue-mathjax-beautiful
```

### 4. 网络问题

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com/

# 发布时使用官方镜像
npm publish --registry https://registry.npmjs.org/
```

## 🔄 自动化发布

### 1. GitHub Actions 配置

创建 `.github/workflows/publish.yml`：

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build package
        run: |
          cd packages/core
          npm run build
      
      - name: Publish to NPM
        run: |
          cd packages/core
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 2. 发布脚本

创建 `scripts/publish.sh`：

```bash
#!/bin/bash

set -e

echo "🚀 开始发布流程..."

# 切换到核心包目录
cd packages/core

# 构建检查
echo "📦 构建包..."
npm run build

# 运行测试
echo "🧪 运行测试..."
npm test

# 检查包内容
echo "🔍 检查包内容..."
npm pack --dry-run

# 发布确认
read -p "确认发布到 npm? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 发布中..."
    npm publish
    echo "✅ 发布成功!"
else
    echo "❌ 发布已取消"
    exit 1
fi
```

## 📋 发布检查清单

发布前请确保完成以下检查：

### 代码质量
- [ ] 所有代码已提交到 Git
- [ ] 代码格式检查通过
- [ ] TypeScript 类型检查无错误
- [ ] 测试全部通过

### 版本管理
- [ ] 版本号已正确更新
- [ ] CHANGELOG.md 已更新
- [ ] Git 标签已创建

### 构建产物
- [ ] 构建无错误警告
- [ ] 所有必要文件都包含在 dist/ 中
- [ ] 包大小在合理范围内
- [ ] 类型定义文件正确生成

### 文档
- [ ] README.md 内容最新
- [ ] API 文档完整
- [ ] 示例代码可运行
- [ ] 样式导入说明已添加

### 发布准备
- [ ] npm 账户已登录
- [ ] 包名可用或有权限
- [ ] 网络连接正常

## 🎯 发布后步骤

### 1. 验证发布

```bash
# 检查 npm 上的包信息
npm view vue-mathjax-beautiful

# 测试安装
npm install vue-mathjax-beautiful@latest
```

### 2. 更新文档

- 更新官网示例
- 通知社区更新
- 更新相关博客文章

### 3. 监控

- 检查下载统计
- 监控 GitHub Issues
- 关注用户反馈

---

## 📞 支持与反馈

如果在打包发布过程中遇到问题：

1. 检查本文档的常见问题部分
2. 查看 [npm 官方文档](https://docs.npmjs.com/)
3. 在项目 GitHub 仓库提交 Issue

祝您发布顺利！🎉 