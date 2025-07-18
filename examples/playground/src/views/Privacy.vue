<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-teal-100/20 dark:bg-teal-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-emerald-100/20 dark:bg-emerald-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-cyan-100/20 dark:bg-cyan-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-green-100/20 dark:bg-green-900/20 rounded-full blur-2xl animate-pulse delay-700" />
      
      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-teal-300/20 dark:text-teal-400/20 text-8xl font-bold select-none rotate-12">∫</div>
      <div class="absolute bottom-32 right-20 text-emerald-300/20 dark:text-emerald-400/20 text-6xl font-bold select-none -rotate-12">∂</div>
      <div class="absolute top-1/3 right-10 text-cyan-300/20 dark:text-cyan-400/20 text-5xl font-bold select-none rotate-45">∑</div>
      <div class="absolute bottom-1/3 left-20 text-green-300/20 dark:text-green-400/20 text-4xl font-bold select-none -rotate-45">√</div>
      <div class="absolute top-2/3 left-1/4 text-teal-200/20 dark:text-teal-300/20 text-3xl font-bold select-none rotate-12">π</div>
      <div class="absolute top-1/4 right-1/3 text-emerald-200/20 dark:text-emerald-300/20 text-4xl font-bold select-none -rotate-12">Σ</div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 页面头部 -->
    <div class="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="container mx-auto px-4 py-12">
        <div class="flex items-center space-x-4 mb-8">
          <router-link to="/" class="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="font-medium">{{ t('common.back') }}</span>
          </router-link>
        </div>
        
        <!-- 标题区域 -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100/80 dark:bg-teal-900/80 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 mb-6">
            <div class="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span class="text-sm font-medium text-teal-700 dark:text-teal-300">{{ t('privacy.badge') }}</span>
          </div>
          
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
            {{ t('privacy.title') }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {{ t('privacy.subtitle') }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">{{ t('privacy.lastUpdated') }}</p>
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
                <div class="w-12 h-12 bg-teal-100 dark:bg-teal-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.overview.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.overview.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('privacy.sections.overview.content') }}
                </p>
              </div>
            </section>

            <!-- 信息收集 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">📊</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.dataCollection.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.dataCollection.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">{{ t('privacy.sections.dataCollection.autoCollected.title') }}</h4>
                    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                      <li v-for="item in autoCollectedItems" :key="item">{{ item }}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">{{ t('privacy.sections.dataCollection.userProvided.title') }}</h4>
                    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                      <li v-for="item in userProvidedItems" :key="item">{{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- 信息使用 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-cyan-100 dark:bg-cyan-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">⚙️</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.dataUsage.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.dataUsage.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('privacy.sections.dataUsage.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="purpose in dataUsagePurposes" :key="purpose">{{ purpose }}</li>
                </ul>
              </div>
            </section>

            <!-- 信息共享 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.dataSharing.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.dataSharing.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('privacy.sections.dataSharing.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="exception in dataSharingExceptions" :key="exception">{{ exception }}</li>
                </ul>
              </div>
            </section>

            <!-- 数据安全 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.dataSecurity.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.dataSecurity.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('privacy.sections.dataSecurity.content') }}
                </p>
              </div>
            </section>

            <!-- Cookie 使用 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🍪</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.cookies.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.cookies.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('privacy.sections.cookies.content') }}
                </p>
              </div>
            </section>

            <!-- 第三方服务 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">🔗</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.thirdParty.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.thirdParty.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('privacy.sections.thirdParty.description') }}
                </p>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li v-for="service in thirdPartyServices" :key="service">{{ service }}</li>
                </ul>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  {{ t('privacy.sections.thirdParty.note') }}
                </p>
              </div>
            </section>

            <!-- 儿童隐私 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-pink-100 dark:bg-pink-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">👶</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.childrenPrivacy.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.childrenPrivacy.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('privacy.sections.childrenPrivacy.content') }}
                </p>
              </div>
            </section>

            <!-- 隐私政策更新 -->
            <section class="group">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl">📝</span>
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.policyUpdates.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.policyUpdates.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ t('privacy.sections.policyUpdates.content') }}
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
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ t('privacy.sections.contact.title') }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('privacy.sections.contact.subtitle') }}</p>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ t('privacy.sections.contact.description') }}
                </p>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <p class="text-gray-700 dark:text-gray-300">
                    <strong>{{ t('privacy.sections.contact.developer') }}：</strong>不讲道理的柯里昂<br>
                    <strong>{{ t('privacy.sections.contact.github') }}：</strong><a href="https://github.com/zzq-github/vue-mathjax-beautiful" target="_blank" class="text-teal-600 dark:text-teal-400 hover:underline">https://github.com/zzq-github/vue-mathjax-beautiful</a><br>
                    <strong>{{ t('privacy.sections.contact.issues') }}：</strong><a href="https://github.com/zzq-github/vue-mathjax-beautiful/issues" target="_blank" class="text-teal-600 dark:text-teal-400 hover:underline">https://github.com/zzq-github/vue-mathjax-beautiful/issues</a>
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
const autoCollectedItems = computed(() => {
  const items = t('privacy.sections.dataCollection.autoCollected.items');
  return Array.isArray(items) ? items : [];
});

const userProvidedItems = computed(() => {
  const items = t('privacy.sections.dataCollection.userProvided.items');
  return Array.isArray(items) ? items : [];
});

const dataUsagePurposes = computed(() => {
  const purposes = t('privacy.sections.dataUsage.purposes');
  return Array.isArray(purposes) ? purposes : [];
});

const dataSharingExceptions = computed(() => {
  const exceptions = t('privacy.sections.dataSharing.exceptions');
  return Array.isArray(exceptions) ? exceptions : [];
});

const thirdPartyServices = computed(() => {
  const services = t('privacy.sections.thirdParty.services');
  return Array.isArray(services) ? services : [];
});
</script> 