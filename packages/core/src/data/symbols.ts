export interface Symbol {
  latex: string;
  description: {
    'zh-CN': string;
    'en-US': string;
  };
  display: string;
}

// 基础符号
export const basicSymbols: Symbol[] = [
  // 基本运算符
  { latex: '+', description: { 'zh-CN': '加号', 'en-US': 'Plus' }, display: '' },
  { latex: '-', description: { 'zh-CN': '减号', 'en-US': 'Minus' }, display: '' },
  { latex: '\\times', description: { 'zh-CN': '乘号', 'en-US': 'Times' }, display: '' },
  { latex: '\\div', description: { 'zh-CN': '除号', 'en-US': 'Division' }, display: '' },
  { latex: '\\cdot', description: { 'zh-CN': '点乘', 'en-US': 'Dot Product' }, display: '' },
  { latex: '\\pm', description: { 'zh-CN': '正负号', 'en-US': 'Plus Minus' }, display: '' },
  { latex: '\\mp', description: { 'zh-CN': '负正号', 'en-US': 'Minus Plus' }, display: '' },

  // 比较符号
  { latex: '=', description: { 'zh-CN': '等号', 'en-US': 'Equals' }, display: '' },
  { latex: '\\neq', description: { 'zh-CN': '不等号', 'en-US': 'Not Equal' }, display: '' },
  { latex: '<', description: { 'zh-CN': '小于', 'en-US': 'Less Than' }, display: '' },
  { latex: '>', description: { 'zh-CN': '大于', 'en-US': 'Greater Than' }, display: '' },
  { latex: '\\leq', description: { 'zh-CN': '小于等于', 'en-US': 'Less Equal' }, display: '' },
  { latex: '\\geq', description: { 'zh-CN': '大于等于', 'en-US': 'Greater Equal' }, display: '' },
  { latex: '\\approx', description: { 'zh-CN': '约等于', 'en-US': 'Approximately' }, display: '' },
  { latex: '\\equiv', description: { 'zh-CN': '恒等于', 'en-US': 'Equivalent' }, display: '' },
  { latex: '\\propto', description: { 'zh-CN': '正比于', 'en-US': 'Proportional' }, display: '' },
  { latex: '\\sim', description: { 'zh-CN': '相似于', 'en-US': 'Similar' }, display: '' },
  { latex: '\\cong', description: { 'zh-CN': '全等于', 'en-US': 'Congruent' }, display: '' },

  // 上下标和结构
  { latex: 'x^2', description: { 'zh-CN': '平方', 'en-US': 'Square' }, display: '' },
  { latex: 'x^3', description: { 'zh-CN': '立方', 'en-US': 'Cube' }, display: '' },
  { latex: 'x^{n}', description: { 'zh-CN': '通用幂', 'en-US': 'Power' }, display: '' },
  { latex: 'a_n', description: { 'zh-CN': '下标', 'en-US': 'Subscript' }, display: '' },
  { latex: 'a_{ij}', description: { 'zh-CN': '双下标', 'en-US': 'Double Subscript' }, display: '' },
  { latex: 'x_{n}', description: { 'zh-CN': '下标n', 'en-US': 'Subscript n' }, display: '' },

  // 根式
  { latex: '\\sqrt{a}', description: { 'zh-CN': '平方根', 'en-US': 'Square Root' }, display: '' },
  { latex: '\\sqrt[3]{a}', description: { 'zh-CN': '立方根', 'en-US': 'Cube Root' }, display: '' },
  { latex: '\\sqrt[n]{a}', description: { 'zh-CN': 'n次根', 'en-US': 'nth Root' }, display: '' },
  { latex: '\\sqrt{x}', description: { 'zh-CN': '根号x', 'en-US': 'Square Root of x' }, display: '' },

  // 分数
  { latex: '\\frac{a}{b}', description: { 'zh-CN': '通用分数', 'en-US': 'Fraction' }, display: '' },
  { latex: '\\frac{1}{x}', description: { 'zh-CN': '倒数', 'en-US': 'Reciprocal' }, display: '' },
  { latex: '\\frac{1}{x^2}', description: { 'zh-CN': '平方倒数', 'en-US': 'Square Reciprocal' }, display: '' },
  { latex: '\\frac{x^2}{y^2}', description: { 'zh-CN': '平方分数', 'en-US': 'Square Fraction' }, display: '' },

  // 积分和求和
  { latex: '\\int', description: { 'zh-CN': '积分', 'en-US': 'Integral' }, display: '' },
  { latex: '\\int_{a}^{b}', description: { 'zh-CN': '定积分', 'en-US': 'Definite Integral' }, display: '' },
  { latex: '\\int_{a}^{b} f(x) dx', description: { 'zh-CN': '定积分完整形式', 'en-US': 'Complete Definite Integral' }, display: '' },
  { latex: '\\oint', description: { 'zh-CN': '环积分', 'en-US': 'Contour Integral' }, display: '' },
  { latex: '\\sum', description: { 'zh-CN': '求和', 'en-US': 'Summation' }, display: '' },
  { latex: '\\sum_{i=1}^{n}', description: { 'zh-CN': '求和1到n', 'en-US': 'Sum from 1 to n' }, display: '' },
  { latex: '\\sum_{i=0}^{\\infty}', description: { 'zh-CN': '无穷求和', 'en-US': 'Infinite Sum' }, display: '' },
  { latex: '\\prod', description: { 'zh-CN': '连乘', 'en-US': 'Product' }, display: '' },
  { latex: '\\prod_{i=1}^{n}', description: { 'zh-CN': '乘积1到n', 'en-US': 'Product from 1 to n' }, display: '' },

  // 导数和偏导数
  { latex: '\\frac{dx}{dy}', description: { 'zh-CN': '导数', 'en-US': 'Derivative' }, display: '' },
  { latex: '\\frac{\\partial x}{\\partial y}', description: { 'zh-CN': '偏导数', 'en-US': 'Partial Derivative' }, display: '' },
  { latex: "f'(x)", description: { 'zh-CN': '导数符号', 'en-US': 'Derivative Notation' }, display: '' },
  { latex: 'f^{(n)}(x)', description: { 'zh-CN': 'n阶导数', 'en-US': 'nth Derivative' }, display: '' },
  { latex: '\\partial', description: { 'zh-CN': '偏导符号', 'en-US': 'Partial Symbol' }, display: '' },
  { latex: '\\nabla', description: { 'zh-CN': '梯度', 'en-US': 'Gradient' }, display: '' },

  // 极限
  { latex: '\\lim', description: { 'zh-CN': '极限', 'en-US': 'Limit' }, display: '' },
  { latex: '\\lim_{x \\to a}', description: { 'zh-CN': '极限x趋于a', 'en-US': 'Limit x approaches a' }, display: '' },
  { latex: '\\lim_{x \\to \\infty}', description: { 'zh-CN': '无穷极限', 'en-US': 'Infinite Limit' }, display: '' },
  { latex: '\\lim_{x \\to 0^+}', description: { 'zh-CN': '右极限', 'en-US': 'Right Limit' }, display: '' },
  { latex: '\\lim_{x \\to 0^-}', description: { 'zh-CN': '左极限', 'en-US': 'Left Limit' }, display: '' },

  // 三角函数
  { latex: '\\sin', description: { 'zh-CN': '正弦', 'en-US': 'Sine' }, display: '' },
  { latex: '\\cos', description: { 'zh-CN': '余弦', 'en-US': 'Cosine' }, display: '' },
  { latex: '\\tan', description: { 'zh-CN': '正切', 'en-US': 'Tangent' }, display: '' },
  { latex: '\\cot', description: { 'zh-CN': '余切', 'en-US': 'Cotangent' }, display: '' },
  { latex: '\\sec', description: { 'zh-CN': '正割', 'en-US': 'Secant' }, display: '' },
  { latex: '\\csc', description: { 'zh-CN': '余割', 'en-US': 'Cosecant' }, display: '' },
  { latex: '\\arcsin', description: { 'zh-CN': '反正弦', 'en-US': 'Arcsine' }, display: '' },
  { latex: '\\arccos', description: { 'zh-CN': '反余弦', 'en-US': 'Arccosine' }, display: '' },
  { latex: '\\arctan', description: { 'zh-CN': '反正切', 'en-US': 'Arctangent' }, display: '' },

  // 对数和指数
  { latex: '\\log', description: { 'zh-CN': '对数', 'en-US': 'Logarithm' }, display: '' },
  { latex: '\\ln', description: { 'zh-CN': '自然对数', 'en-US': 'Natural Log' }, display: '' },
  { latex: '\\log_a b', description: { 'zh-CN': '以a为底的对数', 'en-US': 'Log base a of b' }, display: '' },
  { latex: '\\log_{10}', description: { 'zh-CN': '常用对数', 'en-US': 'Common Log' }, display: '' },
  { latex: 'e^x', description: { 'zh-CN': '自然指数', 'en-US': 'Natural Exponential' }, display: '' },
  { latex: 'a^{bc}', description: { 'zh-CN': '复合指数', 'en-US': 'Compound Exponent' }, display: '' },
  { latex: '\\exp', description: { 'zh-CN': '指数函数', 'en-US': 'Exponential Function' }, display: '' },

  // 括号
  { latex: '[x]', description: { 'zh-CN': '方括号', 'en-US': 'Square Brackets' }, display: '' },
  { latex: '(x)', description: { 'zh-CN': '圆括号', 'en-US': 'Parentheses' }, display: '' },
  { latex: '\\{x\\}', description: { 'zh-CN': '花括号', 'en-US': 'Curly Braces' }, display: '' },
  { latex: '|x|', description: { 'zh-CN': '绝对值', 'en-US': 'Absolute Value' }, display: '' },
  { latex: '\\|x\\|', description: { 'zh-CN': '范数', 'en-US': 'Norm' }, display: '' },

  // 特殊符号
  { latex: '\\infty', description: { 'zh-CN': '无穷大', 'en-US': 'Infinity' }, display: '' },
  { latex: '\\pi', description: { 'zh-CN': '圆周率', 'en-US': 'Pi' }, display: '' },
  { latex: 'e', description: { 'zh-CN': '自然常数', 'en-US': 'Euler Number' }, display: '' },
  { latex: '\\angle', description: { 'zh-CN': '角', 'en-US': 'Angle' }, display: '' },
  { latex: '\\perp', description: { 'zh-CN': '垂直', 'en-US': 'Perpendicular' }, display: '' },
  { latex: '\\parallel', description: { 'zh-CN': '平行', 'en-US': 'Parallel' }, display: '' },
  { latex: '^\\circ', description: { 'zh-CN': '度数符号', 'en-US': 'Degree Symbol' }, display: '' },
  { latex: '\\%', description: { 'zh-CN': '百分号', 'en-US': 'Percent' }, display: '' },

  // 向量和修饰符
  { latex: '\\vec{a}', description: { 'zh-CN': '向量', 'en-US': 'Vector' }, display: '' },
  { latex: '\\overline{AB}', description: { 'zh-CN': '上划线', 'en-US': 'Overline' }, display: '' },
  { latex: '\\overrightarrow{AB}', description: { 'zh-CN': '向量AB', 'en-US': 'Vector AB' }, display: '' },
  { latex: '\\hat{a}', description: { 'zh-CN': '单位向量', 'en-US': 'Unit Vector' }, display: '' },

  // 数字
  { latex: '0', description: { 'zh-CN': '数字0', 'en-US': 'Number 0' }, display: '' },
  { latex: '1', description: { 'zh-CN': '数字1', 'en-US': 'Number 1' }, display: '' },
  { latex: '2', description: { 'zh-CN': '数字2', 'en-US': 'Number 2' }, display: '' },
  { latex: '3', description: { 'zh-CN': '数字3', 'en-US': 'Number 3' }, display: '' },
  { latex: '4', description: { 'zh-CN': '数字4', 'en-US': 'Number 4' }, display: '' },
  { latex: '5', description: { 'zh-CN': '数字5', 'en-US': 'Number 5' }, display: '' },
  { latex: '6', description: { 'zh-CN': '数字6', 'en-US': 'Number 6' }, display: '' },
  { latex: '7', description: { 'zh-CN': '数字7', 'en-US': 'Number 7' }, display: '' },
  { latex: '8', description: { 'zh-CN': '数字8', 'en-US': 'Number 8' }, display: '' },
  { latex: '9', description: { 'zh-CN': '数字9', 'en-US': 'Number 9' }, display: '' },
  { latex: '.', description: { 'zh-CN': '小数点', 'en-US': 'Decimal Point' }, display: '' },
];

// 希腊字母
export const greekSymbols: Symbol[] = [
  // 小写希腊字母 - 第一行
  { latex: '\\alpha', description: { 'zh-CN': '阿尔法', 'en-US': 'Alpha' }, display: '' },
  { latex: '\\beta', description: { 'zh-CN': '贝塔', 'en-US': 'Beta' }, display: '' },
  { latex: '\\gamma', description: { 'zh-CN': '伽马', 'en-US': 'Gamma' }, display: '' },
  { latex: '\\delta', description: { 'zh-CN': '德尔塔', 'en-US': 'Delta' }, display: '' },
  { latex: '\\epsilon', description: { 'zh-CN': '爱普西隆', 'en-US': 'Epsilon' }, display: '' },
  { latex: '\\varepsilon', description: { 'zh-CN': '爱普西隆变体', 'en-US': 'Var Epsilon' }, display: '' },
  { latex: '\\zeta', description: { 'zh-CN': '泽塔', 'en-US': 'Zeta' }, display: '' },
  { latex: '\\eta', description: { 'zh-CN': '艾塔', 'en-US': 'Eta' }, display: '' },
  { latex: '\\theta', description: { 'zh-CN': '西塔', 'en-US': 'Theta' }, display: '' },
  { latex: '\\vartheta', description: { 'zh-CN': '西塔变体', 'en-US': 'Var Theta' }, display: '' },

  // 小写希腊字母 - 第二行
  { latex: '\\iota', description: { 'zh-CN': '约塔', 'en-US': 'Iota' }, display: '' },
  { latex: '\\kappa', description: { 'zh-CN': '卡帕', 'en-US': 'Kappa' }, display: '' },
  { latex: '\\lambda', description: { 'zh-CN': '兰布达', 'en-US': 'Lambda' }, display: '' },
  { latex: '\\mu', description: { 'zh-CN': '缪', 'en-US': 'Mu' }, display: '' },
  { latex: '\\nu', description: { 'zh-CN': '纽', 'en-US': 'Nu' }, display: '' },
  { latex: '\\xi', description: { 'zh-CN': '克西', 'en-US': 'Xi' }, display: '' },
  { latex: 'o', description: { 'zh-CN': '欧米克隆', 'en-US': 'Omicron' }, display: '' },
  { latex: '\\pi', description: { 'zh-CN': '派', 'en-US': 'Pi' }, display: '' },
  { latex: '\\varpi', description: { 'zh-CN': '派变体', 'en-US': 'Var Pi' }, display: '' },
  { latex: '\\rho', description: { 'zh-CN': '洛', 'en-US': 'Rho' }, display: '' },

  // 小写希腊字母 - 第三行
  { latex: '\\varrho', description: { 'zh-CN': '洛变体', 'en-US': 'Var Rho' }, display: '' },
  { latex: '\\sigma', description: { 'zh-CN': '西格马', 'en-US': 'Sigma' }, display: '' },
  { latex: '\\varsigma', description: { 'zh-CN': '西格马尾字母', 'en-US': 'Final Sigma' }, display: '' },
  { latex: '\\tau', description: { 'zh-CN': '陶', 'en-US': 'Tau' }, display: '' },
  { latex: '\\upsilon', description: { 'zh-CN': '厄普西隆', 'en-US': 'Upsilon' }, display: '' },
  { latex: '\\phi', description: { 'zh-CN': '斐', 'en-US': 'Phi' }, display: '' },
  { latex: '\\varphi', description: { 'zh-CN': '斐变体', 'en-US': 'Var Phi' }, display: '' },
  { latex: '\\chi', description: { 'zh-CN': '卡', 'en-US': 'Chi' }, display: '' },
  { latex: '\\psi', description: { 'zh-CN': '普西', 'en-US': 'Psi' }, display: '' },
  { latex: '\\omega', description: { 'zh-CN': '欧米伽', 'en-US': 'Omega' }, display: '' },

  // 大写希腊字母 - 第一行
  { latex: 'A', description: { 'zh-CN': '阿尔法 (大写)', 'en-US': 'Alpha (Uppercase)' }, display: '' },
  { latex: 'B', description: { 'zh-CN': '贝塔 (大写)', 'en-US': 'Beta (Uppercase)' }, display: '' },
  { latex: '\\Gamma', description: { 'zh-CN': '伽马 (大写)', 'en-US': 'Gamma (Uppercase)' }, display: '' },
  { latex: '\\Delta', description: { 'zh-CN': '德尔塔 (大写)', 'en-US': 'Delta (Uppercase)' }, display: '' },
  { latex: 'E', description: { 'zh-CN': '爱普西隆 (大写)', 'en-US': 'Epsilon (Uppercase)' }, display: '' },
  { latex: 'Z', description: { 'zh-CN': '泽塔 (大写)', 'en-US': 'Zeta (Uppercase)' }, display: '' },
  { latex: 'H', description: { 'zh-CN': '艾塔 (大写)', 'en-US': 'Eta (Uppercase)' }, display: '' },
  { latex: '\\Theta', description: { 'zh-CN': '西塔 (大写)', 'en-US': 'Theta (Uppercase)' }, display: '' },
  { latex: 'I', description: { 'zh-CN': '约塔 (大写)', 'en-US': 'Iota (Uppercase)' }, display: '' },
  { latex: 'K', description: { 'zh-CN': '卡帕 (大写)', 'en-US': 'Kappa (Uppercase)' }, display: '' },

  // 大写希腊字母 - 第二行
  { latex: '\\Lambda', description: { 'zh-CN': '兰布达 (大写)', 'en-US': 'Lambda (Uppercase)' }, display: '' },
  { latex: 'M', description: { 'zh-CN': '缪 (大写)', 'en-US': 'Mu (Uppercase)' }, display: '' },
  { latex: 'N', description: { 'zh-CN': '纽 (大写)', 'en-US': 'Nu (Uppercase)' }, display: '' },
  { latex: '\\Xi', description: { 'zh-CN': '克西 (大写)', 'en-US': 'Xi (Uppercase)' }, display: '' },
  { latex: 'O', description: { 'zh-CN': '欧米克隆 (大写)', 'en-US': 'Omicron (Uppercase)' }, display: '' },
  { latex: '\\Pi', description: { 'zh-CN': '派 (大写)', 'en-US': 'Pi (Uppercase)' }, display: '' },
  { latex: 'P', description: { 'zh-CN': '洛 (大写)', 'en-US': 'Rho (Uppercase)' }, display: '' },
  { latex: '\\Sigma', description: { 'zh-CN': '西格马 (大写)', 'en-US': 'Sigma (Uppercase)' }, display: '' },
  { latex: 'T', description: { 'zh-CN': '陶 (大写)', 'en-US': 'Tau (Uppercase)' }, display: '' },
  { latex: '\\Upsilon', description: { 'zh-CN': '厄普西隆 (大写)', 'en-US': 'Upsilon (Uppercase)' }, display: '' },

  // 大写希腊字母 - 第三行
  { latex: '\\Phi', description: { 'zh-CN': '斐 (大写)', 'en-US': 'Phi (Uppercase)' }, display: '' },
  { latex: 'X', description: { 'zh-CN': '卡 (大写)', 'en-US': 'Chi (Uppercase)' }, display: '' },
  { latex: '\\Psi', description: { 'zh-CN': '普西 (大写)', 'en-US': 'Psi (Uppercase)' }, display: '' },
  { latex: '\\Omega', description: { 'zh-CN': '欧米伽 (大写)', 'en-US': 'Omega (Uppercase)' }, display: '' },
];

// 高级符号
export const advancedSymbols: Symbol[] = [
  // 逻辑符号
  { latex: '\\forall', description: { 'zh-CN': '任意', 'en-US': 'For All' }, display: '' },
  { latex: '\\exists', description: { 'zh-CN': '存在', 'en-US': 'Exists' }, display: '' },
  { latex: '\\nexists', description: { 'zh-CN': '不存在', 'en-US': 'Not Exists' }, display: '' },
  { latex: '\\land', description: { 'zh-CN': '逻辑与', 'en-US': 'Logical And' }, display: '' },
  { latex: '\\lor', description: { 'zh-CN': '逻辑或', 'en-US': 'Logical Or' }, display: '' },
  { latex: '\\neg', description: { 'zh-CN': '逻辑非', 'en-US': 'Logical Not' }, display: '' },
  { latex: '\\implies', description: { 'zh-CN': '蕴含', 'en-US': 'Implies' }, display: '' },
  { latex: '\\iff', description: { 'zh-CN': '当且仅当', 'en-US': 'If and Only If' }, display: '' },
  { latex: '\\therefore', description: { 'zh-CN': '因此', 'en-US': 'Therefore' }, display: '' },
  { latex: '\\because', description: { 'zh-CN': '因为', 'en-US': 'Because' }, display: '' },

  // 集合论符号
  { latex: '\\in', description: { 'zh-CN': '属于', 'en-US': 'Element Of' }, display: '' },
  { latex: '\\notin', description: { 'zh-CN': '不属于', 'en-US': 'Not Element Of' }, display: '' },
  { latex: '\\subset', description: { 'zh-CN': '子集', 'en-US': 'Subset' }, display: '' },
  { latex: '\\supset', description: { 'zh-CN': '超集', 'en-US': 'Superset' }, display: '' },
  { latex: '\\subseteq', description: { 'zh-CN': '子集或相等', 'en-US': 'Subset or Equal' }, display: '' },
  { latex: '\\supseteq', description: { 'zh-CN': '超集或相等', 'en-US': 'Superset or Equal' }, display: '' },
  { latex: '\\cup', description: { 'zh-CN': '并集', 'en-US': 'Union' }, display: '' },
  { latex: '\\cap', description: { 'zh-CN': '交集', 'en-US': 'Intersection' }, display: '' },
  { latex: '\\setminus', description: { 'zh-CN': '集合差', 'en-US': 'Set Difference' }, display: '' },
  { latex: '\\emptyset', description: { 'zh-CN': '空集', 'en-US': 'Empty Set' }, display: '' },

  // 数字集合
  { latex: '\\mathbb{N}', description: { 'zh-CN': '自然数集', 'en-US': 'Natural Numbers' }, display: '' },
  { latex: '\\mathbb{Z}', description: { 'zh-CN': '整数集', 'en-US': 'Integers' }, display: '' },
  { latex: '\\mathbb{Q}', description: { 'zh-CN': '有理数集', 'en-US': 'Rational Numbers' }, display: '' },
  { latex: '\\mathbb{R}', description: { 'zh-CN': '实数集', 'en-US': 'Real Numbers' }, display: '' },
  { latex: '\\mathbb{C}', description: { 'zh-CN': '复数集', 'en-US': 'Complex Numbers' }, display: '' },
  { latex: '\\mathbb{P}', description: { 'zh-CN': '素数集', 'en-US': 'Prime Numbers' }, display: '' },
  { latex: '\\aleph', description: { 'zh-CN': 'Aleph', 'en-US': 'Aleph' }, display: '' },
  { latex: '\\hbar', description: { 'zh-CN': '约化普朗克常数', 'en-US': 'Reduced Planck Constant' }, display: '' },
  { latex: '\\ell', description: { 'zh-CN': '脚本L', 'en-US': 'Script L' }, display: '' },
  { latex: '\\wp', description: { 'zh-CN': 'Weierstrass P', 'en-US': 'Weierstrass P' }, display: '' },

  // 积分符号
  { latex: '\\int', description: { 'zh-CN': '积分', 'en-US': 'Integral' }, display: '' },
  { latex: '\\iint', description: { 'zh-CN': '二重积分', 'en-US': 'Double Integral' }, display: '' },
  { latex: '\\iiint', description: { 'zh-CN': '三重积分', 'en-US': 'Triple Integral' }, display: '' },
  { latex: '\\oint', description: { 'zh-CN': '环积分', 'en-US': 'Contour Integral' }, display: '' },
  { latex: '\\partial', description: { 'zh-CN': '偏导数', 'en-US': 'Partial Derivative' }, display: '' },
  { latex: '\\nabla', description: { 'zh-CN': '梯度', 'en-US': 'Gradient' }, display: '' },
  { latex: '\\sum', description: { 'zh-CN': '求和', 'en-US': 'Summation' }, display: '' },
  { latex: '\\prod', description: { 'zh-CN': '连乘', 'en-US': 'Product' }, display: '' },
  { latex: '\\lim', description: { 'zh-CN': '极限', 'en-US': 'Limit' }, display: '' },
  { latex: '\\sup', description: { 'zh-CN': '上确界', 'en-US': 'Supremum' }, display: '' },

  // 关系符号
  { latex: '\\equiv', description: { 'zh-CN': '恒等于', 'en-US': 'Equivalent' }, display: '' },
  { latex: '\\approx', description: { 'zh-CN': '约等于', 'en-US': 'Approximately' }, display: '' },
  { latex: '\\sim', description: { 'zh-CN': '相似于', 'en-US': 'Similar' }, display: '' },
  { latex: '\\simeq', description: { 'zh-CN': '渐近相等', 'en-US': 'Asymptotically Equal' }, display: '' },
  { latex: '\\cong', description: { 'zh-CN': '全等', 'en-US': 'Congruent' }, display: '' },
  { latex: '\\propto', description: { 'zh-CN': '正比于', 'en-US': 'Proportional' }, display: '' },
  { latex: '\\asymp', description: { 'zh-CN': '渐近', 'en-US': 'Asymptotic' }, display: '' },
  { latex: '\\doteq', description: { 'zh-CN': '趋于', 'en-US': 'Approaches' }, display: '' },
  { latex: '\\bowtie', description: { 'zh-CN': '自然连接', 'en-US': 'Natural Join' }, display: '' },
  { latex: '\\models', description: { 'zh-CN': '模型', 'en-US': 'Models' }, display: '' },

  // 箭头符号
  { latex: '\\rightarrow', description: { 'zh-CN': '右箭头', 'en-US': 'Right Arrow' }, display: '' },
  { latex: '\\leftarrow', description: { 'zh-CN': '左箭头', 'en-US': 'Left Arrow' }, display: '' },
  { latex: '\\leftrightarrow', description: { 'zh-CN': '双向箭头', 'en-US': 'Bidirectional Arrow' }, display: '' },
  { latex: '\\Rightarrow', description: { 'zh-CN': '蕴含', 'en-US': 'Implies' }, display: '' },
  { latex: '\\Leftarrow', description: { 'zh-CN': '被蕴含', 'en-US': 'Is Implied By' }, display: '' },
  { latex: '\\Leftrightarrow', description: { 'zh-CN': '当且仅当', 'en-US': 'If and Only If' }, display: '' },
  { latex: '\\uparrow', description: { 'zh-CN': '上箭头', 'en-US': 'Up Arrow' }, display: '' },
  { latex: '\\downarrow', description: { 'zh-CN': '下箭头', 'en-US': 'Down Arrow' }, display: '' },
  { latex: '\\updownarrow', description: { 'zh-CN': '上下箭头', 'en-US': 'Up Down Arrow' }, display: '' },
  { latex: '\\nearrow', description: { 'zh-CN': '东北箭头', 'en-US': 'Northeast Arrow' }, display: '' },

  // 运算符号
  { latex: '\\oplus', description: { 'zh-CN': '直和', 'en-US': 'Direct Sum' }, display: '' },
  { latex: '\\ominus', description: { 'zh-CN': '对称差', 'en-US': 'Symmetric Difference' }, display: '' },
  { latex: '\\otimes', description: { 'zh-CN': '张量积', 'en-US': 'Tensor Product' }, display: '' },
  { latex: '\\oslash', description: { 'zh-CN': '圆除', 'en-US': 'Circled Division' }, display: '' },
  { latex: '\\odot', description: { 'zh-CN': '圆点', 'en-US': 'Circled Dot' }, display: '' },
  { latex: '\\circ', description: { 'zh-CN': '复合', 'en-US': 'Composition' }, display: '' },
  { latex: '\\bullet', description: { 'zh-CN': '子弹', 'en-US': 'Bullet' }, display: '' },
  { latex: '\\star', description: { 'zh-CN': '星号', 'en-US': 'Star' }, display: '' },
  { latex: '\\ast', description: { 'zh-CN': '星号', 'en-US': 'Asterisk' }, display: '' },
  { latex: '\\diamond', description: { 'zh-CN': '菱形', 'en-US': 'Diamond' }, display: '' },

  // 几何符号
  { latex: '\\triangle', description: { 'zh-CN': '三角形', 'en-US': 'Triangle' }, display: '' },
  { latex: '\\square', description: { 'zh-CN': '正方形', 'en-US': 'Square' }, display: '' },
  { latex: '\\angle', description: { 'zh-CN': '角', 'en-US': 'Angle' }, display: '' },
  { latex: '\\parallel', description: { 'zh-CN': '平行', 'en-US': 'Parallel' }, display: '' },
  { latex: '\\perp', description: { 'zh-CN': '垂直', 'en-US': 'Perpendicular' }, display: '' },
  { latex: '\\sphericalangle', description: { 'zh-CN': '球面角', 'en-US': 'Spherical Angle' }, display: '' },
  { latex: '\\measuredangle', description: { 'zh-CN': '测量角', 'en-US': 'Measured Angle' }, display: '' },

  // 特殊符号
  { latex: '\\infty', description: { 'zh-CN': '无穷大', 'en-US': 'Infinity' }, display: '' },
  { latex: '\\varnothing', description: { 'zh-CN': '空集变体', 'en-US': 'Empty Set Variant' }, display: '' },
  { latex: '\\top', description: { 'zh-CN': '顶', 'en-US': 'Top' }, display: '' },
  { latex: '\\bot', description: { 'zh-CN': '底', 'en-US': 'Bottom' }, display: '' },
  { latex: '\\vdash', description: { 'zh-CN': '证明', 'en-US': 'Proves' }, display: '' },
  { latex: '\\dashv', description: { 'zh-CN': '反证明', 'en-US': 'Is Proved By' }, display: '' },
  { latex: '\\flat', description: { 'zh-CN': '降号', 'en-US': 'Flat' }, display: '' },
  { latex: '\\natural', description: { 'zh-CN': '还原号', 'en-US': 'Natural' }, display: '' },
  { latex: '\\sharp', description: { 'zh-CN': '升号', 'en-US': 'Sharp' }, display: '' },
  { latex: '\\clubsuit', description: { 'zh-CN': '梅花', 'en-US': 'Club Suit' }, display: '' },
  { latex: '\\diamondsuit', description: { 'zh-CN': '方块', 'en-US': 'Diamond Suit' }, display: '' },
  { latex: '\\heartsuit', description: { 'zh-CN': '红心', 'en-US': 'Heart Suit' }, display: '' },
  { latex: '\\spadesuit', description: { 'zh-CN': '黑桃', 'en-US': 'Spade Suit' }, display: '' },
];
