export default {
  // 导航
  nav: {
    editor: '编辑器',
    features: '功能特性',
    examples: '示例',
    docs: '文档',
    toggleTheme: '切换主题',
    openMenu: '打开菜单',
    language: '语言',
  },

  // 主题
  theme: {
    light: '亮色主题',
    dark: '暗色主题',
    switchToLight: '切换到亮色主题',
    switchToDark: '切换到暗色主题',
  },

  // 语言
  language: {
    chinese: '中文',
    english: 'English',
  },

  // 页面标题
  page: {
    title: 'Vue MathJax Beautiful',
    subtitle: '美观编辑器',
  },

  // 英雄区域
  hero: {
    badge: '专业数学公式编辑器',
    title: 'Vue 数学公式',
    titleHighlight: '编辑器',
    description: '专业的数学公式编辑器组件库，提供 240+ 符号面板、38 个公式模板，支持富文本编辑和 LaTeX 语法',
    technologies: ['Vue 3', 'TypeScript', 'MathJax', 'LaTeX'],
    getStarted: '开始使用',
    viewSource: '查看源码',
    scrollHint: '体验强大功能',
    highlights: {
      symbols: '240+ 数学符号',
      templates: '38 个公式模板',
      preview: '实时预览',
    },
  },

  // 演示区域
  demo: {
    title: '在线演示',
    description: '体验专业的数学公式编辑器和富文本编辑功能',
    professionalEditor: '专业公式编辑器',
    richTextEditorLabel: '富文本编辑器',
    
    // 公式编辑器
    formulaEditor: {
      title: 'VueMathjaxBeautiful - 专业公式编辑器',
      description: '提供 240+ 数学符号和 38 个公式模板，支持实时预览和LaTeX语法',
      inlineMode: '内联模式',
      realTimePreview: '实时预览',
      tips: {
        title: '使用提示：',
        clickSymbols: '点击符号面板中的符号快速插入',
        latexSupport: '支持直接输入 LaTeX 语法',
        realTime: '实时预览让您所见即所得',
        modes: '支持弹窗模式和内联模式两种使用方式',
      },
    },

    // 富文本编辑器
    richTextEditor: {
      title: 'VueMathjaxEditor - 富文本编辑器',
      description: '支持文本格式和数学公式的混合编辑，适合编写包含数学内容的文档',
      richText: '富文本',
      latexSupport: 'LaTeX支持',
      clearContent: '清空内容',
      loadSample: '加载示例',
      placeholder: '开始编写您的内容，支持富文本编辑和数学公式...',
      
      latexExamples: {
        title: 'LaTeX 语法示例：',
        inline: '行内公式：',
        display: '独立公式：',
        fraction: '分数：',
      },

      shortcuts: {
        title: '快捷键：',
        bold: '粗体',
        italic: '斜体',
        underline: '下划线',
      },
    },
  },

  // 功能特性
  features: {
    title: '功能特性',
    description: '为数学内容创作提供完整解决方案',
    
    list: {
      professionalEditor: {
        title: '专业公式编辑',
        description: '基于 MathJax 引擎，提供 240+ 数学符号和 38 个公式模板，支持完整的 LaTeX 语法',
      },
      richSymbols: {
        title: '丰富符号面板',
        description: '内置基础符号、希腊字母、高级符号三大分类，涵盖代数、几何、微积分等各个领域',
      },
      realTimePreview: {
        title: '实时预览',
        description: '输入公式时实时预览渲染效果，所见即所得的编辑体验，支持内联和弹窗两种模式',
      },
      richTextEditing: {
        title: '富文本编辑',
        description: '支持粗体、斜体、下划线等文本格式，与数学公式完美结合，适合编写学术文档',
      },
      responsiveDesign: {
        title: '响应式设计',
        description: '适配各种屏幕尺寸，在桌面端和移动端都有良好的使用体验',
      },
      easyIntegration: {
        title: '易于集成',
        description: '提供 Vue 3 组件，支持 TypeScript，易于集成到现有项目中',
      },
    },
  },

  // 示例展示
  examples: {
    title: '公式示例库',
    description: '点击示例快速加载到公式编辑器，体验不同类型的数学公式',
    categories: {
      physics: '物理',
      algebra: '代数',
      math: '数学',
      calculus: '微积分',
      series: '级数',
      linearAlgebra: '线性代数',
      trigonometry: '三角学',
    },
    formulas: {
      massEnergy: '质能方程',
      quadratic: '二次方程',
      euler: '欧拉恒等式',
      integral: '积分',
      infiniteSeries: '无穷级数',
      matrix: '矩阵',
      limit: '极限',
      trigonometric: '三角函数',
    },
  },

  // 文档
  docs: {
    title: '使用文档',
    description: '完整的使用指南和API文档',
    
    sections: {
      installation: {
        title: '安装',
        description: '或者使用 yarn：',
        yarn: '或者使用 yarn：',
        pnpm: '或者使用 pnpm（推荐）：',
      },

      basicUsage: {
        title: '基本使用',
      },

      coreComponents: {
        title: '核心组件',
        beautiful: {
          title: 'VueMathjaxBeautiful',
          description: '专业公式编辑器，提供 240+ 符号面板和 38 个公式模板，支持内联和弹窗两种模式',
        },
        editor: {
          title: 'VueMathjaxEditor',
          description: '富文本编辑器，支持文本格式和数学公式混合编辑，适合编写学术文档',
        },
      },

      apiProps: {
        title: 'API 属性',
        modelValue: '绑定的内容值 (string)',
        placeholder: '占位符文本 (string)',
        minHeight: '最小高度 (string, 默认: "200px")',
        readonly: '只读模式 (boolean, 默认: false)',
      },

      events: {
        title: '事件说明',
        change: '内容变化时触发 (value: string)',
        focus: '编辑器获得焦点时触发',
        blur: '编辑器失去焦点时触发',
      },

      shortcuts: {
        title: '快捷键',
        bold: '粗体',
        italic: '斜体',
        underline: '下划线',
        strikethrough: '删除线',
        undo: '撤销',
        redo: '重做',
        editFormula: '编辑公式',
        inlineFormula: '行内公式',
        displayFormula: '独立公式',
      },

      latexSyntax: {
        title: 'LaTeX 语法示例',
        inlineFormula: '行内公式',
        displayFormula: '独立公式',
        fraction: '分数',
        sqrt: '根号',
        superscript: '上标',
        subscript: '下标',
        sum: '求和',
        greekLetters: '希腊字母',
        matrix: '矩阵',
        limit: '极限',
        trigFunctions: '三角函数',
        specialSymbols: '特殊符号',
      },

      advancedUsage: {
        title: '高级用法',
      },

      formulaEditorUsage: {
        title: '公式编辑器用法',
      },

      faq: {
        title: '常见问题',
        questions: {
          complexFormulas: {
            q: 'Q: 如何插入复杂的数学公式？',
            a: 'A: 点击编辑器工具栏的"fx"按钮打开公式编辑器，或直接使用LaTeX语法编写。',
          },
          latexSupport: {
            q: 'Q: 支持哪些LaTeX语法？',
            a: 'A: 支持完整的MathJax LaTeX语法，包括分数、根式、积分、矩阵等。',
          },
          customStyle: {
            q: 'Q: 如何自定义编辑器样式？',
            a: 'A: 可以通过CSS自定义样式，或使用min-height等属性调整编辑器外观。',
          },
          mobile: {
            q: 'Q: 是否支持移动端？',
            a: 'A: 完全支持移动端，采用响应式设计，在各种设备上都有良好体验。',
          },
        },
      },

      resources: {
        title: '更多资源',
        github: 'GitHub 仓库',
        examples: '在线示例',
        api: 'API 文档',
        issues: '问题反馈',
        changelog: '更新日志',
      },
    },
  },

  // 页脚
  footer: {
    description: '为 Vue 3 应用提供强大的数学公式编辑功能，支持 LaTeX 语法和实时预览。',
    resources: '资源',
    community: '社区',
    documentation: '文档',
    examples: '示例',
    apiReference: 'API 参考',
    changelog: '更新日志',
    github: 'GitHub',
    issues: '问题反馈',
    discussions: '讨论区',
    contributing: '贡献指南',
    copyright: '© 2024 Vue MathJax Beautiful. All rights reserved.',
    privacy: '隐私政策',
    terms: '使用条款',
  },

  // 按钮和链接
  buttons: {
    clearContent: '清空内容',
    loadSample: '加载示例',
  },

  // 示例内容
  sampleContent: {
    welcome: '**欢迎使用 Vue MathJax Beautiful！**',
    intro: '这是一个功能强大的数学公式编辑器，专为 Vue 3 设计。',
    mainFeatures: '## 主要特性',
    richText: '- **富文本编辑**：支持 *斜体*、**粗体**、__下划线__、~~删除线~~',
    mathFormulas: '- **数学公式**：完整支持 LaTeX 语法',
    realTimePreview: '- **实时预览**：所见即所得的编辑体验',
    mathExamples: '## 数学公式示例',
    massEnergyFormula: '行内公式：质能方程 $E = mc^2$ 展示了质量与能量的关系。',
    gaussianIntegral: '独立公式：',
    quadraticFormula: '分数与根式：',
    getStarted: '## 开始使用',
    clickFormula: '点击工具栏中的 **fx 公式** 按钮即可打开公式编辑器，或直接点击现有公式进行编辑。',
  },

  // 加载状态
  loading: '加载中...',
  loadingFailed: '加载失败',
  initializationFailed: '初始化失败',

  // 返回顶部
  backToTop: '返回顶部',

  // 其他通用文本
  common: {
    viewMore: '查看更多',
    learnMore: '了解更多',
    getStarted: '开始使用',
    close: '关闭',
    open: '打开',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    warning: '警告',
    info: '信息',
  },
}; 