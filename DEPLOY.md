# Vue MathJax Beautiful - GitHub Pages 部署指南

本文档详细说明如何将示例项目部署到 GitHub Pages，为用户提供在线演示体验。

## 🌐 在线访问

部署完成后，您的示例将可以通过以下链接访问：
**https://你的用户名.github.io/vue-mathjax-beautiful/**

## 🚀 部署方式

我们提供了三种部署方式，您可以根据需要选择：

### 方式1：自动部署（推荐）

使用 GitHub Actions 自动部署，当代码推送到主分支时自动触发。

#### 1.1 启用 GitHub Pages

1. 进入您的 GitHub 仓库
2. 点击 `Settings` 标签
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 下选择 `GitHub Actions`

#### 1.2 配置自动部署

自动部署已经配置完成！当您推送代码到 `main` 或 `master` 分支时，会自动触发部署：

```bash
# 提交并推送代码
git add .
git commit -m "Update demo"
git push origin main
```

部署过程会自动：
- 安装依赖
- 构建核心包
- 构建示例项目
- 部署到 GitHub Pages

#### 1.3 手动触发部署

您也可以在 GitHub 仓库的 `Actions` 标签页手动触发部署：

1. 进入 `Actions` 标签
2. 选择 `Deploy Demo to GitHub Pages` 工作流
3. 点击 `Run workflow`
4. 选择分支并点击 `Run workflow`

### 方式2：使用部署脚本

我们提供了一个自动化脚本来简化部署过程：

```bash
# 在项目根目录运行
bash scripts/deploy-demo.sh
```

脚本会自动完成：
- ✅ 检查 Git 状态和分支
- ✅ 安装项目依赖
- ✅ 构建核心包
- ✅ 构建示例项目
- ✅ 部署到 GitHub Pages
- ✅ 清理构建产物

### 方式3：手动部署

如果您喜欢手动控制每个步骤：

#### 3.1 安装依赖

```bash
# 在项目根目录
pnpm install

# 安装示例项目的额外依赖
cd examples/playground
npm install cross-env gh-pages
cd ../..
```

#### 3.2 构建项目

```bash
# 构建核心包
cd packages/core
npm run build
cd ../..

# 构建示例项目
cd examples/playground
npm run build:gh-pages
cd ../..
```

#### 3.3 部署到 GitHub Pages

```bash
cd examples/playground
npm run deploy
cd ../..
```

## ⚙️ 配置说明

### 项目配置

示例项目已经配置了以下设置以支持 GitHub Pages：

#### Vite 配置 (`examples/playground/vite.config.ts`)

```typescript
export default defineConfig({
  // GitHub Pages部署配置
  base: process.env.VITE_BASE_URL || '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          mathjax: ['mathjax']
        }
      }
    }
  }
})
```

#### 路由配置 (`examples/playground/src/router/index.ts`)

```typescript
// 获取base路径，用于GitHub Pages部署
const base = import.meta.env.VITE_BASE_URL || '/'

const router = createRouter({
  history: createWebHistory(base),
  // ... routes
})
```

### 环境变量

- `VITE_BASE_URL`: 设置应用的基础路径
  - 本地开发: `/`
  - GitHub Pages: `/vue-mathjax-beautiful/`

### 构建脚本

```json
{
  "scripts": {
    "build": "vue-tsc && vite build",
    "build:gh-pages": "cross-env VITE_BASE_URL=/vue-mathjax-beautiful/ npm run build",
    "deploy": "npm run build:gh-pages && gh-pages -d dist"
  }
}
```

## 🔧 GitHub Actions 工作流

自动部署使用以下工作流 (`.github/workflows/deploy-demo.yml`)：

### 触发条件

- 推送到 `main` 或 `master` 分支
- 示例项目文件变更
- 手动触发

### 部署步骤

1. **环境准备**
   - 检出代码
   - 设置 Node.js 18
   - 配置 pnpm 缓存

2. **构建**
   - 安装项目依赖
   - 构建核心包
   - 构建示例项目

3. **部署**
   - 配置 GitHub Pages
   - 上传构建产物
   - 部署到 Pages

### 权限配置

工作流需要以下权限：
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## 📁 目录结构

部署后的目录结构：

```
github-pages/
├── assets/           # 静态资源
│   ├── vendor.*.js   # Vue, Vue Router
│   ├── mathjax.*.js  # MathJax
│   └── *.css         # 样式文件
├── index.html        # 入口文件
└── *                 # 其他构建产物
```

## 🐛 常见问题

### 1. 页面空白或404错误

**原因**: 基础路径配置不正确

**解决方案**:
```bash
# 检查环境变量
echo $VITE_BASE_URL

# 重新构建
cd examples/playground
npm run build:gh-pages
```

### 2. 路由不工作

**原因**: Vue Router 基础路径未设置

**解决方案**: 确保路由配置正确：
```typescript
const base = import.meta.env.VITE_BASE_URL || '/'
const router = createRouter({
  history: createWebHistory(base),
  // ...
})
```

### 3. 资源加载失败

**原因**: 静态资源路径不正确

**解决方案**: 检查 `vite.config.ts` 中的 `base` 配置：
```typescript
base: process.env.VITE_BASE_URL || '/',
```

### 4. GitHub Actions 部署失败

**常见原因及解决方案**:

- **权限不足**: 确保仓库设置中启用了 GitHub Pages
- **依赖安装失败**: 检查 `pnpm-lock.yaml` 是否最新
- **构建失败**: 检查代码是否有 TypeScript 错误

### 5. 部署后更新不生效

**解决方案**:
1. 清除浏览器缓存
2. 检查 GitHub Actions 是否成功运行
3. 确认 GitHub Pages 设置正确

## 📊 部署监控

### GitHub Actions 状态

在仓库主页可以看到部署状态徽章：
- ✅ 绿色：部署成功
- ❌ 红色：部署失败
- 🟡 黄色：部署中

### 访问统计

可以通过以下方式监控访问情况：
1. GitHub Insights
2. Google Analytics（如果配置）
3. 第三方统计工具

## 🔄 更新部署

### 自动更新

当您推送新代码到主分支时，GitHub Pages 会自动更新：

```bash
git add .
git commit -m "Update demo with new features"
git push origin main
```

### 手动更新

```bash
# 使用部署脚本
bash scripts/deploy-demo.sh

# 或手动部署
cd examples/playground
npm run deploy
```

## 🌟 最佳实践

### 1. 代码质量

- 确保代码在本地正常运行
- 检查 TypeScript 类型错误
- 测试所有路由和功能

### 2. 构建优化

- 启用代码分割
- 优化静态资源
- 压缩图片和字体

### 3. 用户体验

- 添加加载状态
- 处理网络错误
- 优化移动端体验

### 4. SEO 优化

- 设置正确的页面标题
- 添加 meta 描述
- 配置 Open Graph 标签

## 📚 相关链接

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Vue Router 部署](https://router.vuejs.org/guide/essentials/history-mode.html)

## 🆘 获取帮助

如果在部署过程中遇到问题：

1. 检查 GitHub Actions 日志
2. 查看本文档的常见问题部分
3. 在项目仓库提交 Issue
4. 参考相关文档链接

---

祝您部署顺利！🎉 