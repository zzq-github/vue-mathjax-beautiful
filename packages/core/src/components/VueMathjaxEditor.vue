<template>
  <div class="vue-mathjax-editor" :class="{ 'full-screen': isFullScreen, 'theme-dark': internalTheme === 'dark', 'theme-light': internalTheme === 'light' }">
    <!-- 工具栏 -->
    <div class="toolbar" v-if="showToolbar">
      <!-- 基础格式工具 -->
      <div class="format-group">
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('bold') }"
          @click="toggleFormat('bold')"
          title="粗体 (Ctrl+B) - 点击激活后，输入的文本将自动应用此格式"
        >
          <strong>B</strong>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('italic') }"
          @click="toggleFormat('italic')"
          title="斜体 (Ctrl+I) - 点击激活后，输入的文本将自动应用此格式"
        >
          <em>I</em>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('underline') }"
          @click="toggleFormat('underline')"
          title="下划线 (Ctrl+U) - 点击激活后，输入的文本将自动应用此格式"
        >
          <u>U</u>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: isFormatActive('strikethrough') }"
          @click="toggleFormat('strikethrough')"
          title="删除线 - 点击激活后，输入的文本将自动应用此格式"
        >
          <s>S</s>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 字体工具 -->
      <div class="font-group">
        <!-- 字体大小 -->
        <div class="font-size-container">
          <select
            v-model="currentFontSize"
            @change="changeFontSize"
            class="font-size-select"
            title="字体大小"
          >
            <option value="12px">12px</option>
            <option value="13px">13px</option>
            <option value="14px">14px</option>
            <option value="15px">15px</option>
            <option value="16px">16px</option>
            <option value="17px">17px</option>
            <option value="18px">18px</option>
            <option value="19px">19px</option>
            <option value="20px">20px</option>
            <option value="21px">21px</option>
            <option value="22px">22px</option>
            <option value="23px">23px</option>
            <option value="24px">24px</option>
            <option value="25px">25px</option>
            <option value="26px">26px</option>
            <option value="27px">27px</option>
            <option value="28px">28px</option>
            <option value="30px">30px</option>
            <option value="33px">33px</option>
            <option value="36px">36px</option>
            <option value="40px">40px</option>
            <option value="48px">48px</option>
            <option value="56px">56px</option>
            <option value="64px">64px</option>
            <option value="72px">72px</option>
            <option value="80px">80px</option>
            <option value="96px">96px</option>
          </select>
        </div>

        <!-- 字体颜色 -->
        <div class="color-picker-container">
          <input
            ref="colorInput"
            type="color"
            v-model="currentTextColor"
            @change="changeTextColor"
            class="color-input"
            title="字体颜色"
          />
          <button
            class="toolbar-btn color-btn"
            @click="colorInput?.click()"
            title="字体颜色"
          >
            <span class="color-icon" :style="{ color: currentTextColor }">A</span>
            <span class="color-indicator" :style="{ backgroundColor: currentTextColor }"></span>
          </button>
        </div>

        <!-- 背景颜色 -->
        <div class="color-picker-container">
          <input
            ref="bgColorInput"
            type="color"
            v-model="currentBgColor"
            @change="changeBgColor"
            class="color-input"
            title="背景颜色"
          />
          <button
            class="toolbar-btn bg-color-btn"
            @click="bgColorInput?.click()"
            title="背景颜色"
          >
            <span class="bg-icon">🎨</span>
          </button>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 文本对齐工具 -->
      <div class="align-group">
        <button
          class="toolbar-btn"
          :class="{ active: currentAlignment === 'left' }"
          @click="setAlignment('left')"
          title="左对齐"
        >
          <span class="align-icon align-left">L</span>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: currentAlignment === 'center' }"
          @click="setAlignment('center')"
          title="居中对齐"
        >
          <span class="align-icon align-center">C</span>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: currentAlignment === 'right' }"
          @click="setAlignment('right')"
          title="右对齐"
        >
          <span class="align-icon align-right">R</span>
        </button>
        <button
          class="toolbar-btn"
          :class="{ active: currentAlignment === 'justify' }"
          @click="setAlignment('justify')"
          title="两端对齐"
        >
          <span class="align-icon align-justify">J</span>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 公式工具 -->
      <div class="math-group">
        <button class="toolbar-btn formula-btn" @click="showFormulaEditor" title="插入数学公式">
          <span class="fx-icon">fx</span>
          <span>公式</span>
        </button>
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

        <div class="divider"></div>

        <button class="toolbar-btn clear-btn" @click="clearFormat" title="清除格式">
          <span class="icon">🧹</span>
          <span>清除</span>
        </button>

        <div class="divider"></div>

        <button class="toolbar-btn theme-btn" @click="toggleTheme" :title="themeButtonTitle">
          <span class="icon">{{ themeIcon }}</span>
          <span>主题</span>
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
      :theme="internalTheme"
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
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '开始编写您的内容...',
  minHeight: '300px',
  showToolbar: true,
  readonly: false,
  theme: 'light',
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
const colorInput = ref<HTMLInputElement>()
const bgColorInput = ref<HTMLInputElement>()

const showFormula = ref(false)
const editingLatex = ref('')
const editingFormulaElement = ref<HTMLElement | null>(null)
const isFullScreen = ref(false)
const content = ref('')
const charCount = ref(0)
const uploadLoading = ref(false)
const activeFormats = ref(new Set<string>())

// 新增的样式控制变量
const currentFontSize = ref('16px')
const currentTextColor = ref('#334155')
const currentBgColor = ref('#ffffff')
const currentAlignment = ref('left')

// 组件内部主题状态（独立于外部传入的theme）
const internalTheme = ref(props.theme)
const hasUserChangedTheme = ref(false)

// 主题相关计算属性
const themeIcon = computed(() => {
  return internalTheme.value === 'dark' ? '☀️' : '🌙'
})

const themeButtonTitle = computed(() => {
  return internalTheme.value === 'dark' ? '切换到亮色主题' : '切换到暗色主题'
})

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

// 监听外部主题变化（仅在初始化时同步，之后组件内部独立控制）
watch(() => props.theme, (newTheme) => {
  // 只有在组件内部主题还没有被用户手动修改时才同步外部主题
  if (!hasUserChangedTheme.value) {
    internalTheme.value = newTheme
  }
}, { immediate: true })

// 监听内部主题变化
watch(internalTheme, (newTheme, oldTheme) => {
  if (oldTheme !== undefined) {
    hasUserChangedTheme.value = true
  }
  console.log('富文本编辑器内部主题变化:', newTheme)
})

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

// 格式检查 - 检查当前选区或光标位置的格式状态
const isFormatActive = (format: string): boolean => {
  // 只检查用户主动激活的格式，不检查光标位置的格式
  return activeFormats.value.has(format)
}

// 切换格式
const toggleFormat = (format: string) => {
  if (!editorRef.value) return

  try {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    
    if (!range.collapsed) {
      // 有选中文字，直接应用格式
      document.execCommand(format, false)
      // 清除激活格式状态
      activeFormats.value.clear()
    } else {
      // 没有选中文字，切换激活状态（完全互斥模式）
      if (activeFormats.value.has(format)) {
        // 如果已经激活，则取消激活
        activeFormats.value.clear()
      } else {
        // 清除所有格式，只激活当前格式
        activeFormats.value.clear()
        activeFormats.value.add(format)
      }
    }
    
    editorRef.value.focus()
    handleInput()
  } catch (error) {
    console.warn('切换格式失败:', error)
  }
}

// 更新格式状态
const updateFormatState = () => {
  // 这个函数现在主要用于兼容性，实际格式状态由activeFormats管理
  // 但我们可以用它来检查光标位置的实际格式状态
  const formats = ['bold', 'italic', 'underline', 'strikethrough']
  
  // 如果没有激活的格式，检查光标位置的格式状态来更新UI显示
  if (activeFormats.value.size === 0) {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      if (range.collapsed) {
        // 光标位置，检查当前位置的格式状态
        formats.forEach(format => {
          if (document.queryCommandState(format)) {
            // 注意：这里不添加到activeFormats，只是为了UI显示
            // 实际的激活状态仍由用户操作控制
          }
        })
      }
    }
  }
}

// 处理输入前事件
const handleBeforeInput = (event: Event) => {
  const inputEvent = event as InputEvent
  // 如果有激活的格式状态，应用格式
  if (activeFormats.value.size > 0 && inputEvent.inputType === 'insertText' && inputEvent.data) {
    event.preventDefault()
    
    let wrappedText = inputEvent.data
    
    // 应用唯一的激活格式
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
    
    // 插入格式化的文字
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

// 更新选区状态
const updateSelection = () => {
  if (!editorRef.value) return

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) {
    // 如果没有选区，保持当前格式状态
    return
  }

  const range = selection.getRangeAt(0)
  
  // 如果有选中的文字，清除激活格式状态（因为要对选中文字应用格式）
  if (!range.collapsed) {
    activeFormats.value.clear()
  }
  
  // 更新格式状态
  updateFormatState()
  
  // 更新当前样式状态
  updateCurrentStyles()
}

// 更新当前样式状态
const updateCurrentStyles = () => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  let element = range.commonAncestorContainer
  
  // 如果选中的是文本节点，获取其父元素
  if (element.nodeType === Node.TEXT_NODE && element.parentElement) {
    element = element.parentElement
  }
  
  if (element && element instanceof HTMLElement && editorRef.value?.contains(element)) {
    // 获取当前元素的样式
    const computedStyle = window.getComputedStyle(element)
    
    // 更新字体大小
    currentFontSize.value = computedStyle.fontSize || '16px'
    
    // 更新字体颜色
    const color = computedStyle.color
    if (color && color !== 'rgb(51, 65, 85)') {
      currentTextColor.value = rgbToHex(color) || '#334155'
    }
    
    // 更新背景颜色
    const bgColor = computedStyle.backgroundColor
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      currentBgColor.value = rgbToHex(bgColor) || '#ffffff'
    }
    
    // 更新对齐方式
    const textAlign = computedStyle.textAlign || 'left'
    currentAlignment.value = textAlign as 'left' | 'center' | 'right' | 'justify'
  }
}

// RGB颜色转换为十六进制
const rgbToHex = (rgb: string): string | null => {
  const result = rgb.match(/\d+/g)
  if (!result || result.length < 3) return null
  
  const r = parseInt(result[0])
  const g = parseInt(result[1]) 
  const b = parseInt(result[2])
  
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// 改变字体大小
const changeFontSize = () => {
  if (!editorRef.value) return
  
  try {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    
    const range = selection.getRangeAt(0)
    
    if (range.collapsed) {
      // 光标位置，为后续输入设置字体大小
      editorRef.value.focus()
      return
    }
    
    // 有选中文本，应用字体大小
    const selectedContent = range.extractContents()
    const span = document.createElement('span')
    span.style.fontSize = currentFontSize.value
    span.appendChild(selectedContent)
    
    range.insertNode(span)
    range.selectNode(span)
    selection.removeAllRanges()
    selection.addRange(range)
    
    editorRef.value.focus()
    handleInput()
  } catch (error) {
    console.warn('改变字体大小失败:', error)
  }
}

// 改变字体颜色
const changeTextColor = () => {
  if (!editorRef.value) return
  
  try {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    
    const range = selection.getRangeAt(0)
    
    if (range.collapsed) {
      // 光标位置，为后续输入设置颜色
      editorRef.value.focus()
      return
    }
    
    // 有选中文本，应用颜色
    const selectedContent = range.extractContents()
    const span = document.createElement('span')
    span.style.color = currentTextColor.value
    span.appendChild(selectedContent)
    
    range.insertNode(span)
    range.selectNode(span)
    selection.removeAllRanges()
    selection.addRange(range)
    
    editorRef.value.focus()
    handleInput()
  } catch (error) {
    console.warn('改变字体颜色失败:', error)
  }
}

// 改变背景颜色
const changeBgColor = () => {
  if (!editorRef.value) return
  
  try {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    
    const range = selection.getRangeAt(0)
    
    if (range.collapsed) {
      // 光标位置，为后续输入设置背景色
      editorRef.value.focus()
      return
    }
    
    // 有选中文本，应用背景色
    const selectedContent = range.extractContents()
    const span = document.createElement('span')
    span.style.backgroundColor = currentBgColor.value
    span.appendChild(selectedContent)
    
    range.insertNode(span)
    range.selectNode(span)
    selection.removeAllRanges()
    selection.addRange(range)
    
    editorRef.value.focus()
    handleInput()
  } catch (error) {
    console.warn('改变背景颜色失败:', error)
  }
}

// 设置文本对齐
const setAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
  if (!editorRef.value) return
  
  try {
    currentAlignment.value = alignment
    
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      // 没有选区，设置整个编辑器的对齐方式
      editorRef.value.style.textAlign = alignment
      editorRef.value.focus()
      handleInput()
      return
    }
    
    const range = selection.getRangeAt(0)
    
    // 找到包含选区的块级元素
    let blockElement: Node | null = range.commonAncestorContainer
    while (blockElement && blockElement !== editorRef.value) {
      if (blockElement.nodeType === Node.ELEMENT_NODE) {
        const element = blockElement as HTMLElement
        const display = window.getComputedStyle(element).display
        if (display === 'block' || display === 'list-item' || element.tagName === 'DIV' || element.tagName === 'P') {
          break
        }
      }
      blockElement = blockElement.parentNode
    }
    
    if (blockElement && blockElement !== editorRef.value && blockElement instanceof HTMLElement) {
      // 设置块级元素的对齐方式
      blockElement.style.textAlign = alignment
    } else {
      // 如果没有找到合适的块级元素，创建一个div包装选中内容
      const selectedContent = range.extractContents()
      const div = document.createElement('div')
      div.style.textAlign = alignment
      div.appendChild(selectedContent)
      
      range.insertNode(div)
      range.selectNodeContents(div)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    
    editorRef.value.focus()
    handleInput()
  } catch (error) {
    console.warn('设置文本对齐失败:', error)
  }
}

// 插入公式
const insertFormula = async (latex: string) => {
  if (!editorRef.value) return

  console.log('开始插入公式:', latex)

  try {
    // 确保MathJax已经初始化
    if (!window.MathJax?.tex2svgPromise) {
      console.warn('MathJax未初始化，正在尝试初始化...')
      await initMathJax()
    }

    // 再次检查MathJax是否可用
    if (!window.MathJax?.tex2svgPromise) {
      throw new Error('MathJax初始化失败，无法渲染公式')
    }

    // 转换LaTeX为SVG
    console.log('开始转换LaTeX为SVG...')
    const svgHtml = await convertLatexToSvg(`$$${latex}$$`)
    console.log('转换结果:', svgHtml)

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
    await nextTick()
    setupFormulaClickEvents()

    console.log('公式插入成功')
  } catch (error) {
    console.error('插入公式失败:', error)
    // 如果SVG转换失败，作为备用方案插入LaTeX文本
    try {
      editorRef.value.focus()
      document.execCommand('insertHTML', false, `$$${latex}$$`)
      handleInput()
    } catch (fallbackError) {
      console.error('备用插入也失败:', fallbackError)
    }
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
const clearFormat = async () => {
  if (!editorRef.value) return

  try {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      // 没有选区，清除所有激活的格式状态
      activeFormats.value.clear()
      editorRef.value.focus()
      return
    }

    const range = selection.getRangeAt(0)
    
    if (range.collapsed) {
      // 光标位置，清除激活的格式状态
      activeFormats.value.clear()
      editorRef.value.focus()
      return
    }

    // 有选中文本，清除选中文本的格式
    await clearSelectionFormat(range)
    
    // 清除激活的格式状态
    activeFormats.value.clear()
    editorRef.value.focus()
    handleInput()
  } catch (error) {
    console.warn('清除格式失败:', error)
  }
}

// 清除选中文本的格式
const clearSelectionFormat = async (range: Range) => {
  if (!editorRef.value) return

  // 获取选中的内容
  const selectedContent = range.extractContents()
  
  // 创建一个临时容器来处理内容
  const tempContainer = document.createElement('div')
  tempContainer.appendChild(selectedContent)
  
  // 保存数学公式和图片
  const formulas: Array<{element: Element, placeholder: Text}> = []
  const images: Array<{element: Element, placeholder: Text}> = []
  
  // 保存SVG公式
  const svgFormulas = tempContainer.querySelectorAll('svg[data-latex]')
  svgFormulas.forEach((svg, index) => {
    const placeholder = document.createTextNode(`__FORMULA_${index}__`)
    formulas.push({element: svg.cloneNode(true) as Element, placeholder})
    svg.parentNode?.replaceChild(placeholder, svg)
  })
  
  // 保存传统公式
  const spanFormulas = tempContainer.querySelectorAll('.math-formula')
  spanFormulas.forEach((formula, index) => {
    const placeholder = document.createTextNode(`__SPAN_FORMULA_${index}__`)
    formulas.push({element: formula.cloneNode(true) as Element, placeholder})
    formula.parentNode?.replaceChild(placeholder, formula)
  })
  
  // 保存图片
  const imgElements = tempContainer.querySelectorAll('img')
  imgElements.forEach((img, index) => {
    const placeholder = document.createTextNode(`__IMAGE_${index}__`)
    images.push({element: img.cloneNode(true) as Element, placeholder})
    img.parentNode?.replaceChild(placeholder, img)
  })
  
  // 获取纯文本内容（移除所有HTML格式）
  let cleanText = tempContainer.textContent || ''
  
  // 恢复公式和图片的占位符
  formulas.forEach(({placeholder}, index) => {
    cleanText = cleanText.replace(`__FORMULA_${index}__`, `__FORMULA_${index}__`)
    cleanText = cleanText.replace(`__SPAN_FORMULA_${index}__`, `__SPAN_FORMULA_${index}__`)
  })
  
  images.forEach(({placeholder}, index) => {
    cleanText = cleanText.replace(`__IMAGE_${index}__`, `__IMAGE_${index}__`)
  })
  
  // 创建新的内容容器
  const newContainer = document.createElement('div')
  newContainer.textContent = cleanText
  
  // 恢复公式
  formulas.forEach(({element}, index) => {
    const formulaPlaceholder = `__FORMULA_${index}__`
    const spanFormulaPlaceholder = `__SPAN_FORMULA_${index}__`
    
    if (newContainer.textContent?.includes(formulaPlaceholder)) {
      newContainer.innerHTML = newContainer.innerHTML.replace(formulaPlaceholder, element.outerHTML)
    }
    if (newContainer.textContent?.includes(spanFormulaPlaceholder)) {
      newContainer.innerHTML = newContainer.innerHTML.replace(spanFormulaPlaceholder, element.outerHTML)
    }
  })
  
  // 恢复图片
  images.forEach(({element}, index) => {
    const imagePlaceholder = `__IMAGE_${index}__`
    if (newContainer.textContent?.includes(imagePlaceholder)) {
      newContainer.innerHTML = newContainer.innerHTML.replace(imagePlaceholder, element.outerHTML)
    }
  })
  
  // 创建文档片段
  const fragment = document.createDocumentFragment()
  while (newContainer.firstChild) {
    fragment.appendChild(newContainer.firstChild)
  }
  
  // 插入清理后的内容
  range.insertNode(fragment)
  
  // 重新设置选区
  range.collapse(false)
  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
  // 重新设置公式点击事件
  await nextTick()
  setupFormulaClickEvents()
}

// 主题切换方法（仅影响当前组件）
const toggleTheme = () => {
  internalTheme.value = internalTheme.value === 'dark' ? 'light' : 'dark'
  hasUserChangedTheme.value = true
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

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  // 按Escape键清除格式状态
  if (event.key === 'Escape') {
    activeFormats.value.clear()
    updateSelection()
    return
  }

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

  // 某些键会重置格式状态
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
    // 延迟重置格式状态，让光标移动完成
    setTimeout(() => {
      activeFormats.value.clear()
      updateSelection()
    }, 0)
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
  console.log('VueMathjaxEditor组件挂载，开始初始化MathJax...')
  
  try {
    // 初始化MathJax
    await initMathJax()
    console.log('MathJax初始化成功，可用方法:', Object.keys(window.MathJax || {}))

    // 设置初始内容
    if (props.modelValue && editorRef.value) {
      console.log('设置初始内容:', props.modelValue)
      const htmlContent = await convertFromStandardSyntax(props.modelValue)
      editorRef.value.innerHTML = htmlContent
      await nextTick()
      setupFormulaClickEvents()
    }



    updateStats()
    console.log('VueMathjaxEditor初始化完成')
  } catch (error) {
    console.error('VueMathjaxEditor初始化失败:', error)
  }
})



onUnmounted(() => {
  // 清理资源
})
</script>

<style scoped>
/* 确保基础样式生效 */
* {
  box-sizing: border-box;
}

.vue-mathjax-editor {
  display: flex;
  flex-direction: column;
  /* border-radius: 8px; */
  background: white;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vue-mathjax-editor:hover {
  /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); */
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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  gap: 12px;
  flex-wrap: wrap;
  backdrop-filter: blur(10px);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  position: relative;
}

.toolbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
}

.format-group,
.math-group,
.insert-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.font-group,
.align-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 字体大小选择器基础样式 */
.font-size-container {
  position: relative;
}

.font-size-select {
  padding: 8px 32px 8px 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  height: 40px;
  min-width: 85px;
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.font-size-select:hover {
  background-color: rgba(255, 255, 255, 0.95);
  border-color: #6366f1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
  color: #334155;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.font-size-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background-color: rgba(255, 255, 255, 1);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.font-size-select option {
  background: white;
  color: #374151;
  padding: 8px 12px;
  font-weight: 500;
  line-height: 1.4;
  min-height: 32px;
}

.font-size-select option:hover {
  background: #f8fafc;
  color: #6366f1;
}

.font-size-select option:checked {
  background: #6366f1;
  color: white;
  font-weight: 600;
}

/* 字体选择框滚动条美化 */
.font-size-select::-webkit-scrollbar {
  width: 8px;
}

.font-size-select::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.8);
  border-radius: 4px;
  margin: 2px;
}

.font-size-select::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.font-size-select::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
  transform: scaleX(1.2);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
}

.font-size-select::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
}

/* Firefox滚动条样式 */
.font-size-select {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 rgba(241, 245, 249, 0.8);
}

/* 通过CSS控制下拉框最大高度 */
.font-size-select {
  /* 大多数现代浏览器支持这个属性来限制下拉高度 */
  /* 显示大约8-10个选项的高度 */
  -webkit-appearance: listbox;
  -moz-appearance: menulist;
}

/* 针对不同浏览器的高度控制 */
@supports (-webkit-appearance: none) {
  .font-size-select {
    /* Webkit浏览器 */
    max-height: 280px;
  }
}

@-moz-document url-prefix() {
  .font-size-select {
    /* Firefox */
    max-height: 280px;
  }
}





/* 颜色选择器容器 */
.color-picker-container {
  position: relative;
}

.color-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 1px;
  height: 1px;
}

.color-btn,
.bg-color-btn {
  position: relative;
  min-width: 44px !important;
  padding: 10px 12px !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  gap: 4px !important;
  overflow: hidden;
}

.color-btn:hover,
.bg-color-btn:hover {
  background: rgba(255, 255, 255, 1) !important;
  border-color: #6366f1 !important;
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15) !important;
}

.color-icon {
  font-size: 18px;
  font-weight: 900;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.color-btn:hover .color-icon {
  transform: scale(1.1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.color-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.color-btn:hover .color-indicator {
  height: 4px;
  width: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.bg-icon {
  font-size: 16px;
  transition: all 0.2s ease;
}

.bg-color-btn:hover .bg-icon {
  transform: scale(1.1) rotate(5deg);
}

/* 对齐工具按钮 */
.align-group .toolbar-btn {
  min-width: 44px !important;
  padding: 10px 12px !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.align-group .toolbar-btn:hover {
  background: rgba(255, 255, 255, 1) !important;
  border-color: #6366f1 !important;
  color: #6366f1 !important;
}

.align-group .toolbar-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  border-color: transparent !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
}

.align-icon {
  font-size: 14px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  width: 18px;
  height: 16px;
  gap: 2px;
}

.align-icon.align-left::before {
  content: '';
  width: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-left::after {
  content: '';
  width: 10px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-center {
  align-items: center;
}

.align-icon.align-center::before {
  content: '';
  width: 12px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-center::after {
  content: '';
  width: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-right {
  align-items: flex-end;
}

.align-icon.align-right::before {
  content: '';
  width: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-right::after {
  content: '';
  width: 10px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-justify::before {
  content: '';
  width: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.align-icon.align-justify::after {
  content: '';
  width: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 隐藏文字，只显示图标 */
.align-left,
.align-center,
.align-right,
.align-justify {
  color: #64748b;
  font-size: 0;
}

/* 亮色主题下的图标颜色优化 */
.vue-mathjax-editor.theme-light .align-icon {
  color: #475569;
}

.vue-mathjax-editor.theme-light .align-group .toolbar-btn:hover .align-icon {
  color: #6366f1;
  transform: scale(1.05);
}

.vue-mathjax-editor.theme-light .align-group .toolbar-btn.active .align-icon {
  color: white;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.align-group .toolbar-btn:hover .align-icon {
  transform: scale(1.05);
}

/* 暗色主题下的对齐图标 */
.vue-mathjax-editor.theme-dark .align-icon {
  color: #e5e7eb;
}

.vue-mathjax-editor.theme-dark .align-group .toolbar-btn:hover .align-icon {
  color: #60a5fa;
  transform: scale(1.05);
}

.vue-mathjax-editor.theme-dark .align-group .toolbar-btn.active .align-icon {
  color: white;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.toolbar-btn {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-weight: 600; */
  color: #475569;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  gap: 6px;
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

.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #334155;
}

.toolbar-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.toolbar-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.toolbar-btn:disabled:hover {
  transform: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.divider {
  width: 1px;
  height: 24px;
  background: linear-gradient(to bottom, transparent 0%, #cbd5e1 20%, #cbd5e1 80%, transparent 100%);
  margin: 0 12px;
  opacity: 0.6;
}

.formula-btn {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
  color: #6366f1 !important;
  border: 1px solid rgba(99, 102, 241, 0.2) !important;
  min-width: auto !important;
  padding: 10px 18px !important;
  font-weight: 700 !important;
}

.formula-btn:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%) !important;
  color: #4f46e5 !important;
  border-color: rgba(99, 102, 241, 0.3) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

.fx-icon {
  font-weight: bold;
  font-style: italic;
  color: #6366f1;
  font-size: 18px;
  text-shadow: 0 1px 2px rgba(99, 102, 241, 0.2);
  margin-right: 4px;
}

.image-btn {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%) !important;
  color: #059669 !important;
  border: 1px solid rgba(34, 197, 94, 0.2) !important;
  min-width: auto !important;
  padding: 10px 18px !important;
  font-weight: 700 !important;
}

.image-btn:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%) !important;
  color: #047857 !important;
  border-color: rgba(34, 197, 94, 0.3) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

.clear-btn {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 101, 101, 0.1) 100%) !important;
  color: #dc2626 !important;
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  min-width: auto !important;
  padding: 10px 18px !important;
  font-weight: 700 !important;
}

.clear-btn:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 101, 101, 0.2) 100%) !important;
  color: #b91c1c !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

.loading-icon {
  animation: spin 1s linear infinite;
  font-size: 16px;
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
  background: white;
}

.editor-content {
  flex: 1;
  padding: 24px;
  outline: none;
  font-size: 16px;
  line-height: 1.7;
  color: #334155;
  overflow-y: auto;
  transition: all 0.3s ease;
  background: white;
}

.editor-content:focus {
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
  box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.1);
}

.editor-content:empty:before {
  content: attr(placeholder);
  color: #94a3b8;
  font-style: italic;
  pointer-events: none;
}

.char-counter {
  position: absolute;
  bottom: 16px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: 8px;
  backdrop-filter: blur(12px);
  transition: all 0.2s ease;
  pointer-events: none;
  user-select: none;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.6);
}

.char-counter:hover {
  background: rgba(255, 255, 255, 0.98);
  border-color: rgba(156, 163, 175, 0.8);
  transform: translateY(-1px);
}

.char-count {
  font-weight: 700;
  color: #374151;
  font-variant-numeric: tabular-nums;
}

.char-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

/* 编辑器内容样式 */
.editor-content :deep(strong) {
  font-weight: 700;
  color: #1f2937;
}

.editor-content :deep(em) {
  font-style: italic;
  color: #374151;
}

.editor-content :deep(u) {
  text-decoration: underline;
  text-decoration-color: #6366f1;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
}

.editor-content :deep(s) {
  text-decoration: line-through;
  text-decoration-color: #ef4444;
  text-decoration-thickness: 2px;
  opacity: 0.7;
}

.editor-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 12px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(226, 232, 240, 0.6);
}

.editor-content :deep(img:hover) {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: #6366f1;
}

/* SVG公式样式 */
.editor-content :deep(svg[data-latex]) {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  padding: 4px 8px;
  margin: 0 4px;
  background: transparent;
  border: 1px solid transparent;
  font-size: 18px !important;
  min-height: 24px;
  vertical-align: middle;
}

.editor-content :deep(svg[data-latex]:hover) {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-color: #6366f1;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.1), 0 2px 4px -1px rgba(99, 102, 241, 0.06);
}

.editor-content :deep(svg[data-latex-type='inline']) {
  font-size: 30px !important;
  min-height: 20px;
  vertical-align: baseline;
  padding: 2px 6px;
}

.editor-content :deep(svg[data-latex-type='display']) {
  font-size: 30px !important;
  min-height: 28px;
  display: inline-block;
  margin: 8px 12px;
  padding: 6px 12px;
}

/* 添加微妙的动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.vue-mathjax-editor {
  animation: fadeInUp 0.4s ease-out;
}

/* 格式按钮特殊样式 */
.format-group .toolbar-btn {
  font-size: 16px !important;
  min-width: 44px !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.format-group .toolbar-btn:hover {
  background: rgba(255, 255, 255, 1) !important;
  border-color: #6366f1 !important;
  color: #6366f1 !important;
}

.format-group .toolbar-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  border-color: transparent !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vue-mathjax-editor {
    border-radius: 8px;
  }

  .toolbar {
    flex-wrap: wrap;
    padding: 12px 16px;
    gap: 8px;
  }
  
  .toolbar-btn {
    padding: 8px 12px;
    font-size: 13px;
    height: 36px;
    min-width: 36px;
  }
  
  .formula-btn,
  .image-btn,
  .clear-btn {
    padding: 8px 14px !important;
    font-size: 12px !important;
  }
  
  .format-group .toolbar-btn {
    font-size: 14px !important;
    min-width: 36px !important;
  }
  
  .divider {
    height: 20px;
    margin: 0 8px;
  }
  
  .editor-content {
    padding: 18px;
    font-size: 15px;
    line-height: 1.6;
  }
  
  .char-counter {
    bottom: 12px;
    right: 16px;
    font-size: 11px;
    padding: 4px 8px;
  }
  
  .fx-icon {
    font-size: 16px;
    margin-right: 2px;
  }
}

@media (max-width: 480px) {
  .toolbar {
    padding: 10px 12px;
    gap: 6px;
  }
  
  .toolbar-btn {
    padding: 6px 10px;
    font-size: 12px;
    height: 32px;
    min-width: 32px;
  }
  
  .formula-btn,
  .image-btn,
  .clear-btn {
    padding: 6px 12px !important;
    font-size: 11px !important;
  }
  
  .font-size-select {
    height: 32px !important;
    min-width: 70px !important;
    font-size: 11px !important;
    padding: 6px 8px !important;
  }
  
  .color-btn,
  .bg-color-btn,
  .align-group .toolbar-btn {
    height: 32px !important;
    min-width: 32px !important;
    padding: 6px 8px !important;
  }
  
  .editor-content {
    padding: 16px;
    font-size: 14px;
  }
  
  .char-counter {
    bottom: 10px;
    right: 12px;
    font-size: 10px;
    padding: 3px 6px;
  }
}

/* 暗色主题下的工具栏按钮样式 - 直接在组件中定义确保生效 */
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn {
  border-color: rgba(156, 163, 175, 0.4) !important;
  background: rgba(55, 65, 81, 0.8) !important;
  color: #e5e7eb !important;
}

.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn strong,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn em,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn u,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn s {
  color: #f3f4f6 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
  font-weight: 700 !important;
}

.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  border-color: #60a5fa !important;
  color: white !important;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}

.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn:hover:not(:disabled) strong,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn:hover:not(:disabled) em,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn:hover:not(:disabled) u,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn:hover:not(:disabled) s {
  color: white !important;
  text-shadow: none !important;
}

.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn.active {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  border-color: #60a5fa !important;
  color: white !important;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}

.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn.active strong,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn.active em,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn.active u,
.vue-mathjax-editor.theme-dark .toolbar .toolbar-btn.active s {
  color: white !important;
  text-shadow: none !important;
}

/* 暗色主题适配 */
.vue-mathjax-editor.theme-dark .font-size-select {
  background-color: rgba(55, 65, 81, 0.9) !important;
  border-color: rgba(156, 163, 175, 0.4) !important;
  color: #e5e7eb !important;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e5e7eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e") !important;
}

.vue-mathjax-editor.theme-dark .font-size-select:hover {
  background-color: rgba(75, 85, 99, 0.95) !important;
  border-color: #60a5fa !important;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2) !important;
  color: #f3f4f6 !important;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2360a5fa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e") !important;
}

.vue-mathjax-editor.theme-dark .font-size-select:focus {
  border-color: #60a5fa !important;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15) !important;
  background-color: rgba(55, 65, 81, 1) !important;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2360a5fa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e") !important;
}

.vue-mathjax-editor.theme-dark .font-size-select option {
  background-color: #374151 !important;
  color: #e5e7eb !important;
}

.vue-mathjax-editor.theme-dark .font-size-select option:hover {
  background-color: #4b5563 !important;
  color: #60a5fa !important;
}

.vue-mathjax-editor.theme-dark .font-size-select option:checked {
  background-color: #60a5fa !important;
  color: white !important;
  font-weight: 600;
}

.vue-mathjax-editor.theme-dark .color-btn,
.vue-mathjax-editor.theme-dark .bg-color-btn {
  background: rgba(55, 65, 81, 0.9) !important;
  border-color: rgba(156, 163, 175, 0.4) !important;
  color: #e5e7eb !important;
}

.vue-mathjax-editor.theme-dark .color-btn:hover,
.vue-mathjax-editor.theme-dark .bg-color-btn:hover {
  background: rgba(75, 85, 99, 0.95) !important;
  border-color: #60a5fa !important;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2) !important;
  color: #f3f4f6 !important;
}

.vue-mathjax-editor.theme-dark .color-btn:hover .color-icon {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.vue-mathjax-editor.theme-dark .color-indicator {
  border-color: rgba(156, 163, 175, 0.6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.vue-mathjax-editor.theme-dark .color-btn:hover .color-indicator {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  border-color: rgba(96, 165, 250, 0.8);
}

.vue-mathjax-editor.theme-dark .align-group .toolbar-btn {
  background: rgba(55, 65, 81, 0.9) !important;
  border-color: rgba(156, 163, 175, 0.4) !important;
  color: #e5e7eb !important;
}

.vue-mathjax-editor.theme-dark .align-group .toolbar-btn:hover {
  background: rgba(75, 85, 99, 0.95) !important;
  border-color: #60a5fa !important;
  color: #60a5fa !important;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.15) !important;
}

.vue-mathjax-editor.theme-dark .align-group .toolbar-btn.active {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  border-color: transparent !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3) !important;
}

.vue-mathjax-editor.theme-dark .font-size-select option:checked {
  background-color: #60a5fa !important;
  color: white !important;
  font-weight: 600;
}

/* 暗色主题滚动条样式 */
.vue-mathjax-editor.theme-dark .font-size-select::-webkit-scrollbar-track {
  background: rgba(55, 65, 81, 0.8);
}

.vue-mathjax-editor.theme-dark .font-size-select::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
  border-color: rgba(156, 163, 175, 0.3);
}

.vue-mathjax-editor.theme-dark .font-size-select::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  box-shadow: 0 2px 4px rgba(96, 165, 250, 0.3);
}

.vue-mathjax-editor.theme-dark .font-size-select::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
}

/* Firefox 暗色主题滚动条 */
.vue-mathjax-editor.theme-dark .font-size-select {
  scrollbar-color: #6b7280 rgba(55, 65, 81, 0.8);
}

</style>
