import type { MathJaxConfig } from '../types'

// 默认MathJax配置
export const defaultMathJaxConfig: MathJaxConfig = {
  loader: {
    load: ['[tex]/ams', '[tex]/color', '[tex]/bbox']
  },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    packages: ['base', 'ams', 'color', 'bbox']
  },
  svg: {
    fontCache: 'global'
  }
}

// 初始化MathJax
export async function initMathJax(config: MathJaxConfig = defaultMathJaxConfig) {
  if (typeof window === 'undefined') return

  // 如果MathJax已经存在，先清理
  if (window.MathJax) {
    delete window.MathJax
  }

  // 设置MathJax配置
  window.MathJax = {
    ...config,
    startup: {
      ready: () => {
        window.MathJax?.startup?.defaultReady?.()
        console.log('MathJax is ready!')
      }
    }
  }

  // 动态加载MathJax脚本
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6'
    script.onload = () => {
      const mathJaxScript = document.createElement('script')
      mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
      mathJaxScript.onload = () => resolve()
      mathJaxScript.onerror = () => reject(new Error('Failed to load MathJax'))
      document.head.appendChild(mathJaxScript)
    }
    script.onerror = () => reject(new Error('Failed to load polyfill'))
    document.head.appendChild(script)
  })
}

// 渲染数学公式
export async function renderMath(element: HTMLElement, latex: string) {
  if (!window.MathJax) {
    await initMathJax()
  }

  element.innerHTML = `$$${latex}$$`
  
  if (window.MathJax?.typesetPromise) {
    await window.MathJax.typesetPromise([element])
  }
}

// 将LaTeX转换为SVG
export async function latexToSvg(latex: string): Promise<string> {
  if (!window.MathJax) {
    await initMathJax()
  }

  const svg = await window.MathJax?.tex2svg?.(latex, {
    display: true
  })

  return svg.outerHTML
}

// 验证LaTeX语法
export function validateLatex(latex: string): { valid: boolean; error?: string } {
  try {
    // 基本语法检查
    const openBraces = (latex.match(/\{/g) || []).length
    const closeBraces = (latex.match(/\}/g) || []).length
    
    if (openBraces !== closeBraces) {
      return { valid: false, error: '括号不匹配' }
    }

    // 检查常见的语法错误
    const invalidPatterns = [
      /\\[a-zA-Z]+(?![a-zA-Z])/g, // 未完成的命令
      /\$\$\$/g, // 三个连续的$符号
    ]

    for (const pattern of invalidPatterns) {
      if (pattern.test(latex)) {
        return { valid: false, error: '语法错误' }
      }
    }

    return { valid: true }
  } catch (error) {
    return { valid: false, error: '未知错误' }
  }
}

// MathJax类型已在global.d.ts中定义 