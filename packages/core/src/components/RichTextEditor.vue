<template>
  <div class="rich-text-editor" :class="{ 'full-screen': isFullScreen }">
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

      <!-- 标题工具 -->
      <div class="heading-group">
        <select 
          class="heading-select" 
          @change="applyHeading($event)"
          title="标题格式"
        >
          <option value="">正文</option>
          <option value="h1">标题 1</option>
          <option value="h2">标题 2</option>
          <option value="h3">标题 3</option>
          <option value="h4">标题 4</option>
        </select>
      </div>

      <div class="divider"></div>

      <!-- 列表工具 -->
      <div class="list-group">
        <button 
          class="toolbar-btn"
          @click="toggleList('ul')"
          title="无序列表"
        >
          <span class="list-icon">•</span>
        </button>
        <button 
          class="toolbar-btn"
          @click="toggleList('ol')"
          title="有序列表"
        >
          <span class="list-icon">1.</span>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 公式工具 -->
      <div class="math-group">
        <button 
          class="toolbar-btn formula-btn"
          @click="showFormulaDialog"
          title="插入数学公式"
        >
          <span class="fx-icon">fx</span>
          <span>公式</span>
        </button>
        <button 
          class="toolbar-btn"
          @click="insertQuickFormula('\\frac{a}{b}')"
          title="分数"
        >
          <span class="btn-fraction">
            <span class="btn-numerator">a</span>
            <span class="btn-denominator">b</span>
          </span>
        </button>
        <button 
          class="toolbar-btn"
          @click="insertQuickFormula('\\sqrt{x}')"
          title="根号"
        >
          <span class="btn-sqrt">
            <span class="btn-sqrt-radical">√</span>
            <span class="btn-sqrt-content">x</span>
          </span>
        </button>
        <button 
          class="toolbar-btn"
          @click="insertQuickFormula('x^{2}')"
          title="上标"
        >
          x²
        </button>
      </div>

      <div class="divider"></div>

      <!-- 插入工具 -->
      <div class="insert-group">
        <button 
          class="toolbar-btn link-btn"
          @click="insertLink"
          title="插入链接"
        >
          <span class="icon">🔗</span>
          <span>链接</span>
        </button>
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
        <button 
          class="toolbar-btn table-btn"
          @click="insertTable"
          title="插入表格"
        >
          <span class="icon">📊</span>
          <span>表格</span>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 操作工具 -->
      <div class="action-group">
        <button 
          class="toolbar-btn"
          @click="undo"
          :disabled="!canUndo"
          title="撤销 (Ctrl+Z)"
        >
          <span class="icon">↶</span>
        </button>
        <button 
          class="toolbar-btn"
          @click="redo"
          :disabled="!canRedo"
          title="重做 (Ctrl+Y)"
        >
          <span class="icon">↷</span>
        </button>
        <button 
          class="toolbar-btn clear-btn"
          @click="clearFormat"
          title="清除格式"
        >
          <span class="icon">🧹</span>
          <span>清除</span>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 视图工具 -->
      <div class="view-group">
        <button 
          class="toolbar-btn"
          @click="toggleFullScreen"
          title="全屏模式"
        >
          <span class="icon">{{ isFullScreen ? '🗗' : '🗖' }}</span>
        </button>
        <button 
          class="toolbar-btn"
          :class="{ active: isPreviewMode }"
          @click="togglePreview"
          title="预览模式"
        >
          <span class="icon">👁</span>
        </button>
      </div>
    </div>

    <!-- 编辑器内容区域 -->
    <div class="editor-container">
      <!-- 编辑视图 -->
      <div 
        v-show="!isPreviewMode"
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

      <!-- 预览视图 -->
      <div 
        v-show="isPreviewMode"
        class="preview-content"
        v-html="previewContent"
        :style="{ minHeight: minHeight }"
      ></div>

      <!-- 字符数统计 -->
      <div class="char-counter" v-if="!isPreviewMode">
        <span class="char-count">{{ charCount }}</span>
        <span class="char-label">字符</span>
      </div>
    </div>

    <!-- 状态栏 -->
    <div class="status-bar" v-if="showStatusBar">
      <div class="status-left">
        <span class="word-count">字数: {{ wordCount }}</span>
        <span class="char-count-status">字符: {{ charCount }}</span>
      </div>
      <div class="status-right">
        <span class="cursor-position">行 {{ cursorLine }}, 列 {{ cursorColumn }}</span>
        <span class="mode-indicator">{{ isPreviewMode ? '预览' : '编辑' }}</span>
      </div>
    </div>

    <!-- 公式编辑器弹窗 -->
    <FormulaEditorDialog
      v-model="showFormula"
      :existing-latex="editingLatex"
      @insert="insertFormula"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import FormulaEditorDialog from './FormulaEditorDialog.vue'
import { convertLatexToSvg } from '../utils/latex'

interface Props {
  modelValue?: string
  placeholder?: string
  minHeight?: string
  showToolbar?: boolean
  showStatusBar?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '开始编写您的内容...',
  minHeight: '300px',
  showToolbar: true,
  showStatusBar: true,
  readonly: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': []
  'blur': []
}>()

// 响应式数据
const editorRef = ref<HTMLElement>()
const imageInput = ref<HTMLInputElement>()
const showFormula = ref(false)
const editingLatex = ref('')
const editingFormulaElement = ref<HTMLElement | null>(null)
const isFullScreen = ref(false)
const isPreviewMode = ref(false)
const content = ref('')
const wordCount = ref(0)
const charCount = ref(0)
const cursorLine = ref(1)
const cursorColumn = ref(1)
const canUndo = ref(false)
const canRedo = ref(false)
const uploadLoading = ref(false)
const activeFormats = ref(new Set<string>())

// 历史记录
const history = ref<string[]>([])
const historyIndex = ref(-1)

// 计算属性
const previewContent = computed(async () => {
  if (!content.value) return ''
  try {
    return await convertLatexToSvg(content.value)
  } catch (error) {
    console.error('Preview error:', error)
    return content.value
  }
})

// 监听外部值变化
watch(() => props.modelValue, async (newVal) => {
  if (newVal !== content.value && editorRef.value) {
    content.value = newVal || ''
    const htmlContent = await convertFromStandardSyntax(newVal || '')
    editorRef.value.innerHTML = htmlContent
    updateStats()
    await nextTick()
    setupFormulaClickEvents()
  }
}, { immediate: true })

// 将标准表达式语法转换为HTML显示
const convertFromStandardSyntax = async (content: string): Promise<string> => {
  if (!content) return ''
  
  let htmlContent = content
  
  // 处理基本格式
  htmlContent = htmlContent
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
    .replace(/__(.*?)__/g, '<u>$1</u>') // 下划线
    .replace(/~~(.*?)~~/g, '<s>$1</s>') // 删除线
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
  if (activeFormats.value.has(format)) return true
  try {
    return document.queryCommandState(format)
  } catch {
    return false
  }
}

// 格式切换
const toggleFormat = (format: string) => {
  if (props.readonly) return
  
  const selection = window.getSelection()
  
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    if (!range.collapsed) {
      // 有选中文字，直接应用格式
      document.execCommand(format, false)
      activeFormats.value.clear()
    } else {
      // 没有选中文字，切换激活状态
      if (activeFormats.value.has(format)) {
        activeFormats.value.clear()
      } else {
        activeFormats.value.clear()
        activeFormats.value.add(format)
      }
    }
  }
  
  updateContent()
}

// 应用标题格式
const applyHeading = (event: Event) => {
  if (props.readonly) return
  const target = event.target as HTMLSelectElement
  const tag = target.value
  
  if (tag) {
    document.execCommand('formatBlock', false, tag)
  } else {
    document.execCommand('formatBlock', false, 'div')
  }
  
  target.value = ''
  updateContent()
}

// 列表切换
const toggleList = (type: 'ul' | 'ol') => {
  if (props.readonly) return
  const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList'
  document.execCommand(command, false)
  updateContent()
}

// 确保光标在编辑器内部
const ensureCursorInEditor = () => {
  if (!editorRef.value) return false
  
  editorRef.value.focus()
  
  const selection = window.getSelection()
  if (!selection) return false
  
  let needsReset = false
  
  if (selection.rangeCount === 0) {
    needsReset = true
  } else {
    const range = selection.getRangeAt(0)
    const container = range.commonAncestorContainer
    
    if (!editorRef.value.contains(container)) {
      needsReset = true
    }
  }
  
  if (needsReset) {
    const range = document.createRange()
    
    if (editorRef.value.childNodes.length === 0) {
      const textNode = document.createTextNode('')
      editorRef.value.appendChild(textNode)
      range.setStart(textNode, 0)
      range.setEnd(textNode, 0)
    } else {
      range.selectNodeContents(editorRef.value)
      range.collapse(false)
    }
    
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
  return true
}

// 显示公式对话框
const showFormulaDialog = () => {
  if (props.readonly) return
  ensureCursorInEditor()
  editingLatex.value = ''
  showFormula.value = true
}

// 插入快速公式
const insertQuickFormula = async (latex: string) => {
  if (props.readonly) return
  if (ensureCursorInEditor()) {
    await insertFormula(latex)
  }
}

// 插入公式
const insertFormula = async (latex: string) => {
  if (props.readonly || !latex || !editorRef.value) return

  try {
    if (editingFormulaElement.value) {
      // 编辑现有公式
      updateExistingFormula(latex)
    } else {
      // 插入新公式
      await insertNewFormula(latex)
    }
    
    editingFormulaElement.value = null
    editingLatex.value = ''
    showFormula.value = false
    
    // 更新内容
    const currentContent = convertToStandardSyntax(editorRef.value)
    const htmlContent = await convertFromStandardSyntax(currentContent)
    content.value = htmlContent
    
    updateContent()
  } catch (error) {
    console.error('Insert formula error:', error)
  }
}

// 插入新公式
const insertNewFormula = async (latex: string) => {
  if (!editorRef.value) return

  editorRef.value.focus()
  
  // 转换为 SVG
  const svgContent = await convertLatexToSvg(`$$${latex}$$`)
  
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    
    const isInEditor = editorRef.value.contains(range.commonAncestorContainer)
    
    if (isInEditor) {
      try {
        if (!range.collapsed) {
          range.deleteContents()
        }
        
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = svgContent
        const svgElement = tempDiv.querySelector('svg')
        
        if (svgElement) {
          const beforeSpace = document.createTextNode('\u200B')
          const afterSpace = document.createTextNode('\u200B')
          
          range.insertNode(afterSpace)
          range.insertNode(svgElement)
          range.insertNode(beforeSpace)
          
          range.setStartAfter(afterSpace)
          range.collapse(true)
          selection.removeAllRanges()
          selection.addRange(range)
        }
        return
      } catch (error) {
        console.warn('插入公式到光标位置失败:', error)
      }
    }
  }
  
  // 如果失败，添加到末尾
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = svgContent
  const svgElement = tempDiv.querySelector('svg')
  
  if (svgElement) {
    const beforeSpace = document.createTextNode('\u200B')
    const afterSpace = document.createTextNode('\u200B')
    
    editorRef.value.appendChild(beforeSpace)
    editorRef.value.appendChild(svgElement)
    editorRef.value.appendChild(afterSpace)
  }
}

// 更新现有公式
const updateExistingFormula = (latex: string) => {
  if (!editingFormulaElement.value) return

  if (editingFormulaElement.value.tagName.toLowerCase() === 'svg') {
    const parentElement = editingFormulaElement.value.parentNode
    if (parentElement) {
      const placeholder = document.createElement('span')
      placeholder.textContent = `$$${latex}$$`
      parentElement.replaceChild(placeholder, editingFormulaElement.value)
    }
  }
}

// 设置公式点击事件
const setupFormulaClickEvents = () => {
  if (!editorRef.value) return
  
  const svgFormulas = editorRef.value.querySelectorAll('svg[data-latex]')
  svgFormulas.forEach((svg) => {
    const newSvg = svg.cloneNode(true) as HTMLElement
    svg.parentNode?.replaceChild(newSvg, svg)
    
    // 确保前后有零宽度空格
    const parent = newSvg.parentNode
    if (parent) {
      const prevNode = newSvg.previousSibling
      if (!prevNode || prevNode.nodeType !== Node.TEXT_NODE || prevNode.textContent !== '\u200B') {
        const beforeSpace = document.createTextNode('\u200B')
        parent.insertBefore(beforeSpace, newSvg)
      }
      
      const nextNode = newSvg.nextSibling
      if (!nextNode || nextNode.nodeType !== Node.TEXT_NODE || nextNode.textContent !== '\u200B') {
        const afterSpace = document.createTextNode('\u200B')
        parent.insertBefore(afterSpace, newSvg.nextSibling)
      }
    }
    
    // 添加点击事件
    newSvg.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const latex = newSvg.getAttribute('data-latex') || ''
      if (latex) {
        editingFormulaElement.value = newSvg
        editingLatex.value = latex
        showFormula.value = true
      }
    })
    
    // 添加样式
    newSvg.style.cursor = 'pointer'
    newSvg.style.display = 'inline-block'
    newSvg.style.margin = '0 2px'
    newSvg.setAttribute('title', '点击编辑公式')
    newSvg.setAttribute('contenteditable', 'false')
  })
}

// 插入链接
const insertLink = () => {
  if (props.readonly) return
  const url = prompt('请输入链接地址:')
  if (url) {
    document.execCommand('createLink', false, url)
    updateContent()
  }
}

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  if (props.readonly) return
  
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('图片大小不能超过5MB')
    return
  }
  
  try {
    uploadLoading.value = true
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = document.createElement('img')
      img.src = e.target?.result as string
      img.style.maxWidth = '100%'
      img.style.height = 'auto'
      img.style.borderRadius = '4px'
      img.style.margin = '8px 0'
      img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
      
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        
        if (editorRef.value?.contains(range.commonAncestorContainer)) {
          if (!range.collapsed) {
            range.deleteContents()
          }
          
          const wrapper = document.createElement('div')
          wrapper.className = 'image-wrapper'
          wrapper.appendChild(img)
          
          range.insertNode(wrapper)
          range.setStartAfter(wrapper)
          range.collapse(true)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
      
      updateContent()
    }
    reader.readAsDataURL(file)
  } catch (error) {
    console.error('图片上传失败:', error)
    alert('图片上传失败，请重试')
  } finally {
    uploadLoading.value = false
  }
  
  target.value = ''
}

// 插入表格
const insertTable = () => {
  if (props.readonly) return
  const rows = prompt('行数:', '3') || '3'
  const cols = prompt('列数:', '3') || '3'
  
  const table = document.createElement('table')
  table.style.borderCollapse = 'collapse'
  table.style.width = '100%'
  table.style.margin = '16px 0'
  
  for (let i = 0; i < parseInt(rows); i++) {
    const row = table.insertRow()
    for (let j = 0; j < parseInt(cols); j++) {
      const cell = row.insertCell()
      cell.style.border = '1px solid #d1d5db'
      cell.style.padding = '8px 12px'
      cell.innerHTML = '&nbsp;'
    }
  }
  
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    range.insertNode(table)
    range.setStartAfter(table)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
  updateContent()
}

// 撤销重做
const undo = () => {
  if (props.readonly || !canUndo.value) return
  if (historyIndex.value > 0) {
    historyIndex.value--
    const prevContent = history.value[historyIndex.value]
    content.value = prevContent
    if (editorRef.value) {
      editorRef.value.innerHTML = prevContent
    }
    emit('update:modelValue', prevContent)
    updateHistoryState()
  }
}

const redo = () => {
  if (props.readonly || !canRedo.value) return
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    const nextContent = history.value[historyIndex.value]
    content.value = nextContent
    if (editorRef.value) {
      editorRef.value.innerHTML = nextContent
    }
    emit('update:modelValue', nextContent)
    updateHistoryState()
  }
}

// 清除格式
const clearFormat = async () => {
  if (props.readonly || !editorRef.value) return
  
  const editor = editorRef.value
  const textContent = editor.innerText || editor.textContent || ''
  
  // 保存数学公式
  const formulas: Array<{text: string, latex: string}> = []
  const formulaElements = editor.querySelectorAll('svg[data-latex]')
  formulaElements.forEach((formula) => {
    const latex = formula.getAttribute('data-latex') || ''
    if (latex) {
      formulas.push({ text: latex, latex })
    }
  })
  
  // 保存图片
  const images: Array<{src: string, alt: string}> = []
  const imageElements = editor.querySelectorAll('img')
  imageElements.forEach((img) => {
    images.push({
      src: img.src,
      alt: img.alt || ''
    })
  })
  
  // 清除所有HTML格式
  editor.innerHTML = ''
  
  // 重新插入纯文本
  if (textContent.trim()) {
    const textNode = document.createTextNode(textContent)
    editor.appendChild(textNode)
  }
  
  // 重新插入数学公式
  for (const formula of formulas) {
    const svgContent = await convertLatexToSvg(`$$${formula.latex}$$`)
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = svgContent
    const svgElement = tempDiv.querySelector('svg')
    
    if (svgElement) {
      editor.appendChild(document.createTextNode(' '))
      editor.appendChild(svgElement)
      editor.appendChild(document.createTextNode(' '))
    }
  }
  
  // 重新插入图片
  images.forEach(imageData => {
    const img = document.createElement('img')
    img.src = imageData.src
    img.alt = imageData.alt
    img.style.maxWidth = '100%'
    img.style.height = 'auto'
    img.style.margin = '8px 0'
    img.style.borderRadius = '4px'
    img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
    
    const wrapper = document.createElement('div')
    wrapper.className = 'image-wrapper'
    wrapper.appendChild(img)
    
    editor.appendChild(wrapper)
  })
  
  activeFormats.value.clear()
  updateContent()
}

// 全屏切换
const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
}

// 预览切换
const togglePreview = () => {
  isPreviewMode.value = !isPreviewMode.value
}

// 处理输入
const handleInput = async () => {
  if (props.readonly) return
  await updateContent()
  updateStats()
  updateCursorPosition()
}

// 处理输入前事件
const handleBeforeInput = (e: Event) => {
  const inputEvent = e as InputEvent
  if (activeFormats.value.size === 0) return
  
  if (inputEvent.inputType === 'insertText' && inputEvent.data) {
    e.preventDefault()
    
    let wrappedText = inputEvent.data
    
    const activeFormat = Array.from(activeFormats.value)[0]
    switch (activeFormat) {
      case 'bold':
        wrappedText = `<strong>${wrappedText}</strong>`
        break
      case 'italic':
        wrappedText = `<em>${wrappedText}</em>`
        break
      case 'underline':
        wrappedText = `<u>${wrappedText}</u>`
        break
      case 'strikethrough':
        wrappedText = `<s>${wrappedText}</s>`
        break
    }
    
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = wrappedText
      const fragment = document.createDocumentFragment()
      
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild)
      }
      
      range.insertNode(fragment)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    
    handleInput()
  }
}

// 更新内容
const updateContent = async () => {
  if (!editorRef.value) return
  
  const newContent = convertToStandardSyntax(editorRef.value)
  content.value = newContent
  
  addToHistory(newContent)
  
  emit('update:modelValue', newContent)
  emit('change', newContent)
}

// 添加到历史记录
const addToHistory = (newContent: string) => {
  if (history.value[historyIndex.value] !== newContent) {
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(newContent)
    historyIndex.value = history.value.length - 1
    
    if (history.value.length > 50) {
      history.value.shift()
      historyIndex.value--
    }
    
    updateHistoryState()
  }
}

// 更新历史状态
const updateHistoryState = () => {
  canUndo.value = historyIndex.value > 0
  canRedo.value = historyIndex.value < history.value.length - 1
}

// 更新统计信息
const updateStats = () => {
  if (!editorRef.value) return
  
  const clonedElement = editorRef.value.cloneNode(true) as HTMLElement
  
  // 移除SVG公式元素，用LaTeX代码计算
  const svgFormulas = clonedElement.querySelectorAll('svg[data-latex]')
  svgFormulas.forEach((svg) => {
    const latex = svg.getAttribute('data-latex') || ''
    if (latex) {
      const textNode = document.createTextNode(latex)
      svg.parentNode?.replaceChild(textNode, svg)
    } else {
      svg.remove()
    }
  })
  
  // 移除图片元素
  const images = clonedElement.querySelectorAll('img')
  images.forEach(img => img.remove())
  
  const imageWrappers = clonedElement.querySelectorAll('.image-wrapper')
  imageWrappers.forEach(wrapper => wrapper.remove())
  
  const textContent = clonedElement.textContent || ''
  
  const cleanText = textContent
    .replace(/\u200B/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  
  const words = cleanText.split(/\s+/).filter(word => word.length > 0)
  
  wordCount.value = words.length
  charCount.value = cleanText.length
}

// 更新光标位置
const updateCursorPosition = () => {
  cursorLine.value = 1
  cursorColumn.value = 1
}

// 更新选择状态
const updateSelection = () => {
  updateCursorPosition()
  
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    if (!range.collapsed) {
      activeFormats.value.clear()
    }
  }
}

// 键盘事件处理
const handleKeydown = async (event: KeyboardEvent) => {
  if (props.readonly) {
    event.preventDefault()
    return
  }

  // 快捷键处理
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
      case 'z':
        event.preventDefault()
        if (event.shiftKey) {
          redo()
        } else {
          undo()
        }
        break
      case 'y':
        event.preventDefault()
        redo()
        break
    }
  }
  
  // Escape键清除格式
  if (event.key === 'Escape') {
    event.preventDefault()
    await clearFormat()
  }
  
  // 处理删除键删除公式
  if (event.key === 'Backspace' || event.key === 'Delete') {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      
      const checkAndDeleteSvg = (node: Node | null) => {
        if (node && node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement
          if (element.tagName.toLowerCase() === 'svg' && element.hasAttribute('data-latex')) {
            event.preventDefault()
            const parent = element.parentNode
            if (parent) {
              // 删除前后的零宽度空格
              const beforeSpace = element.previousSibling
              if (beforeSpace && beforeSpace.nodeType === Node.TEXT_NODE && beforeSpace.textContent === '\u200B') {
                parent.removeChild(beforeSpace)
              }
              const afterSpace = element.nextSibling
              if (afterSpace && afterSpace.nodeType === Node.TEXT_NODE && afterSpace.textContent === '\u200B') {
                parent.removeChild(afterSpace)
              }
              parent.removeChild(element)
              
              updateContent()
            }
            return true
          }
        }
        return false
      }
      
      if (event.key === 'Backspace') {
        const prevNode = range.startContainer.nodeType === Node.TEXT_NODE 
          ? range.startContainer.previousSibling 
          : range.startContainer.childNodes[range.startOffset - 1]
        checkAndDeleteSvg(prevNode)
      } else if (event.key === 'Delete') {
        const nextNode = range.startContainer.nodeType === Node.TEXT_NODE 
          ? range.startContainer.nextSibling 
          : range.startContainer.childNodes[range.startOffset]
        checkAndDeleteSvg(nextNode)
      }
    }
  }
}

// 粘贴处理
const handlePaste = async (event: ClipboardEvent) => {
  if (props.readonly) {
    event.preventDefault()
    return
  }

  event.preventDefault()
  
  const clipboardData = event.clipboardData
  if (!clipboardData) return
  
  const text = clipboardData.getData('text/plain')
  if (text) {
    document.execCommand('insertText', false, text)
    await updateContent()
  }
}

// 焦点事件
const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

// 全局键盘监听
const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (isFullScreen.value && event.key === 'Escape') {
    isFullScreen.value = false
  }
}

// 初始化
onMounted(async () => {
  if (editorRef.value && props.modelValue) {
    const htmlContent = await convertFromStandardSyntax(props.modelValue)
    editorRef.value.innerHTML = htmlContent
    content.value = props.modelValue
    addToHistory(props.modelValue)
    updateStats()
    
    await nextTick()
    setupFormulaClickEvents()
  }
  
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.rich-text-editor {
  border-radius: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease-out;
}

.rich-text-editor.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  border-radius: 0;
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  gap: 8px;
  flex-wrap: wrap;
  backdrop-filter: blur(10px);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.format-group,
.heading-group,
.list-group,
.math-group,
.insert-group,
.action-group,
.view-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #475569;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  gap: 4px;
}

.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #334155;
}

.toolbar-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.toolbar-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  background: rgba(255, 255, 255, 0.5);
}

/* 格式按钮特殊样式 */
.format-group .toolbar-btn {
  font-weight: 700;
  font-size: 15px;
}

.format-group .toolbar-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 公式按钮样式 */
.formula-btn {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
  color: #6366f1 !important;
  font-weight: 600 !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
}

.formula-btn:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%) !important;
  color: #4f46e5 !important;
}

.fx-icon {
  font-weight: bold;
  font-style: italic;
  color: #6366f1;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(99, 102, 241, 0.2);
}

/* 快速公式按钮样式 */
.math-group .toolbar-btn:not(.formula-btn) {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%) !important;
  color: #a855f7 !important;
  font-weight: 600 !important;
  min-width: 40px !important;
  height: 36px !important;
}

.math-group .toolbar-btn:not(.formula-btn):hover {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%) !important;
  color: #9333ea !important;
  transform: translateY(-1px) scale(1.05) !important;
}

/* 插入工具按钮样式 */
.link-btn {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%) !important;
  color: #3b82f6 !important;
  font-weight: 600 !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
}

.link-btn:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%) !important;
}

.image-btn {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%) !important;
  color: #059669 !important;
  font-weight: 600 !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
}

.image-btn:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%) !important;
  color: #047857 !important;
}

.table-btn {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%) !important;
  color: #a855f7 !important;
  font-weight: 600 !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
}

.table-btn:hover {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%) !important;
  color: #9333ea !important;
}

/* 清除按钮样式 */
.clear-btn {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%) !important;
  color: #dc2626 !important;
  font-weight: 600 !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
}

.clear-btn:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%) !important;
  color: #b91c1c !important;
}

/* 加载图标动画 */
.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 标题选择器样式 */
.heading-select {
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.heading-select:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.heading-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 分隔线样式 */
.divider {
  width: 1px;
  height: 20px;
  background: linear-gradient(to bottom, transparent 0%, #cbd5e1 20%, #cbd5e1 80%, transparent 100%);
  margin: 0 8px;
  opacity: 0.6;
}

/* 数学符号样式 */
.btn-fraction {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  line-height: 1;
  vertical-align: middle;
}

.btn-fraction .btn-numerator {
  display: block;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
  margin-bottom: 1px;
}

.btn-fraction .btn-denominator {
  display: block;
  padding-top: 1px;
}

.btn-sqrt {
  display: inline-block;
  position: relative;
  font-size: 14px;
  line-height: 1;
  font-family: 'Times New Roman', serif;
}

.btn-sqrt-radical {
  font-size: 17px;
  vertical-align: top;
  position: relative;
  top: 2px;
  left: -2px;
  font-weight: normal;
  line-height: 1;
}

.btn-sqrt-content {
  border-top: 1px solid currentColor;
  padding-top: 1px;
  padding-left: 1px;
  padding-right: 2px;
  display: inline-block;
  min-width: 10px;
  font-size: 12px;
  position: relative;
  margin-left: -1px;
}

.btn-sqrt-content::before {
  content: '';
  position: absolute;
  left: -2px;
  top: -1px;
  width: 2px;
  height: 1px;
  background: currentColor;
  transform: skewX(-45deg);
  transform-origin: bottom right;
}

.list-icon {
  font-weight: bold;
  font-size: 16px;
}

/* 编辑器容器样式 */
.editor-container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0 0 8px 8px;
}

.editor-content {
  flex: 1;
  padding: 20px;
  outline: none;
  font-size: 16px;
  line-height: 1.7;
  color: #334155;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.editor-content:empty::before {
  content: attr(placeholder);
  color: #94a3b8;
  pointer-events: none;
  font-style: italic;
}

.editor-content:focus {
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
  box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.1);
}

.preview-content {
  flex: 1;
  padding: 20px;
  background: #fafafa;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.7;
  color: #334155;
}

/* 字符数统计样式 */
.char-counter {
  position: absolute;
  bottom: 8px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 6px;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  pointer-events: none;
  user-select: none;
  z-index: 10;
}

.char-counter:hover {
  background: rgba(255, 255, 255, 0.95);
}

.char-count {
  font-weight: 600;
  opacity: 0.8;
  font-variant-numeric: tabular-nums;
}

.char-label {
  font-size: 11px;
  opacity: 0.8;
}

/* 状态栏样式 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  font-size: 12px;
  color: #6b7280;
}

.status-left,
.status-right {
  display: flex;
  gap: 16px;
}

.char-count-status {
  font-variant-numeric: tabular-nums;
}

/* 编辑器内容样式 */
.editor-content :deep(h1),
.preview-content :deep(h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 1em 0 0.5em 0;
  color: #1f2937;
}

.editor-content :deep(h2),
.preview-content :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 1em 0 0.5em 0;
  color: #374151;
}

.editor-content :deep(h3),
.preview-content :deep(h3) {
  font-size: 1.25em;
  font-weight: bold;
  margin: 1em 0 0.5em 0;
  color: #4b5563;
}

.editor-content :deep(h4),
.preview-content :deep(h4) {
  font-size: 1.1em;
  font-weight: bold;
  margin: 1em 0 0.5em 0;
  color: #6b7280;
}

.editor-content :deep(ul),
.preview-content :deep(ul) {
  list-style-type: disc;
  margin: 1em 0;
  padding-left: 2em;
}

.editor-content :deep(ol),
.preview-content :deep(ol) {
  list-style-type: decimal;
  margin: 1em 0;
  padding-left: 2em;
}

.editor-content :deep(table),
.preview-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.editor-content :deep(td),
.editor-content :deep(th),
.preview-content :deep(td),
.preview-content :deep(th) {
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  text-align: left;
}

.editor-content :deep(th),
.preview-content :deep(th) {
  background: #f3f4f6;
  font-weight: bold;
}

.editor-content :deep(img),
.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.editor-content :deep(img:hover),
.preview-content :deep(img:hover) {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.editor-content :deep(.image-wrapper),
.preview-content :deep(.image-wrapper) {
  margin: 8px 0;
  text-align: center;
}

.editor-content :deep(a),
.preview-content :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.editor-content :deep(a:hover),
.preview-content :deep(a:hover) {
  color: #1d4ed8;
}

/* SVG公式样式 */
.editor-content :deep(svg[data-latex]),
.preview-content :deep(svg[data-latex]) {
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

.editor-content :deep(svg[data-latex].editing) {
  background: #fef3c7;
  border-color: #f59e0b;
  animation: pulse-editing 1s infinite;
}

/* 确保SVG内的文本也有合适的大小 */
.editor-content :deep(svg[data-latex] text),
.preview-content :deep(svg[data-latex] text) {
  font-size: 16px !important;
  font-family: 'Times New Roman', 'KaTeX_Main', serif !important;
}

/* 针对行内公式的特殊样式 */
.editor-content :deep(svg[data-latex-type="inline"]),
.preview-content :deep(svg[data-latex-type="inline"]) {
  font-size: 22px !important;
  min-height: 20px;
  vertical-align: baseline;
}

/* 针对行间公式的特殊样式 */
.editor-content :deep(svg[data-latex-type="display"]),
.preview-content :deep(svg[data-latex-type="display"]) {
  font-size: 22px !important;
  min-height: 28px;
  display: inline-block;
  margin: 4px 8px;
}

@keyframes pulse-editing {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* 工具栏按钮动画效果 */
.toolbar-btn {
  position: relative;
  overflow: hidden;
}

.toolbar-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.toolbar-btn:hover::before {
  left: 100%;
}

/* 入场动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toolbar {
    flex-wrap: wrap;
    padding: 10px 16px;
    gap: 6px;
  }
  
  .toolbar-btn {
    padding: 6px 10px;
    font-size: 13px;
    height: 32px;
    min-width: 32px;
  }
  
  .formula-btn,
  .link-btn,
  .image-btn,
  .table-btn,
  .clear-btn {
    padding: 6px 12px !important;
    font-size: 12px !important;
  }
  
  .math-group .toolbar-btn:not(.formula-btn) {
    min-width: 32px !important;
    height: 32px !important;
  }
  
  .editor-content {
    padding: 16px;
    font-size: 15px;
  }
  
  .preview-content {
    padding: 16px;
    font-size: 15px;
  }
  
  .status-bar {
    padding: 6px 12px;
    font-size: 11px;
  }
  
  .status-left,
  .status-right {
    gap: 8px;
  }
  
  .divider {
    height: 16px;
    margin: 0 4px;
  }
  
  .char-counter {
    bottom: 6px;
    right: 10px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .toolbar {
    padding: 8px 12px;
    gap: 4px;
  }
  
  .toolbar-btn {
    padding: 4px 8px;
    font-size: 12px;
    height: 28px;
    min-width: 28px;
  }
  
  .formula-btn,
  .link-btn,
  .image-btn,
  .table-btn,
  .clear-btn {
    padding: 4px 8px !important;
    font-size: 11px !important;
  }
  
  .math-group .toolbar-btn:not(.formula-btn) {
    min-width: 28px !important;
    height: 28px !important;
  }
  
  .editor-content {
    padding: 12px;
    font-size: 14px;
  }
  
  .preview-content {
    padding: 12px;
    font-size: 14px;
  }
  
  .heading-select {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  .divider {
    height: 12px;
    margin: 0 2px;
  }
}
</style> 