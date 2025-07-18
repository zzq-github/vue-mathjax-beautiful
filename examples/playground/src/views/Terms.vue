<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-orange-100/20 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-red-100/20 dark:bg-red-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-pink-100/20 dark:bg-pink-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-amber-100/20 dark:bg-amber-900/20 rounded-full blur-2xl animate-pulse delay-700" />
      
      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-orange-300/20 dark:text-orange-400/20 text-8xl font-bold select-none rotate-12">Σ</div>
      <div class="absolute bottom-32 right-20 text-red-300/20 dark:text-red-400/20 text-6xl font-bold select-none -rotate-12">∫</div>
      <div class="absolute top-1/3 right-10 text-pink-300/20 dark:text-pink-400/20 text-5xl font-bold select-none rotate-45">π</div>
      <div class="absolute bottom-1/3 left-20 text-amber-300/20 dark:text-amber-400/20 text-4xl font-bold select-none -rotate-45">Δ</div>
      <div class="absolute top-2/3 left-1/4 text-orange-200/20 dark:text-orange-300/20 text-3xl font-bold select-none rotate-12">θ</div>
      <div class="absolute top-1/4 right-1/3 text-red-200/20 dark:text-red-300/20 text-4xl font-bold select-none -rotate-12">∇</div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 页面头部 -->
    <div class="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="container mx-auto px-4 py-12">
        <div class="flex items-center space-x-4 mb-8">
          <router-link to="/" class="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="font-medium">{{ t('common.back') }}</span>
          </router-link>
        </div>
        
        <!-- 标题区域 -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 dark:bg-orange-900/80 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50 mb-6">
            <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span class="text-sm font-medium text-orange-700 dark:text-orange-300">{{ t('terms.badge') }}</span>
          </div>
          
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
            {{ t('terms.title') }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {{ t('terms.subtitle') }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">{{ t('terms.lastUpdated') }}</p>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 container mx-auto px-4 py-16">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl p-8 lg:p-12">
          <div class="space-y-12">
            <!-- 概述 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">📋</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.overview.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.overview.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('terms.sections.overview.content') }}
                </p>
              </div>
            </section>

            <!-- 产品描述 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.productDescription.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.productDescription.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('terms.sections.productDescription.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="feature in productFeatures" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </section>

            <!-- 许可条款 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-pink-100 dark:bg-pink-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">⚖️</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.licensing.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.licensing.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">{{ t('terms.sections.licensing.openSource.title') }}</h4>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {{ t('terms.sections.licensing.openSource.content') }}
                    </p>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">{{ t('terms.sections.licensing.permissions.title') }}</h4>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                      {{ t('terms.sections.licensing.permissions.description') }}
                    </p>
                    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                      <li v-for="item in permissionItems" :key="item">{{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- 用户责任 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-amber-100 dark:bg-amber-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">👤</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.userResponsibilities.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.userResponsibilities.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('terms.sections.userResponsibilities.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="responsibility in userResponsibilities" :key="responsibility">{{ responsibility }}</li>
                </ul>
              </div>
            </section>

            <!-- 禁止行为 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🚫</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.prohibitedActions.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.prohibitedActions.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('terms.sections.prohibitedActions.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="prohibition in prohibitedActions" :key="prohibition">{{ prohibition }}</li>
                </ul>
              </div>
            </section>

            <!-- 知识产权 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-violet-100 dark:bg-violet-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">💡</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.intellectualProperty.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.intellectualProperty.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">{{ t('terms.sections.intellectualProperty.productIP.title') }}</h4>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {{ t('terms.sections.intellectualProperty.productIP.content') }}
                    </p>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">{{ t('terms.sections.intellectualProperty.thirdParty.title') }}</h4>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {{ t('terms.sections.intellectualProperty.thirdParty.content') }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- 免责声明 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.disclaimer.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.disclaimer.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('terms.sections.disclaimer.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="disclaimer in disclaimerItems" :key="disclaimer">{{ disclaimer }}</li>
                </ul>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  {{ t('terms.sections.disclaimer.note') }}
                </p>
              </div>
            </section>

            <!-- 责任限制 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">📊</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.liabilityLimitation.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.liabilityLimitation.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('terms.sections.liabilityLimitation.content') }}
                </p>
              </div>
            </section>

            <!-- 服务变更 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-teal-100 dark:bg-teal-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.serviceChanges.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.serviceChanges.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('terms.sections.serviceChanges.content') }}
                </p>
              </div>
            </section>

            <!-- 条款更新 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">📝</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.termsUpdates.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.termsUpdates.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('terms.sections.termsUpdates.content') }}
                </p>
              </div>
            </section>

            <!-- 适用法律 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">⚖️</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.applicableLaw.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.applicableLaw.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('terms.sections.applicableLaw.content') }}
                </p>
              </div>
            </section>

            <!-- 联系我们 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">📞</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('terms.sections.contact.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('terms.sections.contact.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('terms.sections.contact.description') }}
                </p>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <p class="text-gray-700 dark:text-gray-300">
                    <strong>{{ t('terms.sections.contact.developer') }}：</strong>不讲道理的柯里昂<br>
                    <strong>{{ t('terms.sections.contact.github') }}：</strong><a href="https://github.com/zzq-github/vue-mathjax-beautiful" target="_blank" class="text-orange-600 dark:text-orange-400 hover:underline">https://github.com/zzq-github/vue-mathjax-beautiful</a><br>
                    <strong>{{ t('terms.sections.contact.issues') }}：</strong><a href="https://github.com/zzq-github/vue-mathjax-beautiful/issues" target="_blank" class="text-orange-600 dark:text-orange-400 hover:underline">https://github.com/zzq-github/vue-mathjax-beautiful/issues</a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

// 计算属性来处理数组数据
const productFeatures = computed(() => {
  const features = t('terms.sections.productDescription.features');
  return Array.isArray(features) ? features : [];
});

const permissionItems = computed(() => {
  const items = t('terms.sections.licensing.permissions.items');
  return Array.isArray(items) ? items : [];
});

const userResponsibilities = computed(() => {
  const responsibilities = t('terms.sections.userResponsibilities.responsibilities');
  return Array.isArray(responsibilities) ? responsibilities : [];
});

const prohibitedActions = computed(() => {
  const prohibitions = t('terms.sections.prohibitedActions.prohibitions');
  return Array.isArray(prohibitions) ? prohibitions : [];
});

const disclaimerItems = computed(() => {
  const disclaimers = t('terms.sections.disclaimer.disclaimers');
  return Array.isArray(disclaimers) ? disclaimers : [];
});
</script> 