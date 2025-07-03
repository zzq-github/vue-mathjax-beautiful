<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- 英雄区域 -->
    <HeroSection />
    
    <!-- 功能特性简介 -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('features.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ t('features.description') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, key) in features" :key="key" 
               class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">{{ feature.icon }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ feature.title() }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description() }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="relative overflow-hidden py-20">
      <!-- 多层背景设计 -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      
      <!-- 装饰性几何图形 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 浮动圆圈 -->
        <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div class="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-lg animate-pulse delay-1000" />
        <div class="absolute top-1/2 left-1/12 w-16 h-16 bg-pink-400/10 rounded-full blur-md animate-pulse delay-500" />
        
        <!-- 数学符号装饰 -->
        <div class="absolute top-10 left-10 text-white/10 text-4xl font-bold select-none rotate-12">∑</div>
        <div class="absolute bottom-10 right-10 text-white/10 text-3xl font-bold select-none -rotate-12">∫</div>
        <div class="absolute top-1/3 right-20 text-white/10 text-2xl font-bold select-none rotate-45">π</div>
        <div class="absolute bottom-1/3 left-20 text-white/10 text-xl font-bold select-none -rotate-45">α</div>
        
        <!-- 网格背景 -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div class="relative container mx-auto px-4 text-center z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
          {{ t('hero.getStarted') }}
        </h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          {{ t('home.quickStart.description') }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/demo"
            class="group relative inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[160px]"
          >
            <!-- 背景光效 -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-white to-blue-50 opacity-90 group-hover:opacity-100 transition-opacity" />
            <span class="mr-2 relative z-10">🎯</span>
            <span class="relative z-10">{{ t('home.quickStart.tryDemo') }}</span>
            <!-- 悬停时的装饰效果 -->
            <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
          </router-link>
          
          <router-link 
            to="/docs"
            class="group inline-flex items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 min-w-[160px]"
          >
            <span class="mr-2 transition-transform group-hover:rotate-12">📖</span>
            <span>{{ t('home.quickStart.viewDocs') }}</span>
          </router-link>
          
          <a 
            href="https://github.com/zzq-github/vue-mathjax-beautiful" 
            target="_blank"
            class="group inline-flex items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 min-w-[160px]"
          >
            <svg class="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>{{ t('hero.viewSource') }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 安装说明 -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {{ t('home.installation.title') }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-white dark:bg-gray-900 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">NPM</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code class="text-sm text-gray-800 dark:text-gray-200">npm install vue-mathjax-beautiful</code>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-900 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Yarn</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code class="text-sm text-gray-800 dark:text-gray-200">yarn add vue-mathjax-beautiful</code>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-900 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">PNPM</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code class="text-sm text-gray-800 dark:text-gray-200">pnpm add vue-mathjax-beautiful</code>
              </div>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-lg">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ t('home.installation.quickExample') }}
            </h3>
            
            <!-- 移动端简化版代码 -->
            <div class="md:hidden">
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">Template:</div>
                <code class="text-xs text-gray-800 dark:text-gray-200 break-all">
                  &lt;VueMathjaxBeautiful v-model="formula" /&gt;
                </code>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">Import:</div>
                <code class="text-xs text-gray-800 dark:text-gray-200 break-all">
                  import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful'<br/>
                  import 'vue-mathjax-beautiful/dist/style.css'
                </code>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">Script:</div>
                <code class="text-xs text-gray-800 dark:text-gray-200 break-all">
                  const formula = ref('E = mc^2')
                </code>
              </div>
            </div>
            
            <!-- 桌面端完整版代码 -->
            <div class="hidden md:block bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre"><code>&lt;template&gt;
  &lt;VueMathjaxBeautiful v-model="formula" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful'
import 'vue-mathjax-beautiful/dist/style.css'

const formula = ref('E = mc^2')
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 示例展示 -->
    <section id="examples" class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            {{ t('examples.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ t('examples.description') }}
          </p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <div
            v-for="(example, index) in examples"
            :key="example.name()"
            :class="`cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-800 p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              activeExample === index
                ? 'ring-2 ring-blue-500 border-blue-200 dark:border-blue-600'
                : 'border-gray-100 dark:border-gray-700'
            }`"
            @click="loadExample(example.latex, index)"
          >
            <div class="text-center space-y-3">
              <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                {{ example.category() }}
              </span>
              <div
                class="text-lg font-mono min-h-[40px] flex items-center justify-center dark:text-white"
                v-html="example.rendered"
              ></div>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                {{ example.name() }}
              </h4>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link 
            to="/demo"
            class="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span class="mr-2">🎯</span>
            {{ t('examples.tryInteractive') }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { initMathJax, convertLatexToSvg } from 'vue-mathjax-beautiful'
import HeroSection from '../components/HeroSection/index.vue'

const { t } = useI18n()

const activeExample = ref(3)

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
])

// 渲染示例公式
const renderExamples = async () => {

  for (let i = 0; i < examples.value.length; i++) {
    const example = examples.value[i]
    try {

      // 检查MathJax是否已经初始化
      if (!window.MathJax?.tex2svgPromise) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (!window.MathJax?.tex2svgPromise) {
          throw new Error('MathJax初始化超时')
        }
      }

      const svgHtml = await convertLatexToSvg(`$${example.latex}$`)
      example.rendered = svgHtml
    } catch (error) {
      example.rendered = `<span class="text-sm font-mono text-red-500">${example.latex}</span>`
    }

    // 添加小延迟避免过快渲染
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

}

function loadExample(latex: string, index: number) {
  activeExample.value = index
}

// 功能特性数据
const features = [
  {
    icon: '🎓',
    title: () => t('features.list.professionalEditor.title'),
    description: () => t('features.list.professionalEditor.description')
  },
  {
    icon: '🧩',
    title: () => t('features.list.richSymbols.title'),
    description: () => t('features.list.richSymbols.description')
  },
  {
    icon: '👁️',
    title: () => t('features.list.realTimePreview.title'),
    description: () => t('features.list.realTimePreview.description')
  },
  {
    icon: '📝',
    title: () => t('features.list.richTextEditing.title'),
    description: () => t('features.list.richTextEditing.description')
  },
  {
    icon: '📱',
    title: () => t('features.list.responsiveDesign.title'),
    description: () => t('features.list.responsiveDesign.description')
  },
  {
    icon: '⚙️',
    title: () => t('features.list.easyIntegration.title'),
    description: () => t('features.list.easyIntegration.description')
  }
]

onMounted(async () => {
  try {
    await initMathJax()
    
    // 等待一段时间确保MathJax完全加载
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 检查MathJax是否真正可用
    if (window.MathJax?.tex2svgPromise) {
      await renderExamples()
    } else {
      examples.value.forEach((example) => {
        example.rendered = `<span class="text-sm font-mono text-red-500">${t('loadingFailed')}</span>`
      })
    }
  } catch (error) {
    examples.value.forEach((example) => {
      example.rendered = `<span class="text-sm font-mono text-red-500">${t('initializationFailed')}</span>`
    })
  }
})
</script> 