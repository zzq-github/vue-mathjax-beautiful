import type { Symbol } from './symbols'

// 常用公式示例
export const formulaExamples: Symbol[] = [
  // 基础代数公式
  { latex: 'x^2 + y^2 = z^2', description: '勾股定理', display: '' },
  { latex: '(a + b)^2 = a^2 + 2ab + b^2', description: '完全平方公式', display: '' },
  { latex: '(a - b)^2 = a^2 - 2ab + b^2', description: '完全平方差公式', display: '' },
  { latex: 'a^2 - b^2 = (a + b)(a - b)', description: '平方差公式', display: '' },
  
  // 分数运算
  { latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}', description: '分数加法', display: '' },
  { latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}', description: '分数乘法', display: '' },
  { latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}', description: '分数除法', display: '' },
  
  // 根式公式
  { latex: '\\sqrt{a^2 + b^2}', description: '平方根公式', display: '' },
  { latex: '\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}', description: '根式乘法', display: '' },
  { latex: '\\sqrt[n]{a^m} = a^{\\frac{m}{n}}', description: '根式指数化', display: '' },
  
  // 指数对数公式
  { latex: 'a^m \\cdot a^n = a^{m+n}', description: '同底数幂相乘', display: '' },
  { latex: '\\frac{a^m}{a^n} = a^{m-n}', description: '同底数幂相除', display: '' },
  { latex: '(a^m)^n = a^{mn}', description: '幂的乘方', display: '' },
  { latex: '\\log_a(xy) = \\log_a x + \\log_a y', description: '对数乘法法则', display: '' },
  { latex: '\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y', description: '对数除法法则', display: '' },
  
  // 三角函数公式
  { latex: '\\sin^2 x + \\cos^2 x = 1', description: '三角恒等式', display: '' },
  { latex: '\\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B', description: '正弦加法公式', display: '' },
  { latex: '\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B', description: '余弦加法公式', display: '' },
  { latex: '\\tan x = \\frac{\\sin x}{\\cos x}', description: '正切定义', display: '' },
  
  // 微积分公式
  { latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0', description: '无穷极限', display: '' },
  { latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}', description: '导数定义', display: '' },
  { latex: '\\frac{d}{dx}(x^n) = nx^{n-1}', description: '幂函数导数', display: '' },
  { latex: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C', description: '幂函数积分', display: '' },
  { latex: '\\int_{a}^{b} f(x) dx', description: '定积分', display: '' },
  
  // 数列公式
  { latex: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}', description: '等差数列求和', display: '' },
  { latex: '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}', description: '平方数求和', display: '' },
  { latex: 'S_n = \\frac{a_1(1-r^n)}{1-r}', description: '等比数列求和', display: '' },
  
  // 概率统计公式
  { latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', description: '概率加法公式', display: '' },
  { latex: 'C_n^r = \\frac{n!}{r!(n-r)!}', description: '组合数公式', display: '' },
  { latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i', description: '算术平均数', display: '' },
  
  // 几何公式
  { latex: 'A = \\pi r^2', description: '圆面积公式', display: '' },
  { latex: 'V = \\frac{4}{3}\\pi r^3', description: '球体积公式', display: '' },
  { latex: 'c^2 = a^2 + b^2 - 2ab\\cos C', description: '余弦定理', display: '' },
  
  // 特殊常数和公式
  { latex: 'e^{i\\pi} + 1 = 0', description: '欧拉公式', display: '' },
  { latex: 'e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n', description: '自然常数e', display: '' },
  { latex: '\\zeta(2) = \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', description: '巴塞尔问题', display: '' },
  
  // 二次方程求根公式
  { latex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}', description: '二次方程求根公式', display: '' },
  
  // 矩阵
  { latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', description: '2×2矩阵', display: '' }
] 