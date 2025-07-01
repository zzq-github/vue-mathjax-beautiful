<template>
  <section id="features" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          {{ t('features.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {{ t('features.description') }}
        </p>
      </div>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
        >
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-20 h-20 opacity-10 dark:opacity-5 transition-opacity duration-300">
            <component :is="feature.icon" class="w-full h-full text-gray-400" />
          </div>
          
          <!-- 主要内容 -->
          <div class="relative z-10">
            <!-- 图标容器 -->
            <div class="flex items-center justify-center w-16 h-16 mb-6 mx-auto">
              <div
                :class="`relative flex items-center justify-center w-full h-full rounded-2xl ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`"
              >
                <component :is="feature.icon" class="w-8 h-8 text-white" />
                
                <!-- 发光效果 -->
                <div
                  :class="`absolute inset-0 rounded-2xl ${feature.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`"
                ></div>
              </div>
            </div>

            <!-- 标题 -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {{ feature.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-center text-sm transition-colors duration-300">
              {{ feature.description }}
            </p>
          </div>

          <!-- 悬停时的边框高亮 -->
          <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/20 transition-colors duration-300"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Calculator as CalculatorIcon,
  Edit3 as Edit3Icon,
  Eye as EyeIcon,
  Palette as PaletteIcon,
  Smartphone as SmartphoneIcon,
  Settings as SettingsIcon,
} from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// 功能特性数据（国际化）
const features = computed(() => [
  {
    icon: CalculatorIcon,
    title: t('features.list.professionalEditor.title'),
    description: t('features.list.professionalEditor.description'),
    color: 'bg-purple-500',
  },
  {
    icon: PaletteIcon,
    title: t('features.list.richSymbols.title'),
    description: t('features.list.richSymbols.description'),
    color: 'bg-pink-500',
  },
  {
    icon: EyeIcon,
    title: t('features.list.realTimePreview.title'),
    description: t('features.list.realTimePreview.description'),
    color: 'bg-green-500',
  },
  {
    icon: Edit3Icon,
    title: t('features.list.richTextEditing.title'),
    description: t('features.list.richTextEditing.description'),
    color: 'bg-blue-500',
  },
  {
    icon: SmartphoneIcon,
    title: t('features.list.responsiveDesign.title'),
    description: t('features.list.responsiveDesign.description'),
    color: 'bg-pink-500',
  },
  {
    icon: SettingsIcon,
    title: t('features.list.easyIntegration.title'),
    description: t('features.list.easyIntegration.description'),
    color: 'bg-indigo-500',
  },
]);
</script> 