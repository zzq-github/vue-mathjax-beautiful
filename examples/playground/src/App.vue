<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">📐</span>
            <span class="logo-text">Vue MathJax Beautiful</span>
          </div>
          <nav class="nav">
            <a href="#editor" class="nav-link">编辑器</a>
            <a href="#features" class="nav-link">功能特性</a>
            <a href="#examples" class="nav-link">示例</a>
            <a href="#docs" class="nav-link">文档</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="main">
      <!-- 英雄区域 -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Vue 数学公式编辑器</h1>
            <p class="hero-subtitle">
              基于 MathJax 的强大数学公式编辑器组件，支持富文本编辑、LaTeX 语法、实时预览
            </p>
            <div class="hero-badges">
              <span class="badge">Vue 3</span>
              <span class="badge">TypeScript</span>
              <span class="badge">MathJax</span>
              <span class="badge">LaTeX</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 编辑器演示区域 -->
      <section id="editor" class="editor-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">在线演示</h2>
            <p class="section-subtitle">体验强大的数学公式编辑功能</p>
          </div>

          <!-- 富文本编辑器 -->
          <div class="demo-card">
            <div class="demo-header">
              <h3 class="demo-title">
                <span class="demo-icon">✏️</span>
                富文本编辑器
              </h3>
              <div class="demo-actions">
                <button class="btn btn-outline" @click="clearContent">清空内容</button>
                <button class="btn btn-outline" @click="loadSample">加载示例</button>
              </div>
            </div>
            <div class="demo-content">
              <VueMathjaxEditor
                v-model="richTextContent"
                :min-height="'400px'"
                placeholder="开始编写您的内容，支持文本格式和数学公式..."
                @change="handleRichTextChange"
                @focus="handleFocus"
                @blur="handleBlur"
              />
            </div>
            <div class="demo-footer">
              <div class="stats">
                <span class="stat">
                  <span class="stat-label">字符数：</span>
                  <span class="stat-value">{{ richTextContent.length }}</span>
                </span>
                <span class="stat">
                  <span class="stat-label">公式数：</span>
                  <span class="stat-value">{{ formulaCount }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- 公式编辑器 -->
          <div class="demo-card">
            <div class="demo-header">
              <h3 class="demo-title">
                <span class="demo-icon">🧮</span>
                公式编辑器
              </h3>
              <div class="demo-actions">
                <button class="btn btn-primary" @click="showFormulaDialog = true">
                  打开公式编辑器
                </button>
              </div>
            </div>
            <div class="demo-content">
              <div class="formula-display">
                <div class="formula-label">当前公式：</div>
                <div class="formula-preview" v-html="renderedFormula"></div>
                <div class="formula-latex">{{ formula }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能特性 -->
      <section id="features" class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">功能特性</h2>
            <p class="section-subtitle">为数学内容创作提供完整解决方案</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3 class="feature-title">富文本编辑</h3>
              <p class="feature-description">
                支持粗体、斜体、下划线、删除线等基本文本格式，提供完整的富文本编辑体验
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔢</div>
              <h3 class="feature-title">数学公式</h3>
              <p class="feature-description">
                基于 MathJax 引擎，支持完整的 LaTeX 数学语法，渲染高质量的数学公式
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">👁️</div>
              <h3 class="feature-title">实时预览</h3>
              <p class="feature-description">
                输入公式时实时预览渲染效果，所见即所得的编辑体验
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3 class="feature-title">符号面板</h3>
              <p class="feature-description">
                提供丰富的数学符号面板，包括希腊字母、运算符、函数等
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3 class="feature-title">响应式设计</h3>
              <p class="feature-description">
                适配各种屏幕尺寸，在桌面端和移动端都有良好的使用体验
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔧</div>
              <h3 class="feature-title">易于集成</h3>
              <p class="feature-description">
                提供 Vue 3 组件，支持 TypeScript，易于集成到现有项目中
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 示例展示 -->
      <section id="examples" class="examples-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">公式示例</h2>
            <p class="section-subtitle">点击示例快速体验不同类型的数学公式</p>
          </div>
          <div class="examples-grid">
            <div 
              v-for="example in examples" 
              :key="example.name"
              class="example-card"
              @click="loadExample(example.latex)"
            >
              <div class="example-preview" v-html="example.rendered"></div>
              <div class="example-info">
                <h4 class="example-title">{{ example.name }}</h4>
                <p class="example-latex">{{ example.latex }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用文档 -->
      <section id="docs" class="docs-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">使用文档</h2>
            <p class="section-subtitle">快速上手指南</p>
          </div>
          <div class="docs-content">
            <div class="docs-grid">
              <!-- 安装说明 -->
              <div class="doc-card">
                <h3 class="doc-title">
                  <span class="doc-icon">📦</span>
                  安装
                </h3>
                <div class="code-block">
                  <pre><code>npm install vue-mathjax-beautiful</code></pre>
                </div>
              </div>

              <!-- 基本使用 -->
              <div class="doc-card">
                <h3 class="doc-title">
                  <span class="doc-icon">🚀</span>
                  基本使用
                </h3>
                <div class="code-block">
                  <pre><code>&lt;template&gt;
  &lt;VueMathjaxEditor v-model="content" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { VueMathjaxEditor } from 'vue-mathjax-beautiful'
&lt;/script&gt;</code></pre>
                </div>
              </div>

              <!-- 快捷键说明 -->
              <div class="doc-card">
                <h3 class="doc-title">
                  <span class="doc-icon">⌨️</span>
                  快捷键
                </h3>
                <div class="shortcuts">
                  <div class="shortcut">
                    <kbd>Ctrl + B</kbd>
                    <span>粗体</span>
                  </div>
                  <div class="shortcut">
                    <kbd>Ctrl + I</kbd>
                    <span>斜体</span>
                  </div>
                  <div class="shortcut">
                    <kbd>Ctrl + U</kbd>
                    <span>下划线</span>
                  </div>
                  <div class="shortcut">
                    <kbd>点击公式</kbd>
                    <span>编辑公式</span>
                  </div>
                </div>
              </div>

              <!-- LaTeX 语法 -->
              <div class="doc-card">
                <h3 class="doc-title">
                  <span class="doc-icon">📚</span>
                  LaTeX 语法示例
                </h3>
                <div class="latex-examples">
                  <div class="latex-example">
                    <code>$E = mc^2$</code>
                    <span>行内公式</span>
                  </div>
                  <div class="latex-example">
                    <code>$$\int_0^1 x^2 dx$$</code>
                    <span>独立公式</span>
                  </div>
                  <div class="latex-example">
                    <code>\frac{a}{b}</code>
                    <span>分数</span>
                  </div>
                  <div class="latex-example">
                    <code>\sqrt{x}</code>
                    <span>根号</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <div class="footer-logo">
              <span class="logo-icon">📐</span>
              <span class="logo-text">Vue MathJax Editor</span>
            </div>
            <p class="footer-description">
              专业的数学公式编辑器 Vue 组件
            </p>
          </div>
          <div class="footer-links">
            <a href="#" class="footer-link">GitHub</a>
            <a href="#" class="footer-link">文档</a>
            <a href="#" class="footer-link">示例</a>
            <a href="#" class="footer-link">更新日志</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Vue MathJax Editor. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showFormulaDialog"
      :existing-latex="formula"
      @insert="handleFormulaInsert"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VueMathjaxEditor, VueMathjaxBeautiful } from 'vue-mathjax-beautiful'

// 响应式数据
const formula = ref('E = mc^2')
const showFormulaDialog = ref(false)
const richTextContent = ref(`**欢迎使用 Vue MathJax Editor！**

这是一个功能强大的数学公式编辑器，专为 Vue 3 设计。

## 主要特性

- **富文本编辑**：支持 *斜体*、**粗体**、__下划线__、~~删除线~~
- **数学公式**：完整支持 LaTeX 语法
- **实时预览**：所见即所得的编辑体验

## 数学公式示例

行内公式：质能方程 $E = mc^2$ 展示了质量与能量的关系。

独立公式：
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

分数与根式：$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

## 开始使用

点击工具栏中的 **fx 公式** 按钮即可打开公式编辑器，或直接点击现有公式进行编辑。`)

// 计算公式数量
const formulaCount = computed(() => {
  const matches = richTextContent.value.match(/\$\$?[^$]+\$\$?/g)
  return matches ? matches.length : 0
})

// 渲染当前公式
const renderedFormula = computed(() => {
  if (!formula.value) return '<span class="empty-formula">暂无公式</span>'
  return `<span class="math-formula">$${formula.value}$</span>`
})

// 示例公式
const examples = [
  { 
    name: '质能方程', 
    latex: 'E = mc^2',
    rendered: '<span class="math-formula">$E = mc^2$</span>'
  },
  { 
    name: '二次方程', 
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    rendered: '<span class="math-formula">$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$</span>'
  },
  { 
    name: '欧拉恒等式', 
    latex: 'e^{i\\pi} + 1 = 0',
    rendered: '<span class="math-formula">$e^{i\\pi} + 1 = 0$</span>'
  },
  { 
    name: '积分', 
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    rendered: '<span class="math-formula">$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$</span>'
  },
  { 
    name: '无穷级数', 
    latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
    rendered: '<span class="math-formula">$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$</span>'
  },
  { 
    name: '矩阵', 
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    rendered: '<span class="math-formula">$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$</span>'
  },
  { 
    name: '极限', 
    latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0',
    rendered: '<span class="math-formula">$\\lim_{x \\to \\infty} \\frac{1}{x} = 0$</span>'
  },
  { 
    name: '三角函数', 
    latex: '\\sin^2(x) + \\cos^2(x) = 1',
    rendered: '<span class="math-formula">$\\sin^2(x) + \\cos^2(x) = 1$</span>'
  }
]

// 事件处理
function handleRichTextChange(value: string) {
  console.log('富文本内容变化:', value)
}

function handleFormulaInsert(latex: string) {
  formula.value = latex
  console.log('插入公式:', latex)
}

function handleFocus() {
  console.log('编辑器获得焦点')
}

function handleBlur() {
  console.log('编辑器失去焦点')
}

function loadExample(latex: string) {
  formula.value = latex
}

function clearContent() {
  richTextContent.value = ''
}

function loadSample() {
  richTextContent.value = `**数学公式编辑器示例**

这里展示了各种数学公式的使用方法：

## 基础公式

质能方程：$E = mc^2$

勾股定理：$a^2 + b^2 = c^2$

## 复杂公式

二次方程求根：
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

积分：
$$\\int_0^1 x^2 dx = \\frac{1}{3}$$

## 希腊字母

$\\alpha, \\beta, \\gamma, \\delta, \\epsilon$

$\\pi, \\sigma, \\omega, \\Omega$

点击任意公式即可编辑！`
}
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部 */
.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.logo-icon {
  font-size: 24px;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #3b82f6;
}

/* 主要内容 */
.main {
  min-height: calc(100vh - 64px);
}

/* 英雄区域 */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

/* 区域样式 */
.editor-section,
.features-section,
.examples-section,
.docs-section {
  padding: 80px 0;
}

.editor-section {
  background: #f9fafb;
}

.examples-section {
  background: #f9fafb;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1f2937;
}

.section-subtitle {
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* 演示卡片 */
.demo-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.demo-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.demo-icon {
  font-size: 24px;
}

.demo-actions {
  display: flex;
  gap: 12px;
}

.demo-content {
  padding: 24px;
}

.demo-footer {
  padding: 16px 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.stats {
  display: flex;
  gap: 24px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.stat-label {
  color: #6b7280;
}

.stat-value {
  font-weight: 600;
  color: #1f2937;
}

/* 公式显示 */
.formula-display {
  text-align: center;
  padding: 32px;
  background: #f9fafb;
  border-radius: 8px;
}

.formula-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.formula-preview {
  font-size: 24px;
  margin-bottom: 16px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formula-latex {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #6b7280;
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
  display: inline-block;
}

.empty-formula {
  color: #9ca3af;
  font-style: italic;
}

/* 按钮样式 */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.btn-outline:hover {
  background: #3b82f6;
  color: white;
}

/* 功能特性 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

/* 示例展示 */
.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.example-preview {
  text-align: center;
  font-size: 20px;
  margin-bottom: 16px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-info {
  text-align: center;
}

.example-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.example-latex {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  word-break: break-all;
}

/* 文档样式 */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.doc-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.doc-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1f2937;
}

.doc-icon {
  font-size: 24px;
}

.code-block {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.shortcuts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shortcut {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.shortcut:last-child {
  border-bottom: none;
}

kbd {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-family: monospace;
}

.latex-examples {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.latex-example {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.latex-example:last-child {
  border-bottom: none;
}

.latex-example code {
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

/* 页脚 */
.footer {
  background: #1f2937;
  color: white;
  padding: 48px 0 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 32px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.footer-description {
  color: #9ca3af;
  max-width: 300px;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #374151;
  color: #9ca3af;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .nav {
    display: none;
  }
  
  .header-content {
    justify-content: center;
  }
  
  .demo-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
}

/* 强制公式编辑器弹窗样式 */
.vue-mathjax-beautiful-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 99999 !important;
}

.vue-mathjax-beautiful-dialog {
  background: white !important;
  border-radius: 12px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
  max-width: 900px !important;
  width: 90vw !important;
  max-height: 80vh !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}
</style> 