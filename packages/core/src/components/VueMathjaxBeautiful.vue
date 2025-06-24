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
                <span v-if="symbol.display" v-html="symbol.display"></span>
                <span v-else class="symbol-fallback">{{ symbol.latex }}</span>
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
import { 
  type Symbol, 
  type Category, 
  basicSymbols, 
  greekSymbols, 
  advancedSymbols, 
  formulaExamples,
  categories 
} from '../data'

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

// 数据已从 data 目录导入

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
  console.log('开始更新预览，输入内容:', latexInput.value)
  
  if (!latexInput.value.trim()) {
    renderedFormula.value = ''
    return
  }
  
  try {
    // 确保MathJax已经初始化
    if (!window.MathJax?.tex2svgPromise) {
      console.warn('MathJax未初始化，正在尝试初始化...')
      await initMathJax()
    }
    
    // 再次检查MathJax是否可用
    if (!window.MathJax?.tex2svgPromise) {
      console.error('MathJax初始化失败，无法预览公式')
      renderedFormula.value = '<span style="color: red;">MathJax未加载</span>'
      return
    }
    
    console.log('开始渲染LaTeX:', latexInput.value)
    const result = await window.MathJax.tex2svgPromise(latexInput.value, {
      display: false,
      scale: 1.2
    })
    
    console.log('MathJax渲染结果:', result)
    
    const svg = result.getElementsByTagName('svg')[0]
    if (svg) {
      svg.style.fontSize = '20px'
      svg.style.verticalAlign = 'middle'
      renderedFormula.value = svg.outerHTML
      console.log('预览更新成功，SVG HTML:', svg.outerHTML)
    } else {
      console.warn('未获取到SVG元素')
      renderedFormula.value = '<span style="color: red;">渲染失败</span>'
    }
  } catch (error) {
    console.error('LaTeX预览失败:', error)
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    renderedFormula.value = `<span style="color: red;">预览失败: ${errorMessage}</span>`
  }
}

const handleInsert = () => {
  if (latexInput.value.trim()) {
    emit('insert', latexInput.value.trim())
    handleClose()
  }
}

// 渲染符号
const renderSymbols = async (symbols: Symbol[]) => {
  for (const symbol of symbols) {
    if (!symbol.display) {
      try {
        if (window.MathJax?.tex2svgPromise) {
          const result = await window.MathJax.tex2svgPromise(symbol.latex, {
            display: false,
            scale: 1.3,
            em: 16,
            ex: 8,
            containerWidth: 1280
          })
          
          const svg = result.getElementsByTagName('svg')[0]
          if (svg) {
            // 提升SVG渲染质量
            svg.style.fontSize = '18px'
            svg.style.verticalAlign = 'middle'
            svg.style.maxWidth = '32px'
            svg.style.maxHeight = '32px'
            svg.style.width = 'auto'
            svg.style.height = 'auto'
            
            // 设置SVG属性以提高渲染质量
            svg.setAttribute('shape-rendering', 'geometricPrecision')
            svg.setAttribute('text-rendering', 'optimizeLegibility')
            
            symbol.display = svg.outerHTML
          }
        }
      } catch (error) {
        console.warn(`符号 ${symbol.latex} 渲染失败:`, error)
        // 如果渲染失败，使用空字符串，让后备文本显示
        symbol.display = ''
      }
    }
  }
}

// 渲染所有符号
const renderAllSymbols = async () => {
  console.log('开始渲染所有符号...')
  await Promise.all([
    renderSymbols(basicSymbols),
    renderSymbols(greekSymbols),
    renderSymbols(advancedSymbols)
  ])
  console.log('所有符号渲染完成')
}

// 渲染公式示例
const renderFormulaExamples = async () => {
  for (const example of formulaExamples) {
    if (!example.display) {
      try {
        if (window.MathJax?.tex2svgPromise) {
          const result = await window.MathJax.tex2svgPromise(example.latex, {
            display: false,
            scale: 1.0,
            em: 16,
            ex: 8,
            containerWidth: 1280
          })
          
          const svg = result.getElementsByTagName('svg')[0]
          if (svg) {
            svg.style.fontSize = '16px'
            svg.style.maxWidth = '100%'
            svg.style.verticalAlign = 'middle'
            
            // 设置SVG属性以提高渲染质量
            svg.setAttribute('shape-rendering', 'geometricPrecision')
            svg.setAttribute('text-rendering', 'optimizeLegibility')
            
            example.display = svg.outerHTML
          }
        }
      } catch (error) {
        console.warn('公式示例渲染失败:', error)
        example.display = ''
      }
    }
  }
}

// 生命周期
onMounted(async () => {
  console.log('VueMathjaxBeautiful组件挂载，开始初始化...')
  try {
    await initMathJax()
    console.log('MathJax初始化完成，开始渲染符号和公式示例...')
    
    // 并行渲染符号和公式示例
    await Promise.all([
      renderAllSymbols(),
      renderFormulaExamples()
    ])
    
    console.log('VueMathjaxBeautiful初始化完成')
  } catch (error) {
    console.error('VueMathjaxBeautiful初始化失败:', error)
  }
})
</script>

<style>
/* 所有样式已移至 packages/core/src/styles/index.scss 中统一管理 */
</style> 