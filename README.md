# Vue MathJax Beautiful

🚀 精简、高效的 Vue 3 数学公式编辑器组件库

![Vue Math Editor Preview](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![MathJax](https://img.shields.io/badge/MathJax-3.x-orange?style=flat-square)

## 🎯 核心组件

### 📝 VueMathjaxEditor - 富文本编辑器
- ✍️ **文本格式** - 粗体、斜体、下划线、删除线
- 📐 **数学公式** - 完整的 LaTeX 公式编辑和渲染
- 🖼️ **图片支持** - 图片上传和粘贴
- ⌨️ **快捷键** - Ctrl+B/I/U 等快捷操作
- 📊 **字符统计** - 实时字符数统计

### 🎯 VueMathjaxBeautiful - 公式编辑器弹窗
- 📝 **LaTeX 编辑** - 专业的数学公式输入
- 👁️ **实时预览** - 即时渲染预览效果
- 🎨 **符号面板** - 基础、希腊字母、高级符号分类
- ⭐ **常用公式** - 内置数学公式示例
- 📱 **响应式** - 移动端友好设计

## ✨ 技术特性

- ⚡ **Vue 3** - 基于 Composition API 和 TypeScript
- 📦 **轻量级** - 核心功能，无冗余依赖
- 🎭 **主题支持** - 亮色/暗色主题自适应
- 🔧 **易集成** - 简单的 API 设计
- ♿ **无障碍** - 完整的键盘导航支持

## 📦 安装

```bash
# 使用 npm
npm install vue-mathjax-beautiful

# 使用 yarn
yarn add vue-mathjax-beautiful

# 使用 pnpm
pnpm add vue-mathjax-beautiful
```

## 🚀 快速开始

### 1. 富文本编辑器（推荐）

```vue
<template>
  <div>
    <VueMathjaxEditor 
      v-model="content"
      :min-height="'400px'"
      placeholder="开始编写您的内容..."
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueMathjaxEditor } from 'vue-mathjax-beautiful'

const content = ref(`
**欢迎使用数学公式编辑器！**

这里可以插入数学公式：$$E = mc^2$$

行内公式：文本中的 $\\frac{1}{2}$ 分数。
`)

function handleChange(value: string) {
  console.log('内容变化:', value)
}
</script>
```

### 2. 公式编辑器弹窗

```vue
<template>
  <div>
    <button @click="showDialog = true">打开公式编辑器</button>
    
    <VueMathjaxBeautiful
      v-model="showDialog"
      :existing-latex="formula"
      @insert="handleFormulaInsert"
    />
    
    <div v-if="formula">当前公式：{{ formula }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful'

const showDialog = ref(false)
const formula = ref('E = mc^2')

function handleFormulaInsert(latex: string) {
  formula.value = latex
  console.log('插入公式:', latex)
}
</script>
```

### 3. 全局注册

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VueMathjaxBeautiful from 'vue-mathjax-beautiful'

const app = createApp(App)
app.use(VueMathjaxBeautiful)
app.mount('#app')
```

然后在组件中直接使用：

```vue
<template>
  <div>
    <VueMathjaxEditor v-model="content" />
    <VueMathjaxBeautiful v-model="showDialog" />
  </div>
</template>
```

## 📖 组件文档

### VueMathjaxEditor

富文本编辑器组件，支持文本格式和数学公式。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `modelValue` | `string` | `''` | 编辑器内容（v-model） |
| `placeholder` | `string` | `'开始编写您的内容...'` | 占位符文本 |
| `minHeight` | `string` | `'300px'` | 编辑器最小高度 |
| `showToolbar` | `boolean` | `true` | 是否显示工具栏 |
| `readonly` | `boolean` | `false` | 是否只读模式 |

#### Events

| 事件 | 参数 | 描述 |
|------|------|------|
| `update:modelValue` | `(value: string)` | 内容变化时触发 |
| `change` | `(value: string)` | 内容变化时触发 |
| `focus` | `()` | 获得焦点时触发 |
| `blur` | `()` | 失去焦点时触发 |

### VueMathjaxBeautiful

公式编辑器弹窗组件，提供专业的数学公式编辑功能。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `modelValue` | `boolean` | `false` | 弹窗显示状态 |
| `existingLatex` | `string` | `''` | 已有的 LaTeX 内容 |

#### Events

| 事件 | 参数 | 描述 |
|------|------|------|
| `update:modelValue` | `(value: boolean)` | 弹窗状态变化时触发 |
| `insert` | `(latex: string)` | 插入公式时触发 |

## 🎯 支持的 LaTeX 语法

### 基础数学符号

```latex
# 运算符
+ - \times \div \pm \mp

# 关系符
= \neq < > \leq \geq \approx

# 上下标
x^2  x_1  x^{2n}  x_{i,j}

# 分数
\frac{a}{b}  \frac{x+1}{x-1}

# 根号
\sqrt{x}  \sqrt[3]{x}  \sqrt{x^2+y^2}
```

### 希腊字母

```latex
\alpha \beta \gamma \delta \epsilon \zeta \eta \theta
\iota \kappa \lambda \mu \nu \xi \pi \rho \sigma \tau
\upsilon \phi \chi \psi \omega

# 大写希腊字母
\Gamma \Delta \Theta \Lambda \Xi \Pi \Sigma \Phi \Psi \Omega
```

### 高级功能

```latex
# 求和与积分
\sum_{i=1}^{n} x_i
\int_{a}^{b} f(x) dx
\prod_{k=1}^{n} a_k

# 极限
\lim_{x \to \infty} f(x)
\lim_{x \to 0^+} \frac{1}{x}

# 矩阵
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}

# 多行公式
\begin{aligned}
f(x) &= ax^2 + bx + c \\
&= a(x^2 + \frac{b}{a}x) + c \\
&= a(x + \frac{b}{2a})^2 + c - \frac{b^2}{4a}
\end{aligned}
```

## 🔧 开发指南

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/vue-math-editor.git
cd vue-math-editor

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建包
pnpm build

# 运行测试
pnpm test
```

### 项目结构

```
vue-math-editor/
├── packages/core/          # 核心包
│   ├── src/
│   │   ├── components/     # Vue 组件
│   │   ├── utils/          # 工具函数
│   │   ├── types/          # 类型定义
│   │   ├── styles/         # 样式文件
│   │   └── index.ts        # 入口文件
│   └── package.json
├── examples/playground/    # 演示项目
└── README.md
```

## 📚 示例

查看 [examples/playground](./examples/playground) 目录中的完整示例。

运行示例：

```bash
cd examples/playground
pnpm install
pnpm dev
```

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 许可证开源。

---

如果这个项目对您有帮助，请给它一个 ⭐️！