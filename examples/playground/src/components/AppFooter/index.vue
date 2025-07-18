<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-12 sm:py-16 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div class="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/3 dark:bg-blue-500/8 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/3 dark:bg-purple-500/8 rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <!-- 主要内容区域 -->
      <div class="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <!-- 主要信息区域 -->
        <div class="sm:col-span-2 lg:col-span-2">
          <div class="flex items-center space-x-4 mb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg">
              <CalculatorIcon class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('page.title') }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('page.subtitle') }}</p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 max-w-lg leading-relaxed mb-6">
            {{ t('footer.description') }}
          </p>
          <!-- 技术栈标签 -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in techStack" :key="tech" 
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 font-medium">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- 资源链接 -->
        <div>
          <h4 class="font-semibold mb-6 text-lg text-gray-900 dark:text-white flex items-center">
            <div class="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
            {{ t('footer.resources') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/docs" 
                          class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <div class="w-2 h-2 bg-blue-500/60 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.documentation') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/demo" 
                          class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <div class="w-2 h-2 bg-blue-500/60 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.examples') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/config" 
                          class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <div class="w-2 h-2 bg-blue-500/60 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.apiReference') }}</span>
              </router-link>
            </li>
            <li>
              <a href="https://github.com/zzq-github/vue-mathjax-beautiful/releases" 
                 target="_blank"
                 class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <div class="w-2 h-2 bg-blue-500/60 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.changelog') }}</span>
                <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- 社区链接 -->
        <div>
          <h4 class="font-semibold mb-6 text-lg text-gray-900 dark:text-white flex items-center">
            <div class="w-1 h-5 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3"></div>
            {{ t('footer.community') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <a href="https://github.com/zzq-github/vue-mathjax-beautiful" 
                 target="_blank"
                 class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200">
                <GithubIcon class="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.github') }}</span>
                <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/zzq-github/vue-mathjax-beautiful/issues" 
                 target="_blank"
                 class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200">
                <div class="w-2 h-2 bg-purple-500/60 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.issues') }}</span>
                <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/zzq-github/vue-mathjax-beautiful/discussions" 
                 target="_blank"
                 class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200">
                <div class="w-2 h-2 bg-purple-500/60 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.discussions') }}</span>
                <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/zzq-github/vue-mathjax-beautiful/blob/main/CONTRIBUTING.md" 
                 target="_blank"
                 class="group flex items-center py-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200">
                <div class="w-2 h-2 bg-purple-500/60 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-200">{{ t('footer.contributing') }}</span>
                <svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="relative mb-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center">
          <div class="bg-white dark:bg-gray-900 px-6">
            <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="flex flex-col space-y-6 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
          <!-- 版权信息 -->
          <div class="flex flex-col space-y-2">
            <p class="text-gray-600 dark:text-gray-400 text-center sm:text-left text-sm">
              {{ t('footer.copyright') }}
            </p>
            <p class="text-gray-500 dark:text-gray-500 text-center sm:text-left text-xs">
              {{ t('footer.author') }}
            </p>
          </div>
          
          <!-- 爱心信息 -->
          <div class="flex justify-center sm:justify-start items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
            <span>{{ t('footer.madeWith') }}</span>
            <span class="text-red-500 animate-pulse">♥</span>
            <span>{{ t('footer.forVueCommunity') }}</span>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <!-- 法律链接 -->
          <div class="flex space-x-6">
            <a href="/privacy" 
               class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline">
              {{ t('footer.privacy') }}
            </a>
            <a href="/terms" 
               class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline">
              {{ t('footer.terms') }}
            </a>
          </div>
          
          <!-- 社交媒体链接 -->
          <div class="flex space-x-3">
            <a href="https://github.com/zzq-github/vue-mathjax-beautiful" 
               target="_blank"
               class="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
               title="GitHub">
              <GithubIcon class="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Calculator as CalculatorIcon, Github as GithubIcon } from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// 技术栈标签
const techStack = [
  'Vue 3',
  'TypeScript', 
  'MathJax',
  'LaTeX',
  'Tailwind CSS'
];
</script> 