import { ref, computed } from 'vue';

export type Locale = 'zh-CN' | 'en-US';

// 语言包类型定义
export interface Messages {
  // VueMathjaxBeautiful 相关
  beautiful: {
    title: string;
    subtitle: string;
    inputSection: string;
    previewSection: string;
    rendering: string;
    noFormula: string;
    inputPlaceholder: string;
    insertButton: string;
    cancelButton: string;
    clearButton: string;
    themeToggle: {
      light: string;
      dark: string;
    };
    categories: {
      basic: string;
      greek: string;
      advanced: string;
      formulas: string;
    };
    examples: {
      quadratic: string;
      integral: string;
      sum: string;
      fraction: string;
      matrix: string;
      limit: string;
    };
  };
  
  // VueMathjaxEditor 相关
  editor: {
    placeholder: string;
    toolbar: {
      bold: string;
      italic: string;
      underline: string;
      strikethrough: string;
      formula: string;
      formulaShort: string;
      image: string;
      imageShort: string;
      clear: string;
      clearShort: string;
      theme: string;
    };
    shortcuts: {
      bold: string;
      italic: string;
      underline: string;
      clear: string;
    };
    stats: {
      characters: string;
      words: string;
    };
    messages: {
      imageError: string;
      imageTooBig: string;
      unsupportedType: string;
      mathjaxNotLoaded: string;
      renderFailed: string;
    };
  };
}

// 中文语言包
const zhCN: Messages = {
  beautiful: {
    title: '数学公式编辑器',
    subtitle: '使用下方按钮或直接输入 LaTeX 代码',
    inputSection: 'LaTeX 输入',
    previewSection: '实时预览',
    rendering: '渲染中',
    noFormula: '无公式',
    inputPlaceholder: '输入 LaTeX 公式或点击下方符号...',
    insertButton: '插入公式',
    cancelButton: '取消',
    clearButton: '清空',
    themeToggle: {
      light: '切换到亮色主题',
      dark: '切换到暗色主题',
    },
    categories: {
      basic: '基础符号',
      greek: '希腊字母',
      advanced: '高级符号',
      formulas: '常用公式',
    },
    examples: {
      quadratic: '二次方程解',
      integral: '定积分',
      sum: '求和公式',
      fraction: '分数表示',
      matrix: '矩阵表示',
      limit: '极限表示',
    },
  },
  
  editor: {
    placeholder: '开始编写您的内容...',
    toolbar: {
      bold: '粗体',
      italic: '斜体',
      underline: '下划线',
      strikethrough: '删除线',
      formula: '插入数学公式',
      formulaShort: '公式',
      image: '插入图片',
      imageShort: '图片',
      clear: '清除格式',
      clearShort: '清除',
      theme: '主题',
    },
    shortcuts: {
      bold: '粗体 (Ctrl+B)',
      italic: '斜体 (Ctrl+I)',
      underline: '下划线 (Ctrl+U)',
      clear: '清除格式 (Ctrl+Shift+X)',
    },
    stats: {
      characters: '字符',
      words: '单词',
    },
    messages: {
      imageError: '图片上传失败',
      imageTooBig: '文件过大，最大允许',
      unsupportedType: '不支持的文件类型',
      mathjaxNotLoaded: 'MathJax未加载',
      renderFailed: '渲染失败',
    },
  },
};

// 英文语言包
const enUS: Messages = {
  beautiful: {
    title: 'Math Formula Editor',
    subtitle: 'Use buttons below or directly input LaTeX code',
    inputSection: 'LaTeX Input',
    previewSection: 'Live Preview',
    rendering: 'Rendering',
    noFormula: 'No Formula',
    inputPlaceholder: 'Input LaTeX formula or click symbols below...',
    insertButton: 'Insert Formula',
    cancelButton: 'Cancel',
    clearButton: 'Clear',
    themeToggle: {
      light: 'Switch to Light Theme',
      dark: 'Switch to Dark Theme',
    },
    categories: {
      basic: 'Basic Symbols',
      greek: 'Greek Letters',
      advanced: 'Advanced Symbols',
      formulas: 'Common Formulas',
    },
    examples: {
      quadratic: 'Quadratic Formula',
      integral: 'Definite Integral',
      sum: 'Summation Formula',
      fraction: 'Fraction Notation',
      matrix: 'Matrix Notation',
      limit: 'Limit Notation',
    },
  },
  
  editor: {
    placeholder: 'Start writing your content...',
    toolbar: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      formula: 'Insert Math Formula',
      formulaShort: 'Formula',
      image: 'Insert Image',
      imageShort: 'Image',
      clear: 'Clear Format',
      clearShort: 'Clear',
      theme: 'Theme',
    },
    shortcuts: {
      bold: 'Bold (Ctrl+B)',
      italic: 'Italic (Ctrl+I)',
      underline: 'Underline (Ctrl+U)',
      clear: 'Clear Format (Ctrl+Shift+X)',
    },
    stats: {
      characters: 'characters',
      words: 'words',
    },
    messages: {
      imageError: 'Image upload failed',
      imageTooBig: 'File too large, maximum allowed',
      unsupportedType: 'Unsupported file type',
      mathjaxNotLoaded: 'MathJax not loaded',
      renderFailed: 'Render failed',
    },
  },
};

// 语言包映射
const messages: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 全局当前语言状态
const currentLocale = ref<Locale>('zh-CN');

// 国际化钩子
export function useI18n() {
  // 获取当前语言的消息
  const t = computed(() => {
    return messages[currentLocale.value];
  });
  
  // 切换语言
  const setLocale = (locale: Locale) => {
    currentLocale.value = locale;
  };
  
  // 获取当前语言
  const locale = computed(() => currentLocale.value);
  
  // 可用语言列表
  const availableLocales: Array<{ key: Locale; name: string }> = [
    { key: 'zh-CN', name: '中文' },
    { key: 'en-US', name: 'English' },
  ];
  
  return {
    t,
    locale,
    setLocale,
    availableLocales,
  };
} 