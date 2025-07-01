<template>
  <div
    id="app"
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
  >
    <!-- 头部导航 -->
    <AppHeader
      :is-dark="isDark"
      :show-language-menu="showLanguageMenu"
      :show-mobile-menu="showMobileMenu"
      @toggle-theme="toggleTheme"
      @toggle-language-menu="toggleLanguageMenu"
      @toggle-mobile-menu="toggleMobileMenu"
      @close-mobile-menu="closeMobileMenu"
    />

    <!-- 主要内容 -->
    <main class="main">
      <!-- 英雄区域 -->
      <HeroSection />

      <!-- 编辑器演示区域 -->
      <DemoSection
        :is-dark="isDark"
        v-model:rich-text-content="richTextContent"
        @formula-insert="handleFormulaInsert"
        @clear-content="clearContent"
        @load-sample="loadSample"
        @rich-text-change="handleRichTextChange"
        @editor-focus="handleFocus"
        @editor-blur="handleBlur"
      />

      <!-- 功能特性 -->
      <FeaturesSection />

      <!-- 示例展示 -->
      <ExamplesSection
        :examples="examples"
        :active-example="activeExample"
        @load-example="loadExample"
      />

      <!-- 使用文档 -->
      <DocsSection />
    </main>

    <!-- 返回顶部按钮 -->
    <BackToTop
      :show-back-to-top="showBackToTop"
      :scroll-progress="scrollProgress"
    />

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 导入国际化功能
import { useI18n } from './composables/useI18n';

// 导入核心组件
import {
  VueMathjaxEditor,
  VueMathjaxBeautiful,
  initMathJax,
  convertLatexToSvg,
} from 'vue-mathjax-beautiful';

// 导入模块化组件
import AppHeader from './components/AppHeader/index.vue';
import HeroSection from './components/HeroSection/index.vue';
import DemoSection from './components/DemoSection/index.vue';
import FeaturesSection from './components/FeaturesSection/index.vue';
import ExamplesSection from './components/ExamplesSection/index.vue';
import DocsSection from './components/DocsSection/index.vue';
import AppFooter from './components/AppFooter/index.vue';
import BackToTop from './components/BackToTop/index.vue';

// 国际化功能
const { t, currentLocale, availableLocales, changeLocale, toggleLocale } = useI18n();

// 响应式数据
const activeExample = ref(3);
const showBackToTop = ref(false);
const scrollY = ref(0);
const isDark = ref(false);
const showMobileMenu = ref(false);
const showLanguageMenu = ref(false);

// 响应式文档高度和窗口高度
const windowHeight = ref(0);
const documentHeight = ref(0);

// 计算滚动进度
const scrollProgress = computed(() => {
  const maxScroll = documentHeight.value - windowHeight.value;
  const progress = maxScroll > 0 ? (scrollY.value / maxScroll) * 125.6 : 0; // 125.6 是圆周长 (2 * π * 20)
  return `${progress} 125.6`;
});

// 示例内容（动态国际化）
const richTextContent = ref('');

// 初始化示例内容
const initSampleContent = () => {
  richTextContent.value = `${t('sampleContent.welcome')}

${t('sampleContent.intro')}

${t('sampleContent.mainFeatures')}

${t('sampleContent.richText')}
${t('sampleContent.mathFormulas')}
${t('sampleContent.realTimePreview')}

${t('sampleContent.mathExamples')}

${t('sampleContent.massEnergyFormula')}

${t('sampleContent.gaussianIntegral')}
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

${t('sampleContent.quadraticFormula')} $\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

${t('sampleContent.getStarted')}

${t('sampleContent.clickFormula')}`;
};

// 示例公式（国际化）
const examples = ref([
  {
    name: () => t('examples.formulas.massEnergy'),
    latex: 'E = mc^2',
    category: () => t('examples.categories.physics'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.quadratic'),
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    category: () => t('examples.categories.algebra'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.euler'),
    latex: 'e^{i\\pi} + 1 = 0',
    category: () => t('examples.categories.math'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.integral'),
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    category: () => t('examples.categories.calculus'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.infiniteSeries'),
    latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
    category: () => t('examples.categories.series'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.matrix'),
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    category: () => t('examples.categories.linearAlgebra'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.limit'),
    latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0',
    category: () => t('examples.categories.calculus'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
  {
    name: () => t('examples.formulas.trigonometric'),
    latex: '\\sin^2(x) + \\cos^2(x) = 1',
    category: () => t('examples.categories.trigonometry'),
    rendered: `<span class="text-gray-400 italic">${t('loading')}</span>`,
  },
]);

// 渲染示例公式
const renderExamples = async () => {
  console.log('开始渲染示例公式...');

  for (let i = 0; i < examples.value.length; i++) {
    const example = examples.value[i];
    try {
      console.log(`渲染示例 ${i + 1}:`, example.latex);

      // 检查MathJax是否已经初始化
      if (!window.MathJax?.tex2svgPromise) {
        console.warn('MathJax未初始化，等待初始化...');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!window.MathJax?.tex2svgPromise) {
          throw new Error('MathJax初始化超时');
        }
      }

      const svgHtml = await convertLatexToSvg(`$${example.latex}$`);
      example.rendered = svgHtml;
      console.log(`示例 ${i + 1} 渲染成功`);
    } catch (error) {
      console.warn('示例公式渲染失败:', example.latex, error);
      example.rendered = `<span class="text-sm font-mono text-red-500">${example.latex}</span>`;
    }

    // 添加小延迟避免过快渲染
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('所有示例公式渲染完成');
};

// 事件处理
function handleRichTextChange(value: string) {
  console.log('富文本内容变化:', value);
}

function handleFormulaInsert(latex: string) {
  console.log('插入公式:', latex);
  // 这里可以添加处理插入公式的逻辑，比如显示通知等
}

function handleFocus() {
  console.log('编辑器获得焦点');
}

function handleBlur() {
  console.log('编辑器失去焦点');
}

function loadExample(latex: string, index: number) {
  activeExample.value = index;
  console.log('加载示例:', latex);
  // 可以在这里添加将公式加载到编辑器的逻辑
}

// 语言切换相关功能
function toggleLanguageMenu() {
  showLanguageMenu.value = !showLanguageMenu.value;
}

// 更新示例文本
function updateExamplesText() {
  examples.value.forEach((example) => {
    if (example.rendered.includes('加载中') || example.rendered.includes('Loading')) {
      example.rendered = `<span class="text-gray-400 italic">${t('loading')}</span>`;
    } else if (example.rendered.includes('加载失败') || example.rendered.includes('Loading Failed')) {
      example.rendered = `<span class="text-sm font-mono text-red-500">${t('loadingFailed')}</span>`;
    }
  });
}

function clearContent() {
  richTextContent.value = '';
}

function loadSample() {
  initSampleContent();
}

// 更新尺寸信息
function updateDimensions() {
  windowHeight.value = window.innerHeight;
  documentHeight.value = document.documentElement.scrollHeight;
}

// 滚动事件处理
function handleScroll() {
  scrollY.value = window.scrollY;
  showBackToTop.value = window.scrollY > 300;
  // 更新文档尺寸（处理动态内容加载）
  updateDimensions();
}

// 主题切换功能 - 在亮色和暗色主题之间切换
function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  updateTheme();
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark', 'theme-dark');
    document.documentElement.classList.remove('theme-light');
  } else {
    document.documentElement.classList.remove('dark', 'theme-dark');
    document.documentElement.classList.add('theme-light');
  }
}

// 初始化主题
function initTheme() {
  // 检查本地存储的主题设置
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    isDark.value = false;
  } else if (savedTheme === 'dark') {
    isDark.value = true;
  } else {
    // 没有保存的主题，使用系统默认
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  updateTheme();
}

// 移动端菜单功能
function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

function closeMobileMenu() {
  showMobileMenu.value = false;
}

// 生命周期
onMounted(async () => {
  console.log('示例页面初始化，开始加载MathJax...');

  // 初始化主题
  initTheme();
  
  // 初始化示例内容
  initSampleContent();

  // 初始化尺寸信息
  updateDimensions();

  // 添加滚动事件监听器
  window.addEventListener('scroll', handleScroll);
  
  // 添加窗口大小改变监听器
  window.addEventListener('resize', updateDimensions);
  
  // 添加文档点击事件监听器，用于关闭语言菜单
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    // 检查点击是否在语言菜单或语言按钮内部
    if (showLanguageMenu.value && !target.closest('[data-language-menu]')) {
      showLanguageMenu.value = false;
    }
  });

  try {
    // 初始化MathJax
    await initMathJax();
    console.log('MathJax初始化完成');

    // 等待一段时间确保MathJax完全加载
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 检查MathJax是否真正可用
    if (window.MathJax?.tex2svgPromise) {
      console.log('MathJax tex2svgPromise 可用，开始渲染...');

      // 渲染示例公式
      await renderExamples();

      // 渲染完成后更新页面尺寸
      setTimeout(updateDimensions, 100);

      console.log('示例页面初始化完成');
    } else {
      console.error('MathJax初始化失败：tex2svgPromise不可用');
      // 设置错误状态
      examples.value.forEach((example) => {
        example.rendered = `<span class="text-sm font-mono text-red-500">${t('loadingFailed')}</span>`;
      });
    }
  } catch (error) {
    console.error('示例页面初始化失败:', error);
    // 设置错误状态
    examples.value.forEach((example) => {
      example.rendered = `<span class="text-sm font-mono text-red-500">${t('initializationFailed')}</span>`;
    });
  }
});

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateDimensions);
});
</script>

<style scoped>
/* 保持原有的响应式设计和动画效果 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .text-4xl {
    font-size: 2rem;
  }

  .text-6xl {
    font-size: 3rem;
  }

  .text-7xl {
    font-size: 4rem;
  }

  .hidden.md\\:flex {
    display: none;
  }

  /* 移动端卡片头部优化 */
  .card-header-mobile {
    padding: 1rem;
  }

  .card-header-mobile h3 {
    font-size: 1rem;
    line-height: 1.4;
  }

  .card-header-mobile p {
    font-size: 0.75rem;
    line-height: 1.3;
    margin-top: 0.25rem;
  }

  /* 移动端按钮优化 */
  .mobile-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-width: auto;
  }

  /* 移动端标签优化 */
  .mobile-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
  }

  /* 移动端卡片间距优化 */
  .demo-card {
    margin-bottom: 2rem;
  }

  /* 移动端文字换行优化 */
  .text-wrap-mobile {
    word-break: break-word;
    hyphens: auto;
  }

  /* 移动端编辑器高度调整 */
  .editor-mobile {
    min-height: 250px !important;
  }

  /* 移动端Footer优化 */
  footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  footer .container {
    padding-left: 0;
    padding-right: 0;
  }

  /* 移动端链接点击区域优化 */
  footer a {
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  /* 移动端标题间距优化 */
  footer h4 {
    margin-bottom: 0.75rem;
  }

  /* 移动端版权信息优化 */
  footer .border-t {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }

  /* 移动端触摸优化 */
  .touch-target {
    min-height: 44px;
    min-width: 44px;
  }

  /* 移动端资源链接优化 */
  .resource-link {
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .resource-link:active {
    transform: scale(0.98);
    background-color: rgba(59, 130, 246, 0.1);
  }

  /* 移动端网格间距优化 */
  @media (max-width: 640px) {
    .docs-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .resource-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 暗黑模式滚动条 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }

  ::-webkit-scrollbar-thumb {
    background: #4b5563;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
}

/* 手动暗黑模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* 代码块样式优化 */
.prose code {
  background-color: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

/* 暗黑模式代码块 */
.dark .prose code {
  background-color: #374151;
  color: #e5e7eb;
}

/* 数学公式样式 */
.math-formula {
  display: inline-block;
  margin: 0.25rem;
}

/* 加载动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
