declare global {
  interface Window {
    MathJax?: {
      tex2svgPromise?: (latex: string, options?: any) => Promise<any>
      tex2svg?: (latex: string, options?: any) => any
      typesetPromise?: (elements: HTMLElement[]) => Promise<void>
      startup?: {
        defaultPageReady?: () => Promise<void>
        defaultReady?: () => void
        ready?: () => void
        promise?: Promise<void>
      }
      tex?: {
        inlineMath?: string[][]
        displayMath?: string[][]
        processEscapes?: boolean
        processEnvironments?: boolean
        packages?: string[]
      }
      svg?: {
        fontCache?: string
        displayAlign?: string
        scale?: number
        minScale?: number
        mtextInheritFont?: boolean
        merrorInheritFont?: boolean
        mathmlSpacing?: boolean
        displayIndent?: string
      }
      options?: {
        ignoreHtmlClass?: string
        processHtmlClass?: string
      }
      [key: string]: any
    }
  }
}

export {} 