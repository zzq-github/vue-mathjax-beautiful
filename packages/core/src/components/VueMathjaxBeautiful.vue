<template>
  <div v-if="visible" class="vue-mathjax-beautiful-overlay" @click="handleOverlayClick">
    <div class="vue-mathjax-beautiful-dialog" @click.stop>
      <!-- 头部 -->
      <div class="dialog-header">
        <div class="header-content">
          <div class="header-icon">
            <span class="icon">📐</span>
          </div>
          <div class="header-text">
            <h3 class="header-title">数学公式编辑器</h3>
            <p class="header-subtitle">使用下方按钮或直接输入 LaTeX 代码</p>
          </div>
          <div class="header-badge">
            <span>LaTeX</span>
          </div>
        </div>
        <button class="close-btn" @click="handleClose">
          <span>×</span>
        </button>
      </div>

      <!-- 编辑器内容 -->
      <div class="editor-container">
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="section-header">
            <div class="section-title">
              <span class="icon">📝</span>
              <span>LaTeX 输入</span>
            </div>
            <div class="input-actions">
              <button class="action-btn" @click="clearInput" title="清空">
                <span class="icon">🗑️</span>
              </button>
            </div>
          </div>
          <div class="input-wrapper">
            <textarea
              v-model="latexInput"
              class="latex-input"
              placeholder="输入 LaTeX 公式或点击下方符号..."
              @input="updatePreview"
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- 预览区域 -->
        <div class="preview-section">
          <div class="section-header">
            <div class="section-title">
              <span class="icon">👁️</span>
              <span>实时预览</span>
            </div>
            <div class="preview-status" :class="{ active: latexInput }">
              <span v-if="latexInput" class="status-dot"></span>
              {{ latexInput ? '渲染中' : '无公式' }}
            </div>
          </div>
          <div class="preview-container">
            <div v-if="latexInput" class="formula-preview" v-html="renderedFormula"></div>
            <div v-else class="no-formula">
              <span class="icon">💡</span>
              <span>输入 LaTeX 公式以查看预览</span>
            </div>
          </div>
        </div>

        <!-- 符号面板 -->
        <div class="symbols-section">
          <!-- 分类标签 -->
          <div class="category-tabs">
            <button
              v-for="category in categories"
              :key="category.key"
              :class="['tab-button', { active: activeCategory === category.key }]"
              @click="activeCategory = category.key"
            >
              <span class="tab-icon">{{ category.icon }}</span>
              <span class="tab-name">{{ category.name }}</span>
            </button>
          </div>

          <!-- 符号内容 -->
          <div class="symbols-content">
            <!-- 符号网格 -->
            <div class="symbols-grid">
              <button
                v-for="symbol in currentSymbols"
                :key="symbol.latex"
                class="symbol-button"
                @click="insertSymbol(symbol.latex)"
                :title="symbol.description"
              >
                <span v-html="symbol.display"></span>
              </button>
            </div>

            <!-- 常用公式示例 -->
            <div v-if="activeCategory === 'basic'" class="formula-examples">
              <div class="examples-header">
                <span class="icon">⭐</span>
                <span>常用公式</span>
              </div>
              <div class="examples-grid">
                <button
                  v-for="example in formulaExamples"
                  :key="example.latex"
                  class="example-button"
                  @click="insertSymbol(example.latex)"
                  :title="example.description"
                >
                  <div class="example-preview" v-html="example.display"></div>
                  <div class="example-description">{{ example.description }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="dialog-footer">
        <button class="btn btn-secondary" @click="handleClose">
          取消
        </button>
        <button 
          class="btn btn-primary" 
          @click="handleInsert" 
          :disabled="!latexInput"
        >
          插入公式
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { initMathJax } from '../utils/latex'

interface Symbol {
  latex: string
  description: string
  display: string
}

interface Category {
  key: string
  name: string
  icon: string
}

const props = withDefaults(defineProps<{
  modelValue: boolean
  existingLatex?: string
}>(), {
  modelValue: false,
  existingLatex: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'insert': [latex: string]
}>()

// 响应式数据
const visible = ref(false)
const latexInput = ref('')
const activeCategory = ref('basic')
const renderedFormula = ref('')
const symbolDisplayCache = new Map<string, string>()

// 分类定义
const categories: Category[] = [
  { key: 'basic', name: '基础', icon: '📋' },
  { key: 'greek', name: '希腊字母', icon: 'Ω' },
  { key: 'advanced', name: '高级', icon: '🎓' }
]

// 基础符号
const basicSymbols: Symbol[] = [
  { latex: '+', description: '加号', display: '+' },
  { latex: '-', description: '减号', display: '−' },
  { latex: '\\times', description: '乘号', display: '×' },
  { latex: '\\div', description: '除号', display: '÷' },
  { latex: '\\pm', description: '正负号', display: '±' },
  { latex: '\\mp', description: '负正号', display: '∓' },
  { latex: '=', description: '等号', display: '=' },
  { latex: '\\neq', description: '不等号', display: '≠' },
  { latex: '<', description: '小于', display: '<' },
  { latex: '>', description: '大于', display: '>' },
  { latex: '\\leq', description: '小于等于', display: '≤' },
  { latex: '\\geq', description: '大于等于', display: '≥' },
  { latex: '\\approx', description: '约等于', display: '≈' },
  { latex: '\\equiv', description: '恒等于', display: '≡' },
  { latex: '\\propto', description: '正比于', display: '∝' },
  { latex: '\\infty', description: '无穷大', display: '∞' },
  { latex: '\\sqrt{x}', description: '根号', display: '√x' },
  { latex: '\\frac{a}{b}', description: '分数', display: 'a/b' },
  { latex: 'x^{n}', description: '上标', display: 'x^n' },
  { latex: 'x_{n}', description: '下标', display: 'x_n' },
  { latex: '\\sum', description: '求和', display: '∑' },
  { latex: '\\prod', description: '连乘', display: '∏' },
  { latex: '\\int', description: '积分', display: '∫' },
  { latex: '\\oint', description: '环积分', display: '∮' },
  { latex: '\\partial', description: '偏导数', display: '∂' },
  { latex: '\\nabla', description: '梯度', display: '∇' },
  { latex: '\\lim', description: '极限', display: 'lim' },
  { latex: '\\sin', description: '正弦', display: 'sin' },
  { latex: '\\cos', description: '余弦', display: 'cos' },
  { latex: '\\tan', description: '正切', display: 'tan' },
  { latex: '\\log', description: '对数', display: 'log' },
  { latex: '\\ln', description: '自然对数', display: 'ln' }
]

// 希腊字母
const greekSymbols: Symbol[] = [
  { latex: '\\alpha', description: 'Alpha', display: 'α' },
  { latex: '\\beta', description: 'Beta', display: 'β' },
  { latex: '\\gamma', description: 'Gamma', display: 'γ' },
  { latex: '\\delta', description: 'Delta', display: 'δ' },
  { latex: '\\epsilon', description: 'Epsilon', display: 'ε' },
  { latex: '\\zeta', description: 'Zeta', display: 'ζ' },
  { latex: '\\eta', description: 'Eta', display: 'η' },
  { latex: '\\theta', description: 'Theta', display: 'θ' },
  { latex: '\\iota', description: 'Iota', display: 'ι' },
  { latex: '\\kappa', description: 'Kappa', display: 'κ' },
  { latex: '\\lambda', description: 'Lambda', display: 'λ' },
  { latex: '\\mu', description: 'Mu', display: 'μ' },
  { latex: '\\nu', description: 'Nu', display: 'ν' },
  { latex: '\\xi', description: 'Xi', display: 'ξ' },
  { latex: '\\pi', description: 'Pi', display: 'π' },
  { latex: '\\rho', description: 'Rho', display: 'ρ' },
  { latex: '\\sigma', description: 'Sigma', display: 'σ' },
  { latex: '\\tau', description: 'Tau', display: 'τ' },
  { latex: '\\upsilon', description: 'Upsilon', display: 'υ' },
  { latex: '\\phi', description: 'Phi', display: 'φ' },
  { latex: '\\chi', description: 'Chi', display: 'χ' },
  { latex: '\\psi', description: 'Psi', display: 'ψ' },
  { latex: '\\omega', description: 'Omega', display: 'ω' },
  { latex: '\\Gamma', description: 'Gamma (大写)', display: 'Γ' },
  { latex: '\\Delta', description: 'Delta (大写)', display: 'Δ' },
  { latex: '\\Theta', description: 'Theta (大写)', display: 'Θ' },
  { latex: '\\Lambda', description: 'Lambda (大写)', display: 'Λ' },
  { latex: '\\Xi', description: 'Xi (大写)', display: 'Ξ' },
  { latex: '\\Pi', description: 'Pi (大写)', display: 'Π' },
  { latex: '\\Sigma', description: 'Sigma (大写)', display: 'Σ' },
  { latex: '\\Phi', description: 'Phi (大写)', display: 'Φ' },
  { latex: '\\Psi', description: 'Psi (大写)', display: 'Ψ' },
  { latex: '\\Omega', description: 'Omega (大写)', display: 'Ω' }
]

// 高级符号
const advancedSymbols: Symbol[] = [
  { latex: '\\forall', description: '任意', display: '∀' },
  { latex: '\\exists', description: '存在', display: '∃' },
  { latex: '\\in', description: '属于', display: '∈' },
  { latex: '\\notin', description: '不属于', display: '∉' },
  { latex: '\\subset', description: '子集', display: '⊂' },
  { latex: '\\supset', description: '超集', display: '⊃' },
  { latex: '\\subseteq', description: '子集或相等', display: '⊆' },
  { latex: '\\supseteq', description: '超集或相等', display: '⊇' },
  { latex: '\\cup', description: '并集', display: '∪' },
  { latex: '\\cap', description: '交集', display: '∩' },
  { latex: '\\emptyset', description: '空集', display: '∅' },
  { latex: '\\mathbb{N}', description: '自然数集', display: 'ℕ' },
  { latex: '\\mathbb{Z}', description: '整数集', display: 'ℤ' },
  { latex: '\\mathbb{Q}', description: '有理数集', display: 'ℚ' },
  { latex: '\\mathbb{R}', description: '实数集', display: 'ℝ' },
  { latex: '\\mathbb{C}', description: '复数集', display: 'ℂ' },
  { latex: '\\rightarrow', description: '右箭头', display: '→' },
  { latex: '\\leftarrow', description: '左箭头', display: '←' },
  { latex: '\\leftrightarrow', description: '双向箭头', display: '↔' },
  { latex: '\\Rightarrow', description: '右双箭头', display: '⇒' },
  { latex: '\\Leftarrow', description: '左双箭头', display: '⇐' },
  { latex: '\\Leftrightarrow', description: '双向双箭头', display: '⇔' },
  { latex: '\\uparrow', description: '上箭头', display: '↑' },
  { latex: '\\downarrow', description: '下箭头', display: '↓' },
  { latex: '\\cdot', description: '点乘', display: '·' },
  { latex: '\\star', description: '星号', display: '⋆' },
  { latex: '\\circ', description: '圆圈', display: '∘' },
  { latex: '\\diamond', description: '菱形', display: '⋄' },
  { latex: '\\triangle', description: '三角形', display: '△' },
  { latex: '\\square', description: '正方形', display: '□' },
  { latex: '\\angle', description: '角', display: '∠' },
  { latex: '\\parallel', description: '平行', display: '∥' },
  { latex: '\\perp', description: '垂直', display: '⊥' }
]

// 常用公式示例
const formulaExamples: Symbol[] = [
  { latex: '\\frac{a+b}{c+d}', description: '复杂分数', display: '' },
  { latex: '\\sqrt{a^2+b^2}', description: '勾股定理', display: '' },
  { latex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}', description: '二次公式', display: '' },
  { latex: '\\int_{a}^{b} f(x) dx', description: '定积分', display: '' },
  { latex: '\\sum_{i=1}^{n} x_i', description: '求和公式', display: '' },
  { latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1', description: '极限公式', display: '' },
  { latex: 'e^{i\\pi} + 1 = 0', description: '欧拉公式', display: '' },
  { latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', description: '矩阵', display: '' }
]

// 计算属性
const currentSymbols = computed(() => {
  switch (activeCategory.value) {
    case 'greek':
      return greekSymbols
    case 'advanced':
      return advancedSymbols
    default:
      return basicSymbols
  }
})

// 监听器
watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
  if (newVal) {
    latexInput.value = props.existingLatex || ''
    updatePreview()
  }
})

watch(() => props.existingLatex, (newVal) => {
  if (visible.value && newVal) {
    latexInput.value = newVal
    updatePreview()
  }
})

// 方法
const handleOverlayClick = () => {
  handleClose()
}

const handleClose = () => {
  visible.value = false
  emit('update:modelValue', false)
  latexInput.value = ''
  renderedFormula.value = ''
}

const clearInput = () => {
  latexInput.value = ''
  renderedFormula.value = ''
}

const insertSymbol = (symbol: string) => {
  const textarea = document.querySelector('.latex-input') as HTMLTextAreaElement
  if (textarea) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = latexInput.value
    
    latexInput.value = currentValue.substring(0, start) + symbol + currentValue.substring(end)
    
    nextTick(() => {
      textarea.focus()
      textarea.selectionStart = textarea.selectionEnd = start + symbol.length
      updatePreview()
    })
  } else {
    latexInput.value += symbol
    updatePreview()
  }
}

const updatePreview = async () => {
  if (!latexInput.value.trim()) {
    renderedFormula.value = ''
    return
  }
  
  try {
    if (window.MathJax?.tex2svgPromise) {
      const result = await window.MathJax.tex2svgPromise(latexInput.value, {
        display: false,
        scale: 1.2
      })
      
      const svg = result.getElementsByTagName('svg')[0]
      if (svg) {
        svg.style.fontSize = '20px'
        svg.style.verticalAlign = 'middle'
        renderedFormula.value = svg.outerHTML
      }
    }
  } catch (error) {
    console.warn('LaTeX预览失败:', error)
    renderedFormula.value = '<span style="color: red;">预览失败</span>'
  }
}

const handleInsert = () => {
  if (latexInput.value.trim()) {
    emit('insert', latexInput.value.trim())
    handleClose()
  }
}

// 渲染公式示例
const renderFormulaExamples = async () => {
  for (const example of formulaExamples) {
    if (!example.display) {
      try {
        if (window.MathJax?.tex2svgPromise) {
          const result = await window.MathJax.tex2svgPromise(example.latex, {
            display: false,
            scale: 0.8
          })
          
          const svg = result.getElementsByTagName('svg')[0]
          if (svg) {
            svg.style.fontSize = '14px'
            svg.style.maxWidth = '100%'
            example.display = svg.outerHTML
          }
        }
      } catch (error) {
        console.warn('公式示例渲染失败:', error)
        example.display = example.latex
      }
    }
  }
}

// 生命周期
onMounted(async () => {
  await initMathJax()
  await renderFormulaExamples()
})
</script>

<style>
/* 所有样式已移至 packages/core/src/styles/index.scss 中统一管理 */
</style> 