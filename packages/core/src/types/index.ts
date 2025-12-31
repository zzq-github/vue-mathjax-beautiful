// MathJax配置接口
export interface MathJaxConfig {
  loader?: {
    load?: string[];
  };
  tex?: {
    inlineMath?: string[][];
    displayMath?: string[][];
    packages?: string[];
  };
  svg?: {
    fontCache?: string;
  };
}

// 富文本编辑器属性接口
export interface RichTextEditorProps {
  modelValue?: string;
  placeholder?: string;
  minHeight?: string;
  showToolbar?: boolean;
  readonly?: boolean;
}

// 公式编辑器弹窗属性接口
export interface FormulaEditorDialogProps {
  modelValue: boolean;
  existingLatex?: string;
}

// VueMathjaxBeautiful组件属性接口
export interface VueMathjaxBeautifulProps {
  // 基础控制
  modelValue?: boolean;
  existingLatex?: string;
  inlineMode?: boolean;
  
  // 主题和样式
  theme?: 'light' | 'dark' | string;
  width?: string;
  height?: string;
  scale?: number;
  fontSize?: string;
  
  // 功能控制
  readonly?: boolean;
  showSymbols?: boolean;
  showPreview?: boolean;
  showThemeToggle?: boolean;
  showClearButton?: boolean;
  showLanguageToggle?: boolean;
  showFormulaExamples?: boolean;
  autoFocus?: boolean;
  
  // 输入控制
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  
  // 符号面板控制
  enabledCategories?: Array<'basic' | 'greek' | 'advanced'>;
  defaultCategory?: 'basic' | 'greek' | 'advanced';
  
  // 按钮文本自定义
  insertButtonText?: string;
  cancelButtonText?: string;
  clearButtonText?: string;
  
  // 标题自定义
  title?: string;
  subtitle?: string;
  
  // 公式包裹控制
  wrapFormula?: boolean;
}

// VueMathjaxBeautiful组件事件接口
export interface VueMathjaxBeautifulEvents {
  'update:modelValue': (value: boolean) => void;
  insert: (latex: string) => void;
  change: (latex: string) => void;
  clear: () => void;
  close: () => void;
  themeChange: (theme: string) => void;
}

// 编辑器事件接口
export interface EditorEvents {
  'update:modelValue': (value: string | boolean) => void;
  change: (value: string) => void;
  focus: () => void;
  blur: () => void;
  insert: (latex: string) => void;
}

// VueMathjaxEditor 组件属性接口
export interface VueMathjaxEditorProps {
  // 基础内容控制
  modelValue?: string;
  placeholder?: string;
  
  // 尺寸和样式
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  borderRadius?: string;
  
  // 工具栏配置
  showToolbar?: boolean;
  toolbarPosition?: 'top' | 'bottom';
  enabledTools?: string[];
  
  // 格式功能控制
  enableBold?: boolean;
  enableItalic?: boolean;
  enableUnderline?: boolean;
  enableStrikethrough?: boolean;
  
  // 插入功能控制
  enableFormula?: boolean;
  enableImage?: boolean;
  enableClearFormat?: boolean;
  enableThemeToggle?: boolean;
  
  // 编辑器行为配置
  readonly?: boolean;
  autoFocus?: boolean;
  spellcheck?: boolean;
  maxLength?: number;
  
  // 主题和外观
  theme?: 'light' | 'dark';
  
  // 统计显示
  showCharCount?: boolean;
  showWordCount?: boolean;
  
  // 功能增强
  enableShortcuts?: boolean;
  enableAutoSave?: boolean;
  autoSaveInterval?: number;
  
  // 公式编辑器配置
  formulaEditorProps?: Record<string, any>;
  
  // 上传配置
  maxImageSize?: number;
  allowedImageTypes?: string[];
  
  // 自定义样式类
  customClass?: string;
  toolbarClass?: string;
  editorClass?: string;
}

// VueMathjaxEditor 组件事件接口
export interface VueMathjaxEditorEvents {
  'update:modelValue': (value: string) => void;
  change: (value: string) => void;
  focus: () => void;
  blur: () => void;
  ready: () => void;
  error: (error: Error) => void;
  themeChange: (theme: string) => void;
  formatToggle: (format: string, active: boolean) => void;
  imageUpload: (file: File) => void;
  imageUploaded: (url: string) => void;
  imageError: (error: string) => void;
  formulaInsert: (latex: string) => void;
  save: (content: string) => void;
  charLimitReached: () => void;
  wordCountChange: (count: number) => void;
  charCountChange: (count: number) => void;
}
