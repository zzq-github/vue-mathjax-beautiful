<template>
  <div class="vue-mathjax-editor" :class="{ 'full-screen': isFullScreen }">
    <!-- 工具栏 -->
    <div class="toolbar" v-if="showToolbar">
      <!-- 基础格式工具 -->
      <div class="format-group">
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('bold') }"
          @click="toggleFormat('bold')"
          title="粗体 (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('italic') }"
          @click="toggleFormat('italic')"
          title="斜体 (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('underline') }"
          @click="toggleFormat('underline')"
          title="下划线 (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('strikethrough') }"
          @click="toggleFormat('strikethrough')"
          title="删除线"
        >
          <s>S</s>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 公式工具 -->
      <div class="math-group">
        <button class="toolbar-btn formula-btn" @click="showFormulaEditor" title="插入数学公式">
          <span class="fx-icon">fx</span>
          <span>公式</span>
        </button>
        <button class="toolbar-btn" @click="insertQuickFormula('\\frac{a}{b}')" title="分数">
          <span class="btn-fraction">
            <span class="btn-numerator">a</span>
            <span class="btn-denominator">b</span>
          </span>
        </button>
        <button class="toolbar-btn" @click="insertQuickFormula('\\sqrt{x}')" title="根号">
          <span class="btn-sqrt">
            <span class="btn-sqrt-radical">√</span>
            <span class="btn-sqrt-content">x</span>
          </span>
        </button>
        <button class="toolbar-btn" @click="insertQuickFormula('x^{2}')" title="上标">x²</button>
      </div>

      <div class="divider"></div>

      <!-- 插入工具 -->
      <div class="insert-group">
        <input
          ref="imageInput"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          style="display: none"
        />
        <button
          class="toolbar-btn image-btn"
          @click="imageInput?.click()"
          :disabled="uploadLoading"
          title="插入图片"
        >
          <span v-if="uploadLoading" class="loading-icon">⟳</span>
          <span v-else class="icon">🖼️</span>
          <span>图片</span>
        </button>
        <button class="toolbar-btn clear-btn" @click="clearFormat" title="清除格式">
          <span class="icon">🧹</span>
          <span>清除</span>
        </button>
      </div>
    </div>

    <!-- 编辑器内容区域 -->
    <div class="editor-container">
      <div
        ref="editorRef"
        class="editor-content"
        contenteditable="true"
        @input="handleInput"
        @beforeinput="handleBeforeInput"
        @keydown="handleKeydown"
        @paste="handlePaste"
        @focus="handleFocus"
        @blur="handleBlur"
        @mouseup="updateSelection"
        @keyup="updateSelection"
        :placeholder="placeholder"
        :style="{ minHeight: minHeight }"
      ></div>

      <!-- 字符数统计 -->
      <div class="char-counter">
        <span class="char-count">{{ charCount }}</span>
        <span class="char-label">字符</span>
      </div>
    </div>

    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showFormula"
      :existing-latex="editingLatex"
      @insert="insertFormula"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import VueMathjaxBeautiful from './VueMathjaxBeautiful.vue'
import { convertLatexToSvg, extractLatexFromSvg, initMathJax } from '../utils/latex'

interface Props {
  modelValue?: string
  placeholder?: string
  minHeight?: string
  showToolbar?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '开始编写您的内容...',
  minHeight: '300px',
  showToolbar: true,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: []
  blur: []
}>()

// 响应式数据
const editorRef = ref<HTMLElement>()
const imageInput = ref<HTMLInputElement>()
const showFormula = ref(false)
const editingLatex = ref('')
const editingFormulaElement = ref<HTMLElement | null>(null)
const isFullScreen = ref(false)
const content = ref('')
const charCount = ref(0)
const uploadLoading = ref(false)
const activeFormats = ref(new Set<string>())

// 监听外部值变化
watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal !== content.value && editorRef.value) {
      content.value = newVal || ''
      const htmlContent = await convertFromStandardSyntax(newVal || '')
      editorRef.value.innerHTML = htmlContent
      updateStats()
      await nextTick()
      setupFormulaClickEvents()
    }
  },
  { immediate: true }
)

// 将标准表达式语法转换为HTML显示
const convertFromStandardSyntax = async (content: string): Promise<string> => {
  if (!content) return ''

  let htmlContent = content

  // 首先检查内容是否已经包含SVG公式
  const hasSvgFormulas = /<svg[^>]*data-latex[^>]*>/i.test(htmlContent)
  if (hasSvgFormulas) {
    htmlContent = extractLatexFromSvg(htmlContent)
  }

  // 处理基本格式
  htmlContent = htmlContent
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
    .replace(/__(.*?)__/g, '<u>$1</u>') // 下划线
    .replace(/~~(.*?)~~/g, '<s>$1</s>') // 删除线
    .replace(
      /!\[([^\]]*)\]\(([^)]*)\)/g,
      '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 8px 0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">'
    )
    .replace(/\n/g, '<br>') // 换行

  // 转换LaTeX公式为SVG
  try {
    htmlContent = await convertLatexToSvg(htmlContent)
  } catch (error) {
    console.warn('LaTeX conversion failed:', error)
  }

  return htmlContent
}

// 将HTML内容转换为标准表达式语法
const convertToStandardSyntax = (editorElement: HTMLElement) => {
  const clonedElement = editorElement.cloneNode(true) as HTMLElement

  // 将SVG数学公式元素转换为LaTeX格式
  const svgFormulas = clonedElement.querySelectorAll('svg[data-latex]')
  svgFormulas.forEach((svg) => {
    const latex = svg.getAttribute('data-latex') || ''
    if (latex) {
      const latexType = svg.getAttribute('data-latex-type')
      let latexFormat: string

      if (latexType === 'inline') {
        latexFormat = `$${latex}$`
      } else {
        latexFormat = `$$${latex}$$`
      }

      const textNode = document.createTextNode(latexFormat)
      svg.parentNode?.replaceChild(textNode, svg)
    }
  })

  return clonedElement.innerHTML
}

// 格式检查
const isFormatActive = (format: string): boolean => {
  if (!editorRef.value) return false

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return false

  try {
    const range = selection.getRangeAt(0)
    const container = range.commonAncestorContainer
    const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element
    
    if (!element) return false

    // 检查元素及其父元素是否包含对应的格式标签
    let currentElement: Element | null = element
    while (currentElement && currentElement !== editorRef.value) {
      const tagName = currentElement.tagName?.toLowerCase()
      const computedStyle = window.getComputedStyle(currentElement)
      
      switch (format) {
        case 'bold':
          if (tagName === 'strong' || tagName === 'b' || computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 700) {
            return true
          }
          break
        case 'italic':
          if (tagName === 'em' || tagName === 'i' || computedStyle.fontStyle === 'italic') {
            return true
          }
          break
        case 'underline':
          if (tagName === 'u' || computedStyle.textDecoration.includes('underline')) {
            return true
          }
          break
        case 'strikethrough':
          if (tagName === 's' || tagName === 'strike' || computedStyle.textDecoration.includes('line-through')) {
            return true
          }
          break
      }
      currentElement = currentElement.parentElement
    }
    
    return false
  } catch (error) {
    console.warn('查询格式状态失败:', error)
    return false
  }
}

// 切换格式
const toggleFormat = (format: string) => {
  if (!editorRef.value) return

  try {
    document.execCommand(format, false, undefined)
    editorRef.value.focus()
    updateSelection()
  } catch (error) {
    console.warn('切换格式失败:', error)
  }
}

// 更新选区状态
const updateSelection = () => {
  if (!editorRef.value) return

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  // 更新格式状态
  const formats = ['bold', 'italic', 'underline', 'strikethrough']
  activeFormats.value.clear()

  formats.forEach((format) => {
    if (isFormatActive(format)) {
      activeFormats.value.add(format)
    }
  })
}

// 插入公式
const insertFormula = async (latex: string) => {
  if (!editorRef.value) return

  try {
    const svgHtml = await convertLatexToSvg(latex)

    // 确保编辑器获得焦点
    editorRef.value.focus()

    // 如果是编辑已有公式，先删除原公式
    if (editingFormulaElement.value) {
      editingFormulaElement.value.remove()
      editingFormulaElement.value = null
    }

    // 插入SVG公式
    document.execCommand('insertHTML', false, svgHtml)

    // 更新内容
    handleInput()

    // 重新设置公式点击事件
    setupFormulaClickEvents()
  } catch (error) {
    console.error('插入公式失败:', error)
  }
}

// 快速插入公式
const insertQuickFormula = async (latex: string) => {
  if (!editorRef.value) return

  try {
    const svgHtml = await convertLatexToSvg(latex)

    editorRef.value.focus()
    document.execCommand('insertHTML', false, svgHtml)

    handleInput()
    setupFormulaClickEvents()
  } catch (error) {
    console.error('快速插入公式失败:', error)
  }
}

// 显示公式编辑器
const showFormulaEditor = () => {
  showFormula.value = true
  editingLatex.value = ''
  editingFormulaElement.value = null
}

// 编辑已有公式
const editExistingFormula = (svgElement: HTMLElement) => {
  const latexCode = svgElement.getAttribute('data-latex')
  if (latexCode) {
    editingLatex.value = latexCode
    editingFormulaElement.value = svgElement
    showFormula.value = true
  }
}

// 设置公式点击事件
const setupFormulaClickEvents = () => {
  if (!editorRef.value) return

  const svgElements = editorRef.value.querySelectorAll('svg[data-latex]')
  svgElements.forEach((svg) => {
    const htmlElement = svg as HTMLElement
    htmlElement.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      editExistingFormula(htmlElement)
    }
  })
}

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file || !editorRef.value) return

  uploadLoading.value = true

  try {
    // 创建本地预览URL
    const imageUrl = URL.createObjectURL(file)

    // 插入图片
    const imgHtml = `<img src="${imageUrl}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 8px 0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />`

    editorRef.value.focus()
    document.execCommand('insertHTML', false, imgHtml)

    handleInput()
  } catch (error) {
    console.error('图片上传失败:', error)
  } finally {
    uploadLoading.value = false
    target.value = '' // 清空input
  }
}

// 清除格式
const clearFormat = () => {
  if (!editorRef.value) return

  try {
    document.execCommand('removeFormat', false, undefined)
    editorRef.value.focus()
    updateSelection()
    handleInput()
  } catch (error) {
    console.warn('清除格式失败:', error)
  }
}

// 更新统计信息
const updateStats = () => {
  if (!editorRef.value) return

  const text = editorRef.value.textContent || ''
  charCount.value = text.length
}

// 输入处理
const handleInput = () => {
  if (!editorRef.value) return

  const newContent = convertToStandardSyntax(editorRef.value)
  content.value = newContent
  emit('update:modelValue', newContent)
  emit('change', newContent)

  updateStats()
}

// 处理输入前事件
const handleBeforeInput = (event: Event) => {
  // 这里可以添加输入前的处理逻辑
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  // 处理快捷键
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        toggleFormat('bold')
        break
      case 'i':
        event.preventDefault()
        toggleFormat('italic')
        break
      case 'u':
        event.preventDefault()
        toggleFormat('underline')
        break
    }
  }
}

// 处理粘贴事件
const handlePaste = async (event: ClipboardEvent) => {
  event.preventDefault()

  const clipboardData = event.clipboardData
  if (!clipboardData || !editorRef.value) return

  // 处理文本粘贴
  const text = clipboardData.getData('text/plain')
  if (text) {
    // 清理文本并转换LaTeX
    try {
      const processedText = await convertFromStandardSyntax(text)
      document.execCommand('insertHTML', false, processedText)

      handleInput()
      setupFormulaClickEvents()
    } catch (error) {
      // 如果转换失败，插入纯文本
      document.execCommand('insertText', false, text)
    }
  }

  // 处理图片粘贴
  const items = clipboardData.items
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const file = items[i].getAsFile()
      if (file) {
        // 模拟文件上传
        const fakeEvent = {
          target: {
            files: [file],
          },
        } as any

        await handleImageUpload(fakeEvent)
      }
    }
  }
}

// 焦点处理
const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

// 生命周期
onMounted(async () => {
  // 初始化MathJax
  await initMathJax()

  // 设置初始内容
  if (props.modelValue && editorRef.value) {
    const htmlContent = await convertFromStandardSyntax(props.modelValue)
    editorRef.value.innerHTML = htmlContent
    setupFormulaClickEvents()
  }

  updateStats()
})

onUnmounted(() => {
  // 清理资源
})
</script>

<style>
/* 确保基础样式生效 */
* {
  box-sizing: border-box;
}
.vue-mathjax-editor {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.vue-mathjax-editor.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  border-radius: 0;
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  gap: 8px;
  flex-wrap: wrap;
}

.toolbar-btn {
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  min-height: 36px;
  white-space: nowrap;
}

.toolbar-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.toolbar-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.toolbar-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.format-group,
.math-group,
.insert-group {
  display: flex;
  gap: 4px;
}

.divider {
  width: 1px;
  height: 24px;
  background: #dee2e6;
  margin: 0 8px;
}

.formula-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.formula-btn:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.fx-icon {
  font-style: italic;
  font-weight: bold;
  font-size: 16px;
}

.btn-fraction {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  line-height: 1;
}

.btn-numerator {
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
}

.btn-denominator {
  padding-top: 1px;
}

.btn-sqrt {
  display: flex;
  align-items: baseline;
  font-size: 14px;
}

.btn-sqrt-radical {
  font-size: 16px;
  margin-right: 1px;
}

.btn-sqrt-content {
  font-size: 12px;
}

.image-btn,
.clear-btn {
  background: #28a745;
  color: white;
  border-color: transparent;
}

.image-btn:hover,
.clear-btn:hover {
  background: #218838;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.editor-container {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.editor-content {
  flex: 1;
  padding: 20px;
  outline: none;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  overflow-y: auto;
}

.editor-content:empty:before {
  content: attr(placeholder);
  color: #adb5bd;
  font-style: italic;
}

.char-counter {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  color: #6c757d;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.char-count {
  font-weight: 600;
}

.char-label {
  margin-left: 4px;
}

/* 编辑器内容样式 */
.editor-content :deep(strong) {
  font-weight: bold;
}

.editor-content :deep(em) {
  font-style: italic;
}

.editor-content :deep(u) {
  text-decoration: underline;
}

.editor-content :deep(s) {
  text-decoration: line-through;
}

.editor-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.editor-content :deep(img:hover) {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* SVG公式样式 */
.editor-content :deep(svg[data-latex]) {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  padding: 2px 4px;
  margin: 0 2px;
  background: transparent;
  border: 1px solid transparent;
  font-size: 18px !important;
  min-height: 24px;
  vertical-align: middle;
}

.editor-content :deep(svg[data-latex]:hover) {
  background: #f0f9ff;
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.editor-content :deep(svg[data-latex-type='inline']) {
  font-size: 20px !important;
  min-height: 20px;
  vertical-align: baseline;
}

.editor-content :deep(svg[data-latex-type='display']) {
  font-size: 24px !important;
  min-height: 28px;
  display: inline-block;
  margin: 4px 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toolbar {
    padding: 10px 12px;
    gap: 6px;
  }

  .toolbar-btn {
    padding: 6px 10px;
    font-size: 13px;
    min-height: 32px;
  }

  .editor-content {
    padding: 16px;
    font-size: 15px;
  }

  .char-counter {
    bottom: 8px;
    right: 12px;
    font-size: 11px;
  }
}
</style>
