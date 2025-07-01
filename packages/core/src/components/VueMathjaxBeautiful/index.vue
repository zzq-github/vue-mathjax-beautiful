<template>
  <!-- 内联模式 -->
  <div
    v-if="inlineMode"
    class="vue-mathjax-beautiful-inline"
    :class="{ 'theme-dark': internalTheme === 'dark', 'theme-light': internalTheme === 'light' }"
  >
    <!-- 编辑器内容 -->
    <div class="editor-container">
      <!-- 输入区域 -->
      <div class="input-section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">📝</span>
            <span>LaTeX 输入</span>
          </div>
          <div class="input-actions">
            <button 
              v-if="showThemeToggle"
              class="action-btn" 
              @click="toggleTheme" 
              :title="themeButtonTitle"
            >
              <span class="icon">{{ themeIcon }}</span>
            </button>
            <button 
              v-if="showClearButton && !readonly"
              class="action-btn" 
              @click="clearInput" 
              :title="clearButtonText"
            >
              <span class="icon">🗑️</span>
            </button>
          </div>
        </div>
        <div class="input-wrapper">
          <textarea
            v-model="latexInput"
            class="latex-input"
            :placeholder="placeholder"
            :readonly="readonly"
            :rows="rows"
            :maxlength="maxLength"
            @input="handleInput"
          ></textarea>
        </div>
      </div>

      <!-- 预览区域 -->
      <div v-if="showPreview" class="preview-section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">👁️</span>
            <span>实时预览</span>
          </div>
          <div class="preview-status" :class="{ active: latexInput }">
            <span v-if="latexInput" class="status-dot"></span>
            {{ latexInput ? '渲染中' : '无公式' }}
          </div>
        </div>
        <div class="preview-container">
          <div v-if="latexInput" class="formula-preview" v-html="renderedFormula"></div>
          <div v-else class="no-formula">
            <span class="icon">💡</span>
            <span>输入 LaTeX 公式以查看预览</span>
          </div>
        </div>
      </div>

      <!-- 符号面板 -->
      <div v-if="showSymbols" class="symbols-section">
        <!-- 分类标签 -->
        <div class="category-tabs">
          <button
            v-for="category in filteredCategories"
            :key="category.key"
            :class="['tab-button', { active: activeCategory === category.key }]"
            @click="activeCategory = category.key"
          >
            <span class="tab-icon">{{ category.icon }}</span>
            <span class="tab-name">{{ category.name }}</span>
          </button>
        </div>

        <!-- 符号内容 -->
        <div class="symbols-content">
          <!-- 符号网格 -->
          <div class="symbols-grid">
            <button
              v-for="symbol in currentSymbols"
              :key="symbol.latex"
              class="symbol-button"
              @click="insertSymbol(symbol.latex)"
              :title="symbol.description"
            >
              <span v-if="symbol.display" v-html="symbol.display"></span>
              <span v-else class="symbol-fallback">{{ symbol.latex }}</span>
            </button>
          </div>

          <!-- 常用公式示例 -->
          <div v-if="activeCategory === 'basic'" class="formula-examples">
            <div class="examples-header">
              <span class="icon">⭐</span>
              <span>常用公式</span>
            </div>
            <div class="examples-grid">
              <button
                v-for="example in reactiveFormulaExamples"
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

      <!-- 底部操作（内联模式） -->
      <div class="inline-footer">
        <button 
          v-if="showClearButton && !readonly"
          class="btn btn-secondary" 
          @click="clearInput"
        >
          {{ clearButtonText }}
        </button>
        <button 
          class="btn btn-primary" 
          @click="handleInsert" 
          :disabled="!latexInput || readonly"
        >
          {{ insertButtonText }}
        </button>
      </div>
    </div>
  </div>

  <!-- 弹窗模式 -->
  <div
    v-else-if="visible"
    class="vue-mathjax-beautiful-overlay"
    :class="{ 'theme-dark': internalTheme === 'dark', 'theme-light': internalTheme === 'light' }"
    @click="handleOverlayClick"
  >
    <div
      class="vue-mathjax-beautiful-dialog"
      :class="{ 'theme-dark': internalTheme === 'dark', 'theme-light': internalTheme === 'light' }"
      :style="dialogStyle"
      @click.stop
    >
      <!-- 头部 -->
      <div class="dialog-header">
        <div class="header-content">
          <div class="header-icon">
            <span class="icon">📐</span>
          </div>
          <div class="header-text">
            <h3 class="header-title">{{ title }}</h3>
            <p class="header-subtitle">{{ subtitle }}</p>
          </div>
          <div class="header-badge">
            <span>LaTeX</span>
          </div>
        </div>
        <button class="close-btn" @click="handleClose">
          <span>×</span>
        </button>
      </div>

      <!-- 编辑器内容 -->
      <div class="editor-container">
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="section-header">
            <div class="section-title">
              <span class="icon">📝</span>
              <span>LaTeX 输入</span>
            </div>
            <div class="input-actions">
              <button 
                v-if="showThemeToggle"
                class="action-btn" 
                @click="toggleTheme" 
                :title="themeButtonTitle"
              >
                <span class="icon">{{ themeIcon }}</span>
              </button>
              <button 
                v-if="showClearButton && !readonly"
                class="action-btn" 
                @click="clearInput" 
                :title="clearButtonText"
              >
                <span class="icon">🗑️</span>
              </button>
            </div>
          </div>
          <div class="input-wrapper">
            <textarea
              v-model="latexInput"
              class="latex-input"
              :placeholder="placeholder"
              :readonly="readonly"
              :rows="rows"
              :maxlength="maxLength"
              @input="handleInput"
            ></textarea>
          </div>
        </div>

        <!-- 预览区域 -->
        <div v-if="showPreview" class="preview-section">
          <div class="section-header">
            <div class="section-title">
              <span class="icon">👁️</span>
              <span>实时预览</span>
            </div>
            <div class="preview-status" :class="{ active: latexInput }">
              <span v-if="latexInput" class="status-dot"></span>
              {{ latexInput ? '渲染中' : '无公式' }}
            </div>
          </div>
          <div class="preview-container">
            <div v-if="latexInput" class="formula-preview" v-html="renderedFormula"></div>
            <div v-else class="no-formula">
              <span class="icon">💡</span>
              <span>输入 LaTeX 公式以查看预览</span>
            </div>
          </div>
        </div>

        <!-- 符号面板 -->
        <div v-if="showSymbols" class="symbols-section">
          <!-- 分类标签 -->
          <div class="category-tabs">
            <button
              v-for="category in filteredCategories"
              :key="category.key"
              :class="['tab-button', { active: activeCategory === category.key }]"
              @click="activeCategory = category.key"
            >
              <span class="tab-icon">{{ category.icon }}</span>
              <span class="tab-name">{{ category.name }}</span>
            </button>
          </div>

          <!-- 符号内容 -->
          <div class="symbols-content">
            <!-- 符号网格 -->
            <div class="symbols-grid">
              <button
                v-for="symbol in currentSymbols"
                :key="symbol.latex"
                class="symbol-button"
                @click="insertSymbol(symbol.latex)"
                :title="symbol.description"
              >
                <span v-if="symbol.display" v-html="symbol.display"></span>
                <span v-else class="symbol-fallback">{{ symbol.latex }}</span>
              </button>
            </div>

            <!-- 常用公式示例 -->
            <div v-if="activeCategory === 'basic'" class="formula-examples">
              <div class="examples-header">
                <span class="icon">⭐</span>
                <span>常用公式</span>
              </div>
              <div class="examples-grid">
                <button
                  v-for="example in reactiveFormulaExamples"
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

      <!-- 底部操作（弹窗模式） -->
      <div class="dialog-footer">
        <button class="btn btn-secondary" @click="handleClose">{{ cancelButtonText }}</button>
        <button 
          class="btn btn-primary" 
          @click="handleInsert" 
          :disabled="!latexInput || readonly"
        >
          {{ insertButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { initMathJax } from '../../utils/latex';
import {
  type Symbol,
  type Category,
  basicSymbols,
  greekSymbols,
  advancedSymbols,
  formulaExamples,
  categories,
} from '../../data';

const props = withDefaults(
  defineProps<{
    // 基础控制
    modelValue?: boolean;
    existingLatex?: string;
    inlineMode?: boolean;
    
    // 主题和样式
    theme?: string;
    width?: string;
    height?: string;
    scale?: number;
    fontSize?: string;
    
    // 功能控制
    readonly?: boolean;
    showSymbols?: boolean;
    showPreview?: boolean;
    showThemeToggle?: boolean;
    showClearButton?: boolean;
    autoFocus?: boolean;
    
    // 输入控制
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    
    // 符号面板控制
    enabledCategories?: string[];
    defaultCategory?: string;
    
    // 按钮文本自定义
    insertButtonText?: string;
    cancelButtonText?: string;
    clearButtonText?: string;
    
    // 标题自定义
    title?: string;
    subtitle?: string;
  }>(),
  {
    modelValue: false,
    existingLatex: '',
    inlineMode: false,
    theme: 'light',
    width: 'auto',
    height: 'auto',
    scale: 1.2,
    fontSize: '16px',
    readonly: false,
    showSymbols: true,
    showPreview: true,
    showThemeToggle: true,
    showClearButton: true,
    autoFocus: true,
    placeholder: '输入 LaTeX 公式或点击下方符号...',
    maxLength: 1000,
    rows: 3,
    enabledCategories: () => ['basic', 'greek', 'advanced'],
    defaultCategory: 'basic',
    insertButtonText: '插入公式',
    cancelButtonText: '取消',
    clearButtonText: '清空',
    title: '数学公式编辑器',
    subtitle: '使用下方按钮或直接输入 LaTeX 代码',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  insert: [latex: string];
  change: [latex: string];
  clear: [];
  close: [];
  themeChange: [theme: string];
}>();

// 响应式数据
const visible = ref(false);
const latexInput = ref('');
const activeCategory = ref(props.defaultCategory);
const renderedFormula = ref('');
const symbolDisplayCache = new Map<string, string>();

// 组件内部主题状态（独立于外部传入的theme）
const internalTheme = ref(props.theme || 'light');

// 创建响应式的符号数据副本
const reactiveBasicSymbols = ref([...basicSymbols]);
const reactiveGreekSymbols = ref([...greekSymbols]);
const reactiveAdvancedSymbols = ref([...advancedSymbols]);
const reactiveFormulaExamples = ref([...formulaExamples]);

// 计算属性
const filteredCategories = computed(() => {
  return categories.filter(category => props.enabledCategories.includes(category.key));
});

const currentSymbols = computed(() => {
  switch (activeCategory.value) {
    case 'greek':
      return reactiveGreekSymbols.value;
    case 'advanced':
      return reactiveAdvancedSymbols.value;
    default:
      return reactiveBasicSymbols.value;
  }
});

// 弹窗样式计算属性
const dialogStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.width !== 'auto') {
    style.width = props.width;
  }
  if (props.height !== 'auto') {
    style.height = props.height;
  }
  return style;
});

// 主题相关计算属性
const themeIcon = computed(() => {
  return internalTheme.value === 'dark' ? '☀️' : '🌙';
});

const themeButtonTitle = computed(() => {
  return internalTheme.value === 'dark' ? '切换到亮色主题' : '切换到暗色主题';
});

// 监听器
watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
    if (newVal) {
      latexInput.value = props.existingLatex || '';
      updatePreview();
      focusInput();
    }
  }
);

watch(
  () => props.existingLatex,
  (newVal) => {
    if ((visible.value || props.inlineMode) && newVal) {
      latexInput.value = newVal;
      updatePreview();
    }
  }
);

// 监听内联模式变化
watch(
  () => props.inlineMode,
  (newVal) => {
    if (newVal) {
      // 内联模式激活时，确保符号已渲染
      nextTick(async () => {
        try {
          // 检查是否需要重新渲染符号
          const needsRender =
            reactiveBasicSymbols.value.some((symbol) => !symbol.display) ||
            reactiveGreekSymbols.value.some((symbol) => !symbol.display) ||
            reactiveAdvancedSymbols.value.some((symbol) => !symbol.display) ||
            reactiveFormulaExamples.value.some((example) => !example.display);

          if (needsRender && window.MathJax?.tex2svgPromise) {
            console.log('内联模式激活，开始渲染符号...');
            await Promise.all([renderAllSymbols(), renderFormulaExamples()]);
          }
        } catch (error) {
          console.error('内联模式符号渲染失败:', error);
        }
      });
    }
  },
  { immediate: true }
);

// 标记用户是否手动修改过主题
const hasUserChangedTheme = ref(false);

// 监听外部主题变化（仅在初始化时同步，之后组件内部独立控制）
watch(
  () => props.theme,
  (newTheme) => {
    // 只有在组件内部主题还没有被用户手动修改时才同步外部主题
    if (!hasUserChangedTheme.value) {
      internalTheme.value = newTheme;
    }
  },
  { immediate: true }
);

// 监听内部主题变化
watch(internalTheme, (newTheme, oldTheme) => {
  if (oldTheme !== undefined) {
    hasUserChangedTheme.value = true;
  }
  console.log('组件内部主题变化:', newTheme);
});

// 监听启用的分类变化，确保当前分类有效
watch(
  () => props.enabledCategories,
  (newCategories) => {
    if (!newCategories.includes(activeCategory.value)) {
      activeCategory.value = newCategories[0] || 'basic';
    }
  },
  { immediate: true }
);

// 方法
const handleOverlayClick = () => {
  handleClose();
};

const handleClose = () => {
  visible.value = false;
  emit('update:modelValue', false);
  emit('close');
  if (!props.readonly) {
    latexInput.value = '';
    renderedFormula.value = '';
  }
};

const clearInput = () => {
  if (props.readonly) return;
  latexInput.value = '';
  renderedFormula.value = '';
  emit('clear');
  emit('change', '');
};

const insertSymbol = (symbol: string) => {
  if (props.readonly) return;
  
  // 检查最大长度限制
  if (props.maxLength && (latexInput.value + symbol).length > props.maxLength) {
    console.warn('已达到最大输入长度限制');
    return;
  }
  
  const textarea = document.querySelector('.latex-input') as HTMLTextAreaElement;
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = latexInput.value;

    latexInput.value = currentValue.substring(0, start) + symbol + currentValue.substring(end);

    nextTick(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
      updatePreview();
    });
  } else {
    latexInput.value += symbol;
    updatePreview();
  }
};

const updatePreview = async () => {
  console.log('开始更新预览，输入内容:', latexInput.value);
  
  // 发出change事件
  emit('change', latexInput.value);

  if (!latexInput.value.trim()) {
    renderedFormula.value = '';
    return;
  }

  try {
    // 确保MathJax已经初始化
    if (!window.MathJax?.tex2svgPromise) {
      console.warn('MathJax未初始化，正在尝试初始化...');
      await initMathJax();
    }

    // 再次检查MathJax是否可用
    if (!window.MathJax?.tex2svgPromise) {
      console.error('MathJax初始化失败，无法预览公式');
      renderedFormula.value = '<span style="color: red;">MathJax未加载</span>';
      return;
    }

    console.log('开始渲染LaTeX:', latexInput.value);
    const result = await window.MathJax.tex2svgPromise(latexInput.value, {
      display: false,
      scale: props.scale,
    });

    console.log('MathJax渲染结果:', result);

    const svg = result.getElementsByTagName('svg')[0];
    if (svg) {
      svg.style.fontSize = props.fontSize;
      svg.style.verticalAlign = 'middle';
      renderedFormula.value = svg.outerHTML;
      console.log('预览更新成功，SVG HTML:', svg.outerHTML);
    } else {
      console.warn('未获取到SVG元素');
      renderedFormula.value = '<span style="color: red;">渲染失败</span>';
    }
  } catch (error) {
    console.error('LaTeX预览失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    renderedFormula.value = `<span style="color: red;">预览失败: ${errorMessage}</span>`;
  }
};

const handleInsert = () => {
  if (latexInput.value.trim()) {
    emit('insert', latexInput.value.trim());
    if (!props.inlineMode) {
      handleClose();
    }
  }
};

// 主题切换方法（仅影响当前组件）
const toggleTheme = () => {
  if (!props.showThemeToggle) return;
  const newTheme = internalTheme.value === 'dark' ? 'light' : 'dark';
  internalTheme.value = newTheme;
  emit('themeChange', newTheme);
};

// 处理输入变化
const handleInput = (event: Event) => {
  if (props.readonly) {
    event.preventDefault();
    return;
  }
  
  const target = event.target as HTMLTextAreaElement;
  let value = target.value;
  
  // 应用最大长度限制
  if (props.maxLength && value.length > props.maxLength) {
    value = value.substring(0, props.maxLength);
    target.value = value;
    latexInput.value = value;
  }
  
  updatePreview();
};

// 自动聚焦功能
const focusInput = () => {
  if (props.autoFocus) {
    nextTick(() => {
      const textarea = document.querySelector('.latex-input') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
      }
    });
  }
};

// 渲染符号
const renderSymbols = async (symbols: Symbol[]) => {
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    if (!symbol.display) {
      try {
        if (window.MathJax?.tex2svgPromise) {
          console.log(`渲染符号 ${i + 1}/${symbols.length}: ${symbol.latex}`);

          const result = await window.MathJax.tex2svgPromise(symbol.latex, {
            display: false,
            scale: 1.3,
            em: 16,
            ex: 8,
            containerWidth: 1280,
          });

          const svg = result.getElementsByTagName('svg')[0];
          if (svg) {
            // 提升SVG渲染质量
            svg.style.fontSize = '18px';
            svg.style.verticalAlign = 'middle';
            svg.style.maxWidth = '32px';
            svg.style.maxHeight = '32px';
            svg.style.width = 'auto';
            svg.style.height = 'auto';

            // 设置SVG属性以提高渲染质量
            svg.setAttribute('shape-rendering', 'geometricPrecision');
            svg.setAttribute('text-rendering', 'optimizeLegibility');

            symbol.display = svg.outerHTML;
            console.log(`符号 ${symbol.latex} 渲染成功`);
          } else {
            console.warn(`符号 ${symbol.latex} 未获取到SVG元素`);
            symbol.display = '';
          }
        }
      } catch (error) {
        console.warn(`符号 ${symbol.latex} 渲染失败:`, error);
        // 如果渲染失败，使用空字符串，让后备文本显示
        symbol.display = '';
      }

      // 添加小延迟避免过快渲染导致的问题
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
};

// 渲染所有符号
const renderAllSymbols = async () => {
  console.log('开始渲染所有符号...');

  // 检查MathJax是否可用
  if (!window.MathJax?.tex2svgPromise) {
    console.warn('MathJax不可用，跳过符号渲染');
    return;
  }

  try {
    // 串行渲染避免并发问题
    console.log('渲染基础符号...');
    await renderSymbols(reactiveBasicSymbols.value);

    console.log('渲染希腊字母...');
    await renderSymbols(reactiveGreekSymbols.value);

    console.log('渲染高级符号...');
    await renderSymbols(reactiveAdvancedSymbols.value);

    console.log('所有符号渲染完成');
  } catch (error) {
    console.error('符号渲染过程中出错:', error);
  }
};

// 渲染公式示例
const renderFormulaExamples = async () => {
  console.log('开始渲染公式示例...');

  if (!window.MathJax?.tex2svgPromise) {
    console.warn('MathJax不可用，跳过公式示例渲染');
    return;
  }

  for (let i = 0; i < reactiveFormulaExamples.value.length; i++) {
    const example = reactiveFormulaExamples.value[i];
    if (!example.display) {
      try {
        console.log(`渲染公式示例 ${i + 1}/${formulaExamples.length}: ${example.latex}`);

        const result = await window.MathJax.tex2svgPromise(example.latex, {
          display: false,
          scale: 1.0,
          em: 16,
          ex: 8,
          containerWidth: 1280,
        });

        const svg = result.getElementsByTagName('svg')[0];
        if (svg) {
          svg.style.fontSize = '16px';
          svg.style.maxWidth = '100%';
          svg.style.verticalAlign = 'middle';

          // 设置SVG属性以提高渲染质量
          svg.setAttribute('shape-rendering', 'geometricPrecision');
          svg.setAttribute('text-rendering', 'optimizeLegibility');

          example.display = svg.outerHTML;
          console.log(`公式示例 ${example.description} 渲染成功`);
        } else {
          console.warn(`公式示例 ${example.latex} 未获取到SVG元素`);
          example.display = '';
        }
      } catch (error) {
        console.warn(`公式示例 ${example.latex} 渲染失败:`, error);
        example.display = '';
      }

      // 添加小延迟
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  console.log('公式示例渲染完成');
};

// 生命周期
onMounted(async () => {
  console.log('VueMathjaxBeautiful组件挂载，开始初始化...');
  
  // 如果是内联模式或者弹窗已显示，则执行自动聚焦
  if (props.inlineMode || visible.value) {
    focusInput();
  }
  
  try {
    await initMathJax();
    console.log('MathJax初始化完成，开始渲染符号和公式示例...');

    // 等待一段时间确保MathJax完全就绪
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 并行渲染符号和公式示例
    await Promise.all([renderAllSymbols(), renderFormulaExamples()]);

    console.log('VueMathjaxBeautiful初始化完成');
  } catch (error) {
    console.error('VueMathjaxBeautiful初始化失败:', error);
  }
});
</script>

<style>
/* 所有样式已移至 packages/core/src/styles/index.scss 中统一管理 */
</style>
