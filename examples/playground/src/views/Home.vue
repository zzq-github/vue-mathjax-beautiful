<template>
  <div class="min-h-screen">
    <!-- 英雄区域 -->
    <HeroSection />
    
    <!-- 功能特性区域 -->
    <section class="relative overflow-hidden py-16 lg:py-24 min-h-screen flex items-center bg-gray-50 dark:bg-gray-900">
      <!-- 装饰性几何图形 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 浮动圆圈 -->
        <div class="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-xl animate-pulse" />
        <div class="absolute bottom-1/4 left-1/4 w-32 h-32 bg-emerald-100/20 dark:bg-emerald-900/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div class="absolute top-1/2 right-1/12 w-20 h-20 bg-cyan-100/20 dark:bg-cyan-900/20 rounded-full blur-md animate-pulse delay-500" />
        
        <!-- 数学符号装饰 -->
        <div class="absolute top-20 right-10 text-emerald-300/30 dark:text-emerald-400/30 text-6xl font-bold select-none -rotate-12">∂</div>
        <div class="absolute bottom-20 left-10 text-cyan-300/30 dark:text-cyan-400/30 text-5xl font-bold select-none rotate-12">∇</div>
        <div class="absolute top-1/3 left-20 text-teal-300/30 dark:text-teal-400/30 text-4xl font-bold select-none -rotate-45">∞</div>
        <div class="absolute bottom-1/3 right-20 text-emerald-200/30 dark:text-emerald-300/30 text-3xl font-bold select-none rotate-45">θ</div>
        
        <!-- 网格背景 -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div class="relative container mx-auto px-4 text-center z-10">
        <div class="mx-auto max-w-6xl">
          <!-- 标题区域 -->
          <div class="mb-12 animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 mb-6">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300">{{ t('home.sections.coreFeatures') }}</span>
            </div>
            
            <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
              {{ t('features.title') }}
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {{ t('features.description') }}
            </p>
          </div>
          
          <!-- 功能特性网格 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-400">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:border-gray-300/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
              :class="`feature-delay-${index}`"
            >
              <!-- 背景光效 -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-100/20 to-cyan-100/20 dark:from-emerald-900/20 dark:to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              <div class="relative z-10">
                <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">{{ feature.icon }}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {{ feature.title() }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {{ feature.description() }}
                </p>
              </div>
            </div>
          </div>

          <!-- 向下滚动提示 -->
          <div class="mt-16 animate-fade-in-up delay-1200">
            <div class="flex flex-col items-center gap-3">
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{{ t('home.quickStart.viewExamples') }}</span>
              <div class="flex flex-col items-center animate-bounce">
                <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始区域 -->
    <section class="relative overflow-hidden py-16 lg:py-24 min-h-screen flex items-center bg-white dark:bg-gray-800">
      <!-- 装饰性几何图形 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 浮动圆圈 -->
        <div class="absolute top-1/4 left-1/3 w-36 h-36 bg-orange-100/20 dark:bg-orange-900/20 rounded-full blur-xl animate-pulse" />
        <div class="absolute bottom-1/4 right-1/3 w-28 h-28 bg-red-100/20 dark:bg-red-900/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div class="absolute top-1/2 left-1/12 w-24 h-24 bg-pink-100/20 dark:bg-pink-900/20 rounded-full blur-md animate-pulse delay-500" />
        
        <!-- 数学符号装饰 -->
        <div class="absolute top-10 left-10 text-orange-300/30 dark:text-orange-400/30 text-6xl font-bold select-none rotate-12">Σ</div>
        <div class="absolute bottom-10 right-10 text-red-300/30 dark:text-red-400/30 text-5xl font-bold select-none -rotate-12">∫</div>
        <div class="absolute top-1/3 right-20 text-pink-300/30 dark:text-pink-400/30 text-4xl font-bold select-none rotate-45">π</div>
        <div class="absolute bottom-1/3 left-20 text-orange-200/30 dark:text-orange-300/30 text-3xl font-bold select-none -rotate-45">Δ</div>
        
        <!-- 网格背景 -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:55px_55px]" />
      </div>

      <div class="relative container mx-auto px-4 text-center z-10">
        <div class="mx-auto max-w-5xl">
          <!-- 标题区域 -->
          <div class="mb-14 animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 dark:bg-orange-900/80 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50 mb-6">
              <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span class="text-sm font-medium text-orange-700 dark:text-orange-300">{{ t('home.quickStart.badge') }}</span>
            </div>
            
            <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
              {{ t('hero.getStarted') }}
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {{ t('home.quickStart.description') }}
            </p>
          </div>
          
          <!-- 操作按钮组 -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-14 animate-fade-in-up delay-400">
            <router-link 
              to="/demo"
              class="group relative inline-flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 px-10 py-5 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[200px]"
            >
              <span class="mr-3 text-2xl">🎯</span>
              <span>{{ t('home.quickStart.tryDemo') }}</span>
            </router-link>
            
            <router-link 
              to="/docs"
              class="group inline-flex items-center justify-center rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-10 py-5 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <span class="mr-3 transition-transform group-hover:rotate-12 text-2xl">📖</span>
              <span>{{ t('home.quickStart.viewDocs') }}</span>
            </router-link>
            
            <a 
              href="https://github.com/zzq-github/vue-mathjax-beautiful" 
              target="_blank"
              class="group inline-flex items-center justify-center rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-10 py-5 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <svg class="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>{{ t('hero.viewSource') }}</span>
            </a>
          </div>

          <!-- 技术栈标签 -->
          <div class="animate-fade-in-up delay-600">
            <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg">{{ t('home.quickStart.supportedTech') }}</p>
            <div class="flex flex-wrap justify-center gap-4">
              <span
                v-for="(tech, index) in quickStartTechnologies"
                :key="tech"
                class="group relative inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 backdrop-blur-sm px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                :class="`tech-delay-${index}`"
              >
                <span class="relative z-10">{{ tech }}</span>
              </span>
            </div>
          </div>

          <!-- 向下滚动提示 -->
          <div class="mt-16 animate-fade-in-up delay-1200">
            <div class="flex flex-col items-center gap-3">
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{{ t('home.quickStart.viewExamples') }}</span>
              <div class="flex flex-col items-center animate-bounce">
                <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 示例展示 -->
    <section id="examples" class="relative overflow-hidden py-20 bg-gray-50 dark:bg-gray-900">
      <!-- 装饰性几何图形 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 浮动圆圈 -->
        <div class="absolute top-1/4 left-1/5 w-32 h-32 bg-indigo-100/20 dark:bg-indigo-900/20 rounded-full blur-xl animate-pulse" />
        <div class="absolute bottom-1/4 right-1/5 w-24 h-24 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div class="absolute top-1/2 right-1/12 w-20 h-20 bg-purple-100/20 dark:bg-purple-900/20 rounded-full blur-md animate-pulse delay-500" />
        
        <!-- 数学符号装饰 -->
        <div class="absolute top-10 right-10 text-indigo-300/30 dark:text-indigo-400/30 text-5xl font-bold select-none rotate-12">√</div>
        <div class="absolute bottom-10 left-10 text-blue-300/30 dark:text-blue-400/30 text-4xl font-bold select-none -rotate-12">∑</div>
        <div class="absolute top-1/3 left-20 text-purple-300/30 dark:text-purple-400/30 text-3xl font-bold select-none rotate-45">∞</div>
        <div class="absolute bottom-1/3 right-20 text-indigo-200/30 dark:text-indigo-300/30 text-3xl font-bold select-none -rotate-45">∴</div>
        
        <!-- 网格背景 -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div class="relative container mx-auto px-4 z-10">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/80 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 mb-6">
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{{ t('examples.title') }}</span>
          </div>
          
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
            :class="`cursor-pointer rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 ${
              activeExample === index
                ? 'ring-2 ring-indigo-400 border-indigo-300 dark:border-indigo-600'
                : 'border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50'
            }`"
            @click="loadExample(example.latex, index)"
          >
            <div class="text-center space-y-3">
              <span class="inline-flex items-center rounded-full bg-indigo-100/80 dark:bg-indigo-900/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-700/50">
                {{ example.category() }}
              </span>
              <div
                class="text-lg font-mono min-h-[40px] flex items-center justify-center text-gray-900 dark:text-white"
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
            class="inline-flex items-center px-8 py-4 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
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

// 快速开始技术栈
const quickStartTechnologies = ref([
  'Vue 3 Composition API',
  'TypeScript',
  'MathJax 3.x',
  'LaTeX',
  'ESM/CommonJS',
  'Vite/Webpack'
])

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
  // {
  //   icon: '📝',
  //   title: () => t('features.list.richTextEditing.title'),
  //   description: () => t('features.list.richTextEditing.description')
  // },
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

<style scoped>
/* 淡入向上动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up.delay-200 {
  animation-delay: 0.2s;
}

.animate-fade-in-up.delay-400 {
  animation-delay: 0.4s;
}

.animate-fade-in-up.delay-600 {
  animation-delay: 0.6s;
}

.animate-fade-in-up.delay-800 {
  animation-delay: 0.8s;
}

.animate-fade-in-up.delay-1000 {
  animation-delay: 1s;
}

.animate-fade-in-up.delay-1200 {
  animation-delay: 1.2s;
}

/* 向下箭头弹跳动画 */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* 功能特性动画延迟 */
.feature-delay-0 { animation-delay: 0.6s; }
.feature-delay-1 { animation-delay: 0.7s; }
.feature-delay-2 { animation-delay: 0.8s; }
.feature-delay-3 { animation-delay: 0.9s; }
.feature-delay-4 { animation-delay: 1.0s; }

/* 技术栈标签动画延迟 */
.tech-delay-0 { animation-delay: 0.8s; }
.tech-delay-1 { animation-delay: 0.9s; }
.tech-delay-2 { animation-delay: 1.0s; }
.tech-delay-3 { animation-delay: 1.1s; }
.tech-delay-4 { animation-delay: 1.2s; }
.tech-delay-5 { animation-delay: 1.3s; }

/* 脉动效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse.delay-500 {
  animation-delay: 0.5s;
}

.animate-pulse.delay-1000 {
  animation-delay: 1s;
}
</style> 