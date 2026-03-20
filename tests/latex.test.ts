import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  matchLatex,
  hasLatexFormula,
  clearMathTags,
  extractLatexFromSvg,
  preprocessLatexDocument,
  isMathContent,
  sanitizeLatexFormula,
  latexToReadable,
  preprocessFakeCodeBlocks,
  preprocessCodeBlocks,
  protectMathBlocks,
  restoreMathBlocks,
  cleanupMathBlockPlaceholders,
} from '../packages/core/src/utils/latex';

describe('latex.ts 公开 API 测试', () => {
  describe('matchLatex - 公式匹配', () => {
    it('应该匹配行内公式 $...$', () => {
      const content = '这是一个公式 $E=mc^2$ 的测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].content).toBe('E=mc^2');
      expect(matches[0].isInline).toBe(true);
    });

    it('应该匹配行间公式 $$...$$', () => {
      const content = '行间公式 $$\\int_0^1 x dx$$ 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].content).toBe('\\int_0^1 x dx');
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 \\(...\\) 格式', () => {
      const content = '公式 \\(x^2 + y^2\\) 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].content).toBe('x^2 + y^2');
      expect(matches[0].isInline).toBe(true);
    });

    it('应该匹配 \\[...\\] 格式', () => {
      const content = '公式 \\[\\sum_{i=1}^n i\\] 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].content).toBe('\\sum_{i=1}^n i');
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 equation 环境', () => {
      const content = '公式 \\begin{equation}a^2 + b^2 = c^2\\end{equation} 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 equation* 环境', () => {
      const content = '公式 \\begin{equation*}x = y\\end{equation*} 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 align 环境', () => {
      const content = '公式 \\begin{align}x &= 1\\\\y &= 2\\end{align} 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 align* 环境', () => {
      const content = '公式 \\begin{align*}x &= 1\\end{align*} 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 gather 环境', () => {
      const content = '公式 \\begin{gather}x + y\\end{gather} 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配 displaymath 环境', () => {
      const content = '公式 \\begin{displaymath}x^2\\end{displaymath} 测试';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].isInline).toBe(false);
    });

    it('应该匹配多个公式', () => {
      const content = '公式 $a$ 和 $b$ 以及 $$c$$';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(3);
    });

    it('应该按位置排序匹配结果', () => {
      const content = '$$b$$ 和 $a$';
      const matches = matchLatex(content);
      expect(matches[0].content).toBe('b');
      expect(matches[1].content).toBe('a');
    });

    it('应该支持多行公式内容', () => {
      const content = '$x^2\n+ y^2$';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
      expect(matches[0].content).toContain('x^2');
    });

    it('应该允许公式前后有空格', () => {
      const content = '$ x^2 $';
      const matches = matchLatex(content);
      expect(matches).toHaveLength(1);
    });

    it('空内容应该返回空数组', () => {
      expect(matchLatex('')).toEqual([]);
      expect(matchLatex(null as any)).toEqual([]);
    });
  });

  describe('hasLatexFormula - 公式检测', () => {
    it('应该检测到 $...$ 公式', () => {
      expect(hasLatexFormula('公式 $x$ 测试')).toBe(true);
    });

    it('应该检测到 $$...$$ 公式', () => {
      expect(hasLatexFormula('公式 $$x$$ 测试')).toBe(true);
    });

    it('应该检测到 \\(...\\) 公式', () => {
      expect(hasLatexFormula('公式 \\(x\\) 测试')).toBe(true);
    });

    it('应该检测到 \\[...\\] 公式', () => {
      expect(hasLatexFormula('公式 \\[x\\] 测试')).toBe(true);
    });

    it('应该检测到 equation 环境', () => {
      expect(hasLatexFormula('\\begin{equation}x\\end{equation}')).toBe(true);
    });

    it('不应该检测到普通文本', () => {
      expect(hasLatexFormula('普通文本')).toBe(false);
    });

    it('空内容应该返回 false', () => {
      expect(hasLatexFormula('')).toBe(false);
      expect(hasLatexFormula(null as any)).toBe(false);
    });
  });

  describe('clearMathTags - 清理标签', () => {
    it('应该清理指定标签', () => {
      const element = document.createElement('div');
      element.innerHTML = '<math><mi>x</mi></math>';
      clearMathTags(element, 'math');
      expect(element.innerHTML).toBe('');
    });
  });

  describe('extractLatexFromSvg - SVG 提取', () => {
    it('应该从 SVG 提取行内公式', () => {
      const content = '<svg data-latex="x^2" data-latex-type="inline"><path/></svg>';
      const result = extractLatexFromSvg(content);
      expect(result).toBe('$x^2$');
    });

    it('应该从 SVG 提取行间公式', () => {
      const content = '<svg data-latex="x^2" data-latex-type="display"><path/></svg>';
      const result = extractLatexFromSvg(content);
      expect(result).toBe('$$x^2$$');
    });

    it('没有 SVG 时应该返回原内容', () => {
      const content = '普通文本';
      const result = extractLatexFromSvg(content);
      expect(result).toBe('普通文本');
    });

    it('空内容应该返回空字符串', () => {
      expect(extractLatexFromSvg('')).toBe('');
    });
  });

  describe('preprocessLatexDocument - LaTeX 文档预处理', () => {
    it('应该转换 section 为 Markdown 标题', () => {
      const content = '\\section{标题}';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('## 标题');
    });

    it('应该转换 subsection 为三级标题', () => {
      const content = '\\subsection{子标题}';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('### 子标题');
    });

    it('应该转换 textbf 为粗体', () => {
      const content = '\\textbf{粗体文本}';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('**粗体文本**');
    });

    it('应该转换 textit 为斜体', () => {
      const content = '\\textit{斜体文本}';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('*斜体文本*');
    });

    it('应该转换希腊字母', () => {
      const content = '\\alpha \\beta \\gamma';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('α');
      expect(result).toContain('β');
      expect(result).toContain('γ');
    });

    it('应该转换数学符号', () => {
      const content = '\\leq \\geq \\neq \\approx';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('≤');
      expect(result).toContain('≥');
      expect(result).toContain('≠');
      expect(result).toContain('≈');
    });

    it('应该移除 documentclass', () => {
      const content = '\\documentclass{article}内容';
      const result = preprocessLatexDocument(content);
      expect(result).not.toContain('\\documentclass');
    });

    it('应该保护公式分隔符内的内容', () => {
      const content = '$\\textbf{粗体}$';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('$\\textbf{粗体}$');
    });

    it('应该处理嵌套的花括号', () => {
      const content = '\\textbf{\\textit{嵌套}}';
      const result = preprocessLatexDocument(content);
      expect(result).toContain('**');
      expect(result).toContain('*');
    });
  });

  describe('isMathContent - 数学内容检测', () => {
    it('应该检测包含 \\frac 的数学内容', () => {
      expect(isMathContent('\\frac{1}{2}')).toBe(true);
    });

    it('应该检测包含多个数学命令的内容', () => {
      expect(isMathContent('\\sqrt{x} + \\frac{1}{2}')).toBe(true);
    });

    it('应该检测包含 \\sum 和其他数学符号的内容', () => {
      expect(isMathContent('\\sum_{i=1}^n i + \\int_0^1 x dx')).toBe(true);
    });

    it('应该检测包含多个数学符号的内容', () => {
      expect(isMathContent('x ∈ A ∩ B ∪ C')).toBe(true);
    });

    it('不应该将普通文本识别为数学内容', () => {
      expect(isMathContent('这是一段普通文本')).toBe(false);
    });

    it('空内容应该返回 false', () => {
      expect(isMathContent('')).toBe(false);
    });
  });

  describe('sanitizeLatexFormula - 公式清理', () => {
    it('应该修复未闭合的花括号', () => {
      const content = '\\frac{1{2}';
      const result = sanitizeLatexFormula(content);
      expect(result).toBe('\\frac{1{2}}');
    });

    it('应该保留正确的公式', () => {
      const content = '\\frac{1}{2}';
      const result = sanitizeLatexFormula(content);
      expect(result).toBe('\\frac{1}{2}');
    });
  });

  describe('latexToReadable - LaTeX 转可读文本', () => {
    it('应该转换希腊字母', () => {
      const result = latexToReadable('\\alpha \\beta');
      expect(result).toContain('α');
      expect(result).toContain('β');
    });

    it('应该转换数学符号', () => {
      const result = latexToReadable('\\leq \\geq');
      expect(result).toContain('≤');
      expect(result).toContain('≥');
    });

    it('应该转换运算符', () => {
      const result = latexToReadable('\\times \\div');
      expect(result).toContain('×');
      expect(result).toContain('÷');
    });
  });

  describe('preprocessFakeCodeBlocks - 假代码块预处理', () => {
    it('应该移除包含 markdown 语法的反引号', () => {
      const content = '`**粗体**`';
      const result = preprocessFakeCodeBlocks(content);
      expect(result).toBe('**粗体**');
    });

    it('应该移除包含 LaTeX 命令的反引号', () => {
      const content = '`\\frac{1}{2}`';
      const result = preprocessFakeCodeBlocks(content);
      expect(result).toBe('\\frac{1}{2}');
    });

    it('应该保留真正的代码', () => {
      const content = '`console.log("hello")`';
      const result = preprocessFakeCodeBlocks(content);
      expect(result).toBe('`console.log("hello")`');
    });
  });

  describe('preprocessCodeBlocks - 代码块预处理', () => {
    it('应该处理 ```text 代码块', () => {
      const content = '```text\n**粗体**\n```';
      const result = preprocessCodeBlocks(content);
      expect(result).toContain('**粗体**');
    });
  });

  describe('protectMathBlocks / restoreMathBlocks - 公式保护', () => {
    it('应该保护和恢复公式', () => {
      const content = '文本 $x^2$ 文本 $$y^2$$ 文本';
      const protectedContent = protectMathBlocks(content);
      expect(protectedContent).not.toContain('$x^2$');
      expect(protectedContent).not.toContain('$$y^2$$');
      
      const restored = restoreMathBlocks(protectedContent);
      expect(restored).toContain('x^2');
      expect(restored).toContain('y^2');
    });

    it('应该保护 \\[...\\] 公式', () => {
      const content = '文本 \\[x^2\\] 文本';
      const protectedContent = protectMathBlocks(content);
      expect(protectedContent).not.toContain('\\[x^2\\]');
      
      const restored = restoreMathBlocks(protectedContent);
      expect(restored).toContain('x^2');
    });

    it('应该保护 \\(...\\) 公式', () => {
      const content = '文本 \\(x^2\\) 文本';
      const protectedContent = protectMathBlocks(content);
      expect(protectedContent).not.toContain('\\(x^2\\)');
      
      const restored = restoreMathBlocks(protectedContent);
      expect(restored).toContain('x^2');
    });
  });

  describe('cleanupMathBlockPlaceholders - 清理占位符', () => {
    it('应该清理残留的占位符', () => {
      const content = '文本 \uE000MATH_BLOCK_abc123_0\uE001 文本';
      const result = cleanupMathBlockPlaceholders(content);
      expect(result).not.toContain('MATH_BLOCK');
    });
  });
});
