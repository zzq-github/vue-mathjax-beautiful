// MathJax配置接口
export interface MathJaxConfig {
  loader?: {
    load?: string[]
  }
  tex?: {
    inlineMath?: string[][]
    displayMath?: string[][]
    packages?: string[]
  }
  svg?: {
    fontCache?: string
  }
}

// 富文本编辑器属性接口
export interface RichTextEditorProps {
  modelValue?: string
  placeholder?: string
  minHeight?: string
  showToolbar?: boolean
  readonly?: boolean
}

// 公式编辑器弹窗属性接口
export interface FormulaEditorDialogProps {
  modelValue: boolean
  existingLatex?: string
}

// 编辑器事件接口
export interface EditorEvents {
  'update:modelValue': (value: string | boolean) => void
  'change': (value: string) => void
  'focus': () => void
  'blur': () => void
  'insert': (latex: string) => void
} 