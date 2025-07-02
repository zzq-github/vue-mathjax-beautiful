<template>
  <footer class="bg-gray-900 text-white py-8 sm:py-12">
    <div class="container mx-auto px-4">
      <!-- 移动端优化的网格布局 -->
      <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <!-- 主要信息区域 -->
        <div class="sm:col-span-2 lg:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"
            >
              <CalculatorIcon class="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-base sm:text-lg font-bold">{{ t('page.title') }}</h3>
              <p class="text-xs sm:text-sm text-gray-400">{{ t('page.subtitle') }}</p>
            </div>
          </div>
          <p class="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- 资源链接 -->
        <div class="order-1 sm:order-none">
          <h4 class="font-semibold mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
            <div class="w-1 h-4 bg-blue-500 rounded mr-2"></div>
            {{ t('footer.resources') }}
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-400">
            <li>
              <a href="#docs" class="hover:text-white transition-colors flex items-center py-1">
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.documentation') }}
              </a>
            </li>
            <li>
              <a
                href="#examples"
                class="hover:text-white transition-colors flex items-center py-1"
              >
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.examples') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.apiReference') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.changelog') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 社区链接 -->
        <div class="order-2 sm:order-none">
          <h4 class="font-semibold mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
            <div class="w-1 h-4 bg-purple-500 rounded mr-2"></div>
            {{ t('footer.community') }}
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                <GithubIcon class="w-3 h-3 mr-2 flex-shrink-0" />
                {{ t('footer.github') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.issues') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.discussions') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                {{ t('footer.contributing') }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0"
        >
          <p class="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            {{ t('footer.copyright') }}
          </p>
          <div class="flex justify-center sm:justify-end space-x-4 sm:space-x-6">
            <a
              href="#"
              class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >{{ t('footer.privacy') }}</a
            >
            <a
              href="#"
              class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >{{ t('footer.terms') }}</a
            >
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
</script> 