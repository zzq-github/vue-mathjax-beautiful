export default {
  // 导航
  nav: {
    home: '首页',
    onlineDemo: '在线演示',
    config: '公式配置',
    editorConfig: '编辑器配置',
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
    subtitle: '精美专业的数学公式编辑器',
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

  // 首页内容
  home: {
    quickStart: {
      description: '快速开始使用 Vue MathJax Beautiful，体验专业的数学公式编辑功能',
      tryDemo: '在线演示',
      viewDocs: '查看文档',
      badge: '立即开始',
      supportedTech: '支持的技术栈',
      viewExamples: '查看示例',
    },
    installation: {
      title: '快速安装',
      quickExample: '快速示例',
    },
    sections: {
      coreFeatures: '核心功能',
      getStarted: '立即开始',
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
    title: '公式示例',
    description: '点击示例快速加载到公式编辑器，体验不同类型的数学公式',
    tryInteractive: '体验交互式编辑器',
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

  // 配置示例
  config: {
    title: '组件配置',
    description: '通过丰富的配置选项，自定义 VueMathjaxBeautiful 组件的行为和外观',
    settings: '配置设置',
    settingsDescription: '调整下方设置来查看组件的实时变化',
    preview: '实时预览',
    previewDescription: '根据左侧配置实时展示组件效果',
    
    tabs: {
      basic: '基础',
      display: '显示',
      input: '输入',
      behavior: '行为',
    },
    
    textSettings: '文本设置',
    subtitle: '子标题',
    buttonTextSettings: '按钮文本设置',
    insertButton: '插入按钮',
    cancelButton: '取消按钮',
    clearButton: '清空按钮',
    
    // 输入框占位符
    placeholders: {
      title: '请输入标题',
      subtitle: '请输入子标题',
      placeholder: '请输入占位符文本',
      insertButton: '请输入插入按钮文本',
      cancelButton: '请输入取消按钮文本',
      clearButton: '请输入清空按钮文本',
    },
    behaviorSettings: '行为设置',
    basicSymbolsDesc: '基础数学符号和运算符',
    greekLettersDesc: '希腊字母符号',
    advancedSymbolsDesc: '高级数学符号和函数',
    showFormulaExamplesDesc: '显示公式示例',
    readonlyDesc: '只读模式，禁用编辑功能',
    autoFocusDesc: '自动聚焦到输入框',
    showSymbolsDesc: '显示符号面板',
    showPreviewDesc: '显示实时预览',
    showThemeToggleDesc: '显示主题切换按钮',
    showClearButtonDesc: '显示清空按钮',
    
    mode: '显示模式',
    dialogMode: '弹窗模式',
    inlineMode: '内联模式',
    theme: '主题',
    lightTheme: '亮色主题',
    darkTheme: '暗色主题',
    features: '功能开关',
    showSymbols: '显示符号面板',
    showPreview: '显示实时预览',
    showThemeToggle: '显示主题切换',
    showClearButton: '显示清空按钮',
    readonly: '只读模式',
    autoFocus: '自动聚焦',
    inputSettings: '输入设置',
    placeholder: '占位符文本',
    maxLength: '最大字符数',
    rows: '文本框行数',
    enabledCategories: '启用的符号分类',
    basicSymbols: '基础符号',
    greekLetters: '希腊字母',
    advancedSymbols: '高级符号',
    showFormulaExamples: '显示常用公式',
    openDialog: '打开公式编辑器',
    eventLog: '事件日志',
    noEvents: '暂无事件',
    showConfig: '显示代码配置',
    hideConfig: '隐藏代码配置',
    currentConfig: '当前配置代码',
    currentConfigDescription: '复制下方代码即可在您的项目中使用相同的配置',
    
    // 模式标注
    modes: {
      current: '当前模式',
      universal: '通用配置',
      dialogOnly: '仅弹窗模式',
      inlineOnly: '仅内联',
      dialog: '弹窗',
      inline: '内联',
    },
  },

  // 编辑器配置
  editorConfig: {
    title: '富文本编辑器配置',
    description: '通过实时配置面板体验 VueMathjaxEditor 组件的所有功能选项，左侧调整参数，右侧即时预览效果。',
    
    tabs: {
      basic: '基础配置',
      toolbar: '工具栏',
      format: '格式功能',
      features: '功能特性',
      limits: '限制设置',
      stats: '统计保存',
    },
    
    basic: {
      title: '基础配置',
      placeholder: '占位符文本',
      minHeight: '最小高度',
      maxHeight: '最大高度',
      width: '宽度',
      borderRadius: '边框圆角',
      theme: '主题',
    },
    
    toolbar: {
      title: '工具栏配置',
      showToolbar: '显示工具栏',
      position: '工具栏位置',
      enabledTools: '启用的工具',
      bold: '加粗',
      italic: '斜体',
      underline: '下划线',
      strikethrough: '删除线',
      formula: '插入公式',
      formulaShort: '公式',
      image: '插入图片',
      imageShort: '图片',
      clear: '清除格式',
      clearShort: '清除',
      theme: '主题',
    },
    
    format: {
      title: '格式功能',
      enableBold: '启用粗体',
      enableItalic: '启用斜体',
      enableUnderline: '启用下划线',
      enableStrikethrough: '启用删除线',
    },
    
    features: {
      title: '功能特性',
      enableFormula: '启用公式编辑',
      enableImage: '启用图片上传',
      enableClearFormat: '启用清除格式',
      enableThemeToggle: '启用主题切换',
      readonly: '只读模式',
      autoFocus: '自动聚焦',
      spellcheck: '拼写检查',
      enableShortcuts: '启用快捷键',
    },
    
    limits: {
      title: '限制设置',
      maxLength: '最大字符数',
      maxImageSize: '最大图片大小',
      allowedImageTypes: '允许的图片类型',
    },
    
    stats: {
      title: '统计和保存',
      showCharCount: '显示字符数',
      showWordCount: '显示单词数',
      enableAutoSave: '启用自动保存',
      autoSaveInterval: '自动保存间隔',
    },
    
    tools: {
      bold: '粗体',
      italic: '斜体',
      underline: '下划线',
      strikethrough: '删除线',
      formula: '公式',
      image: '图片',
      clear: '清除',
      theme: '主题',
    },
    
    preview: {
      title: '实时预览',
    },
    
    events: {
      title: '事件日志',
      clear: '清除日志',
    },
    
    code: {
      title: '生成代码',
      copy: '复制代码',
    },
    
    // 模式和标注
    modes: {
      editorType: '编辑器类型',
      richTextEditor: '富文本编辑器',
      universal: '通用配置',
      toolbarSettings: '工具栏设置',
      showToolbarDesc: '显示或隐藏编辑器工具栏',
      formatFeatures: '格式功能',
      advancedFeatures: '高级功能',
      previewDescription: '根据左侧配置实时展示编辑器效果',
      noEvents: '暂无事件',
      categories: {
        format: '格式',
        advanced: '高级',
        utility: '工具',
      },
      descriptions: {
        enableBold: '启用粗体格式功能',
        enableItalic: '启用斜体格式功能',
        enableStrikethrough: '启用删除线格式功能',
        enableFormula: '启用数学公式编辑功能',
        enableImage: '启用图片上传功能',
        readonly: '只读模式，禁用编辑功能',
        autoFocus: '自动聚焦到编辑器',
        toolBold: '为文本添加粗体格式',
        toolItalic: '为文本添加斜体格式',
        toolUnderline: '为文本添加下划线',
        toolStrikethrough: '为文本添加删除线',
        toolFormula: '插入数学公式',
        toolImage: '插入图片',
        toolClear: '清除所有格式',
      },
    },
  },

  // 文档
  docs: {
    title: '使用文档',
    description: '详细的组件使用指南和API文档',
    
    toc: {
      title: '目录',
      quickLinks: '快速链接',
      github: 'GitHub',
      npm: 'NPM',
      install: '安装',
      basicUsage: '基本使用',
      coreComponents: '核心组件',
      beautifulApi: 'VueMathjaxBeautiful API',
      editorApi: 'VueMathjaxEditor API',
      examples: '示例和最佳实践',
    },
    
    sections: {
      installation: {
        title: '安装',
        yarn: '使用 Yarn 安装：',
        pnpm: '使用 pnpm 安装：',
        packageManagers: '包管理器',
        requirements: '系统要求和快速导入',
        optional: '(可选)',
        quickImport: '快速导入',
        cdn: 'CDN 引入',
      },
      
      basicUsage: {
        title: '基本使用',
        commonConfig: '常用配置',
        configs: {
          minimalSetup: '最简配置',
          customHeight: '自定义高度',
          readonlyMode: '只读模式',
          inlineDialog: '内联弹窗',
        },
      },
      
      coreComponents: {
        title: '核心组件',
        beautiful: {
          title: 'VueMathjaxBeautiful',
          description: '专业的数学公式编辑器组件，提供240+符号和38个模板，支持弹窗和内联模式',
        },
        editor: {
          title: 'VueMathjaxEditor',
          description: '富文本编辑器组件，支持文本格式和数学公式的混合编辑',
        },
      },
      
      vueMathjaxBeautifulApi: {
        title: 'VueMathjaxBeautiful API',
        basicProps: '基础属性',
        behaviorProps: '行为属性',
        events: '事件',
        props: {
          modelValue: '控制弹窗显示/隐藏状态',
          title: '弹窗标题文本',
          subtitle: '弹窗副标题文本',
          placeholder: '输入框占位符文本',
          inlineMode: '是否启用内联模式（默认false）',
          existingLatex: '预设的LaTeX内容',
          showThemeToggle: '是否显示主题切换按钮',
        },
        eventDesc: {
          insert: '用户点击插入按钮时触发，参数为LaTeX字符串',
          cancel: '用户点击取消按钮或关闭弹窗时触发',
        },
      },
      
      vueMathjaxEditorApi: {
        title: 'VueMathjaxEditor API',
        basicProps: '基础属性',
        featureProps: '功能属性',
        events: '事件',
        props: {
          modelValue: '编辑器内容（HTML字符串）',
          placeholder: '编辑器占位符文本',
          minHeight: '编辑器最小高度（默认200px）',
          width: '编辑器宽度（默认100%）',
          readonly: '是否只读模式',
          showToolbar: '是否显示工具栏',
          theme: '编辑器主题（default | minimal）',
          autoFocus: '是否自动聚焦',
        },
        eventDesc: {
          change: '内容变化时触发，参数为新的HTML内容',
          focus: '编辑器获得焦点时触发',
          blur: '编辑器失去焦点时触发',
          ready: '编辑器初始化完成时触发',
          error: '发生错误时触发，参数为错误信息',
        },
      },
      
      events: {
        title: '事件处理',
        change: '内容变化事件',
        focus: '聚焦事件',
        blur: '失焦事件',
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
        displayFormula: '块级公式',
      },
      
      latexSyntax: {
        title: 'LaTeX 语法',
        inlineFormula: '行内公式',
        displayFormula: '块级公式',
        fraction: '分数',
        sqrt: '平方根',
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
      
      latexApiUtils: {
        title: 'LaTeX API 工具',
        coreConversion: '核心转换功能',
        matchingDetection: '匹配检测功能',
        usageExample: '使用示例',
        functions: {
          initMathJax: '初始化MathJax环境',
          convertLatexToSvg: '将LaTeX转换为SVG',
          batchConvertLatex: '批量转换LaTeX',
          extractLatexFromSvg: '从SVG提取LaTeX',
          matchLatex: '匹配LaTeX公式',
          hasLatexFormula: '检测是否包含公式',
          clearMathTags: '清理数学标签',
        },
      },
      
      integrationExample: {
        title: '集成示例',
        composition: 'Vue 3 组合式API',
        scriptSetup: 'Script Setup 语法',
        typescript: 'TypeScript类型支持',
        utilityFunctions: '工具函数使用',
      },
      
      faq: {
        title: '常见问题',
        questions: {
          complexFormulas: {
            q: '如何处理复杂的数学公式？',
            a: '组件支持完整的LaTeX语法，包括多行公式、矩阵、分数等复杂结构。建议使用模板快速开始。',
          },
          latexSupport: {
            q: '支持哪些LaTeX语法？',
            a: '支持大部分常用的LaTeX数学语法，包括符号、函数、环境等。完整列表请参考MathJax文档。',
          },
          customStyle: {
            q: '如何自定义样式？',
            a: '可以通过CSS变量或直接覆盖样式类来自定义外观。组件提供了多个CSS类用于样式定制。',
          },
          mobile: {
            q: '移动端支持如何？',
            a: '组件完全适配移动端，提供响应式设计和触摸友好的交互体验。',
          },
        },
      },
      
      resources: {
        title: '更多资源',
        github: 'GitHub 仓库',
        examples: '更多示例',
        api: 'API 文档',
        issues: '问题反馈',
        changelog: '更新日志',
      },
      
      examples: {
        title: '示例和最佳实践',
        commonUsage: '常见用法',
        bestPractices: '最佳实践',
        inlineUsage: '内联模式下使用',
        dialogUsage: '弹窗模式下使用',
        practice1: '合理选择内联模式和弹窗模式',
        practice2: '预设常用公式模板',
        practice3: '启用实时预览提升用户体验',
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
    copyright: '© 2025 Vue MathJax Beautiful. All rights reserved.',
    author: '由 不讲道理的柯里昂 开发维护',
    madeWith: 'Made with',
    forVueCommunity: 'for the Vue.js community',
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
    back: '返回',
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

  // 隐私政策页面
  privacy: {
    title: '隐私政策',
    subtitle: '我们致力于保护您的隐私，本政策详细说明了我们如何收集、使用和保护您的个人信息',
    badge: '隐私保护',
    lastUpdated: '最后更新时间：2025年1月',
    sections: {
      overview: {
        title: '1. 概述',
        subtitle: '隐私保护承诺',
        content: 'Vue MathJax Beautiful（以下简称"本产品"）致力于保护用户隐私。本隐私政策说明了我们如何收集、使用和保护您的个人信息。使用本产品即表示您同意本隐私政策中描述的数据处理方式。'
      },
      dataCollection: {
        title: '2. 信息收集',
        subtitle: '数据收集范围',
        autoCollected: {
          title: '2.1 自动收集的信息',
          items: [
            '浏览器类型和版本',
            '操作系统信息',
            '访问时间和日期',
            'IP地址（用于安全目的）',
            '页面访问统计'
          ]
        },
        userProvided: {
          title: '2.2 用户提供的信息',
          items: [
            'GitHub Issues 和 Discussions 中的反馈信息',
            '通过邮件或其他方式提供的技术支持请求'
          ]
        }
      },
      dataUsage: {
        title: '3. 信息使用',
        subtitle: '数据使用目的',
        description: '我们收集的信息将用于以下目的：',
        purposes: [
          '提供和改进产品功能',
          '分析使用模式以优化用户体验',
          '提供技术支持和客户服务',
          '检测和防止安全威胁',
          '遵守法律法规要求'
        ]
      },
      dataSharing: {
        title: '4. 信息共享',
        subtitle: '数据共享政策',
        description: '我们不会出售、交易或转让您的个人信息给第三方，除非：',
        exceptions: [
          '获得您的明确同意',
          '为提供服务而需要与可信赖的第三方合作',
          '遵守法律法规或政府要求',
          '保护我们的权利、财产或安全'
        ]
      },
      dataSecurity: {
        title: '5. 数据安全',
        subtitle: '安全保护措施',
        content: '我们采用适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或披露。然而，请注意互联网传输无法保证100%安全，我们无法完全保证信息传输的绝对安全。'
      },
      cookies: {
        title: '6. Cookie 使用',
        subtitle: 'Cookie 政策',
        content: '本产品可能使用 Cookie 来改善用户体验。您可以通过浏览器设置控制 Cookie 的使用。禁用 Cookie 可能影响某些功能的正常使用。'
      },
      thirdParty: {
        title: '7. 第三方服务',
        subtitle: '第三方集成',
        description: '本产品可能使用以下第三方服务：',
        services: [
          'GitHub（代码托管和问题跟踪）',
          'Google Analytics（网站分析，如果使用）',
          '其他必要的技术服务提供商'
        ],
        note: '这些第三方服务有自己的隐私政策，我们建议您查看相关条款。'
      },
      childrenPrivacy: {
        title: '8. 儿童隐私',
        subtitle: '儿童保护',
        content: '本产品不专门针对13岁以下儿童。我们不会故意收集13岁以下儿童的个人信息。如果您认为我们可能收集了儿童的个人信息，请立即联系我们。'
      },
      policyUpdates: {
        title: '9. 隐私政策更新',
        subtitle: '政策变更',
        content: '我们可能会不时更新本隐私政策。重大变更将在网站上发布通知。继续使用本产品即表示您接受更新后的隐私政策。'
      },
      contact: {
        title: '10. 联系我们',
        subtitle: '联系方式',
        description: '如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：',
        developer: '开发者',
        github: 'GitHub',
        issues: 'Issues'
      }
    }
  },

  // 使用条款页面
  terms: {
    title: '使用条款',
    subtitle: '本条款规定了您使用 Vue MathJax Beautiful 的条件和规则，请仔细阅读',
    badge: '使用条款',
    lastUpdated: '最后更新时间：2025年1月',
    sections: {
      overview: {
        title: '1. 概述',
        subtitle: '条款说明',
        content: '欢迎使用 Vue MathJax Beautiful（以下简称"本产品"）。本使用条款（以下简称"条款"）规定了您使用本产品的条件和规则。使用本产品即表示您同意遵守这些条款。如果您不同意这些条款，请不要使用本产品。'
      },
      productDescription: {
        title: '2. 产品描述',
        subtitle: '功能特性',
        description: 'Vue MathJax Beautiful 是一个基于 Vue 3 的数学公式编辑器组件库，提供以下功能：',
        features: [
          '专业的数学公式编辑功能',
          '240+ 数学符号面板',
          '38 个常用公式模板',
          '实时预览功能',
          'LaTeX 语法支持',
          '富文本编辑功能',
          '响应式设计'
        ]
      },
      licensing: {
        title: '3. 许可条款',
        subtitle: '开源许可',
        openSource: {
          title: '3.1 开源许可',
          content: '本产品采用 MIT 许可证发布。您可以在遵守 MIT 许可证条款的前提下自由使用、修改和分发本产品。'
        },
        permissions: {
          title: '3.2 使用权限',
          description: '在遵守本条款的前提下，我们授予您非独占、不可转让、可撤销的许可，允许您：',
          items: [
            '在您的项目中集成和使用本产品',
            '根据您的需求修改和定制本产品',
            '在商业和非商业项目中使用本产品'
          ]
        }
      },
      userResponsibilities: {
        title: '4. 用户责任',
        subtitle: '用户义务',
        description: '使用本产品时，您同意：',
        responsibilities: [
          '遵守所有适用的法律法规',
          '不将本产品用于非法或有害目的',
          '不侵犯他人的知识产权',
          '不传播恶意代码或病毒',
          '尊重其他用户的权利',
          '提供准确和真实的信息'
        ]
      },
      prohibitedActions: {
        title: '5. 禁止行为',
        subtitle: '禁止事项',
        description: '使用本产品时，您不得：',
        prohibitions: [
          '违反任何适用的法律法规',
          '侵犯他人的知识产权或隐私权',
          '传播虚假、误导或有害信息',
          '干扰或破坏本产品的正常运行',
          '尝试未经授权访问本产品的系统',
          '使用本产品进行商业间谍活动',
          '传播恶意软件或病毒'
        ]
      },
      intellectualProperty: {
        title: '6. 知识产权',
        subtitle: '版权保护',
        productIP: {
          title: '6.1 产品知识产权',
          content: '本产品的源代码、设计、文档等知识产权归开发者"不讲道理的柯里昂"所有。根据 MIT 许可证，您可以自由使用和修改这些内容。'
        },
        thirdParty: {
          title: '6.2 第三方组件',
          content: '本产品可能包含第三方开源组件，这些组件受其各自的许可证保护。我们建议您查看相关组件的许可证条款。'
        }
      },
      disclaimer: {
        title: '7. 免责声明',
        subtitle: '免责条款',
        description: '本产品按"现状"提供，不提供任何明示或暗示的保证，包括但不限于：',
        disclaimers: [
          '适销性保证',
          '特定用途适用性保证',
          '无侵权保证',
          '无错误或无中断保证',
          '安全性保证'
        ],
        note: '我们不对因使用本产品而产生的任何直接、间接、偶然、特殊或后果性损害承担责任。'
      },
      liabilityLimitation: {
        title: '8. 责任限制',
        subtitle: '责任范围',
        content: '在法律允许的最大范围内，我们的总责任不超过您为使用本产品支付的费用（如果有的话）。某些司法管辖区不允许责任限制，因此这些限制可能不适用于您。'
      },
      serviceChanges: {
        title: '9. 服务变更',
        subtitle: '服务调整',
        content: '我们保留随时修改、暂停或终止本产品或其任何功能的权利，恕不另行通知。我们不对任何服务变更造成的损失承担责任。'
      },
      termsUpdates: {
        title: '10. 条款更新',
        subtitle: '条款变更',
        content: '我们可能会不时更新这些使用条款。重大变更将在网站上发布通知。继续使用本产品即表示您接受更新后的条款。如果您不同意更新后的条款，请停止使用本产品。'
      },
      applicableLaw: {
        title: '11. 适用法律',
        subtitle: '法律管辖',
        content: '本条款受中华人民共和国法律管辖。任何争议应通过友好协商解决，协商不成的，应提交有管辖权的人民法院解决。'
      },
      contact: {
        title: '12. 联系我们',
        subtitle: '联系方式',
        description: '如果您对本使用条款有任何疑问或建议，请通过以下方式联系我们：',
        developer: '开发者',
        github: 'GitHub',
        issues: 'Issues'
      }
    }
  },
}; 