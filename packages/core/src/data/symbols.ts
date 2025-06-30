export interface Symbol {
  latex: string;
  description: string;
  display: string;
}

// 基础符号
export const basicSymbols: Symbol[] = [
  // 基本运算符
  { latex: '+', description: '加号', display: '' },
  { latex: '-', description: '减号', display: '' },
  { latex: '\\times', description: '乘号', display: '' },
  { latex: '\\div', description: '除号', display: '' },
  { latex: '\\cdot', description: '点乘', display: '' },
  { latex: '\\pm', description: '正负号', display: '' },
  { latex: '\\mp', description: '负正号', display: '' },

  // 比较符号
  { latex: '=', description: '等号', display: '' },
  { latex: '\\neq', description: '不等号', display: '' },
  { latex: '<', description: '小于', display: '' },
  { latex: '>', description: '大于', display: '' },
  { latex: '\\leq', description: '小于等于', display: '' },
  { latex: '\\geq', description: '大于等于', display: '' },
  { latex: '\\approx', description: '约等于', display: '' },
  { latex: '\\equiv', description: '恒等于', display: '' },
  { latex: '\\propto', description: '正比于', display: '' },
  { latex: '\\sim', description: '相似于', display: '' },
  { latex: '\\cong', description: '全等于', display: '' },

  // 上下标和结构
  { latex: 'x^2', description: '平方', display: '' },
  { latex: 'x^3', description: '立方', display: '' },
  { latex: 'x^{n}', description: '通用幂', display: '' },
  { latex: 'a_n', description: '下标', display: '' },
  { latex: 'a_{ij}', description: '双下标', display: '' },
  { latex: 'x_{n}', description: '下标n', display: '' },

  // 根式
  { latex: '\\sqrt{a}', description: '平方根', display: '' },
  { latex: '\\sqrt[3]{a}', description: '立方根', display: '' },
  { latex: '\\sqrt[n]{a}', description: 'n次根', display: '' },
  { latex: '\\sqrt{x}', description: '根号x', display: '' },

  // 分数
  { latex: '\\frac{a}{b}', description: '通用分数', display: '' },
  { latex: '\\frac{1}{x}', description: '倒数', display: '' },
  { latex: '\\frac{1}{x^2}', description: '平方倒数', display: '' },
  { latex: '\\frac{x^2}{y^2}', description: '平方分数', display: '' },

  // 积分和求和
  { latex: '\\int', description: '积分', display: '' },
  { latex: '\\int_{a}^{b}', description: '定积分', display: '' },
  { latex: '\\int_{a}^{b} f(x) dx', description: '定积分完整形式', display: '' },
  { latex: '\\oint', description: '环积分', display: '' },
  { latex: '\\sum', description: '求和', display: '' },
  { latex: '\\sum_{i=1}^{n}', description: '求和1到n', display: '' },
  { latex: '\\sum_{i=0}^{\\infty}', description: '无穷求和', display: '' },
  { latex: '\\prod', description: '连乘', display: '' },
  { latex: '\\prod_{i=1}^{n}', description: '乘积1到n', display: '' },

  // 导数和偏导数
  { latex: '\\frac{dx}{dy}', description: '导数', display: '' },
  { latex: '\\frac{\\partial x}{\\partial y}', description: '偏导数', display: '' },
  { latex: "f'(x)", description: '导数符号', display: '' },
  { latex: 'f^{(n)}(x)', description: 'n阶导数', display: '' },
  { latex: '\\partial', description: '偏导符号', display: '' },
  { latex: '\\nabla', description: '梯度', display: '' },

  // 极限
  { latex: '\\lim', description: '极限', display: '' },
  { latex: '\\lim_{x \\to a}', description: '极限x趋于a', display: '' },
  { latex: '\\lim_{x \\to \\infty}', description: '无穷极限', display: '' },
  { latex: '\\lim_{x \\to 0^+}', description: '右极限', display: '' },
  { latex: '\\lim_{x \\to 0^-}', description: '左极限', display: '' },

  // 三角函数
  { latex: '\\sin', description: '正弦', display: '' },
  { latex: '\\cos', description: '余弦', display: '' },
  { latex: '\\tan', description: '正切', display: '' },
  { latex: '\\cot', description: '余切', display: '' },
  { latex: '\\sec', description: '正割', display: '' },
  { latex: '\\csc', description: '余割', display: '' },
  { latex: '\\arcsin', description: '反正弦', display: '' },
  { latex: '\\arccos', description: '反余弦', display: '' },
  { latex: '\\arctan', description: '反正切', display: '' },

  // 对数和指数
  { latex: '\\log', description: '对数', display: '' },
  { latex: '\\ln', description: '自然对数', display: '' },
  { latex: '\\log_a b', description: '以a为底的对数', display: '' },
  { latex: '\\log_{10}', description: '常用对数', display: '' },
  { latex: 'e^x', description: '自然指数', display: '' },
  { latex: 'a^{bc}', description: '复合指数', display: '' },
  { latex: '\\exp', description: '指数函数', display: '' },

  // 括号
  { latex: '[x]', description: '方括号', display: '' },
  { latex: '(x)', description: '圆括号', display: '' },
  { latex: '\\{x\\}', description: '花括号', display: '' },
  { latex: '|x|', description: '绝对值', display: '' },
  { latex: '\\|x\\|', description: '范数', display: '' },

  // 特殊符号
  { latex: '\\infty', description: '无穷大', display: '' },
  { latex: '\\pi', description: '圆周率', display: '' },
  { latex: 'e', description: '自然常数', display: '' },
  { latex: '\\angle', description: '角', display: '' },
  { latex: '\\perp', description: '垂直', display: '' },
  { latex: '\\parallel', description: '平行', display: '' },
  { latex: '^\\circ', description: '度数符号', display: '' },
  { latex: '\\%', description: '百分号', display: '' },

  // 向量和修饰符
  { latex: '\\vec{a}', description: '向量', display: '' },
  { latex: '\\overline{AB}', description: '上划线', display: '' },
  { latex: '\\overrightarrow{AB}', description: '向量AB', display: '' },
  { latex: '\\hat{a}', description: '单位向量', display: '' },

  // 数字
  { latex: '0', description: '数字0', display: '' },
  { latex: '1', description: '数字1', display: '' },
  { latex: '2', description: '数字2', display: '' },
  { latex: '3', description: '数字3', display: '' },
  { latex: '4', description: '数字4', display: '' },
  { latex: '5', description: '数字5', display: '' },
  { latex: '6', description: '数字6', display: '' },
  { latex: '7', description: '数字7', display: '' },
  { latex: '8', description: '数字8', display: '' },
  { latex: '9', description: '数字9', display: '' },
  { latex: '.', description: '小数点', display: '' },
];

// 希腊字母
export const greekSymbols: Symbol[] = [
  // 小写希腊字母 - 第一行
  { latex: '\\alpha', description: 'Alpha', display: '' },
  { latex: '\\beta', description: 'Beta', display: '' },
  { latex: '\\gamma', description: 'Gamma', display: '' },
  { latex: '\\delta', description: 'Delta', display: '' },
  { latex: '\\epsilon', description: 'Epsilon', display: '' },
  { latex: '\\varepsilon', description: 'Var Epsilon', display: '' },
  { latex: '\\zeta', description: 'Zeta', display: '' },
  { latex: '\\eta', description: 'Eta', display: '' },
  { latex: '\\theta', description: 'Theta', display: '' },
  { latex: '\\vartheta', description: 'Var Theta', display: '' },

  // 小写希腊字母 - 第二行
  { latex: '\\iota', description: 'Iota', display: '' },
  { latex: '\\kappa', description: 'Kappa', display: '' },
  { latex: '\\lambda', description: 'Lambda', display: '' },
  { latex: '\\mu', description: 'Mu', display: '' },
  { latex: '\\nu', description: 'Nu', display: '' },
  { latex: '\\xi', description: 'Xi', display: '' },
  { latex: 'o', description: 'Omicron', display: '' },
  { latex: '\\pi', description: 'Pi', display: '' },
  { latex: '\\varpi', description: 'Var Pi', display: '' },
  { latex: '\\rho', description: 'Rho', display: '' },

  // 小写希腊字母 - 第三行
  { latex: '\\varrho', description: 'Var Rho', display: '' },
  { latex: '\\sigma', description: 'Sigma', display: '' },
  { latex: '\\varsigma', description: 'Final Sigma', display: '' },
  { latex: '\\tau', description: 'Tau', display: '' },
  { latex: '\\upsilon', description: 'Upsilon', display: '' },
  { latex: '\\phi', description: 'Phi', display: '' },
  { latex: '\\varphi', description: 'Var Phi', display: '' },
  { latex: '\\chi', description: 'Chi', display: '' },
  { latex: '\\psi', description: 'Psi', display: '' },
  { latex: '\\omega', description: 'Omega', display: '' },

  // 大写希腊字母 - 第一行
  { latex: 'A', description: 'Alpha (大写)', display: '' },
  { latex: 'B', description: 'Beta (大写)', display: '' },
  { latex: '\\Gamma', description: 'Gamma (大写)', display: '' },
  { latex: '\\Delta', description: 'Delta (大写)', display: '' },
  { latex: 'E', description: 'Epsilon (大写)', display: '' },
  { latex: 'Z', description: 'Zeta (大写)', display: '' },
  { latex: 'H', description: 'Eta (大写)', display: '' },
  { latex: '\\Theta', description: 'Theta (大写)', display: '' },
  { latex: 'I', description: 'Iota (大写)', display: '' },
  { latex: 'K', description: 'Kappa (大写)', display: '' },

  // 大写希腊字母 - 第二行
  { latex: '\\Lambda', description: 'Lambda (大写)', display: '' },
  { latex: 'M', description: 'Mu (大写)', display: '' },
  { latex: 'N', description: 'Nu (大写)', display: '' },
  { latex: '\\Xi', description: 'Xi (大写)', display: '' },
  { latex: 'O', description: 'Omicron (大写)', display: '' },
  { latex: '\\Pi', description: 'Pi (大写)', display: '' },
  { latex: 'P', description: 'Rho (大写)', display: '' },
  { latex: '\\Sigma', description: 'Sigma (大写)', display: '' },
  { latex: 'T', description: 'Tau (大写)', display: '' },
  { latex: '\\Upsilon', description: 'Upsilon (大写)', display: '' },

  // 大写希腊字母 - 第三行
  { latex: '\\Phi', description: 'Phi (大写)', display: '' },
  { latex: 'X', description: 'Chi (大写)', display: '' },
  { latex: '\\Psi', description: 'Psi (大写)', display: '' },
  { latex: '\\Omega', description: 'Omega (大写)', display: '' },
];

// 高级符号
export const advancedSymbols: Symbol[] = [
  // 逻辑符号
  { latex: '\\forall', description: '任意', display: '' },
  { latex: '\\exists', description: '存在', display: '' },
  { latex: '\\nexists', description: '不存在', display: '' },
  { latex: '\\land', description: '逻辑与', display: '' },
  { latex: '\\lor', description: '逻辑或', display: '' },
  { latex: '\\neg', description: '逻辑非', display: '' },
  { latex: '\\implies', description: '蕴含', display: '' },
  { latex: '\\iff', description: '当且仅当', display: '' },
  { latex: '\\therefore', description: '因此', display: '' },
  { latex: '\\because', description: '因为', display: '' },

  // 集合论符号
  { latex: '\\in', description: '属于', display: '' },
  { latex: '\\notin', description: '不属于', display: '' },
  { latex: '\\subset', description: '子集', display: '' },
  { latex: '\\supset', description: '超集', display: '' },
  { latex: '\\subseteq', description: '子集或相等', display: '' },
  { latex: '\\supseteq', description: '超集或相等', display: '' },
  { latex: '\\cup', description: '并集', display: '' },
  { latex: '\\cap', description: '交集', display: '' },
  { latex: '\\setminus', description: '集合差', display: '' },
  { latex: '\\emptyset', description: '空集', display: '' },

  // 数字集合
  { latex: '\\mathbb{N}', description: '自然数集', display: '' },
  { latex: '\\mathbb{Z}', description: '整数集', display: '' },
  { latex: '\\mathbb{Q}', description: '有理数集', display: '' },
  { latex: '\\mathbb{R}', description: '实数集', display: '' },
  { latex: '\\mathbb{C}', description: '复数集', display: '' },
  { latex: '\\mathbb{P}', description: '素数集', display: '' },
  { latex: '\\aleph', description: 'Aleph', display: '' },
  { latex: '\\hbar', description: '约化普朗克常数', display: '' },
  { latex: '\\ell', description: '脚本L', display: '' },
  { latex: '\\wp', description: 'Weierstrass P', display: '' },

  // 积分符号
  { latex: '\\int', description: '积分', display: '' },
  { latex: '\\iint', description: '二重积分', display: '' },
  { latex: '\\iiint', description: '三重积分', display: '' },
  { latex: '\\oint', description: '环积分', display: '' },
  { latex: '\\partial', description: '偏导数', display: '' },
  { latex: '\\nabla', description: '梯度', display: '' },
  { latex: '\\sum', description: '求和', display: '' },
  { latex: '\\prod', description: '连乘', display: '' },
  { latex: '\\lim', description: '极限', display: '' },
  { latex: '\\sup', description: '上确界', display: '' },

  // 关系符号
  { latex: '\\equiv', description: '恒等于', display: '' },
  { latex: '\\approx', description: '约等于', display: '' },
  { latex: '\\sim', description: '相似于', display: '' },
  { latex: '\\simeq', description: '渐近相等', display: '' },
  { latex: '\\cong', description: '全等', display: '' },
  { latex: '\\propto', description: '正比于', display: '' },
  { latex: '\\asymp', description: '渐近', display: '' },
  { latex: '\\doteq', description: '趋于', display: '' },
  { latex: '\\bowtie', description: '自然连接', display: '' },
  { latex: '\\models', description: '模型', display: '' },

  // 箭头符号
  { latex: '\\rightarrow', description: '右箭头', display: '' },
  { latex: '\\leftarrow', description: '左箭头', display: '' },
  { latex: '\\leftrightarrow', description: '双向箭头', display: '' },
  { latex: '\\Rightarrow', description: '蕴含', display: '' },
  { latex: '\\Leftarrow', description: '被蕴含', display: '' },
  { latex: '\\Leftrightarrow', description: '当且仅当', display: '' },
  { latex: '\\uparrow', description: '上箭头', display: '' },
  { latex: '\\downarrow', description: '下箭头', display: '' },
  { latex: '\\updownarrow', description: '上下箭头', display: '' },
  { latex: '\\nearrow', description: '东北箭头', display: '' },

  // 运算符号
  { latex: '\\oplus', description: '直和', display: '' },
  { latex: '\\ominus', description: '对称差', display: '' },
  { latex: '\\otimes', description: '张量积', display: '' },
  { latex: '\\oslash', description: '圆除', display: '' },
  { latex: '\\odot', description: '圆点', display: '' },
  { latex: '\\circ', description: '复合', display: '' },
  { latex: '\\bullet', description: '子弹', display: '' },
  { latex: '\\star', description: '星号', display: '' },
  { latex: '\\ast', description: '星号', display: '' },
  { latex: '\\diamond', description: '菱形', display: '' },

  // 几何符号
  { latex: '\\triangle', description: '三角形', display: '' },
  { latex: '\\square', description: '正方形', display: '' },
  { latex: '\\angle', description: '角', display: '' },
  { latex: '\\parallel', description: '平行', display: '' },
  { latex: '\\perp', description: '垂直', display: '' },
  { latex: '\\sphericalangle', description: '球面角', display: '' },
  { latex: '\\measuredangle', description: '测量角', display: '' },

  // 特殊符号
  { latex: '\\infty', description: '无穷大', display: '' },
  { latex: '\\varnothing', description: '空集变体', display: '' },
  { latex: '\\top', description: '顶', display: '' },
  { latex: '\\bot', description: '底', display: '' },
  { latex: '\\vdash', description: '证明', display: '' },
  { latex: '\\dashv', description: '反证明', display: '' },
  { latex: '\\flat', description: '降号', display: '' },
  { latex: '\\natural', description: '还原号', display: '' },
  { latex: '\\sharp', description: '升号', display: '' },
  { latex: '\\clubsuit', description: '梅花', display: '' },
  { latex: '\\diamondsuit', description: '方块', display: '' },
  { latex: '\\heartsuit', description: '红心', display: '' },
  { latex: '\\spadesuit', description: '黑桃', display: '' },
];
