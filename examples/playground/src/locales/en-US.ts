export default {
  // Navigation
  nav: {
    editor: 'Editor',
    features: 'Features',
    examples: 'Examples',
    docs: 'Documentation',
    toggleTheme: 'Toggle Theme',
    openMenu: 'Open Menu',
    language: 'Language',
  },

  // Theme
  theme: {
    light: 'Light Theme',
    dark: 'Dark Theme',
    switchToLight: 'Switch to Light Theme',
    switchToDark: 'Switch to Dark Theme',
  },

  // Language
  language: {
    chinese: '中文',
    english: 'English',
  },

  // Page Title
  page: {
    title: 'Vue MathJax Beautiful',
    subtitle: 'Beautiful Editor',
  },

  // Hero Section
  hero: {
    title: 'Vue Math Formula',
    titleHighlight: 'Editor',
    description: 'Professional math formula editor component library, provides 240+ symbol panels, 38 formula templates, supports rich text editing and LaTeX syntax',
    technologies: ['Vue 3', 'TypeScript', 'MathJax', 'LaTeX'],
    getStarted: 'Get Started',
    viewSource: 'View Source',
  },

  // Demo Section
  demo: {
    title: 'Online Demo',
    description: 'Experience professional math formula editor and rich text editing features',
    professionalEditor: 'Professional Formula Editor',
    richTextEditorLabel: 'Rich Text Editor',
    
    // Formula Editor
    formulaEditor: {
      title: 'VueMathjaxBeautiful - Professional Formula Editor',
      description: 'Provides 240+ math symbols and 38 formula templates, supports real-time preview and LaTeX syntax',
      inlineMode: 'Inline Mode',
      realTimePreview: 'Real-time Preview',
      tips: {
        title: 'Usage Tips:',
        clickSymbols: 'Click symbols in the symbol panel to insert quickly',
        latexSupport: 'Supports direct LaTeX syntax input',
        realTime: 'Real-time preview for WYSIWYG experience',
        modes: 'Supports both popup and inline modes',
      },
    },

    // Rich Text Editor
    richTextEditor: {
      title: 'VueMathjaxEditor - Rich Text Editor',
      description: 'Supports mixed editing of text formatting and mathematical formulas, suitable for writing documents with mathematical content',
      richText: 'Rich Text',
      latexSupport: 'LaTeX Support',
      clearContent: 'Clear Content',
      loadSample: 'Load Sample',
      placeholder: 'Start writing your content, supports rich text editing and math formulas...',
      
      latexExamples: {
        title: 'LaTeX Syntax Examples:',
        inline: 'Inline formula:',
        display: 'Display formula:',
        fraction: 'Fraction:',
      },

      shortcuts: {
        title: 'Shortcuts:',
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
      },
    },
  },

  // Features
  features: {
    title: 'Features',
    description: 'Comprehensive solution for mathematical content creation',
    
    list: {
      professionalEditor: {
        title: 'Professional Formula Editor',
        description: 'Based on MathJax engine, provides 240+ math symbols and 38 formula templates, supports complete LaTeX syntax',
      },
      richSymbols: {
        title: 'Rich Symbol Panel',
        description: 'Built-in basic symbols, Greek letters, and advanced symbols in three categories, covering algebra, geometry, calculus and other fields',
      },
      realTimePreview: {
        title: 'Real-time Preview',
        description: 'Real-time preview of rendering effects when inputting formulas, WYSIWYG editing experience, supports both inline and popup modes',
      },
      richTextEditing: {
        title: 'Rich Text Editing',
        description: 'Supports text formats like bold, italic, underline, perfectly combined with mathematical formulas, suitable for academic writing',
      },
      responsiveDesign: {
        title: 'Responsive Design',
        description: 'Adapts to various screen sizes, provides excellent user experience on both desktop and mobile devices',
      },
      easyIntegration: {
        title: 'Easy Integration',
        description: 'Provides Vue 3 components, supports TypeScript, easy to integrate into existing projects',
      },
    },
  },

  // Examples
  examples: {
    title: 'Formula Examples Library',
    description: 'Click examples to quickly load into the formula editor, experience different types of mathematical formulas',
    categories: {
      physics: 'Physics',
      algebra: 'Algebra',
      math: 'Mathematics',
      calculus: 'Calculus',
      series: 'Series',
      linearAlgebra: 'Linear Algebra',
      trigonometry: 'Trigonometry',
    },
    formulas: {
      massEnergy: 'Mass-Energy Equation',
      quadratic: 'Quadratic Equation',
      euler: 'Euler\'s Identity',
      integral: 'Integral',
      infiniteSeries: 'Infinite Series',
      matrix: 'Matrix',
      limit: 'Limit',
      trigonometric: 'Trigonometric Function',
    },
  },

  // Documentation
  docs: {
    title: 'Documentation',
    description: 'Complete usage guide and API documentation',
    
    sections: {
      installation: {
        title: 'Installation',
        description: 'Or use yarn:',
        yarn: 'Or use yarn:',
        pnpm: 'Or use pnpm (recommended):',
      },

      basicUsage: {
        title: 'Basic Usage',
      },

      coreComponents: {
        title: 'Core Components',
        beautiful: {
          title: 'VueMathjaxBeautiful',
          description: 'Professional formula editor, provides 240+ symbol panels and 38 formula templates, supports both inline and popup modes',
        },
        editor: {
          title: 'VueMathjaxEditor',
          description: 'Rich text editor, supports mixed editing of text formatting and mathematical formulas, suitable for academic writing',
        },
      },

      apiProps: {
        title: 'API Properties',
        modelValue: 'Bound content value (string)',
        placeholder: 'Placeholder text (string)',
        minHeight: 'Minimum height (string, default: "200px")',
        readonly: 'Read-only mode (boolean, default: false)',
      },

      events: {
        title: 'Events',
        change: 'Triggered when content changes (value: string)',
        focus: 'Triggered when editor gains focus',
        blur: 'Triggered when editor loses focus',
      },

      shortcuts: {
        title: 'Shortcuts',
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
        strikethrough: 'Strikethrough',
        undo: 'Undo',
        redo: 'Redo',
        editFormula: 'Edit Formula',
        inlineFormula: 'Inline Formula',
        displayFormula: 'Display Formula',
      },

      latexSyntax: {
        title: 'LaTeX Syntax Examples',
        inlineFormula: 'Inline formula',
        displayFormula: 'Display formula',
        fraction: 'Fraction',
        sqrt: 'Square root',
        superscript: 'Superscript',
        subscript: 'Subscript',
        sum: 'Summation',
        greekLetters: 'Greek letters',
        matrix: 'Matrix',
        limit: 'Limit',
        trigFunctions: 'Trigonometric functions',
        specialSymbols: 'Special symbols',
      },

      advancedUsage: {
        title: 'Advanced Usage',
      },

      formulaEditorUsage: {
        title: 'Formula Editor Usage',
      },

      faq: {
        title: 'FAQ',
        questions: {
          complexFormulas: {
            q: 'Q: How to insert complex mathematical formulas?',
            a: 'A: Click the "fx" button in the editor toolbar to open the formula editor, or write directly using LaTeX syntax.',
          },
          latexSupport: {
            q: 'Q: What LaTeX syntax is supported?',
            a: 'A: Supports complete MathJax LaTeX syntax, including fractions, radicals, integrals, matrices, etc.',
          },
          customStyle: {
            q: 'Q: How to customize editor styles?',
            a: 'A: You can customize styles through CSS, or use properties like min-height to adjust editor appearance.',
          },
          mobile: {
            q: 'Q: Does it support mobile devices?',
            a: 'A: Fully supports mobile devices with responsive design, providing excellent experience on all devices.',
          },
        },
      },

      resources: {
        title: 'More Resources',
        github: 'GitHub Repository',
        examples: 'Online Examples',
        api: 'API Documentation',
        issues: 'Issue Tracker',
        changelog: 'Changelog',
      },
    },
  },

  // Footer
  footer: {
    description: 'Provides powerful mathematical formula editing capabilities for Vue 3 applications, supports LaTeX syntax and real-time preview.',
    resources: 'Resources',
    community: 'Community',
    documentation: 'Documentation',
    examples: 'Examples',
    apiReference: 'API Reference',
    changelog: 'Changelog',
    github: 'GitHub',
    issues: 'Issue Tracker',
    discussions: 'Discussions',
    contributing: 'Contributing',
    copyright: '© 2024 Vue MathJax Beautiful. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },

  // Buttons and Links
  buttons: {
    clearContent: 'Clear Content',
    loadSample: 'Load Sample',
  },

  // Sample Content
  sampleContent: {
    welcome: '**Welcome to Vue MathJax Beautiful!**',
    intro: 'This is a powerful mathematical formula editor designed specifically for Vue 3.',
    mainFeatures: '## Main Features',
    richText: '- **Rich Text Editing**: Supports *italic*, **bold**, __underline__, ~~strikethrough~~',
    mathFormulas: '- **Mathematical Formulas**: Complete LaTeX syntax support',
    realTimePreview: '- **Real-time Preview**: WYSIWYG editing experience',
    mathExamples: '## Mathematical Formula Examples',
    massEnergyFormula: 'Inline formula: The mass-energy equation $E = mc^2$ shows the relationship between mass and energy.',
    gaussianIntegral: 'Display formula:',
    quadraticFormula: 'Fractions and radicals:',
    getStarted: '## Getting Started',
    clickFormula: 'Click the **fx Formula** button in the toolbar to open the formula editor, or click existing formulas to edit them directly.',
  },

  // Loading States
  loading: 'Loading...',
  loadingFailed: 'Loading Failed',
  initializationFailed: 'Initialization Failed',

  // Back to Top
  backToTop: 'Back to Top',

  // Common Text
  common: {
    viewMore: 'View More',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    close: 'Close',
    open: 'Open',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
  },
}; 