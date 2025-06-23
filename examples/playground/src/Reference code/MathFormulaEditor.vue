<template>
  <BaseDialog
    v-model:visible="visible"
    :title="dialogTitle"
    width="1000px"
    top="0vh"
    :on-before-close="handleClose"
    class="formula-editor-dialog"
    :append-to-body="true"
  >
    <template #header>
      <div class="dialog-header">
        <div class="header-icon">
          <i class="fa fa-calculator"></i>
        </div>
        <div class="header-content">
          <h3>Equation editor</h3>
          <p>Use the buttons below or type in the equations using LaTeX</p>
        </div>
        <div class="header-badge">
          <span>LaTeX</span>
        </div>
      </div>
    </template>

    <div class="editor-container">
      <!-- 输入区域 -->
      <div class="input-section">
        <div class="section-header">
          <div class="section-title">
            <i class="fa fa-edit"></i>
            <span>LaTeX Input</span>
          </div>
          <div class="input-actions" @click="clearInput" title="Clear">
            <i class="fa fa-trash" ></i>
          </div>
        </div>
        <div class="input-wrapper">
          <el-input
            v-model="latexInput"
            placeholder="Enter LaTeX formula or click symbols below..."
            @input="updatePreview"
            clearable
            class="latex-input"
            size="large"
          >
            <template #prefix>
              <i class="fa fa-code input-icon"></i>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 预览区域 -->
      <div class="preview-section">
        <div class="section-header">
          <div class="section-title">
            <i class="fa fa-eye"></i>
            <span>Live Preview</span>
          </div>
          <div class="preview-status" :class="{ active: latexInput }">
            <span v-if="latexInput" class="status-dot"></span>
            {{ latexInput ? 'Rendering' : 'No formula' }}
          </div>
        </div>
        <div class="preview-container">
          <div v-if="latexInput" class="formula-preview" v-html="renderedFormula"></div>
          <div v-else class="no-formula">
            <!-- <i class="fa fa-info-circle"></i> -->
            <span>Enter a LaTeX formula to see the preview</span>
          </div>
        </div>
      </div>

      <!-- 符号面板 -->
      <div class="symbols-section">
        <!-- 分类标签 -->
        <div class="category-tabs">
          <button
            v-for="category in categories"
            :key="category.key"
            :class="['tab-button', { active: activeCategory === category.key }]"
            @click="activeCategory = category.key"
          >
            <!-- <i :class="category.icon"></i> -->
            <span>{{ category.name }}</span>
          </button>
        </div>

        <!-- 滚动内容区域 -->
        <div class="scrollable-content">
          <!-- 符号网格 -->
          <div class="symbols-panel">
            <div class="symbols-grid">
              <button
                v-for="symbol in currentSymbolsWithSvg"
                :key="symbol.latex"
                class="symbol-button"
                @click="insertSymbol(symbol.latex)"
                :title="symbol.description"
              >
                <span v-html="symbol.display"></span>
              </button>
            </div>
          </div>

          <!-- 常用公式示例 -->
          <div v-if="activeCategory === 'basic'" class="formula-examples">
            <div class="section-header">
              <div class="section-title">
                <i class="fa fa-star"></i>
                <span>Common Formulas</span>
              </div>
            </div>
            <div class="examples-grid">
              <button
                v-for="example in formulaExamplesWithSvg"
                :key="example.latex"
                class="example-button"
                @click="insertSymbol(example.latex)"
                :title="example.description"
              >
                <div class="example-preview" v-html="example.display"></div>
                <div class="example-description">{{ example.description }}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="handleClose">
          Cancel
        </el-button>
        <el-button size="large" type="primary" class="ripple-effect" @click="handleInsert" :disabled="!latexInput">
          Insert Formula
        </el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog/index.vue';
import { ref, computed, watch, onMounted } from 'vue';

// 声明全局MathJax类型
declare global {
  interface Window {
    MathJax: {
      tex2svgPromise: (latex: string, options?: any) => Promise<any>;
    }
  }
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  existingLatex: {
    type: String,
    default: ''
  }
})

enum SymbolCategory {
  BASIC = 'basic',
  GREEK = 'greek',
  ADVANCED = 'advanced'
}

const emit = defineEmits(['update:modelValue', 'insert']);

const visible = ref(false)
const latexInput = ref('')
const activeCategory = ref(SymbolCategory.BASIC)
const renderedFormula = ref('')
const symbolDisplayCache = ref(new Map<string, string>())

// 监听显示状态
watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
  if (newVal) {
    // 如果有现有的LaTeX内容，预填充到输入框
    latexInput.value = props.existingLatex || ''
    updatePreview()
  }
})

// 监听现有LaTeX内容的变化
watch(() => props.existingLatex, (newVal) => {
  if (visible.value && newVal) {
    latexInput.value = newVal
    updatePreview()
  }
})

watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})

// 分类定义
const categories = [
  { key: SymbolCategory.BASIC, name: 'Basic', icon: 'fa fa-calculator' },
  { key: SymbolCategory.GREEK, name: 'Greek', icon: 'fa fa-greek-cross' },
  { key: SymbolCategory.ADVANCED, name: 'Advanced', icon: 'fa fa-cog' }
]

// 基本符号
const basicSymbols = [
  // 结构符号
  { latex: 'x^2', display: 'x²', description: '平方' },
  { latex: 'x^3', display: 'x³', description: '立方' },
  { latex: 'x^n', display: 'xⁿ', description: '通用幂' },
  { latex: 'a_n', display: 'aₙ', description: '下标' },
  { latex: 'a_{ij}', display: 'aᵢⱼ', description: '双下标' },
  { latex: '\\sqrt{a}', display: '√a', description: '平方根' },
  { latex: '\\sqrt[3]{a}', display: '3√a', description: '立方根' },
  { latex: '\\sqrt[n]{a}', display: 'ⁿ√a', description: 'n次根' },
  { latex: '[x]', display: '[x]', description: '方括号' },
  { latex: '(x)', display: '(x)', description: '圆括号' },
  { latex: '\\{x\\}', display: '{x}', description: '花括号' },
  
  // 导数和偏导数
  { latex: '\\frac{dx}{dy}', display: 'dx/dy', description: '导数' },
  { latex: '\\frac{\\partial x}{\\partial y}', display: '∂x/∂y', description: '偏导数' },
  { latex: 'f\'(x)', display: 'f\'(x)', description: '导数符号' },
  { latex: 'f^{(n)}(x)', display: 'f⁽ⁿ⁾(x)', description: 'n阶导数' },
  
  // 积分符号
  { latex: '\\int x^n dx', display: '∫xⁿdx', description: '不定积分' },
  { latex: '\\int_{a}^{b}', display: '∫ᵃᵇ', description: '定积分' },
  { latex: '\\int_{a}^{b} f(x) dx', display: '∫ᵃᵇf(x)dx', description: '定积分完整形式' },
  
  // 对数和指数
  { latex: '\\log_a b', display: 'log_a b', description: '对数' },
  { latex: '\\log_{10}', display: 'log₁₀', description: '常用对数' },
  { latex: '\\ln x', display: 'ln x', description: '自然对数' },
  { latex: 'e^x', display: 'eˣ', description: '自然指数' },
  { latex: 'a^{bc}', display: 'aᵇᶜ', description: '复合指数' },
  
  // 极限
  { latex: '\\lim_{x \\to a}', display: 'lim_{x→a}', description: '极限' },
  { latex: '\\lim_{x \\to \\infty}', display: 'lim_{x→∞}', description: '无穷极限' },
  { latex: '\\lim_{x \\to 0^+}', display: 'lim_{x→0⁺}', description: '右极限' },
  { latex: '\\lim_{x \\to 0^-}', display: 'lim_{x→0⁻}', description: '左极限' },
  
  // 求和与乘积
  { latex: '\\sum_{i=1}^{n}', display: '∑ᵢ₌₁ⁿ', description: '求和' },
  { latex: '\\sum_{i=0}^{\\infty}', display: '∑ᵢ₌₀^∞', description: '无穷求和' },
  { latex: '\\prod_{i=1}^{n}', display: '∏ᵢ₌₁ⁿ', description: '乘积' },
  { latex: '\\prod_{i=1}^{\\infty}', display: '∏ᵢ₌₁^∞', description: '无穷乘积' },
  
  // 分数
  { latex: '\\frac{a}{b}', display: 'a/b', description: '通用分数' },
  { latex: '\\frac{x^2}{y^2}', display: 'x²/y²', description: '平方分数' },
  { latex: '\\frac{\\sqrt{a}}{\\sqrt{b}}', display: '√a/√b', description: '根式分数' },
  { latex: '\\frac{1}{x}', display: '1/x', description: '倒数' },
  { latex: '\\frac{1}{x^2}', display: '1/x²', description: '平方倒数' },
  
  // 函数相关
  { latex: 'f(x)', display: 'f(x)', description: '函数' },
  { latex: 'f_x', display: 'fₓ', description: '偏导fx' },
  { latex: 'f^{-1}(x)', display: 'f⁻¹(x)', description: '反函数' },
  { latex: 'g \\circ f', display: 'g∘f', description: '复合函数' },
  
  // 其他结构符号
  { latex: '\\nabla', display: '∇', description: 'nabla' },
  { latex: '\\Delta', display: 'Δ', description: 'Delta' },
  { latex: '\\beta', display: 'β', description: 'Beta' },
  // 计算符号
  { latex: '+', display: '+', description: '加号' },
  { latex: '-', display: '−', description: '减号' },
  { latex: '\\pm', display: '±', description: '正负号' },
  { latex: '\\div', display: '÷', description: '除号' },
  { latex: '\\times', display: '×', description: '乘号' },
  { latex: '\\cdot', display: '·', description: '点' },
  { latex: '=', display: '=', description: '等于' },
  { latex: '<', display: '<', description: '小于' },
  { latex: '>', display: '>', description: '大于' },
  { latex: '\\leq', display: '≤', description: '小于等于' },
  { latex: '\\geq', display: '≥', description: '大于等于' },
  { latex: '\\neq', display: '≠', description: '不等于' },
  { latex: '\\infty', display: '∞', description: '无穷' },
  { latex: '\\pi', display: 'π', description: '圆周率' },
  { latex: '|x|', display: '|x|', description: '绝对值' },
  { latex: 'a/b', display: 'a/b', description: '分数形式' },
  { latex: '\\angle', display: '∠', description: '角' },
  { latex: '\\perp', display: '⊥', description: '垂直' },
  { latex: '\\sin', display: 'sin', description: '正弦' },
  { latex: '\\cos', display: 'cos', description: '余弦' },
  { latex: '\\tan', display: 'tan', description: '正切' },
  { latex: '\\ln', display: 'ln', description: '自然对数' },
  { latex: '\\log', display: 'log', description: '对数' },
  { latex: '\\exp', display: 'exp', description: '指数函数' },
  { latex: '^\\circ', display: '°', description: '度数符号' },
  { latex: '\\%', display: '%', description: '百分号' },
  { latex: '\\vec{a}', display: 'a⃗', description: '向量' },
  { latex: '\\overline{AB}', display: 'AB̄', description: '上划线' },
  { latex: '.', display: '.', description: '小数点' },
  { latex: '0', display: '0', description: '数字0' },
  { latex: '1', display: '1', description: '数字1' },
  { latex: '2', display: '2', description: '数字2' },
  { latex: '3', display: '3', description: '数字3' },
  { latex: '4', display: '4', description: '数字4' },
  { latex: '5', display: '5', description: '数字5' },
  { latex: '6', display: '6', description: '数字6' },
  { latex: '7', display: '7', description: '数字7' },
  { latex: '8', display: '8', description: '数字8' },
  { latex: '9', display: '9', description: '数字9' },
]

// 希腊字母
const greekSymbols = [
  // 第一行：Alpha到Epsilon
  { latex: '\\alpha', display: 'α', description: 'Alpha' },
  { latex: '\\beta', display: 'β', description: 'Beta' },
  { latex: '\\gamma', display: 'γ', description: 'Gamma' },
  { latex: '\\delta', display: 'δ', description: 'Delta' },
  { latex: '\\epsilon', display: 'ε', description: 'Epsilon' },
  { latex: '\\varepsilon', display: 'ε', description: 'Var Epsilon' },
  { latex: 'A', display: 'A', description: 'Alpha' },
  { latex: 'B', display: 'B', description: 'Beta' },
  { latex: '\\Gamma', display: 'Γ', description: 'Gamma' },
  { latex: '\\Delta', display: 'Δ', description: 'Delta' },
  
  // 第二行：Zeta到Kappa
  { latex: '\\zeta', display: 'ζ', description: 'Zeta' },
  { latex: '\\eta', display: 'η', description: 'Eta' },
  { latex: '\\theta', display: 'θ', description: 'Theta' },
  { latex: '\\vartheta', display: 'ϑ', description: 'Var Theta' },
  { latex: '\\iota', display: 'ι', description: 'Iota' },
  { latex: '\\kappa', display: 'κ', description: 'Kappa' },
  { latex: 'E', display: 'E', description: 'Epsilon' },
  { latex: 'Z', display: 'Z', description: 'Zeta' },
  { latex: 'H', display: 'H', description: 'Eta' },
  { latex: '\\Theta', display: 'Θ', description: 'Theta' },
  
  // 第三行：Lambda到Omicron
  { latex: '\\lambda', display: 'λ', description: 'Lambda' },
  { latex: '\\mu', display: 'μ', description: 'Mu' },
  { latex: '\\nu', display: 'ν', description: 'Nu' },
  { latex: '\\xi', display: 'ξ', description: 'Xi' },
  { latex: 'o', display: 'o', description: 'Omicron' },
  { latex: 'I', display: 'I', description: 'Iota' },
  { latex: 'K', display: 'K', description: 'Kappa' },
  { latex: '\\Lambda', display: 'Λ', description: 'Lambda' },
  { latex: 'M', display: 'M', description: 'Mu' },
  { latex: 'N', display: 'N', description: 'Nu' },
  
  // 第四行：Pi到Upsilon
  { latex: '\\pi', display: 'π', description: 'Pi' },
  { latex: '\\varpi', display: 'ϖ', description: 'Var Pi' },
  { latex: '\\rho', display: 'ρ', description: 'Rho' },
  { latex: '\\varrho', display: 'ϱ', description: 'Var Rho' },
  { latex: '\\sigma', display: 'σ', description: 'Sigma' },
  { latex: '\\varsigma', display: 'ς', description: 'Final Sigma' },
  { latex: '\\tau', display: 'τ', description: 'Tau' },
  { latex: '\\upsilon', display: 'υ', description: 'Upsilon' },
  { latex: '\\Xi', display: 'Ξ', description: 'Xi' },
  { latex: 'O', display: 'O', description: 'Omicron' },
  
  // 第五行：Phi到Omega
  { latex: '\\phi', display: 'φ', description: 'Phi' },
  { latex: '\\varphi', display: 'φ', description: 'Var Phi' },
  { latex: '\\chi', display: 'χ', description: 'Chi' },
  { latex: '\\psi', display: 'ψ', description: 'Psi' },
  { latex: '\\omega', display: 'ω', description: 'Omega' },
  { latex: '\\Pi', display: 'Π', description: 'Pi' },
  { latex: 'P', display: 'P', description: 'Rho' },
  { latex: '\\Sigma', display: 'Σ', description: 'Sigma' },
  { latex: 'T', display: 'T', description: 'Tau' },
  { latex: '\\Upsilon', display: 'Υ', description: 'Upsilon' },
  
  // 第六行：大写Phi到Omega
  { latex: '\\Phi', display: 'Φ', description: 'Phi' },
  { latex: 'X', display: 'X', description: 'Chi' },
  { latex: '\\Psi', display: 'Ψ', description: 'Psi' },
  { latex: '\\Omega', display: 'Ω', description: 'Omega' }
]

// 高级符号
const advancedSymbols = [
  // 积分符号
  { latex: '\\int', display: '∫', description: 'Integral' },
  { latex: '\\iint', display: '∬', description: 'Double Integral' },
  { latex: '\\iiint', display: '∭', description: 'Triple Integral' },
  { latex: '\\oint', display: '∮', description: 'Circular Integral' },
  { latex: '\\partial', display: '∂', description: 'Partial Derivative' },
  { latex: '\\nabla', display: '∇', description: 'Gradient' },
  { latex: '\\sum', display: '∑', description: 'Sum' },
  { latex: '\\prod', display: '∏', description: 'Product' },
  { latex: '\\lim', display: 'lim', description: 'Limit' },
  { latex: '\\sup', display: 'sup', description: 'Supremum' },
  
  // 逻辑符号
  { latex: '\\forall', display: '∀', description: 'For All' },
  { latex: '\\exists', display: '∃', description: 'Exists' },
  { latex: '\\nexists', display: '∄', description: 'Not Exists' },
  { latex: '\\land', display: '∧', description: 'Logical And' },
  { latex: '\\lor', display: '∨', description: 'Logical Or' },
  { latex: '\\neg', display: '¬', description: 'Logical Not' },
  { latex: '\\implies', display: '⟹', description: 'Implies' },
  { latex: '\\iff', display: '⟺', description: 'If and Only If' },
  { latex: '\\therefore', display: '∴', description: 'Therefore' },
  { latex: '\\because', display: '∵', description: 'Because' },
  
  // 集合论符号
  { latex: '\\in', display: '∈', description: 'Belongs To' },
  { latex: '\\notin', display: '∉', description: 'Does Not Belong To' },
  { latex: '\\subset', display: '⊂', description: 'Subset' },
  { latex: '\\supset', display: '⊃', description: 'Superset' },
  { latex: '\\subseteq', display: '⊆', description: 'Subset or Equal' },
  { latex: '\\supseteq', display: '⊇', description: 'Superset or Equal' },
  { latex: '\\cup', display: '∪', description: 'Union' },
  { latex: '\\cap', display: '∩', description: 'Intersection' },
  { latex: '\\setminus', display: '∖', description: 'Set Difference' },
  { latex: '\\emptyset', display: '∅', description: 'Empty Set' },
  
  // 数字集合
  { latex: '\\mathbb{N}', display: 'ℕ', description: 'Natural Number Set' },
  { latex: '\\mathbb{Z}', display: 'ℤ', description: 'Integer Set' },
  { latex: '\\mathbb{Q}', display: 'ℚ', description: 'Rational Number Set' },
  { latex: '\\mathbb{R}', display: 'ℝ', description: 'Real Number Set' },
  { latex: '\\mathbb{C}', display: 'ℂ', description: 'Complex Number Set' },
  { latex: '\\mathbb{P}', display: 'ℙ', description: 'Prime Number Set' },
  { latex: '\\aleph', display: 'ℵ', description: 'Aleph' },
  { latex: '\\hbar', display: 'ℏ', description: 'Reduced Planck Constant' },
  { latex: '\\ell', display: 'ℓ', description: 'Script L' },
  { latex: '\\wp', display: '℘', description: 'Weierstrass P' },
  
  // 关系符号
  { latex: '\\equiv', display: '≡', description: 'Equivalent' },
  { latex: '\\approx', display: '≈', description: 'Approximately Equal' },
  { latex: '\\sim', display: '∼', description: 'Similar To' },
  { latex: '\\simeq', display: '≃', description: 'Asymptotically Equal' },
  { latex: '\\cong', display: '≅', description: 'Congruent' },
  { latex: '\\propto', display: '∝', description: 'Proportional To' },
  { latex: '\\asymp', display: '≍', description: 'Asymptotic' },
  { latex: '\\doteq', display: '≐', description: 'Approaches Limit' },
  { latex: '\\bowtie', display: '⋈', description: 'Natural Join' },
  { latex: '\\models', display: '⊨', description: 'Models' },
  
  // 箭头符号
  { latex: '\\rightarrow', display: '→', description: 'Right Arrow' },
  { latex: '\\leftarrow', display: '←', description: 'Left Arrow' },
  { latex: '\\leftrightarrow', display: '↔', description: 'Bidirectional Arrow' },
  { latex: '\\Rightarrow', display: '⇒', description: 'Implies' },
  { latex: '\\Leftarrow', display: '⇐', description: 'Implied By' },
  { latex: '\\Leftrightarrow', display: '⇔', description: 'If and Only If' },
  { latex: '\\uparrow', display: '↑', description: 'Up Arrow' },
  { latex: '\\downarrow', display: '↓', description: 'Down Arrow' },
  { latex: '\\updownarrow', display: '↕', description: 'Up Down Arrow' },
  { latex: '\\nearrow', display: '↗', description: 'Northeast Arrow' },
  
  // 运算符号
  { latex: '\\oplus', display: '⊕', description: 'Direct Sum' },
  { latex: '\\ominus', display: '⊖', description: 'Symmetric Difference' },
  { latex: '\\otimes', display: '⊗', description: 'Tensor Product' },
  { latex: '\\oslash', display: '⊘', description: 'Circled Division' },
  { latex: '\\odot', display: '⊙', description: 'Circled Dot' },
  { latex: '\\circ', display: '∘', description: 'Composition' },
  { latex: '\\bullet', display: '∙', description: 'Bullet' },
  { latex: '\\star', display: '⋆', description: 'Star' },
  { latex: '\\ast', display: '∗', description: 'Asterisk' },
  { latex: '\\diamond', display: '⋄', description: 'Diamond' }
]

// 常用公式示例
const formulaExamples = [
  // 基础代数公式
  { latex: 'x^2 + y^2 = z^2', display: 'x² + y² = z²', description: 'Pythagorean theorem' },
  { latex: '(a + b)^2 = a^2 + 2ab + b^2', display: '(a + b)² = a² + 2ab + b²', description: 'Perfect square formula' },
  { latex: '(a - b)^2 = a^2 - 2ab + b^2', display: '(a - b)² = a² - 2ab + b²', description: 'Perfect square difference formula' },
  { latex: 'a^2 - b^2 = (a + b)(a - b)', display: 'a² - b² = (a + b)(a - b)', description: 'Square difference formula' },
  
  // 分数运算
  { latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}', display: 'a/b + c/d = (ad + bc)/bd', description: 'Fraction addition' },
  { latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}', display: 'a/b × c/d = ac/bd', description: 'Fraction multiplication' },
  { latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}', display: 'a/b ÷ c/d = a/b × d/c', description: 'Fraction division' },
  
  // 根式公式
  { latex: '\\sqrt{a^2 + b^2}', display: '√(a² + b²)', description: 'Square root formula' },
  { latex: '\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}', display: '√(ab) = √a · √b', description: 'Root multiplication' },
  { latex: '\\sqrt[n]{a^m} = a^{\\frac{m}{n}}', display: 'ⁿ√(aᵐ) = a^(m/n)', description: 'Root exponentiation' },
  
  // 指数对数公式
  { latex: 'a^m \\cdot a^n = a^{m+n}', display: 'aᵐ · aⁿ = a^(m+n)', description: 'Same base power multiplication' },
  { latex: '\\frac{a^m}{a^n} = a^{m-n}', display: 'aᵐ/aⁿ = a^(m-n)', description: 'Same base power division' },
  { latex: '(a^m)^n = a^{mn}', display: '(aᵐ)ⁿ = a^(mn)', description: 'Power of power' },
  { latex: '\\log_a(xy) = \\log_a x + \\log_a y', display: 'log_a(xy) = log_a x + log_a y', description: 'Logarithm multiplication rule' },
  { latex: '\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y', display: 'log_a(x/y) = log_a x - log_a y', description: 'Logarithm division rule' },
  
  // 三角函数公式
  { latex: '\\sin^2 x + \\cos^2 x = 1', display: 'sin²x + cos²x = 1', description: 'Trigonometric identity' },
  { latex: '\\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B', display: 'sin(A + B) = sinA cosB + cosA sinB', description: 'Sine addition formula' },
  { latex: '\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B', display: 'cos(A + B) = cosA cosB - sinA sinB', description: 'Cosine addition formula' },
  { latex: '\\tan x = \\frac{\\sin x}{\\cos x}', display: 'tan x = sin x / cos x', description: 'Tangent definition' },
  
  // 微积分公式
  { latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0', display: 'lim(x→∞) 1/x = 0', description: 'Infinite limit' },
  { latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}', display: 'f\'(x) = lim(h→0) [f(x+h) - f(x)]/h', description: 'Derivative definition' },
  { latex: '\\frac{d}{dx}(x^n) = nx^{n-1}', display: 'd/dx(xⁿ) = nxⁿ⁻¹', description: 'Power function derivative' },
  { latex: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C', display: '∫xⁿdx = x^(n+1)/(n+1) + C', description: 'Power function integral' },
  { latex: '\\int_{a}^{b} f(x) dx', display: '∫ᵃᵇ f(x) dx', description: 'Definite integral' },
  
  // 数列公式
  { latex: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}', display: '∑(i=1 to n) i = n(n+1)/2', description: 'Arithmetic sequence sum' },
  { latex: '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}', display: '∑(i=1 to n) i² = n(n+1)(2n+1)/6', description: 'Square number sum' },
  { latex: 'S_n = \\frac{a_1(1-r^n)}{1-r}', display: 'Sₙ = a₁(1-rⁿ)/(1-r)', description: 'Geometric sequence sum' },
  
  // 概率统计公式
  { latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', display: 'P(A∪B) = P(A) + P(B) - P(A∩B)', description: 'Probability addition formula' },
  { latex: 'C_n^r = \\frac{n!}{r!(n-r)!}', display: 'Cₙʳ = n!/[r!(n-r)!]', description: 'Combination formula' },
  { latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i', display: 'x̄ = (1/n)∑xᵢ', description: 'Arithmetic mean' },
  
  // 几何公式
  { latex: 'A = \\pi r^2', display: 'A = πr²', description: 'Circle area formula' },
  { latex: 'V = \\frac{4}{3}\\pi r^3', display: 'V = (4/3)πr³', description: 'Sphere volume formula' },
  { latex: 'c^2 = a^2 + b^2 - 2ab\\cos C', display: 'c² = a² + b² - 2ab cosC', description: 'Cosine theorem' },
  
  // 特殊常数和公式
  { latex: 'e^{i\\pi} + 1 = 0', display: 'e^(iπ) + 1 = 0', description: 'Euler formula' },
  { latex: 'e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n', display: 'e = lim(n→∞)(1 + 1/n)ⁿ', description: 'Natural constant e' },
  { latex: '\\zeta(2) = \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', display: 'ζ(2) = ∑(1/n²) = π²/6', description: 'Basel problem' }
]

// 当前显示的符号
const currentSymbols = computed(() => {
  switch (activeCategory.value) {
    case SymbolCategory.BASIC:
      return basicSymbols
    case SymbolCategory.GREEK:
      return greekSymbols
    case SymbolCategory.ADVANCED:
      return advancedSymbols
    default:
      return basicSymbols
  }
})

// 响应式符号显示数组
const currentSymbolsWithSvg = ref<Array<{latex: string, display: string, description: string}>>([])

// 响应式常用公式示例显示数组
const formulaExamplesWithSvg = ref<Array<{latex: string, display: string, description: string}>>([])

// 生成符号的SVG显示
const generateSymbolSvg = async (latex: string): Promise<string> => {
  // 检查缓存
  if (symbolDisplayCache.value.has(latex)) {
    return symbolDisplayCache.value.get(latex)!
  }
  
  try {
    if (window.MathJax && window.MathJax.tex2svgPromise) {
      const svg = await window.MathJax.tex2svgPromise(latex, {
        display: false, // 使用行内模式，适合按钮显示
        scale: 1.0,
        em: 14,
        ex: 7,
        containerWidth: 400
      });
      
      const svgElement = svg.getElementsByTagName('svg')[0];
      if (svgElement) {
        // 设置SVG样式以适应按钮
        svgElement.style.fontSize = '16px';
        svgElement.style.verticalAlign = 'middle';
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        
        const svgHtml = svgElement.outerHTML;
        // 缓存结果
        symbolDisplayCache.value.set(latex, svgHtml);
        return svgHtml;
      }
    }
  } catch (error) {
    console.warn('Symbol SVG generation failed for:', latex, error);
  }
  
  // 回退到原始LaTeX代码
  return latex;
}

// 生成常用公式示例的SVG显示
const generateExampleSvg = async (latex: string): Promise<string> => {
  // 检查缓存
  if (symbolDisplayCache.value.has(`example_${latex}`)) {
    return symbolDisplayCache.value.get(`example_${latex}`)!
  }
  
  try {
    if (window.MathJax && window.MathJax.tex2svgPromise) {
      const svg = await window.MathJax.tex2svgPromise(latex, {
        display: false, // 使用行内模式，适合示例显示
        scale: 1.1,
        em: 16,
        ex: 8,
        containerWidth: 600
      });
      
      const svgElement = svg.getElementsByTagName('svg')[0];
      if (svgElement) {
        // 设置SVG样式以适应示例按钮
        svgElement.style.fontSize = '18px';
        svgElement.style.verticalAlign = 'middle';
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.color = 'inherit';
        
        const svgHtml = svgElement.outerHTML;
        // 缓存结果，使用不同的键名避免冲突
        symbolDisplayCache.value.set(`example_${latex}`, svgHtml);
        return svgHtml;
      }
    }
  } catch (error) {
    console.warn('Example SVG generation failed for:', latex, error);
  }
  
  // 回退到原始LaTeX代码
  return latex;
}

// 更新符号显示
const updateSymbolsDisplay = async () => {
  const symbols = currentSymbols.value;
  const symbolsWithSvg = [];
  
  for (const symbol of symbols) {
    const svgDisplay = await generateSymbolSvg(symbol.latex);
    symbolsWithSvg.push({
      ...symbol,
      display: svgDisplay
    });
  }
  
  currentSymbolsWithSvg.value = symbolsWithSvg;
}

// 更新常用公式示例显示
const updateFormulaExamplesDisplay = async () => {
  const examplesWithSvg = [];
  
  for (const example of formulaExamples) {
    const svgDisplay = await generateExampleSvg(example.latex);
    examplesWithSvg.push({
      ...example,
      display: svgDisplay
    });
  }
  
  formulaExamplesWithSvg.value = examplesWithSvg;
}

// 监听分类变化，更新符号显示
watch(activeCategory, () => {
  updateSymbolsDisplay();
  // 当切换到基础分类时，也更新常用公式示例
  if (activeCategory.value === SymbolCategory.BASIC) {
    updateFormulaExamplesDisplay();
  }
}, { immediate: true })

// 插入符号
const insertSymbol = (latex: string) => {
  latexInput.value += latex;
  updatePreview();
}

// 清空输入
const clearInput = () => {
  latexInput.value = '';
  updatePreview();
}

// 更新预览
const updatePreview = async () => {
  if (!latexInput.value.trim()) {
    renderedFormula.value = '';
    return;
  }
  
  try {
    // 使用MathJax将LaTeX转换为SVG
    if (window.MathJax && window.MathJax.tex2svgPromise) {
      const svg = await window.MathJax.tex2svgPromise(latexInput.value, {
        display: true, // 使用display模式获得更好的显示效果
        scale: 1.2, // 增加缩放比例
        em: 16, // 设置em单位大小
        ex: 8, // 设置ex单位大小
        containerWidth: 800 // 设置容器宽度
      });
      
      // 获取SVG元素
      const svgElement = svg.getElementsByTagName('svg')[0];
      if (svgElement) {
        // 设置SVG样式以适应预览容器
        svgElement.style.fontSize = '20px';
        svgElement.style.color = '#2d3748';
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        
        renderedFormula.value = svgElement.outerHTML;
      } else {
        // 如果没有SVG，回退到LaTeX显示
        renderedFormula.value = latexInput.value;
      }
    } else {
      // MathJax未加载，显示LaTeX原始代码
      renderedFormula.value = latexInput.value;
    }
  } catch (error) {
    console.error('Formula rendering error:', error);
    // 出错时显示LaTeX原始代码
    renderedFormula.value = latexInput.value;
  }
}

// 处理关闭
const handleClose = () => {
  visible.value = false;
  // 清理编辑状态
  clearEditingState();
}

// 处理插入
const handleInsert = () => {
  emit('insert', latexInput.value);
  handleClose();
}

// 清理编辑状态
const clearEditingState = () => {
  // 移除所有正在编辑的公式的高亮状态
  const editingFormulas = document.querySelectorAll('.math-formula.editing')
  editingFormulas.forEach(formula => {
    formula.classList.remove('editing');
  });
}

// 计算对话框标题
const dialogTitle = computed(() => {
  return 'Equation Editor'
})

// 确保MathJax可用
const initializeMathJax = () => {
  // 如果MathJax还没有加载，等待一段时间再试
  if (!window.MathJax) {
    setTimeout(initializeMathJax, 100);
    return;
  }
  updatePreview();
  updateSymbolsDisplay();
  updateFormulaExamplesDisplay();
}

onMounted(() => {
  initializeMathJax();
})
</script>

<style lang="scss" scoped>
.formula-editor-dialog {
  max-width: 1000px;
}

.formula-editor-dialog :deep(.el-overlay-dialog) {
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.formula-editor-dialog :deep(.el-dialog__wrapper) {
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.formula-editor-dialog :deep(.el-dialog) {
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden !important;
  backdrop-filter: blur(10px);
  height: 90vh !important;
  max-height: 90vh !important;
  margin: 0 !important;
  top: 5vh !important;
  transform: none !important;
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  left: 50% !important;
  margin-left: -500px !important;
}

.formula-editor-dialog :deep(.el-dialog__body) {
  flex: 1 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 0 !important;
}

.formula-editor-dialog :deep(.el-dialog__headerbtn) {
  top: 20px !important;
  right: 20px !important;
}

.formula-editor-dialog :deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white !important;
  font-size: 20px !important;
}

.formula-editor-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  padding: 24px 32px !important;
  color: white !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  position: relative;
  overflow: hidden;
  min-height: 80px !important;
  flex-shrink: 0 !important;
  z-index: 10 !important;
}

.formula-editor-dialog :deep(.el-dialog__header::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%);
  pointer-events: none;
  z-index: 0;
}

.formula-editor-dialog :deep(.el-dialog__title) {
  color: white !important;
  font-weight: 700 !important;
  font-size: 20px !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.formula-editor-dialog :deep(.el-dialog__close) {
  color: white;
  font-size: 20px;
  transition: all 0.2s ease;
}

.formula-editor-dialog :deep(.el-dialog__close:hover) {
  transform: scale(1.1);
  color: rgba(255, 255, 255, 0.8);
}

.formula-editor-dialog :deep(.el-dialog__body) {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  flex: 1 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 0 !important;
}

:deep(.el-dialog__footer) {
  padding-top: 0 !important;
  flex-shrink: 0 !important;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 10;
  width: 100%;
}

.header-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--el-color-primary), #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
}

.header-icon i {
  color: white !important;
  font-size: 24px !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.header-content {
  flex: 1;
}

.header-content h3 {
  margin: 0 !important;
  font-size: 24px !important;
  color: #1a202c;
  /* background: linear-gradient(135deg, #667eea, #764ba2); */
  font-weight: 500 !important;
  /* text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important; */
  position: relative;
  z-index: 1;
}

.header-content p {
  margin: 4px 0 0 0 !important;
  font-size: 14px !important;
  color: #718096;
  /* text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important; */
  position: relative;
  z-index: 1;
}

.header-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
}

.header-badge span {
  color: white !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
}

.editor-container {
  padding: 8px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  height: 100%;
  overflow-y: visible;
}

.input-section,
.preview-section,
.symbols-section {
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); */
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f5f9;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: #1a202c;
  font-size: 16px;
}

.section-title i {
  color: var(--el-color-primary);
  font-size: 18px;
}

.input-actions {
  cursor: pointer;
  color: var(--el-color-danger);
  display: flex;
  gap: 8px;
}

.input-wrapper {
  position: relative;
}

.latex-input {
  width: 100%;
}

.latex-input :deep(.el-input__wrapper) {
  height: 56px;
  border-radius: 12px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); */
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.latex-input :deep(.el-input__wrapper::before) {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s ease;
}

.latex-input :deep(.el-input__wrapper:focus-within) {
  border-color: var(--el-color-primary);
  /* box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15), 0 8px 25px rgba(102, 126, 234, 0.1); */
  transform: translateY(-2px);
}

.latex-input :deep(.el-input__wrapper:focus-within::before) {
  left: 100%;
}

.latex-input :deep(.el-input__inner) {
  font-size: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #2d3748;
  font-weight: 500;
}

.input-icon {
  color: var(--el-color-primary);
  font-size: 16px;
}

.preview-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
}

.preview-status.active {
  color: var(--el-color-primary);
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--el-color-primary);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.preview-container {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  min-height: 100px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  overflow-x: auto;
}

.preview-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--el-color-primary), transparent);
  border-radius: 12px 12px 0 0;
}

.formula-preview {
  font-size: 24px;
  color: #2d3748;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
  max-width: 100%;
  overflow-x: auto;
}

.no-formula {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #718096;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
}

.no-formula i {
  font-size: 32px;
  color: #a0aec0;
}

/* SVG数学表达式样式优化 */
.formula-preview :deep(svg),
.example-preview :deep(svg),
.symbol-button :deep(svg) {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

.example-preview :deep(svg) {
  color: inherit;
  fill: currentColor;
}

.example-button:hover .example-preview :deep(svg) {
  color: white;
  fill: white;
}

.category-tabs {
  display: flex;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 12px;
  padding: 6px;
  /* box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); */
  border: 1px solid #e2e8f0;
}

.tab-button {
  flex: 1;
  padding: 16px 24px;
  border: none;
  background: none;
  color: #4a5568;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.tab-button:hover::before {
  left: 100%;
}

.tab-button:hover {
  color: var(--el-color-primary);
  background: rgba(102, 126, 234, 0.08);
  transform: translateY(-1px);
}

.tab-button.active {
  color: white;
  background: linear-gradient(135deg, var(--el-color-primary), #764ba2);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.tab-button i {
  font-size: 16px;
}

.scrollable-content {
  max-height: 450px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.symbols-panel {
  margin-bottom: 16px;
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 8px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  box-shadow: none;
}

.symbol-button {
  min-width: 50px;
  width: auto;
  height: 50px;
  padding: 2px;
  border-radius: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  white-space: nowrap;
  color: #2d3748;
}

.symbol-button:hover {
  border-color: var(--el-color-primary);
  transform: translateY(-2px) scale(1.02);
  /* box-shadow: 0 8px 25px rgba(102, 126, 234, 0.25); */
  background: linear-gradient(135deg, var(--el-color-primary), #764ba2);
  color: white;
  /* text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); */
}

.symbol-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-success));
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.symbol-button span {
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;
}

.symbol-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25);
}

.formula-examples {
  margin-top: 0;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
}

.example-button {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--el-color-primary), #764ba2);
  transition: left 0.3s ease;
  z-index: 0;
}

.example-button:hover::before {
  left: 0;
}

.example-button:hover {
  border-color: var(--el-color-primary);
  transform: translateY(-2px);
}

.example-preview {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
  color: #4a5568;
  transition: color 0.3s ease;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
}

.example-description {
  position: relative;
  z-index: 1;
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
  transition: color 0.3s ease;
}

.example-button:hover .example-preview,
.example-button:hover .example-description {
  color: white;
}



.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  flex-shrink: 0 !important;
  z-index: 10 !important;
}

.dialog-footer :deep(.el-button) {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.dialog-footer :deep(.el-button:not(.el-button--primary)) {
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.dialog-footer :deep(.el-button:not(.el-button--primary):hover) {
  border-color: #cbd5e0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dialog-footer :deep(.el-button--primary) {
  background: var(--el-color-primary);
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  color: white;
}

.dialog-footer :deep(.el-button--primary:hover) {
  background: var(--el-color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.dialog-footer :deep(.el-button--primary:disabled) {
  background: #e2e8f0;
  color: #a0aec0;
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
}

/* 滚动条样式 */
.formula-editor-dialog :deep(.el-dialog__body)::-webkit-scrollbar,
.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.formula-editor-dialog :deep(.el-dialog__body)::-webkit-scrollbar-track,
.scrollable-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.formula-editor-dialog :deep(.el-dialog__body)::-webkit-scrollbar-thumb,
.scrollable-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #cbd5e0, #a0aec0);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.formula-editor-dialog :deep(.el-dialog__body)::-webkit-scrollbar-thumb:hover,
.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #a0aec0, #718096);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .formula-editor-dialog {
    max-width: 95vw;
  }
  
  .formula-editor-dialog :deep(.el-dialog) {
    height: 85vh !important;
    max-height: 85vh !important;
    top: 7.5vh !important;
    margin: 0 !important;
    left: 50% !important;
    margin-left: -47.5vw !important;
    width: 95vw !important;
  }
  
  .scrollable-content {
    max-height: 350px;
    padding: 6px;
  }
  
  .symbols-grid {
    grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
    gap: 6px;
    padding: 8px;
  }
  
  .symbol-button {
    min-width: 42px;
    height: 42px;
    font-size: 14px;
    padding: 2px 6px;
  }
  
  .examples-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
    padding: 6px;
  }
  
  .example-button {
    padding: 8px 12px;
    gap: 8px;
  }
  
  .example-preview {
    font-size: 16px;
    min-height: 20px;
  }
  
  .example-description {
    font-size: 12px;
  }
  
  .category-tabs {
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .tab-button {
    padding: 10px 16px;
    min-width: 80px;
  }
  
  .formula-preview {
    font-size: 18px;
  }
  
  .preview-container {
    padding: 16px;
    min-height: 70px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes symbolPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.symbols-grid {
  animation: fadeInUp 0.3s ease;
}

.examples-grid {
  animation: fadeInUp 0.3s ease 0.1s both;
}

.symbol-button:active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: rgba(var(--el-color-primary-rgb), 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
}

/* 悬停时的高亮边框动画 */
.symbol-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  border-radius: 10px;
  background: linear-gradient(45deg, var(--el-color-primary), #764ba2, var(--el-color-primary), #764ba2) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.symbol-button:hover::after {
  opacity: 1;
}

/* 深色模式支持 */
/* @media (prefers-color-scheme: dark) {
  .formula-editor-dialog :deep(.el-dialog__body) {
    background: #1a202c;
    color: #e2e8f0;
  }
  
  .preview-container {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    border-color: #4a5568;
  }
  
  .symbols-grid {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    border-color: #4a5568;
  }
  
  .symbol-button {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
  
  .example-button {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
} */

.sqrt-wrapper {
  display: inline-block;
  position: relative;
  margin: 0 2px;
  vertical-align: middle;
  font-family: 'Times New Roman', serif;
}
.sqrt-radical {
  font-size: 1.4em;
  vertical-align: top;
  position: relative;
  top: 3px;
  left: -4px;
  font-weight: normal;
  line-height: 1;
}
.sqrt-content {
  border-top: 1.5px solid currentColor;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 3px;
  display: inline-block;
  position: relative;
  margin-left: -2px;
}
.sqrt-content::before {
  content: '';
  position: absolute;
  left: -3px;
  top: -1.5px;
  width: 3px;
  height: 1.5px;
  background: currentColor;
  transform: skewX(-45deg);
  transform-origin: bottom right;
}
.sqrt-index {
  font-size: 0.7em;
  vertical-align: top;
  margin-right: -0.2em;
}
</style>