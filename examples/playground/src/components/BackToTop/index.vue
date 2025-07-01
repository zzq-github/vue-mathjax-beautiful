<template>
  <Transition name="back-to-top">
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      :aria-label="t('backToTop')"
    >
      <svg
        class="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>

      <!-- 进度环 -->
      <svg class="absolute inset-0 h-12 w-12 -rotate-90 transform" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          stroke-width="2"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          stroke-width="2"
          stroke-linecap="round"
          :stroke-dasharray="scrollProgress"
          stroke-dashoffset="0"
          class="transition-all duration-150"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// Props
defineProps<{
  showBackToTop: boolean;
  scrollProgress: string;
}>();

// 返回顶部功能
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<style scoped>
/* 返回顶部按钮动画 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 返回顶部按钮悬停效果 */
button {
  backdrop-filter: blur(8px);
}

button:hover {
  backdrop-filter: blur(12px);
}

/* 进度环动画 */
button circle:last-child {
  transition: stroke-dasharray 0.2s ease-out;
}
</style> 