# Vue MathJax Beautiful

一个基于 Vue 3 和 MathJax 的强大数学公式编辑器组件库，支持富文本编辑和 LaTeX 语法。

## ✨ 特性

- 🚀 **Vue 3 + TypeScript** - 现代化的技术栈
- 📝 **富文本编辑** - 支持粗体、斜体、下划线等文本格式
- 🧮 **数学公式** - 基于 MathJax 引擎，支持完整的 LaTeX 语法
- 👀 **实时预览** - 所见即所得的编辑体验
- 🎨 **符号面板** - 丰富的数学符号和公式模板
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔧 **易于集成** - 简单的 API 设计，轻松集成到现有项目

## 📦 安装

```bash
npm install vue-mathjax-beautiful
```

或者使用 yarn：

```bash
yarn add vue-mathjax-beautiful
```

## 🚀 快速开始

### 基本使用

```vue
<template>
  <div>
    <!-- 富文本编辑器 -->
    <VueMathjaxEditor 
      v-model="content"
      placeholder="开始编写您的内容..."
    />
    
    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showDialog"
      :existing-latex="formula"
      @insert="handleInsert"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueMathjaxEditor, VueMathjaxBeautiful } from 'vue-mathjax-beautiful'

const content = ref('')
const showDialog = ref(false)
const formula = ref('E = mc^2')

const handleInsert = (latex) => {
  formula.value = latex
  console.log('插入公式:', latex)
}
</script>
```

### 完整示例

```vue
<template>
  <div class="editor-container">
    <VueMathjaxEditor
      v-model="content"
      :min-height="'400px'"
      :readonly="false"
      placeholder="请输入内容，支持数学公式..."
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <button @click="showFormulaEditor">
      打开公式编辑器
    </button>
    
    <VueMathjaxBeautiful
      v-model="showDialog"
      :existing-latex="currentFormula"
      @insert="insertFormula"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueMathjaxEditor, VueMathjaxBeautiful } from 'vue-mathjax-beautiful'

const content = ref(`
**欢迎使用 Vue MathJax Editor！**

这里是一些数学公式示例：

行内公式：质能方程 $E = mc^2$ 很有名。

独立公式：
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$
`)

const showDialog = ref(false)
const currentFormula = ref('')

const handleChange = (value) => {
  console.log('内容变化:', value)
}

const handleFocus = () => {
  console.log('编辑器获得焦点')
}

const handleBlur = () => {
  console.log('编辑器失去焦点')
}

const showFormulaEditor = () => {
  showDialog.value = true
}

const insertFormula = (latex) => {
  currentFormula.value = latex
  console.log('插入公式:', latex)
}
</script>
```

## 📚 API 文档

### VueMathjaxEditor 组件

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `v-model` | `string` | `''` | 绑定的内容值 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `min-height` | `string` | `'200px'` | 编辑器最小高度 |
| `readonly` | `boolean` | `false` | 是否为只读模式 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `(value: string)` | 内容变化时触发 |
| `focus` | - | 编辑器获得焦点时触发 |
| `blur` | - | 编辑器失去焦点时触发 |

### VueMathjaxBeautiful 组件

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `v-model` | `boolean` | `false` | 控制弹窗显示/隐藏 |
| `existing-latex` | `string` | `''` | 已有的 LaTeX 公式代码 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `insert` | `(latex: string)` | 插入公式时触发 |

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + B` | 粗体 |
| `Ctrl + I` | 斜体 |
| `Ctrl + U` | 下划线 |
| `Ctrl + S` | 删除线 |
| `Ctrl + Z` | 撤销 |
| `Ctrl + Y` | 重做 |
| `点击公式` | 编辑公式 |
| `$公式$` | 行内公式 |
| `$$公式$$` | 独立公式 |

## 📖 LaTeX 语法参考

### 基础语法

| 语法 | 效果 | 说明 |
|------|------|------|
| `$E = mc^2$` | $E = mc^2$ | 行内公式 |
| `$$\int_0^1 x^2 dx$$` | $$\int_0^1 x^2 dx$$ | 独立公式 |
| `\frac{a}{b}` | $\frac{a}{b}$ | 分数 |
| `\sqrt{x}` | $\sqrt{x}$ | 根号 |
| `x^2` | $x^2$ | 上标 |
| `x_i` | $x_i$ | 下标 |

### 高级语法

| 语法 | 效果 | 说明 |
|------|------|------|
| `\sum_{i=1}^n` | $\sum_{i=1}^n$ | 求和 |
| `\int_{a}^{b}` | $\int_{a}^{b}$ | 积分 |
| `\lim_{x \to 0}` | $\lim_{x \to 0}$ | 极限 |
| `\alpha \beta \gamma` | $\alpha \beta \gamma$ | 希腊字母 |
| `\sin \cos \tan` | $\sin \cos \tan$ | 三角函数 |
| `\infty \pm \neq` | $\infty \pm \neq$ | 特殊符号 |

### 矩阵

```latex
\begin{matrix}
a & b \\
c & d
\end{matrix}
```

```latex
\begin{pmatrix}
1 & 2 \\
3 & 4
\end{pmatrix}
```

## 🎯 使用场景

- 📚 **教育平台** - 在线数学课程、习题编辑
- 📝 **学术写作** - 论文、报告中的数学公式
- 💻 **技术文档** - API 文档、技术规范
- 🧮 **科学计算** - 数据分析、算法说明
- 📖 **知识管理** - 笔记应用、知识库

## 🔧 高级配置

### 自定义样式

```vue
<template>
  <VueMathjaxEditor
    v-model="content"
    class="custom-editor"
    :min-height="'500px'"
  />
</template>

<style>
.custom-editor {
  border: 2px solid #3b82f6;
  border-radius: 8px;
}

.custom-editor .editor-content {
  font-family: 'Times New Roman', serif;
  font-size: 16px;
  line-height: 1.6;
}
</style>
```

### 事件处理

```vue
<script setup>
import { ref, watch } from 'vue'

const content = ref('')

// 监听内容变化
watch(content, (newValue, oldValue) => {
  console.log('内容从', oldValue, '变为', newValue)
  
  // 自动保存
  localStorage.setItem('editor-content', newValue)
})

// 加载保存的内容
const loadSavedContent = () => {
  const saved = localStorage.getItem('editor-content')
  if (saved) {
    content.value = saved
  }
}

onMounted(() => {
  loadSavedContent()
})
</script>
```

## ❓ 常见问题

### Q: 如何插入复杂的数学公式？

A: 有两种方式：
1. 点击编辑器工具栏的"fx"按钮打开公式编辑器
2. 直接在编辑器中使用 LaTeX 语法，如 `$\frac{-b \pm \sqrt{b^2-4ac}}{2a}$`

### Q: 支持哪些 LaTeX 语法？

A: 支持完整的 MathJax LaTeX 语法，包括但不限于：
- 基础运算：加减乘除、分数、根号
- 高级函数：积分、求和、极限
- 符号：希腊字母、特殊符号
- 结构：矩阵、方程组、多行公式

### Q: 如何自定义编辑器样式？

A: 可以通过以下方式自定义：
1. 使用 CSS 类名覆盖默认样式
2. 通过 `min-height` 等 props 调整基本属性
3. 自定义主题色彩和字体

### Q: 是否支持移动端？

A: 完全支持！组件采用响应式设计，在手机、平板等设备上都有良好的使用体验。

### Q: 如何处理大量数学公式的性能问题？

A: 组件内部已经做了优化：
1. 公式渲染采用异步处理
2. 支持公式缓存机制
3. 按需加载 MathJax 资源

## 🛠️ 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/vue-mathjax-editor.git

# 安装依赖
cd vue-mathjax-editor
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build
```

### 项目结构

```
vue-mathjax-editor/
├── packages/
│   └── core/                 # 核心组件包
│       ├── src/
│       │   ├── components/   # Vue 组件
│       │   ├── utils/        # 工具函数
│       │   ├── styles/       # 样式文件
│       │   └── types/        # TypeScript 类型
│       └── package.json
├── examples/
│   └── playground/           # 示例应用
└── README.md
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [MathJax](https://www.mathjax.org/) - 强大的数学公式渲染引擎
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

## 📮 联系我们

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/vue-mathjax-editor/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/vue-mathjax-editor/discussions)

---

如果这个项目对您有帮助，请给我们一个 ⭐️！