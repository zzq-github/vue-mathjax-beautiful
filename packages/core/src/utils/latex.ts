/**
 * LaTeX工具函数
 * 支持LaTeX公式转换和处理
 */

/**
 * 匹配LaTeX公式的正则表达式
 * 支持以下格式：
 * 1. $...$        - 行内公式
 * 2. $$...$$      - 行间公式
 * 3. \(...\)      - 行内公式
 * 4. \[...\]      - 行间公式
 * 5. \begin{equation}...\end{equation} - 编号公式环境
 * 6. \begin{align}...\end{align}       - 对齐公式环境
 */
const LATEX_PATTERNS = [
  // 行内公式 $...$，但不匹配 $$...$$
  {
    pattern: /(?<!\$)\$(?!\$)([^\$]+)\$(?!\$)/g,
    wrapper: (content: string) => `\\(${content}\\)`,
    isInline: true
  },
  // 行间公式 $$...$$
  {
    pattern: /\$\$([\s\S]+?)\$\$/g,
    wrapper: (content: string) => `\\[${content}\\]`,
    isInline: false
  },
  // 行内公式 \(...\)
  {
    pattern: /\\\(([\s\S]+?)\\\)/g,
    wrapper: (content: string) => `\\(${content}\\)`,
    isInline: true
  },
  // 行间公式 \[...\]
  {
    pattern: /\\\[([\s\S]+?)\\\]/g,
    wrapper: (content: string) => `\\[${content}\\]`,
    isInline: false
  },
  // equation 环境
  {
    pattern: /\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g,
    wrapper: (content: string) => `\\[${content}\\]`,
    isInline: false
  },
  // align 环境
  {
    pattern: /\\begin\{align\}([\s\S]+?)\\end\{align\}/g,
    wrapper: (content: string) => `\\[${content}\\]`,
    isInline: false
  }
]

/**
 * 匹配LaTeX公式的结果类型
 */
export interface MatchLatexResult {
  formula: string
  content: string
  start: number
  end: number
  wrapper: string
  isInline: boolean
}

/**
 * MathJax types are declared in types/global.d.ts
 */

/**
 * 匹配内容中的LaTeX公式
 * @param content - 要处理的内容
 * @returns 匹配到的公式数组
 */
export function matchLatex(content: string): MatchLatexResult[] {
  if (!content) return []
  
  const matches: MatchLatexResult[] = []
  
  LATEX_PATTERNS.forEach(({ pattern, wrapper, isInline }) => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      matches.push({
        formula: match[0],          // 原始公式文本
        content: match[1],          // 公式内容
        start: match.index,         // 起始位置
        end: match.index + match[0].length,  // 结束位置
        wrapper: wrapper(match[1]), // 处理后的公式
        isInline                    // 是否为行内公式
      })
    }
  })
  
  // 按起始位置排序
  return matches.sort((a, b) => a.start - b.start)
}

/**
 * 清理MathML标签
 * @param element - DOM元素
 * @param tagName - 要清理的标签名
 */
export function clearMathTags(element: HTMLElement, tagName: string) {
  const tags = element.getElementsByTagName(tagName)
  while (tags.length > 0) {
    const tag = tags[0]
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag)
    }
  }
}

/**
 * 转换LaTeX公式为SVG
 * @param content - 包含LaTeX公式的内容
 * @returns 转换后的内容
 */
export async function convertLatexToSvg(content: string): Promise<string> {
  if (!content) return ''
  
  try {
    // 如果内容中包含SVG公式，则先转换为LaTeX代码，重新转换为SVG
    if (content.includes('<svg') && content.includes('data-latex')) {
      content = extractLatexFromSvg(content)
    }

    const matches = matchLatex(content)
    if (!matches.length) return content

    // 创建一个副本以进行替换
    let result = content
    let offset = 0

    // 使用MathJax转换每个公式
    for (const match of matches) {
      try {
        // 检查MathJax是否可用
        if (!window.MathJax?.tex2svgPromise) {
          console.warn('MathJax not available, skipping formula:', match.content)
          continue
        }

        const svg = await window.MathJax.tex2svgPromise(match.content, {
          display: !match.isInline,
          scale: 1.2, // 增加缩放比例
          em: 16, // 设置em单位大小
          ex: 8, // 设置ex单位大小
          containerWidth: 1200 // 设置容器宽度
        })
        
        // 检查返回的SVG对象
        if (!svg || typeof svg.getElementsByTagName !== 'function') {
          console.warn('Invalid SVG object returned from MathJax:', svg)
          continue
        }
        
        // 获取SVG元素
        const svgElements = svg.getElementsByTagName('svg')
        if (!svgElements || svgElements.length === 0) {
          console.warn('No SVG elements found in MathJax output')
          continue
        }
        
        const svgElement = svgElements[0]

        // 添加原始LaTeX公式作为属性
        svgElement.setAttribute('data-latex', match.content)
        svgElement.setAttribute('data-latex-type', match.isInline ? 'inline' : 'display')
        
        // 添加样式属性，便于编辑
        svgElement.setAttribute('contenteditable', 'false')
        svgElement.style.cursor = 'pointer'
        svgElement.style.display = 'inline-block'
        svgElement.style.margin = '0 2px'
        svgElement.style.fontSize = '18px' // 设置更大的字体大小
        svgElement.style.verticalAlign = 'middle' // 垂直居中对齐

        // 获取处理后的SVG HTML，前后添加零宽度空格
        const svgHtml = '\u200B' + svgElement.outerHTML + '\u200B'
        
        // 计算新的位置（考虑之前替换造成的偏移）
        const start = match.start + offset
        const end = match.end + offset
        
        // 替换原文本
        result = result.substring(0, start) + svgHtml + result.substring(end)
        
        // 更新偏移量
        offset += svgHtml.length - (match.formula.length)
      } catch (err) {
        console.warn('convert latex error:', match.formula, err)
        // 如果转换失败，保留原始文本
        continue
      }
    }
    
    return result
  } catch (error) {
    console.error('convert latex error:', error)
    return content
  }
}

/**
 * 批量转换LaTeX公式
 * @param contents - 要处理的内容数组
 * @returns 处理后的内容数组
 */
export async function batchConvertLatex(contents: { content: string }[]): Promise<{ content: string }[]> {
  if (!Array.isArray(contents)) return contents
  
  try {
    return await Promise.all(
      contents.map(async (item) => {
        if (!item || typeof item.content !== 'string') return item
        const convertedContent = await convertLatexToSvg(item.content)
        return { ...item, content: convertedContent }
      })
    )
  } catch (error) {
    console.error('batch convert latex error:', error)
    return contents
  }
}

/**
 * 从SVG公式中转换为LaTeX代码
 * @param content - 包含SVG公式的内容
 * @returns 转换后的LaTeX内容
 */
export function extractLatexFromSvg(content: string): string {
  if (!content) return ''
  
  // 如果内容中没有SVG，直接返回
  if (!content.includes('<svg')) {
    return content
  }
  
  // 只在客户端环境中使用DOM操作
  if (typeof window === 'undefined') {
    // 服务器端使用正则表达式处理
    return content.replace(
      /<svg[^>]*data-latex="([^"]*)"[^>]*data-latex-type="([^"]*)"[^>]*>[\s\S]*?<\/svg>/g,
      (match, latexCode, latexType) => {
        return latexType === 'inline' ? `$${latexCode}$` : `$$${latexCode}$$`
      }
    ).replace(
      /<svg[^>]*data-latex="([^"]*)"[^>]*>[\s\S]*?<\/svg>/g,
      (match, latexCode) => {
        // 如果没有data-latex-type，默认为行间公式
        return `$$${latexCode}$$`
      }
    )
  }
  
  try {
    // 创建临时DOM元素来解析HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    // 查找所有带有data-latex属性的SVG元素
    const svgElements = tempDiv.querySelectorAll('svg[data-latex]')
    
    svgElements.forEach((svg) => {
      const latexCode = svg.getAttribute('data-latex')
      if (latexCode) {
        // 根据data-latex-type属性判断是行内还是行间公式
        const latexType = svg.getAttribute('data-latex-type')
        let latexFormat: string
        
        if (latexType === 'inline') {
          latexFormat = `$${latexCode}$` // 行内公式
        } else {
          latexFormat = `$$${latexCode}$$` // 行间公式（默认）
        }
        
        // 创建文本节点替换SVG
        const textNode = document.createTextNode(latexFormat)
        svg.parentNode?.replaceChild(textNode, svg)
      }
    })

    return tempDiv.innerHTML
  } catch (error) {
    console.error('Extract LaTeX from SVG error:', error)
    return content
  }
}

/**
 * 检测内容中是否包含LaTeX公式
 * @param content - 要检测的内容
 * @returns 是否包含LaTeX公式
 */
export function hasLatexFormula(content: string): boolean {
  if (!content) return false
  
  return LATEX_PATTERNS.some(({ pattern }) => pattern.test(content))
}

/**
 * 初始化并加载MathJax
 * @param config - MathJax配置
 * @returns Promise
 */
export async function initMathJax(config?: any): Promise<void> {
  if (typeof window === 'undefined') return
  
  // 如果MathJax已经加载并且可用，直接返回
  if (window.MathJax?.tex2svgPromise) {
    return
  }
  
  // 配置MathJax - 必须在加载脚本之前设置
  if (!window.MathJax) {
    window.MathJax = {
      tex: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
        displayMath: [
          ['$$', '$$'],
          ['\\[', '\\]'],
        ],
        processEscapes: true,
        processEnvironments: true,
        packages: ['base', 'ams', 'noerrors', 'noundefined']
      },
      svg: {
        fontCache: 'global',
        displayAlign: 'center',
        scale: 1.0,
        minScale: 0.5,
        mtextInheritFont: false,
        merrorInheritFont: false,
        mathmlSpacing: false,
        displayIndent: '0'
      },
      startup: {
        ready: () => {
          console.log('MathJax is ready')
          if (window.MathJax?.startup?.defaultReady) {
            window.MathJax.startup.defaultReady()
          }
        }
      },
      options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      }
    }
    
    // 合并用户配置
    if (config) {
      window.MathJax = { ...window.MathJax, ...config }
    }
  }
  
  // 加载MathJax脚本
  try {
    await loadMathJax()
    
    // 等待MathJax完全初始化
    let retries = 0
    const maxRetries = 50 // 最多等待5秒
    
    while (!window.MathJax?.tex2svgPromise && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100))
      retries++
    }
    
    if (!window.MathJax?.tex2svgPromise) {
      throw new Error('MathJax tex2svgPromise not available after initialization')
    }
    
    console.log('MathJax initialized successfully')
  } catch (error) {
    console.error('Failed to initialize MathJax:', error)
    throw error
  }
}

/**
 * 加载MathJax脚本
 * @param url - MathJax脚本URL
 * @returns Promise
 */
export function loadMathJax(url: string = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('MathJax can only be loaded in browser environment'))
      return
    }
    
    // 检查是否已经有MathJax脚本
    const existingScript = document.querySelector(`script[src*="mathjax"]`)
    if (existingScript) {
      console.log('MathJax script already exists')
      resolve()
      return
    }
    
    console.log('Loading MathJax from:', url)
    
    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.id = 'mathjax-script'
    
    script.onload = () => {
      console.log('MathJax script loaded')
      resolve()
    }
    
    script.onerror = (error) => {
      console.error('Failed to load MathJax script:', error)
      reject(new Error('Failed to load MathJax'))
    }
    
    document.head.appendChild(script)
  })
} 