<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300"
  >
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <div class="flex items-center space-x-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white"
        >
          <CalculatorIcon class="h-5 w-5" />
        </div>
        <div class="min-w-0 flex-1">
          <h1
            class="text-lg md:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 truncate"
          >
            <span class="hidden sm:inline">Vue MathJax Beautiful</span>
            <span class="sm:hidden">Vue MathJax</span>
          </h1>
          <p class="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300 hidden sm:block">
            {{ t('page.subtitle') }}
          </p>
        </div>
      </div>
      
      <!-- 桌面端导航 -->
      <nav class="hidden md:flex items-center space-x-8">
        <router-link
          to="/"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/' }"
        >{{ t('nav.home') }}</router-link>
        <router-link
          to="/demo"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/demo' }"
        >{{ t('nav.onlineDemo') }}</router-link>
        <router-link
          to="/config"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/config' }"
        >{{ t('nav.config') }}</router-link>
        <router-link
          to="/editor-config"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/editor-config' }"
        >{{ t('nav.editorConfig') }}</router-link>
        <router-link
          to="/docs"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/docs' }"
        >{{ t('nav.docs') }}</router-link>

        <!-- 语言切换器 -->
        <div class="relative" data-language-menu>
          <button
            @click="$emit('toggleLanguageMenu')"
            class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group flex items-center gap-1"
            :aria-label="t('nav.language')"
            :title="t('nav.language')"
          >
            <GlobeIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <!-- 语言下拉菜单 -->
          <Transition name="language-menu">
            <div
              v-if="showLanguageMenu"
              class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
              @click.stop
            >
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="handleLanguageChange(locale.code)"
                class="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
                :class="{
                  'bg-blue-50 dark:bg-blue-900/20 !text-blue-600 dark:!text-blue-300': locale.code === currentLocale.code
                }"
              >
                <span class="text-lg">{{ locale.flag }}</span>
                <span class="text-sm font-medium">{{ locale.name }}</span>
                <svg
                  v-if="locale.code === currentLocale.code"
                  class="w-4 h-4 ml-auto text-blue-600 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <!-- 主题切换按钮 -->
        <button
          @click="$emit('toggleTheme')"
          class="relative p-2 !ml-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
          :aria-label="isDark ? t('theme.dark') : t('theme.light')"
          :title="isDark ? t('theme.switchToLight') : t('theme.switchToDark')"
        >
          <div class="relative w-5 h-5">
            <!-- 太阳图标 -->
            <svg
              v-show="!isDark"
              class="absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- 月亮图标 -->
            <svg
              v-show="isDark"
              class="absolute inset-0 w-5 h-5 text-yellow-400 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
            </svg>
          </div>
        </button>
      </nav>

      <!-- 移动端导航 -->
      <div class="flex md:hidden items-center space-x-2">
        <!-- 语言切换器 -->
        <div class="relative" data-language-menu>
          <button
            @click="$emit('toggleLanguageMenu')"
            class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group flex items-center gap-1"
            :aria-label="t('nav.language')"
            :title="t('nav.language')"
          >
            <GlobeIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <!-- 移动端语言下拉菜单 -->
          <Transition name="language-menu">
            <div
              v-if="showLanguageMenu"
              class="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
              @click.stop
            >
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="handleLanguageChange(locale.code)"
                class="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-200"
                :class="{
                  'bg-blue-50 dark:bg-blue-900/20 !text-blue-600 dark:!text-blue-300': locale.code === currentLocale.code
                }"
              >
                <span>{{ locale.flag }}</span>
                <span class="text-sm font-medium">{{ locale.name }}</span>
                <svg
                  v-if="locale.code === currentLocale.code"
                  class="w-3 h-3 ml-auto text-blue-600 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <!-- 主题切换按钮 -->
        <button
          @click="$emit('toggleTheme')"
          class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
          :aria-label="isDark ? t('theme.dark') : t('theme.light')"
          :title="isDark ? t('theme.switchToLight') : t('theme.switchToDark')"
        >
          <div class="relative w-5 h-5">
            <!-- 太阳图标 -->
            <svg
              v-show="!isDark"
              class="absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- 月亮图标 -->
            <svg
              v-show="isDark"
              class="absolute inset-0 w-5 h-5 text-yellow-400 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
            </svg>
          </div>
        </button>

        <!-- 汉堡菜单按钮 -->
        <button
          @click="$emit('toggleMobileMenu')"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          :aria-label="t('nav.openMenu')"
        >
          <svg
            v-show="!showMobileMenu"
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-show="showMobileMenu"
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端菜单面板 -->
    <Transition name="mobile-menu">
      <div
        v-if="showMobileMenu"
        class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div class="container mx-auto px-4 py-4 space-y-3">
          <router-link
            to="/"
            @click="$emit('closeMobileMenu')"
            class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/' }"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/demo"
            @click="$emit('closeMobileMenu')"
            class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/demo' }"
          >
            {{ t('nav.onlineDemo') }}
          </router-link>
          <router-link
            to="/config"
            @click="$emit('closeMobileMenu')"
            class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/config' }"
          >
            {{ t('nav.config') }}
          </router-link>
          <router-link
            to="/editor-config"
            @click="$emit('closeMobileMenu')"
            class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/editor-config' }"
          >
            {{ t('nav.editorConfig') }}
          </router-link>
          <router-link
            to="/docs"
            @click="$emit('closeMobileMenu')"
            class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :class="{ '!text-blue-600 dark:!text-blue-400': $route.path === '/docs' }"
          >
            {{ t('nav.docs') }}
          </router-link>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Calculator as CalculatorIcon, Globe as GlobeIcon } from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t, currentLocale, availableLocales, changeLocale } = useI18n();

// Props
defineProps<{
  isDark: boolean;
  showLanguageMenu: boolean;
  showMobileMenu: boolean;
}>();

// Emits
defineEmits<{
  toggleTheme: [];
  toggleLanguageMenu: [];
  toggleMobileMenu: [];
  closeMobileMenu: [];
}>();

// 语言切换处理
const handleLanguageChange = (newLocale: string) => {
  changeLocale(newLocale);
};

// 点击外部关闭菜单的逻辑在父组件中处理
</script>

<style scoped>
/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 语言菜单动画 */
.language-menu-enter-active,
.language-menu-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.language-menu-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.language-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style> 