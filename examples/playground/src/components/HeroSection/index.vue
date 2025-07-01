<template>
  <section class="relative overflow-hidden py-20 lg:py-32 min-h-[80vh] flex items-center">
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
      <div class="absolute top-20 left-10 text-white/10 text-6xl font-bold select-none rotate-12">∑</div>
      <div class="absolute bottom-20 right-10 text-white/10 text-5xl font-bold select-none -rotate-12">∫</div>
      <div class="absolute top-1/3 right-20 text-white/10 text-4xl font-bold select-none rotate-45">π</div>
      <div class="absolute bottom-1/3 left-20 text-white/10 text-3xl font-bold select-none -rotate-45">α</div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <div class="relative container mx-auto px-4 text-center z-10">
      <div class="mx-auto max-w-5xl">
        <!-- 标题区域 -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span class="text-sm font-medium text-white/90">{{ t('hero.badge') }}</span>
          </div>
          
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-tight">
            <span class="block mb-2 animate-fade-in-up">{{ t('hero.title') }}</span>
            <span class="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-up delay-200 drop-shadow-lg">
              {{ t('hero.titleHighlight') }}
            </span>
          </h1>
        </div>

        <!-- 描述文本 -->
        <div class="mb-10 animate-fade-in-up delay-400">
          <p class="text-lg leading-relaxed text-blue-100 sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light">
            {{ t('hero.description') }}
          </p>
          
          <!-- 特色亮点 -->
          <div class="mt-6 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>{{ t('hero.highlights.symbols') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span>{{ t('hero.highlights.templates') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <span>{{ t('hero.highlights.preview') }}</span>
            </div>
          </div>
        </div>

        <!-- 技术栈标签 -->
        <div class="mb-12 animate-fade-in-up delay-600">
          <div class="flex flex-wrap justify-center gap-3">
            <span
              v-for="(tech, index) in heroTechnologies"
              :key="tech"
              class="tech-tag group relative inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
              :class="`tech-delay-${index}`"
            >
              <span class="relative z-10">{{ tech }}</span>
              <!-- 悬停时的光晕效果 -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-1000">
          <button class="group relative inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[160px]">
            <!-- 背景光效 -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-white to-blue-50 opacity-90 group-hover:opacity-100 transition-opacity" />
            
            <ZapIcon class="mr-2 h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors relative z-10" />
            <span class="relative z-10">{{ t('hero.getStarted') }}</span>
            
            <!-- 悬停时的装饰效果 -->
            <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
          </button>
          
          <button class="group inline-flex items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 min-w-[160px]">
            <GithubIcon class="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>{{ t('hero.viewSource') }}</span>
          </button>
        </div>

        <!-- 向下滚动提示 -->
        <div class="mt-16 animate-fade-in-up delay-1200">
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs text-blue-200 font-medium uppercase tracking-wide">{{ t('hero.scrollHint') }}</span>
            <div class="flex flex-col items-center animate-bounce">
              <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Zap as ZapIcon, Github as GithubIcon } from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t, currentLocale } = useI18n();

// 添加技术栈数组的计算属性
const heroTechnologies = computed(() => {
  const zhTech = ['Vue 3', 'TypeScript', 'MathJax', 'LaTeX'];
  const enTech = ['Vue 3', 'TypeScript', 'MathJax', 'LaTeX'];
  return currentLocale.value.code === 'zh-CN' ? zhTech : enTech;
});
</script>

<style scoped>
/* 英雄区域动画 */
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

/* 技术栈标签动画延迟 */
.tech-delay-0 { animation-delay: 0.8s; }
.tech-delay-1 { animation-delay: 0.9s; }
.tech-delay-2 { animation-delay: 1.0s; }
.tech-delay-3 { animation-delay: 1.1s; }

/* 按钮悬停光晕效果 */
.group:hover .absolute.blur {
  animation: glow 0.3s ease-out forwards;
}

@keyframes glow {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 