<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="mb-12 text-center">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-100/80 px-4 py-2 backdrop-blur-sm dark:border-emerald-700/50 dark:bg-emerald-900/80">
          <div class="h-2 w-2 rounded-full bg-emerald-500" />
          <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300">React</span>
        </div>

        <h2 class="mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
          {{ copy.title }}
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {{ copy.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 xl:grid-cols-5">
        <div class="xl:col-span-2">
          <div class="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div class="border-b border-gray-200/50 bg-gray-50/70 px-6 py-4 dark:border-gray-700/50 dark:bg-gray-900/50">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ copy.options }}
              </h3>
            </div>

            <div class="space-y-6 p-6">
              <div class="space-y-3">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ copy.mode }}</label>
                <div class="flex rounded-xl border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900">
                  <button
                    type="button"
                    class="flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition"
                    :class="reactConfig.inline ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'"
                    @click="reactConfig.inline = true"
                  >
                    Inline
                  </button>
                  <button
                    type="button"
                    class="flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition"
                    :class="!reactConfig.inline ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'"
                    @click="reactConfig.inline = false"
                  >
                    Dialog
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="space-y-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ copy.theme }}</span>
                  <select
                    v-model="reactConfig.theme"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                  </select>
                </label>

                <label class="space-y-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ copy.locale }}</span>
                  <select
                    v-model="reactConfig.locale"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    <option value="zh-CN">zh-CN</option>
                    <option value="en-US">en-US</option>
                  </select>
                </label>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <label
                  v-for="option in booleanOptions"
                  :key="option.key"
                  class="flex items-center justify-between rounded-xl border border-gray-200/60 bg-gray-50/70 p-4 dark:border-gray-700/60 dark:bg-gray-900/50"
                >
                  <span>
                    <span class="block text-sm font-medium text-gray-900 dark:text-white">{{ option.label }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ option.prop }}</span>
                  </span>
                  <input
                    v-model="reactConfig[option.key]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                </label>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="space-y-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">maxLength</span>
                  <input
                    v-model.number="reactConfig.maxLength"
                    type="number"
                    min="20"
                    max="5000"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                </label>
                <label class="space-y-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">rows</span>
                  <input
                    v-model.number="reactConfig.rows"
                    type="number"
                    min="1"
                    max="8"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="xl:col-span-3">
          <div class="mb-6 overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div class="border-b border-gray-200/50 bg-gray-50/70 px-6 py-4 dark:border-gray-700/50 dark:bg-gray-900/50">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ copy.preview }}
              </h3>
            </div>
            <div class="p-6">
              <ReactConfigDemo
                :config="reactConfig"
                @event="addEvent"
              />
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <div class="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
              <div class="border-b border-gray-200/50 bg-gray-50/70 px-6 py-4 dark:border-gray-700/50 dark:bg-gray-900/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ copy.events }}
                </h3>
              </div>
              <div class="max-h-56 overflow-y-auto p-4">
                <p
                  v-if="eventLog.length === 0"
                  class="py-6 text-center text-sm text-gray-500"
                >
                  {{ copy.noEvents }}
                </p>
                <template v-else>
                  <div
                    v-for="event in eventLog.slice().reverse()"
                    :key="`${event.time}-${event.type}-${event.data}`"
                    class="mb-2 rounded-lg bg-gray-50 p-2 font-mono text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    <span class="text-emerald-600 dark:text-emerald-300">[{{ event.time }}]</span>
                    <span class="font-semibold text-blue-600 dark:text-blue-300">{{ event.type }}</span>
                    {{ event.data }}
                  </div>
                </template>
              </div>
            </div>

            <div class="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
              <div class="border-b border-gray-200/50 bg-gray-50/70 px-6 py-4 dark:border-gray-700/50 dark:bg-gray-900/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ copy.code }}
                </h3>
              </div>
              <pre class="max-h-56 overflow-auto bg-gray-950 p-4 text-xs text-blue-100"><code>{{ generatedCode }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import ReactConfigDemo from '../ReactConfigDemo/index.vue';
import type { ReactFormulaConfig } from '../../react/ReactConfigPlayground';

type BooleanConfigKey =
  | 'showSymbols'
  | 'showPreview'
  | 'showThemeToggle'
  | 'showClearButton'
  | 'showLanguageToggle'
  | 'showFormulaExamples'
  | 'wrapFormula';

const { currentLocale } = useI18n();

const reactConfig = reactive<ReactFormulaConfig>({
  inline: true,
  theme: 'light',
  locale: 'en-US',
  showSymbols: true,
  showPreview: true,
  showThemeToggle: true,
  showClearButton: true,
  showLanguageToggle: true,
  showFormulaExamples: true,
  wrapFormula: true,
  maxLength: 1000,
  rows: 2,
});

const copy = computed(() => {
  const zh = currentLocale.value.code === 'zh-CN';
  return {
    title: zh ? 'React 公式组件配置' : 'React Formula Component Config',
    description: zh
      ? '使用顶部 React 模式查看 react-mathjax-beautiful 的配置、事件和 JSX 用法。'
      : 'Use React mode to inspect react-mathjax-beautiful props, events, and JSX usage.',
    options: zh ? '配置选项' : 'Options',
    mode: zh ? '展示模式' : 'Mode',
    theme: zh ? '主题' : 'Theme',
    locale: zh ? '语言' : 'Locale',
    preview: zh ? '实时预览' : 'Live Preview',
    events: zh ? '事件日志' : 'Event Log',
    noEvents: zh ? '暂无事件' : 'No events yet',
    code: zh ? 'React 代码' : 'React Code',
  };
});

const booleanOptions = computed<Array<{ key: BooleanConfigKey; label: string; prop: string }>>(() => {
  const zh = currentLocale.value.code === 'zh-CN';
  return [
    { key: 'showSymbols', label: zh ? '显示符号面板' : 'Show Symbols', prop: 'showSymbols' },
    { key: 'showPreview', label: zh ? '显示实时预览' : 'Show Preview', prop: 'showPreview' },
    { key: 'showThemeToggle', label: zh ? '允许组件内切换主题' : 'Theme Toggle', prop: 'showThemeToggle' },
    { key: 'showClearButton', label: zh ? '显示清空按钮' : 'Clear Button', prop: 'showClearButton' },
    { key: 'showLanguageToggle', label: zh ? '允许组件内切换语言' : 'Language Toggle', prop: 'showLanguageToggle' },
    { key: 'showFormulaExamples', label: zh ? '显示公式示例' : 'Formula Examples', prop: 'showFormulaExamples' },
    { key: 'wrapFormula', label: zh ? '插入时自动包裹公式' : 'Wrap Formula', prop: 'wrapFormula' },
  ];
});

const eventLog = ref<Array<{ time: string; type: string; data: string }>>([]);

function addEvent(payload: { type: string; data: string }) {
  eventLog.value.push({
    time: new Date().toLocaleTimeString(),
    type: payload.type,
    data: payload.data,
  });

  if (eventLog.value.length > 12) {
    eventLog.value = eventLog.value.slice(-12);
  }
}

const generatedCode = computed(() => {
  const modeProp = reactConfig.inline ? 'inline' : 'open={open} onOpenChange={setOpen}';
  return `import { MathjaxBeautiful } from 'react-mathjax-beautiful';
import 'react-mathjax-beautiful/style.css';

<MathjaxBeautiful
  ${modeProp}
  value={latex}
  onChange={setLatex}
  onInsert={handleInsert}
  theme="${reactConfig.theme}"
  locale="${reactConfig.locale}"
  showSymbols={${reactConfig.showSymbols}}
  showPreview={${reactConfig.showPreview}}
  showThemeToggle={${reactConfig.showThemeToggle}}
  showClearButton={${reactConfig.showClearButton}}
  showLanguageToggle={${reactConfig.showLanguageToggle}}
  showFormulaExamples={${reactConfig.showFormulaExamples}}
  wrapFormula={${reactConfig.wrapFormula}}
  maxLength={${reactConfig.maxLength}}
  rows={${reactConfig.rows}}
/>`;
});
</script>
