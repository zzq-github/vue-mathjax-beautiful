<template>
  <div class="math-editor">
    <!-- 工具栏 -->
    <div class="toolbar">
      <!-- 格式按钮 -->
      <div class="format-group">
        <button
          @click="toggleFormat('bold')"
          :class="{ active: isFormatActive('bold') }"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          @click="toggleFormat('italic')"
          :class="{ active: isFormatActive('italic') }"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          @click="toggleFormat('underline')"
          :class="{ active: isFormatActive('underline') }"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          @click="toggleFormat('strikethrough')"
          :class="{ active: isFormatActive('strikethrough') }"
          title="Strikethrough"
        >
          <s>S</s>
        </button>
      </div>

      <div class="divider"></div>

      <!-- 快速插入 -->
      <!-- <div class="quick-group">
        <button @click="insertQuickFormula('\\sqrt{x}')" title="Square Root">
          <span class="btn-sqrt">
            <span class="btn-sqrt-radical">√</span>
            <span class="btn-sqrt-content">x</span>
          </span>
        </button>
        <button @click="insertQuickFormula('\\frac{a}{b}')" title="Fraction">
          <span class="btn-fraction">
            <span class="btn-numerator">a</span>
            <span class="btn-denominator">b</span>
          </span>
        </button>
        <button @click="insertQuickFormula('x^{2}')" title="Superscript">x²</button>
        <button @click="insertQuickFormula('x_{1}')" title="Subscript">x₁</button>
      </div> -->

      <!-- <div class="divider"></div> -->

      <!-- 数学公式按钮 -->
      <div class="math-group">
        <button
          @click="
            () => {
              ensureCursorInEditor();
              showFormulaEditor();
            }
          "
          class="formula-btn"
          title="Insert Math Formula"
        >
          <span class="fx-icon">fx</span>
          Formula
        </button>
      </div>

      <div class="divider"></div>

      <!-- 图片上传 -->
      <div class="image-group">
        <input
          ref="imageInputRef"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleImageUpload"
        />
        <button
          @click="triggerImageUpload"
          class="image-btn"
          title="Insert Image"
          :disabled="uploadLoading"
          :loading="uploadLoading"
        >
          <i v-if="uploadLoading" class="fa-solid fa-spinner fa-spin"></i>
          <i v-else class="fa-solid fa-image"></i>
          Image
        </button>
      </div>
      <div class="divider"></div>

      <!-- 清除格式工具 -->
      <div class="clear-group">
        <button @click="clearAllContentFormats" class="clear-all-btn" title="Clear All Formats">
          <i class="fa-solid fa-eraser"></i>
          Clear
        </button>
      </div>
    </div>

    <!-- 编辑器内容区域 -->
    <div class="editor-content">
      <div
        ref="editorRef"
        class="editor"
        contenteditable="true"
        @input="handleInput"
        @beforeinput="handleBeforeInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @mouseup="handleSelectionChange"
        @keyup="handleSelectionChange"
        :placeholder="placeholder"
      ></div>

      <!-- 字符数统计 -->
      <div class="char-counter">
        <span class="char-count">{{ characterCount }}</span>
        <span class="char-label">characters</span>
      </div>
    </div>

    <!-- 数学公式编辑器 -->
    <MathFormulaEditor
      v-model="showFormula"
      :existing-latex="editingLatex"
      @insert="insertFormula"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import MathFormulaEditor from './MathFormulaEditor.vue';
import { convertLatexToSvg } from '~/utils/latex';
import adminApi from '@/api/adminApi';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Please enter content...',
  },
});

const emit = defineEmits(['update:modelValue', 'edit-existing-formula']);

const editorRef = ref<HTMLElement>();
const imageInputRef = ref<HTMLInputElement>();
const showFormula = ref(false);
const currentFormats = ref(new Set());
const editingFormulaElement = ref<HTMLElement | null>(null);
const editingLatex = ref('');
const activeFormats = ref(new Set<string>());
const editorContent = ref('');
const uploadLoading = ref(false);
const characterCount = ref(0);

// 将HTML内容转换为标准表达式语法
const convertToStandardSyntax = (editorElement: HTMLElement) => {
  const clonedElement = editorElement.cloneNode(true) as HTMLElement;

  // 将SVG数学公式元素转换为LaTeX格式
  const svgFormulas = clonedElement.querySelectorAll('svg[data-latex]');
  svgFormulas.forEach((svg) => {
    const latex = svg.getAttribute('data-latex') || '';
    if (latex) {
      // 根据data-latex-type属性判断是行内还是行间公式
      const latexType = svg.getAttribute('data-latex-type');
      let latexFormat: string;

      if (latexType === 'inline') {
        latexFormat = `$${latex}$`; // 行内公式
      } else {
        latexFormat = `$$${latex}$$`; // 行间公式（默认）
      }

      const textNode = document.createTextNode(latexFormat);
      svg.parentNode?.replaceChild(textNode, svg);
    }
  });

  // 将传统的span数学公式元素转换为LaTeX格式（向后兼容）
  const formulas = clonedElement.querySelectorAll('.math-formula');
  formulas.forEach((formula) => {
    const latex = formula.getAttribute('data-latex') || '';
    if (latex) {
      // 传统公式默认为行间公式
      const textNode = document.createTextNode(`$$${latex}$$`);
      formula.parentNode?.replaceChild(textNode, formula);
    }
  });

  // 直接返回HTML内容，保持图片的HTML格式
  return clonedElement.innerHTML;
};

// 从SVG公式中提取LaTeX代码
const extractLatexFromSvg = (content: string): string => {
  if (!content) return '';

  // 创建临时DOM元素来解析HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  // 查找所有带有data-latex属性的SVG元素
  const svgElements = tempDiv.querySelectorAll('svg[data-latex]');

  if (svgElements.length > 0) {
    console.log(`Found ${svgElements.length} SVG formulas, converting to LaTeX format...`);
  }

  svgElements.forEach((svg, index) => {
    const latexCode = svg.getAttribute('data-latex');
    if (latexCode) {
      // 根据data-latex-type属性判断是行内还是行间公式
      const latexType = svg.getAttribute('data-latex-type');
      let latexFormat: string;

      if (latexType === 'inline') {
        latexFormat = `$${latexCode}$`; // 行内公式
      } else {
        latexFormat = `$$${latexCode}$$`; // 行间公式（默认）
      }

      console.log(`SVG formula ${index + 1}: ${latexCode} -> ${latexFormat}`);

      // 创建文本节点替换SVG
      const textNode = document.createTextNode(latexFormat);
      svg.parentNode?.replaceChild(textNode, svg);
    }
  });

  return tempDiv.innerHTML;
};

// 将标准表达式语法转换为HTML显示
const convertFromStandardSyntax = async (content: string): Promise<string> => {
  if (!content) return '';

  let htmlContent = content;

  // 首先检查内容是否已经包含SVG公式，如果有则提取LaTeX代码替换SVG
  const hasSvgFormulas = /<svg[^>]*data-latex[^>]*>/i.test(htmlContent);
  if (hasSvgFormulas) {
    htmlContent = extractLatexFromSvg(htmlContent);
  }

  // 处理基本格式（图片已经是HTML格式，无需转换）
  htmlContent = htmlContent
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
    .replace(/__(.*?)__/g, '<u>$1</u>') // 下划线
    .replace(/~~(.*?)~~/g, '<s>$1</s>') // 删除线
    .replace(
      /!\[([^\]]*)\]\(([^)]*)\)/g,
      '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 8px 0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">'
    ) // Markdown格式图片（向后兼容）
    .replace(/\n/g, '<br>'); // 换行

  // 现在内容中应该只有LaTeX代码，使用utils/latex.ts中的方法转换为SVG
  try {
    htmlContent = await convertLatexToSvg(htmlContent);
  } catch (error) {
    console.warn('LaTeX conversion failed:', error);
  }

  return htmlContent;
};

// 计算字符数（纯文本，不包括HTML标签和公式代码）
const calculateCharacterCount = (element: HTMLElement): number => {
  if (!element) return 0;

  // 克隆元素以避免修改原始内容
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // 移除所有SVG公式元素（它们在显示时是公式，但在计数时应该按LaTeX代码计算）
  const svgFormulas = clonedElement.querySelectorAll('svg[data-latex]');
  svgFormulas.forEach((svg) => {
    const latex = svg.getAttribute('data-latex') || '';
    if (latex) {
      // 用LaTeX代码的长度来计算
      const textNode = document.createTextNode(latex);
      svg.parentNode?.replaceChild(textNode, svg);
    } else {
      svg.remove();
    }
  });

  // 移除图片元素（图片不计入字符数）
  const images = clonedElement.querySelectorAll('img');
  images.forEach((img) => img.remove());

  // 移除图片包装器
  const imageWrappers = clonedElement.querySelectorAll('.image-wrapper');
  imageWrappers.forEach((wrapper) => wrapper.remove());

  // 获取纯文本内容
  const textContent = clonedElement.textContent || '';

  // 移除零宽度空格和多余的空白字符
  const cleanText = textContent
    .replace(/\u200B/g, '') // 移除零宽度空格
    .replace(/\s+/g, ' ') // 将多个空白字符合并为单个空格
    .trim(); // 移除首尾空白

  return cleanText.length;
};

// 监听内容变化
const handleInput = () => {
  if (editorRef.value) {
    // 更新响应式内容
    editorContent.value = editorRef.value.innerHTML;
    // 计算字符数
    characterCount.value = calculateCharacterCount(editorRef.value);
    // 将HTML内容转换为标准表达式语法后再发送
    const standardContent = convertToStandardSyntax(editorRef.value);
    emit('update:modelValue', standardContent);
  }
};

// 监听外部值变化
watch(
  () => props.modelValue,
  async (newVal) => {
    // 将标准表达式语法转换为HTML显示
    const htmlContent = await convertFromStandardSyntax(newVal || '');
    if (editorContent.value !== htmlContent) {
      editorContent.value = htmlContent;
      // 重新设置公式点击事件
      nextTick(() => {
        setupFormulaClickEvents();
      });
    }
  },
  { immediate: true }
);

// 监听editorContent变化，同步到DOM
watch(editorContent, (newContent) => {
  if (editorRef.value && editorRef.value.innerHTML !== newContent) {
    // 保存当前光标位置
    const selection = window.getSelection();
    let range = null;
    if (selection && selection.rangeCount > 0) {
      range = selection.getRangeAt(0).cloneRange();
    }

    // 更新内容
    editorRef.value.innerHTML = newContent;

    // 计算字符数
    characterCount.value = calculateCharacterCount(editorRef.value);

    // 处理初始化时的SVG公式，确保它们有正确的零宽度空格
    processExistingSvgFormulas();

    // 恢复光标位置（如果可能）
    if (range && selection) {
      try {
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) {
        // 如果恢复光标失败，将光标移到末尾
        const newRange = document.createRange();
        newRange.selectNodeContents(editorRef.value);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }

    nextTick(() => {
      setupFormulaClickEvents();
    });
  }
});

// 处理已存在的SVG公式，确保它们有正确的零宽度空格和样式
const processExistingSvgFormulas = () => {
  if (!editorRef.value) return;

  const svgFormulas = editorRef.value.querySelectorAll('svg[data-latex]');
  svgFormulas.forEach((svg) => {
    const svgElement = svg as HTMLElement;

    // 确保SVG有正确的样式属性
    if (!svgElement.hasAttribute('contenteditable')) {
      svgElement.setAttribute('contenteditable', 'false');
    }
    if (!svgElement.style.cursor) {
      svgElement.style.cursor = 'pointer';
    }
    if (!svgElement.style.display) {
      svgElement.style.display = 'inline-block';
    }
    if (!svgElement.style.margin) {
      svgElement.style.margin = '0 2px';
    }
    if (!svgElement.hasAttribute('title')) {
      svgElement.setAttribute('title', 'Click to edit formula');
    }

    // 确保SVG前后有零宽度空格，便于光标定位
    const parent = svgElement.parentNode;
    if (parent) {
      // 检查前面是否有零宽度空格
      const prevNode = svgElement.previousSibling;
      if (!prevNode || prevNode.nodeType !== Node.TEXT_NODE || prevNode.textContent !== '\u200B') {
        const beforeSpace = document.createTextNode('\u200B'); // 零宽度空格
        parent.insertBefore(beforeSpace, svgElement);
      }

      // 检查后面是否有零宽度空格
      const nextNode = svgElement.nextSibling;
      if (!nextNode || nextNode.nodeType !== Node.TEXT_NODE || nextNode.textContent !== '\u200B') {
        const afterSpace = document.createTextNode('\u200B'); // 零宽度空格
        parent.insertBefore(afterSpace, svgElement.nextSibling);
      }
    }
  });
};

// 格式化操作
const toggleFormat = (format: string) => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      // 有选中文字，直接应用格式
      document.execCommand(format, false);
      // 清除激活格式状态
      activeFormats.value.clear();
    } else {
      // 没有选中文字，切换激活状态（完全互斥模式）
      if (activeFormats.value.has(format)) {
        // 如果已经激活，则取消激活
        activeFormats.value.clear();
      } else {
        // 清除所有格式，只激活当前格式
        activeFormats.value.clear();
        activeFormats.value.add(format);
      }
    }
  }
};

const isFormatActive = (format: string) => {
  // 只检查用户主动激活的格式，不检查光标位置的格式
  return activeFormats.value.has(format);
};

// 清除所有激活的格式
const clearAllFormats = () => {
  activeFormats.value.clear();
};

// 清除内容中的所有格式
const clearAllContentFormats = async () => {
  if (!editorRef.value) return;

  const editor = editorRef.value;

  // 获取纯文本内容
  const textContent = editor.innerText || editor.textContent || '';

  // 保存数学公式
  const formulas: Array<{ text: string; latex: string }> = [];
  const formulaElements = editor.querySelectorAll('.math-formula');
  formulaElements.forEach((formula) => {
    const latex = formula.getAttribute('data-latex') || '';
    const text = formula.textContent || '';
    if (latex && text) {
      formulas.push({ text, latex });
    }
  });

  // 保存图片
  const images: Array<{ src: string; alt: string }> = [];
  const imageElements = editor.querySelectorAll('img');
  imageElements.forEach((img) => {
    images.push({
      src: img.src,
      alt: img.alt || '',
    });
  });

  // 清除所有HTML格式，只保留纯文本
  editor.innerHTML = '';

  // 重新插入纯文本
  if (textContent.trim()) {
    const textNode = document.createTextNode(textContent);
    editor.appendChild(textNode);
  }

  // 重新插入数学公式
  formulas.forEach((formula) => {
    const formulaElement = createFormulaElement(formula.latex);
    editor.appendChild(document.createTextNode(' '));
    editor.appendChild(formulaElement);
    editor.appendChild(document.createTextNode(' '));
  });

  // 重新插入图片
  images.forEach((imageData) => {
    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.margin = '8px 0';
    img.style.borderRadius = '4px';
    img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    editor.appendChild(document.createElement('br'));
    editor.appendChild(img);
    editor.appendChild(document.createElement('br'));
  });

  // 清除激活的格式状态
  activeFormats.value.clear();

  // 更新响应式内容并重新渲染LaTeX
  const currentContent = convertToStandardSyntax(editor);
  const htmlContent = await convertFromStandardSyntax(currentContent);
  editorContent.value = htmlContent;

  // 触发内容更新
  handleInput();
};

const updateFormatState = () => {
  // 这个函数现在主要用于兼容性，实际格式状态由activeFormats管理
  currentFormats.value.clear();
  if (document.queryCommandState('bold')) currentFormats.value.add('bold');
  if (document.queryCommandState('italic')) currentFormats.value.add('italic');
  if (document.queryCommandState('underline')) currentFormats.value.add('underline');
  if (document.queryCommandState('strikethrough')) currentFormats.value.add('strikethrough');
};

// 显示公式编辑器
const showFormulaEditor = (initialLatex: string = '') => {
  editingLatex.value = initialLatex;
  showFormula.value = true;

  // 为正在编辑的公式添加视觉反馈
  if (editingFormulaElement.value) {
    editingFormulaElement.value.classList.add('editing');
  }
};

// 隐藏公式编辑器
const hideFormulaEditor = () => {
  showFormula.value = false;
  editingLatex.value = '';

  // 移除编辑状态的视觉反馈
  if (editingFormulaElement.value) {
    editingFormulaElement.value.classList.remove('editing');
    editingFormulaElement.value = null;
  }
};

// 插入公式
const insertFormula = async (latex: string) => {
  if (!latex) return;

  if (editingFormulaElement.value) {
    // 编辑现有公式
    updateExistingFormula(latex);
  } else {
    // 插入新公式
    insertNewFormula(latex);
  }

  // 重置编辑状态
  editingFormulaElement.value = null;
  editingLatex.value = '';

  // 更新响应式内容并重新渲染LaTeX
  if (editorRef.value) {
    const currentContent = convertToStandardSyntax(editorRef.value);
    const htmlContent = await convertFromStandardSyntax(currentContent);
    editorContent.value = htmlContent;
  }
  handleInput();
};

// 插入新公式
const insertNewFormula = (latex: string) => {
  if (!editorRef.value) return;

  // 确保编辑器获得焦点
  editorRef.value.focus();

  const formulaSpan = createFormulaElement(latex);

  // 获取当前光标位置
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    // 检查光标是否在编辑器内部
    const isInEditor = editorRef.value.contains(range.commonAncestorContainer);

    if (isInEditor) {
      // 在当前位置插入公式
      try {
        // 如果有选中内容，先删除
        if (!range.collapsed) {
          range.deleteContents();
        }

        // 在公式前后添加零宽度空格，便于光标定位
        const beforeSpace = document.createTextNode('\u200B');
        const afterSpace = document.createTextNode('\u200B');

        range.insertNode(afterSpace);
        range.insertNode(formulaSpan);
        range.insertNode(beforeSpace);

        // 设置光标到公式后面
        range.setStartAfter(afterSpace);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      } catch (error) {
        console.warn('插入公式到光标位置失败，尝试其他方式:', error);
      }
    }
  }

  // 如果上面的方法失败，直接添加到编辑器末尾
  const beforeSpace = document.createTextNode('\u200B');
  const afterSpace = document.createTextNode('\u200B');

  editorRef.value.appendChild(beforeSpace);
  editorRef.value.appendChild(formulaSpan);
  editorRef.value.appendChild(afterSpace);

  // 设置光标到公式后面
  const newRange = document.createRange();
  newRange.setStartAfter(afterSpace);
  newRange.collapse(true);

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};

// 更新现有公式
const updateExistingFormula = (latex: string) => {
  if (!editingFormulaElement.value) return;

  // 如果编辑的是SVG元素，需要特殊处理
  if (editingFormulaElement.value.tagName.toLowerCase() === 'svg') {
    // 对于SVG元素，我们需要重新渲染整个内容
    // 因为SVG是由MathJax生成的，不能简单替换
    const parentElement = editingFormulaElement.value.parentNode;
    if (parentElement) {
      // 创建一个临时的span来标记位置
      const placeholder = document.createElement('span');
      placeholder.textContent = `$$${latex}$$`;
      parentElement.replaceChild(placeholder, editingFormulaElement.value);
    }
  } else {
    // 传统的span元素处理
    const newFormulaElement = createFormulaElement(latex);
    editingFormulaElement.value.parentNode?.replaceChild(
      newFormulaElement,
      editingFormulaElement.value
    );
  }
};

// 创建公式元素（用于新插入的公式）
const createFormulaElement = (latex: string) => {
  const formulaSpan = document.createElement('span');
  formulaSpan.className = 'math-formula';
  formulaSpan.setAttribute('data-latex', latex);
  formulaSpan.setAttribute('title', 'click to edit formula');

  // 使用简单渲染作为占位符，实际渲染由convertLatexToSvg处理
  formulaSpan.innerHTML = renderLatex(latex);

  // 添加点击事件监听器
  formulaSpan.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    editFormula(formulaSpan);
  });

  return formulaSpan;
};

// 渲染LaTeX为HTML
const renderLatex = (latex: string) => {
  return latex
    .replace(
      /\\frac\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>'
    )
    .replace(
      /\\sqrt\{([^}]+)\}/g,
      '<span class="sqrt-wrapper"><span class="sqrt-radical">√</span><span class="sqrt-content">$1</span></span>'
    )
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^(\{[^}]+\})/g, '<sup>$1</sup>')
    .replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>')
    .replace(/_(\{[^}]+\})/g, '<sub>$1</sub>')
    .replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>')
    .replace(/\\pi/g, 'π')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\sum/g, '∑')
    .replace(/\\int/g, '∫')
    .replace(/\\infty/g, '∞')
    .replace(/\\pm/g, '±')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\neq/g, '≠')
    .replace(/\\leq/g, '≤')
    .replace(/\\geq/g, '≥')
    .replace(/\\approx/g, '≈')
    .replace(/\\equiv/g, '≡')
    .replace(/\\cdot/g, '·')
    .replace(/\\propto/g, '∝')
    .replace(/\{([^}]+)\}/g, '$1'); // 移除剩余的花括号
};

// 编辑公式
const editFormula = (formulaElement: HTMLElement) => {
  const existingLatex = formulaElement.getAttribute('data-latex') || '';
  editingFormulaElement.value = formulaElement;

  // 高亮显示正在编辑的公式
  formulaElement.classList.add('editing');

  // 显示公式编辑器并预填充现有内容
  showFormulaEditor(existingLatex);
};

// 监听编辑器内容，为现有公式添加点击事件
const setupFormulaClickEvents = () => {
  if (!editorRef.value) return;

  // 处理SVG公式元素的点击事件
  const svgFormulas = editorRef.value.querySelectorAll('svg[data-latex]');
  svgFormulas.forEach((svg) => {
    // 移除旧的事件监听器（如果有）
    const newSvg = svg.cloneNode(true) as HTMLElement;
    svg.parentNode?.replaceChild(newSvg, svg);

    // 确保SVG前后有零宽度空格，便于光标定位
    const parent = newSvg.parentNode;
    if (parent) {
      // 检查前面是否有零宽度空格
      const prevNode = newSvg.previousSibling;
      if (!prevNode || prevNode.nodeType !== Node.TEXT_NODE || prevNode.textContent !== '\u200B') {
        const beforeSpace = document.createTextNode('\u200B'); // 零宽度空格
        parent.insertBefore(beforeSpace, newSvg);
      }

      // 检查后面是否有零宽度空格
      const nextNode = newSvg.nextSibling;
      if (!nextNode || nextNode.nodeType !== Node.TEXT_NODE || nextNode.textContent !== '\u200B') {
        const afterSpace = document.createTextNode('\u200B'); // 零宽度空格
        parent.insertBefore(afterSpace, newSvg.nextSibling);
      }
    }

    // 添加新的事件监听器
    newSvg.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const latex = newSvg.getAttribute('data-latex') || '';
      if (latex) {
        // 创建一个临时的编辑元素来兼容现有的编辑逻辑
        editingFormulaElement.value = newSvg;
        showFormulaEditor(latex);
      }
    });

    // 添加样式
    newSvg.style.cursor = 'pointer';
    newSvg.style.display = 'inline-block';
    newSvg.style.margin = '0 2px';
    newSvg.setAttribute('title', 'click to edit formula');
    newSvg.setAttribute('contenteditable', 'false'); // 防止SVG内容被编辑
  });

  // 处理传统的span公式元素（向后兼容）
  const spanFormulas = editorRef.value.querySelectorAll('.math-formula');
  spanFormulas.forEach((formula) => {
    // 移除旧的事件监听器（如果有）
    const newFormula = formula.cloneNode(true) as HTMLElement;
    formula.parentNode?.replaceChild(newFormula, formula);

    // 添加新的事件监听器
    newFormula.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      editFormula(newFormula);
    });
  });
};

// 确保光标在编辑器内部的通用函数
const ensureCursorInEditor = () => {
  if (!editorRef.value) return false;

  // 确保编辑器获得焦点
  editorRef.value.focus();

  const selection = window.getSelection();
  if (!selection) return false;

  // 检查当前选区是否在编辑器内部
  let needsReset = false;

  if (selection.rangeCount === 0) {
    needsReset = true;
  } else {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;

    // 检查是否在编辑器内部
    if (!editorRef.value.contains(container)) {
      needsReset = true;
    }

    // 额外检查：确保不在工具栏或其他UI元素中
    let currentNode = container.nodeType === Node.TEXT_NODE ? container.parentNode : container;
    while (currentNode && currentNode !== document.body) {
      if (currentNode === editorRef.value) {
        break; // 确实在编辑器内
      }
      if (
        (currentNode as Element).classList?.contains('toolbar') ||
        (currentNode as Element).classList?.contains('math-editor')
      ) {
        needsReset = true;
        break;
      }
      currentNode = currentNode.parentNode;
    }
  }

  // 如果需要重置，创建一个在编辑器末尾的选区
  if (needsReset) {
    const range = document.createRange();

    // 如果编辑器为空，在编辑器内创建一个文本节点
    if (editorRef.value.childNodes.length === 0) {
      const textNode = document.createTextNode('');
      editorRef.value.appendChild(textNode);
      range.setStart(textNode, 0);
      range.setEnd(textNode, 0);
    } else {
      range.selectNodeContents(editorRef.value);
      range.collapse(false); // 移动到末尾
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }

  return true;
};

// 快速插入公式
const insertQuickFormula = (latex: string) => {
  // 确保光标在编辑器内部
  if (ensureCursorInEditor()) {
    insertFormula(latex);
  }
};

// 触发图片上传
const triggerImageUpload = () => {
  // 确保光标在编辑器内部
  ensureCursorInEditor();
  imageInputRef.value?.click();
};

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    ElMessage.error('Please select an image file');
    return;
  }

  // 检查文件大小 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('The image size cannot exceed 5MB');
    return;
  }

  try {
    // 显示上传加载状态
    uploadLoading.value = true;

    // 创建FormData进行上传
    const formData = new FormData();
    formData.append('file', file);

    // 上传到服务器
    const { data } = await adminApi.uploadFile(formData);

    if (data && data.url) {
      // 使用服务器返回的图片URL插入图片
      insertImage(data.url, file.name);
      ElMessage.success('Image uploaded successfully');
    } else {
      ElMessage.error('Image upload failed: No valid image address returned');
    }
  } catch (error) {
    ElMessage.error('Image upload failed, please try again');
  } finally {
    uploadLoading.value = false;
  }

  // 清空input值，允许重复选择同一文件
  target.value = '';
};

// 插入图片到编辑器
const insertImage = (src: string, alt: string = '') => {
  if (!editorRef.value) return;

  // 确保编辑器获得焦点
  editorRef.value.focus();

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  img.style.margin = '8px 0';
  img.style.borderRadius = '4px';
  img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  img.style.display = 'block'; // 确保图片独占一行
  img.style.cursor = 'pointer';

  // 使用更简单的插入方式
  const selection = window.getSelection();

  // 先尝试在当前光标位置插入
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    // 检查光标是否在编辑器内部
    const isInEditor = editorRef.value.contains(range.commonAncestorContainer);

    if (isInEditor) {
      // 在当前位置插入图片
      try {
        // 如果有选中内容，先删除
        if (!range.collapsed) {
          range.deleteContents();
        }

        // 创建包装div来确保图片正确显示
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        wrapper.appendChild(img);

        range.insertNode(wrapper);

        // 设置光标到图片后面
        range.setStartAfter(wrapper);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        // 更新内容
        editorContent.value = editorRef.value.innerHTML;
        handleInput();
        return;
      } catch (error) {
        console.warn('Failed to insert image at cursor position, trying other method:', error);
      }
    }
  }

  // 如果上面的方法失败，直接添加到编辑器末尾
  const wrapper = document.createElement('div');
  wrapper.className = 'image-wrapper';
  wrapper.appendChild(img);

  // 添加到编辑器末尾
  editorRef.value.appendChild(wrapper);

  // 设置光标到图片后面
  const newRange = document.createRange();
  newRange.setStartAfter(wrapper);
  newRange.collapse(true);

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  // 更新响应式内容
  editorContent.value = editorRef.value.innerHTML;
  handleInput();
};

// 处理键盘事件
const handleKeydown = async (e: KeyboardEvent) => {
  // Ctrl+B = 粗体
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    toggleFormat('bold');
  }
  // Ctrl+I = 斜体
  if (e.ctrlKey && e.key === 'i') {
    e.preventDefault();
    toggleFormat('italic');
  }
  // Ctrl+U = 下划线
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    toggleFormat('underline');
  }
  // Escape = 清除内容所有格式
  if (e.key === 'Escape') {
    e.preventDefault();
    await clearAllContentFormats();
  }

  // 处理Backspace和Delete键删除公式
  if (e.key === 'Backspace' || e.key === 'Delete') {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (e.key === 'Backspace') {
        // Backspace: 检查光标前面是否有SVG公式
        const prevNode =
          range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.previousSibling
            : range.startContainer.childNodes[range.startOffset - 1];

        if (prevNode && prevNode.nodeType === Node.ELEMENT_NODE) {
          const element = prevNode as HTMLElement;
          if (element.tagName.toLowerCase() === 'svg' && element.hasAttribute('data-latex')) {
            e.preventDefault();
            // 删除SVG公式及其前后的零宽度空格
            const parent = element.parentNode;
            if (parent) {
              // 删除前面的零宽度空格
              const beforeSpace = element.previousSibling;
              if (
                beforeSpace &&
                beforeSpace.nodeType === Node.TEXT_NODE &&
                beforeSpace.textContent === '\u200B'
              ) {
                parent.removeChild(beforeSpace);
              }
              // 删除后面的零宽度空格
              const afterSpace = element.nextSibling;
              if (
                afterSpace &&
                afterSpace.nodeType === Node.TEXT_NODE &&
                afterSpace.textContent === '\u200B'
              ) {
                parent.removeChild(afterSpace);
              }
              // 删除SVG元素
              parent.removeChild(element);

              // 更新内容
              editorContent.value = editorRef.value?.innerHTML || '';
              handleInput();
            }
            return;
          }
        }
      } else if (e.key === 'Delete') {
        // Delete: 检查光标后面是否有SVG公式
        const nextNode =
          range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.nextSibling
            : range.startContainer.childNodes[range.startOffset];

        if (nextNode && nextNode.nodeType === Node.ELEMENT_NODE) {
          const element = nextNode as HTMLElement;
          if (element.tagName.toLowerCase() === 'svg' && element.hasAttribute('data-latex')) {
            e.preventDefault();
            // 删除SVG公式及其前后的零宽度空格
            const parent = element.parentNode;
            if (parent) {
              // 删除前面的零宽度空格
              const beforeSpace = element.previousSibling;
              if (
                beforeSpace &&
                beforeSpace.nodeType === Node.TEXT_NODE &&
                beforeSpace.textContent === '\u200B'
              ) {
                parent.removeChild(beforeSpace);
              }
              // 删除后面的零宽度空格
              const afterSpace = element.nextSibling;
              if (
                afterSpace &&
                afterSpace.nodeType === Node.TEXT_NODE &&
                afterSpace.textContent === '\u200B'
              ) {
                parent.removeChild(afterSpace);
              }
              // 删除SVG元素
              parent.removeChild(element);

              // 更新内容
              editorContent.value = editorRef.value?.innerHTML || '';
              handleInput();
            }
            return;
          }
        }
      }
    }
  }

  // 处理左右箭头键，改善光标在公式附近的移动
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (e.key === 'ArrowLeft') {
        // 左箭头：如果光标前面是SVG公式，跳过它
        const prevNode =
          range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.previousSibling
            : range.startContainer.childNodes[range.startOffset - 1];

        if (isSvgFormula(prevNode)) {
          e.preventDefault();
          // 移动到SVG前面的零宽度空格
          const beforeSpace = prevNode.previousSibling;
          if (beforeSpace && beforeSpace.nodeType === Node.TEXT_NODE) {
            moveCursorTo(beforeSpace, beforeSpace.textContent?.length || 0);
          }
        }
      } else if (e.key === 'ArrowRight') {
        // 右箭头：如果光标后面是SVG公式，跳过它
        const nextNode =
          range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.nextSibling
            : range.startContainer.childNodes[range.startOffset];

        if (isSvgFormula(nextNode)) {
          e.preventDefault();
          // 移动到SVG后面的零宽度空格
          const afterSpace = nextNode.nextSibling;
          if (afterSpace && afterSpace.nodeType === Node.TEXT_NODE) {
            moveCursorTo(afterSpace, 0);
          }
        }
      }
    }
  }
};

// 处理输入事件，应用激活的格式
const handleBeforeInput = (e: Event) => {
  const inputEvent = e as InputEvent;
  if (activeFormats.value.size === 0) return;

  // 如果有激活的格式，需要包装输入的文字
  if (inputEvent.inputType === 'insertText' && inputEvent.data) {
    e.preventDefault();

    let wrappedText = inputEvent.data;

    // 应用唯一的激活格式
    const activeFormat = Array.from(activeFormats.value)[0];
    switch (activeFormat) {
      case 'bold':
        wrappedText = `<strong>${wrappedText}</strong>`;
        break;
      case 'italic':
        wrappedText = `<em>${wrappedText}</em>`;
        break;
      case 'underline':
        wrappedText = `<u>${wrappedText}</u>`;
        break;
      case 'strikethrough':
        wrappedText = `<s>${wrappedText}</s>`;
        break;
    }

    // 插入格式化的文字
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = wrappedText;
      const fragment = document.createDocumentFragment();

      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }

      range.insertNode(fragment);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    handleInput();
  }
};

// 处理焦点事件
const handleFocus = () => {
  updateFormatState();
};

const handleBlur = () => {
  // 延迟更新，避免按钮点击时失去焦点
  setTimeout(updateFormatState, 100);
};

// 处理光标位置变化
const handleSelectionChange = () => {
  updateFormatState();

  // 如果有选中文字，清除激活格式状态（因为要对选中文字应用格式）
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      // 有选中文字时，清除激活格式状态
      activeFormats.value.clear();
    }
  }
};

// 辅助函数：检查节点是否是SVG公式
const isSvgFormula = (node: Node | null): node is HTMLElement => {
  return (
    node?.nodeType === Node.ELEMENT_NODE &&
    (node as HTMLElement).tagName.toLowerCase() === 'svg' &&
    (node as HTMLElement).hasAttribute('data-latex')
  );
};

// 辅助函数：移动光标到指定位置
const moveCursorTo = (node: Node, offset: number = 0) => {
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.setStart(node, offset);
    range.setEnd(node, offset);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

onMounted(async () => {
  if (props.modelValue) {
    // 将标准表达式语法转换为HTML显示
    const htmlContent = await convertFromStandardSyntax(props.modelValue);
    editorContent.value = htmlContent;

    // 等待DOM更新后处理SVG公式
    await nextTick();
    processExistingSvgFormulas();
    setupFormulaClickEvents();

    // 初始化字符数统计
    if (editorRef.value) {
      characterCount.value = calculateCharacterCount(editorRef.value);
    }
  }

  // 添加全局点击事件监听器，确保点击编辑器外部时不会影响插入操作
  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    if (target && editorRef.value) {
      // 如果点击的是编辑器内部，确保焦点在编辑器上
      if (editorRef.value.contains(target)) {
        editorRef.value.focus();
      }
    }
  });
});
</script>

<style scoped>
.math-editor {
  border-radius: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  overflow: hidden;
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
  user-select: none; /* 防止工具栏被选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.format-group,
.clear-group,
.math-group,
.quick-group,
.image-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar button {
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
}

.toolbar button:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #334155;
}

.toolbar button.active {
  background: linear-gradient(
    135deg,
    var(--el-color-primary) 0%,
    var(--el-color-primary-light-3) 100%
  );
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.clear-all-btn {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.1) 0%,
    rgba(255, 0, 0, 0.1) 100%
  ) !important;
  color: var(--el-color-danger) !important;
  gap: 6px !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
}

.clear-all-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.2) 0%,
    rgba(255, 0, 0, 0.2) 100%
  ) !important;
  transform: translateY(-2px) !important;
}

.formula-btn {
  gap: 6px !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  ) !important;
  color: #6366f1 !important;
  font-weight: 600 !important;
}

.formula-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(139, 92, 246, 0.2) 100%
  ) !important;
  color: #4f46e5 !important;
}

.fx-icon {
  font-weight: bold;
  font-style: italic;
  color: #6366f1;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(99, 102, 241, 0.2);
}

.image-btn {
  gap: 6px !important;
  min-width: auto !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.1) 0%,
    rgba(59, 130, 246, 0.1) 100%
  ) !important;
  color: #059669 !important;
  font-weight: 600 !important;
}

.image-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.2) 0%,
    rgba(59, 130, 246, 0.2) 100%
  ) !important;
  color: #047857 !important;
}

/* 快速插入按钮特殊样式 */
.quick-group button {
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.1) 0%,
    rgba(236, 72, 153, 0.1) 100%
  ) !important;
  color: #a855f7 !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  min-width: 40px !important;
  height: 36px !important;
  position: relative;
  overflow: hidden;
}

.quick-group button:hover {
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.2) 0%,
    rgba(236, 72, 153, 0.2) 100%
  ) !important;
  color: #9333ea !important;
  transform: translateY(-1px) scale(1.05) !important;
}

.quick-group button:active {
  transform: translateY(0) scale(0.98) !important;
}

.divider {
  width: 1px;
  height: 20px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    #cbd5e1 20%,
    #cbd5e1 80%,
    transparent 100%
  );
  margin: 0 8px;
  opacity: 0.6;
}

.editor-content {
  position: relative;
  background: white;
  border-radius: 0 0 8px 8px;
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
  border-color: rgba(156, 163, 175, 0.8);
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

.editor {
  min-height: 140px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.7;
  outline: none;
  background: white;
  border-radius: 0 0 8px 8px;
  transition: all 0.3s ease;
  color: #334155;
}

.editor:empty::before {
  content: attr(placeholder);
  color: #94a3b8;
  pointer-events: none;
  font-style: italic;
}

.editor:focus {
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
  box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.1);
}

/* 数学公式样式 */
.editor :deep(.math-formula) {
  display: inline-block;
  background: #f0f9ff;
  /* border: 1px solid #bae6fd; */
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 3px;
  font-family: 'Times New Roman', serif;
  font-size: 15px;
  color: var(--el-color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.editor :deep(.math-formula:hover) {
  background: #e0f2fe;
  border-color: var(--el-color-primary-light-3);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.editor :deep(.math-formula.editing) {
  background: var(--el-color-warning-light-9);
  border-color: var(--el-color-warning);
  color: var(--el-color-warning);
  animation: pulse-editing 1s infinite;
}

/* SVG公式样式 */
.editor :deep(svg[data-latex]) {
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

.editor :deep(svg[data-latex]:hover) {
  background: #f0f9ff;
  border-color: var(--el-color-primary-light-3);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.editor :deep(svg[data-latex].editing) {
  background: var(--el-color-warning-light-9);
  border-color: var(--el-color-warning);
  animation: pulse-editing 1s infinite;
}

/* 确保SVG内的文本也有合适的大小 */
.editor :deep(svg[data-latex] text) {
  font-size: 16px !important;
  font-family: 'Times New Roman', 'KaTeX_Main', serif !important;
}

/* 针对行内公式的特殊样式 */
.editor :deep(svg[data-latex-type='inline']) {
  font-size: 22px !important;
  min-height: 20px;
  vertical-align: baseline;
}

/* 针对行间公式的特殊样式 */
.editor :deep(svg[data-latex-type='display']) {
  font-size: 22px !important;
  min-height: 28px;
  display: inline-block;
  margin: 4px 8px;
}

@keyframes pulse-editing {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 图片样式 */
.editor :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
}

.editor :deep(img:hover) {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 图片包装器样式 */
.editor :deep(div:has(> img)) {
  margin: 8px 0;
  text-align: center;
}

/* 图片包装器的备用样式类 */
.editor :deep(.image-wrapper) {
  margin: 8px 0;
  text-align: center;
}

/* 数学符号样式 */
.editor :deep(.fraction) {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin: 0 2px;
}

.editor :deep(.fraction .numerator) {
  display: block;
  font-size: 0.8em;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
  margin-bottom: 1px;
}

.editor :deep(.fraction .denominator) {
  display: block;
  font-size: 0.8em;
  padding-top: 1px;
}

.editor :deep(.sqrt-wrapper) {
  display: inline-block;
  position: relative;
  margin: 0 2px;
  vertical-align: middle;
  font-family: 'Times New Roman', serif;
}

.editor :deep(.sqrt-radical) {
  font-size: 1.4em;
  vertical-align: top;
  position: relative;
  top: 3px;
  left: -4px;
  font-weight: normal;
  line-height: 1;
}

.editor :deep(.sqrt-content) {
  border-top: 1.5px solid currentColor;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 3px;
  display: inline-block;
  /* min-width: 1em; */
  position: relative;
  margin-left: -2px;
}

.editor :deep(.sqrt-content::before) {
  content: '';
  position: absolute;
  left: -3px;
  top: -1.5px;
  width: 3px;
  height: 1.5px;
  background: currentColor;
  transform: skewX(-45deg);
  transform-origin: bottom right;
}

/* 工具栏按钮中的数学符号样式 */
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

/* 添加微妙的动画效果 */
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

.math-editor {
  animation: fadeInUp 0.4s ease-out;
}

.toolbar button {
  position: relative;
  overflow: hidden;
}

.toolbar button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.toolbar button:hover::before {
  left: 100%;
}

/* 格式按钮特殊样式 */
.format-group button {
  font-weight: 700 !important;
  font-size: 15px !important;
}

.format-group button.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toolbar {
    flex-wrap: wrap;
    padding: 10px 16px;
    gap: 6px;
  }

  .toolbar button {
    padding: 6px 10px;
    font-size: 13px;
    height: 32px;
    min-width: 32px;
  }

  .editor {
    padding: 16px;
    font-size: 15px;
    min-height: 120px;
  }

  .formula-btn,
  .image-btn,
  .clear-all-btn {
    padding: 6px 12px !important;
    font-size: 12px !important;
  }

  .quick-group button {
    min-width: 32px !important;
    height: 32px !important;
  }

  .divider {
    height: 16px;
    margin: 0 4px;
  }
}
</style>
