# Vue MathJax Beautiful

🚀 精简、高效的 Vue 3 数学公式编辑器组件库

## 特性

- 🧮 **专业公式编辑** - 基于 MathJax 引擎，支持完整的 LaTeX 语法
- 🎨 **丰富符号面板** - 240+ 数学符号和 38 个常用公式模板
- 👀 **实时预览** - 所见即所得的公式编辑体验
- 🌍 **国际化支持** - 内置中文和英文界面
- 🚀 **Vue 3 + TypeScript** - 现代化的技术栈
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔧 **易于集成** - 简单的 API 设计，轻松集成到现有项目
- ⚡ **工具函数** - 丰富的 LaTeX 处理工具函数
- 🎨 **主题系统** - 支持亮色/暗色/自动主题，可自定义主题
- 📱 **移动端优化** - 虚拟键盘适配、触摸优化、安全区域支持
- ⚡ **性能优化** - 虚拟列表、LRU 缓存、懒加载、内存泄漏防护

## 安装

```bash
npm install vue-mathjax-beautiful
```

或使用 yarn：

```bash
yarn add vue-mathjax-beautiful
```

或使用 pnpm：

```bash
pnpm add vue-mathjax-beautiful
```

## 快速开始

### 基本使用

```vue
<template>
  <div>
    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showDialog"
      :existing-latex="formula"
      title="数学公式编辑器"
      @insert="handleInsert"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  VueMathjaxBeautiful,
  initMathJax 
} from 'vue-mathjax-beautiful'

const showDialog = ref(false)
const formula = ref('E = mc^2')

// 初始化 MathJax
onMounted(async () => {
  await initMathJax()
})

const handleInsert = (latex: string) => {
  formula.value = latex
  showDialog.value = false
}

const handleCancel = () => {
  showDialog.value = false
}
</script>
```

### 全局注册

```typescript
import { createApp } from 'vue'
import VueMathjaxBeautiful from 'vue-mathjax-beautiful'
import App from './App.vue'

const app = createApp(App)
app.use(VueMathjaxBeautiful)
app.mount('#app')
```

## API 文档

### VueMathjaxBeautiful (公式编辑器)

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `v-model` | `boolean` | `false` | 控制弹窗显示状态 |
| `title` | `string` | `"公式编辑器"` | 弹窗标题文字 |
| `subtitle` | `string` | `""` | 弹窗副标题文字 |
| `placeholder` | `string` | `""` | 输入框占位符文本 |
| `inline-mode` | `boolean` | `false` | 是否启用内联模式 |
| `existing-latex` | `string` | `""` | 预设的LaTeX代码 |
| `show-theme-toggle` | `boolean` | `true` | 是否显示主题切换按钮 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@insert` | `(latex: string)` | 公式插入时触发 |
| `@cancel` | `()` | 取消操作时触发 |

## 工具函数 API

Vue MathJax Beautiful 提供了丰富的 LaTeX 处理工具函数，您可以在项目中直接使用：

### 核心转换函数

```typescript
import { 
  initMathJax,
  convertLatexToSvg,
  batchConvertLatex,
  extractLatexFromSvg 
} from 'vue-mathjax-beautiful'

// 初始化 MathJax 引擎
await initMathJax()

// 将 LaTeX 转换为 SVG
const svgContent = await convertLatexToSvg('$E = mc^2$')

// 批量转换
const contents = [{ content: '$x^2$' }, { content: '$y^3$' }]
const converted = await batchConvertLatex(contents)

// 从 SVG 提取 LaTeX
const latex = extractLatexFromSvg('<svg data-latex="E=mc^2">...</svg>')
```

### 匹配和检测函数

```typescript
import { 
  matchLatex,
  hasLatexFormula,
  type MatchLatexResult 
} from 'vue-mathjax-beautiful'

const text = '这是一个公式: $E=mc^2$ 和另一个: $$\\int_0^1 x dx$$'

// 检测是否包含公式
if (hasLatexFormula(text)) {
  // 获取所有公式匹配信息
  const matches: MatchLatexResult[] = matchLatex(text)
  
  matches.forEach(match => {
    console.log('公式内容:', match.content)
    console.log('类型:', match.isInline ? '行内' : '独立')
    console.log('位置:', match.start, '-', match.end)
  })
}
```

### DOM 操作函数

```typescript
import { clearMathTags } from 'vue-mathjax-beautiful'

// 清理 DOM 元素中的特定数学标签
const element = document.getElementById('content')
clearMathTags(element, 'mjx-container')
```

### MathJax 懒加载

```typescript
import { 
  lazyLoadMathJax, 
  isMathJaxReady, 
  preloadMathJax 
} from 'vue-mathjax-beautiful'

// 按需加载 MathJax
await lazyLoadMathJax()

// 检查是否已加载
if (isMathJaxReady()) {
  console.log('MathJax 已就绪')
}

// 预加载（在用户可能使用时提前加载）
preloadMathJax()
```

### 缓存系统

```typescript
import { 
  LRUCache, 
  FormulaCache, 
  globalFormulaCache 
} from 'vue-mathjax-beautiful'

// 使用 LRU 缓存
const cache = new LRUCache<string, string>({ maxSize: 100, ttl: 60000 })
cache.set('key', 'value')
const value = cache.get('key')

// 使用公式缓存
const formulaCache = new FormulaCache({ maxSize: 50 })
formulaCache.set('E=mc^2', svgElement)

// 使用全局公式缓存
const cached = globalFormulaCache.get('some-formula')
```

### 日志控制

```typescript
import { logger } from 'vue-mathjax-beautiful'

// 设置日志级别
logger.setLevel('debug')  // 'debug' | 'info' | 'warn' | 'error'

// 使用日志
logger.debug('调试信息')
logger.info('普通信息')
logger.warn('警告信息')
logger.error('错误信息')
```

## 类型定义

```typescript
// 导入类型定义
import type {
  MatchLatexResult,
  Symbol,
  Category,
  Locale,
  Messages,
  Theme,
  ThemeColors,
  ThemeConfig,
  Breakpoint,
  MobileOptimizationConfig,
  VirtualListOptions,
  VirtualListItem
} from 'vue-mathjax-beautiful'

// LaTeX 匹配结果
interface MatchLatexResult {
  formula: string      // 原始公式文本
  content: string      // 公式内容
  start: number        // 起始位置
  end: number          // 结束位置
  wrapper: string      // 处理后的公式
  isInline: boolean    // 是否为行内公式
}

// 数学符号
interface Symbol {
  latex: string
  symbol: string
  description: LocalizedText
}

// 符号分类
interface Category {
  name: string
  title: LocalizedText
  symbols: Symbol[]
}
```

## 主题系统

### 使用主题

```typescript
import { useTheme, presetThemes } from 'vue-mathjax-beautiful'

// 使用自动主题（跟随系统）
const { theme, actualTheme, cssVariables, toggleTheme } = useTheme('auto')

// 使用预设主题
const { themeConfig } = useTheme('light', presetThemes.purple)

// 创建自定义主题
import { createTheme } from 'vue-mathjax-beautiful'
const myTheme = createTheme('myTheme',
  { primary: '#ff0000', accent: '#00ff00' },  // light
  { primary: '#ff4444', accent: '#44ff44' }   // dark
)
```

### 主题类型

- `light` - 亮色主题
- `dark` - 暗色主题
- `auto` - 自动（跟随系统偏好）

## 移动端优化

### 移动端检测

```typescript
import { useMobile, useMobileOptimization, useSafeArea } from 'vue-mathjax-beautiful'

// 基础检测
const { isMobile, isTablet, isTouch, screenSize } = useMobile()

// 完整移动端优化
const { 
  isOptimizationEnabled,
  virtualKeyboardHeight,
  responsiveStyles,
  touchHandlers 
} = useMobileOptimization({
  virtualKeyboard: { adjustHeight: true },
  touch: { swipeEnabled: true },
  performance: { reduceAnimations: true },
  ui: { compactMode: true, bottomSheet: true }
})

// 安全区域适配（刘海屏）
const { safeAreaInsets, cssSafeArea } = useSafeArea()
```

## 国际化

组件内置中英文支持，您也可以自定义语言：

```typescript
import { useI18n } from 'vue-mathjax-beautiful'

const { t, setLocale } = useI18n()

// 切换语言
setLocale('en-US') // 或 'zh-CN'

// 使用翻译
console.log(t('common.save'))
```

## 浏览器兼容性

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新详情。 