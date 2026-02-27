<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-indigo-100/20 dark:bg-indigo-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-purple-100/20 dark:bg-purple-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-violet-100/20 dark:bg-violet-900/20 rounded-full blur-2xl animate-pulse delay-700" />

      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-indigo-300/20 dark:text-indigo-400/20 text-8xl font-bold select-none rotate-12">∫</div>
      <div class="absolute bottom-32 right-20 text-blue-300/20 dark:text-blue-400/20 text-6xl font-bold select-none -rotate-12">∂</div>
      <div class="absolute top-1/3 right-10 text-purple-300/20 dark:text-purple-400/20 text-5xl font-bold select-none rotate-45">∑</div>
      <div class="absolute bottom-1/3 left-20 text-violet-300/20 dark:text-violet-400/20 text-4xl font-bold select-none -rotate-45">√</div>
      <div class="absolute top-2/3 left-1/4 text-indigo-200/20 dark:text-indigo-300/20 text-3xl font-bold select-none rotate-12">π</div>
      <div class="absolute top-1/4 right-1/3 text-blue-200/20 dark:text-blue-300/20 text-4xl font-bold select-none -rotate-12">Σ</div>

      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 页面头部 -->
    <div class="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="container mx-auto px-4 py-12">
        <!-- <div class="flex items-center space-x-4 mb-8">
          <router-link to="/" class="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="font-medium">{{ t('common.back') }}</span>
          </router-link>
        </div> -->

        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/80 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 mb-6">
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{{ t('updates.badge') }}</span>
          </div>


          <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl mb-4">
            {{ t('updates.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300 max-w-3xl mx-auto">
            {{ t('updates.subtitle') }}
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">{{ t('updates.lastUpdated') }}</p>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl p-8 lg:p-12">
          <div v-if="entries.length" class="relative">
            <div class="absolute left-3 top-2 bottom-2 w-px bg-indigo-200/70 dark:bg-indigo-700/60" />
            <section v-for="entry in entries" :key="entry.version" class="relative pl-10 pb-8 last:pb-0">
              <div class="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-semibold shadow-sm">
                <span class="sr-only">{{ entry.version }}</span>
              </div>
              <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <span class="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-700/50">
                        {{ entry.typeLabel }}
                      </span>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ entry.date }}</span>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ entry.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ entry.summary }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="rounded-full bg-indigo-100 dark:bg-indigo-800/80 px-4 py-1.5 text-sm font-semibold text-indigo-700 dark:text-indigo-200">
                      v{{ entry.version }}
                    </div>
                  </div>
                </div>

                <div class="mt-4 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/50">
                  <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-2">
                    <li v-for="item in entry.items" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div v-else class="text-center text-gray-500 dark:text-gray-400">
            {{ t('updates.empty') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

type UpdateEntry = {
  version: string
  date: string
  typeLabel: string
  title: string
  summary: string
  items: string[]
}

const { t, tm } = useI18n()

const entries = computed<UpdateEntry[]>(() => {
  const list = tm('updates.entries') as unknown


  if (!Array.isArray(list)) {
    return []
  }

  return list
    .map((entry) => {
      const items = Array.isArray(entry?.items)
        ? entry.items.filter((item: unknown) => typeof item === 'string')
        : []


      return {
        version: typeof entry?.version === 'string' ? entry.version : '',
        date: typeof entry?.date === 'string' ? entry.date : '',
        typeLabel: typeof entry?.typeLabel === 'string' ? entry.typeLabel : '',
        title: typeof entry?.title === 'string' ? entry.title : '',
        summary: typeof entry?.summary === 'string' ? entry.summary : '',
        items,
      }
    })
    .filter((entry) => entry.version || entry.title || entry.items.length)
})
</script>

