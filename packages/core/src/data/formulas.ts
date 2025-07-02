import type { Symbol } from './symbols';

// 常用公式示例
export const formulaExamples: Symbol[] = [
  // 基础代数公式
  { latex: 'x^2 + y^2 = z^2', description: { 'zh-CN': '勾股定理', 'en-US': 'Pythagorean Theorem' }, display: '' },
  { latex: '(a + b)^2 = a^2 + 2ab + b^2', description: { 'zh-CN': '完全平方公式', 'en-US': 'Perfect Square Formula' }, display: '' },
  { latex: '(a - b)^2 = a^2 - 2ab + b^2', description: { 'zh-CN': '完全平方差公式', 'en-US': 'Perfect Square Difference' }, display: '' },
  { latex: 'a^2 - b^2 = (a + b)(a - b)', description: { 'zh-CN': '平方差公式', 'en-US': 'Difference of Squares' }, display: '' },

  // 分数运算
  {
    latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}',
    description: { 'zh-CN': '分数加法', 'en-US': 'Fraction Addition' },
    display: '',
  },
  {
    latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}',
    description: { 'zh-CN': '分数乘法', 'en-US': 'Fraction Multiplication' },
    display: '',
  },
  {
    latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
    description: { 'zh-CN': '分数除法', 'en-US': 'Fraction Division' },
    display: '',
  },

  // 根式公式
  { latex: '\\sqrt{a^2 + b^2}', description: { 'zh-CN': '平方根公式', 'en-US': 'Square Root Formula' }, display: '' },
  { latex: '\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}', description: { 'zh-CN': '根式乘法', 'en-US': 'Radical Multiplication' }, display: '' },
  { latex: '\\sqrt[n]{a^m} = a^{\\frac{m}{n}}', description: { 'zh-CN': '根式指数化', 'en-US': 'Radical to Exponent' }, display: '' },

  // 指数对数公式
  { latex: 'a^m \\cdot a^n = a^{m+n}', description: { 'zh-CN': '同底数幂相乘', 'en-US': 'Product of Powers' }, display: '' },
  { latex: '\\frac{a^m}{a^n} = a^{m-n}', description: { 'zh-CN': '同底数幂相除', 'en-US': 'Quotient of Powers' }, display: '' },
  { latex: '(a^m)^n = a^{mn}', description: { 'zh-CN': '幂的乘方', 'en-US': 'Power of a Power' }, display: '' },
  { latex: '\\log_a(xy) = \\log_a x + \\log_a y', description: { 'zh-CN': '对数乘法法则', 'en-US': 'Logarithm Product Rule' }, display: '' },
  {
    latex: '\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y',
    description: { 'zh-CN': '对数除法法则', 'en-US': 'Logarithm Quotient Rule' },
    display: '',
  },

  // 三角函数公式
  { latex: '\\sin^2 x + \\cos^2 x = 1', description: { 'zh-CN': '三角恒等式', 'en-US': 'Trigonometric Identity' }, display: '' },
  {
    latex: '\\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B',
    description: { 'zh-CN': '正弦加法公式', 'en-US': 'Sine Addition Formula' },
    display: '',
  },
  {
    latex: '\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B',
    description: { 'zh-CN': '余弦加法公式', 'en-US': 'Cosine Addition Formula' },
    display: '',
  },
  { latex: '\\tan x = \\frac{\\sin x}{\\cos x}', description: { 'zh-CN': '正切定义', 'en-US': 'Tangent Definition' }, display: '' },

  // 微积分公式
  { latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0', description: { 'zh-CN': '无穷极限', 'en-US': 'Infinite Limit' }, display: '' },
  {
    latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    description: { 'zh-CN': '导数定义', 'en-US': 'Derivative Definition' },
    display: '',
  },
  { latex: '\\frac{d}{dx}(x^n) = nx^{n-1}', description: { 'zh-CN': '幂函数导数', 'en-US': 'Power Rule' }, display: '' },
  { latex: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C', description: { 'zh-CN': '幂函数积分', 'en-US': 'Power Rule Integration' }, display: '' },
  { latex: '\\int_{a}^{b} f(x) dx', description: { 'zh-CN': '定积分', 'en-US': 'Definite Integral' }, display: '' },

  // 数列公式
  { latex: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}', description: { 'zh-CN': '等差数列求和', 'en-US': 'Arithmetic Series Sum' }, display: '' },
  {
    latex: '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}',
    description: { 'zh-CN': '平方数求和', 'en-US': 'Sum of Squares' },
    display: '',
  },
  { latex: 'S_n = \\frac{a_1(1-r^n)}{1-r}', description: { 'zh-CN': '等比数列求和', 'en-US': 'Geometric Series Sum' }, display: '' },

  // 概率统计公式
  { latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', description: { 'zh-CN': '概率加法公式', 'en-US': 'Probability Addition Rule' }, display: '' },
  { latex: 'C_n^r = \\frac{n!}{r!(n-r)!}', description: { 'zh-CN': '组合数公式', 'en-US': 'Combination Formula' }, display: '' },
  { latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i', description: { 'zh-CN': '算术平均数', 'en-US': 'Arithmetic Mean' }, display: '' },

  // 几何公式
  { latex: 'A = \\pi r^2', description: { 'zh-CN': '圆面积公式', 'en-US': 'Circle Area Formula' }, display: '' },
  { latex: 'V = \\frac{4}{3}\\pi r^3', description: { 'zh-CN': '球体积公式', 'en-US': 'Sphere Volume Formula' }, display: '' },
  { latex: 'c^2 = a^2 + b^2 - 2ab\\cos C', description: { 'zh-CN': '余弦定理', 'en-US': 'Law of Cosines' }, display: '' },

  // 特殊常数和公式
  { latex: 'e^{i\\pi} + 1 = 0', description: { 'zh-CN': '欧拉公式', 'en-US': "Euler's Formula" }, display: '' },
  {
    latex: 'e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n',
    description: { 'zh-CN': '自然常数e', 'en-US': "Euler's Number" },
    display: '',
  },
  {
    latex: '\\zeta(2) = \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
    description: { 'zh-CN': '巴塞尔问题', 'en-US': 'Basel Problem' },
    display: '',
  },

  // 二次方程求根公式
  {
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
    description: { 'zh-CN': '二次方程求根公式', 'en-US': 'Quadratic Formula' },
    display: '',
  },

  // 矩阵
  {
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    description: { 'zh-CN': '2×2矩阵', 'en-US': '2×2 Matrix' },
    display: '',
  },
];
