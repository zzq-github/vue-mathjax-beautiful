<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-100/80 px-4 py-2 backdrop-blur-sm dark:border-emerald-700/50 dark:bg-emerald-900/80">
          <div class="h-2 w-2 rounded-full bg-emerald-500" />
          <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300">React</span>
        </div>
        <h2 class="mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          {{ copy.title }}
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          {{ copy.description }}
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-12">
        <aside class="lg:col-span-3">
          <div class="sticky top-24 rounded-2xl border border-gray-200/50 bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {{ copy.toc }}
            </h3>
            <nav class="space-y-2">
              <button
                v-for="item in sections"
                :key="item.id"
                type="button"
                class="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
                @click="scrollTo(item.id)"
              >
                {{ item.label }}
              </button>
            </nav>
          </div>
        </aside>

        <div class="space-y-8 lg:col-span-9">
          <article
            id="react-install"
            class="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
          >
            <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {{ copy.install }}
            </h3>
            <div class="grid gap-4 md:grid-cols-2">
              <pre class="overflow-auto rounded-xl bg-gray-950 p-4 text-sm text-blue-100"><code>npm install react-mathjax-beautiful</code></pre>
              <pre class="overflow-auto rounded-xl bg-gray-950 p-4 text-sm text-blue-100"><code>pnpm add react-mathjax-beautiful</code></pre>
            </div>
            <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {{ copy.installNote }}
            </p>
          </article>

          <article
            id="react-inline"
            class="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
          >
            <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {{ copy.inline }}
            </h3>
            <pre class="overflow-auto rounded-xl bg-gray-950 p-4 text-sm text-blue-100"><code>{{ inlineCode }}</code></pre>
          </article>

          <article
            id="react-dialog"
            class="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
          >
            <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {{ copy.dialog }}
            </h3>
            <pre class="overflow-auto rounded-xl bg-gray-950 p-4 text-sm text-blue-100"><code>{{ dialogCode }}</code></pre>
          </article>

          <article
            id="react-api"
            class="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
          >
            <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {{ copy.api }}
            </h3>
            <div class="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                  <tr>
                    <th class="px-4 py-3">Prop / Event</th>
                    <th class="px-4 py-3">Type</th>
                    <th class="px-4 py-3">{{ copy.meaning }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr
                    v-for="item in apiItems"
                    :key="item.name"
                    class="bg-white/60 dark:bg-gray-800/60"
                  >
                    <td class="px-4 py-3 font-mono text-emerald-700 dark:text-emerald-300">{{ item.name }}</td>
                    <td class="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300">{{ item.type }}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ item.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-200">
              {{ copy.scopeNote }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';

const { currentLocale } = useI18n();

const isZh = computed(() => currentLocale.value.code === 'zh-CN');

const copy = computed(() => ({
  title: isZh.value ? 'React 使用文档' : 'React Documentation',
  description: isZh.value
    ? 'React 包提供 MathjaxBeautiful 公式编辑组件，支持内联和弹窗两种模式。'
    : 'The React package provides the MathjaxBeautiful formula component with inline and dialog modes.',
  toc: isZh.value ? '目录' : 'Contents',
  install: isZh.value ? '安装' : 'Installation',
  installNote: isZh.value
    ? 'React 包是独立包，样式从 react-mathjax-beautiful/style.css 引入。'
    : 'The React package is standalone. Import styles from react-mathjax-beautiful/style.css.',
  inline: isZh.value ? '内联模式' : 'Inline Mode',
  dialog: isZh.value ? '弹窗模式' : 'Dialog Mode',
  api: isZh.value ? '核心 API' : 'Core API',
  meaning: isZh.value ? '说明' : 'Description',
  scopeNote: isZh.value
    ? '当前 React 包聚焦公式编辑组件，不包含 Vue 包里的富文本编辑器 VueMathjaxEditor。'
    : 'The current React package focuses on the formula editor and does not include the VueMathjaxEditor rich text editor.',
}));

const sections = computed(() => [
  { id: 'react-install', label: copy.value.install },
  { id: 'react-inline', label: copy.value.inline },
  { id: 'react-dialog', label: copy.value.dialog },
  { id: 'react-api', label: copy.value.api },
]);

const inlineCode = `import { useState } from 'react';
import { MathjaxBeautiful } from 'react-mathjax-beautiful';
import 'react-mathjax-beautiful/style.css';

export function InlineFormula() {
  const [latex, setLatex] = useState('E = mc^2');

  return (
    <MathjaxBeautiful
      inline
      value={latex}
      onChange={setLatex}
      onInsert={(formula) => console.log(formula)}
    />
  );
}`;

const dialogCode = `import { useState } from 'react';
import { MathjaxBeautiful } from 'react-mathjax-beautiful';
import 'react-mathjax-beautiful/style.css';

export function DialogFormula() {
  const [open, setOpen] = useState(false);
  const [latex, setLatex] = useState('x^2 + y^2 = z^2');

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Edit formula
      </button>
      <MathjaxBeautiful
        open={open}
        onOpenChange={setOpen}
        existingLatex={latex}
        onChange={setLatex}
        onInsert={setLatex}
      />
    </>
  );
}`;

const apiItems = computed(() => [
  {
    name: 'inline',
    type: 'boolean',
    description: isZh.value ? '启用内联编辑模式。' : 'Enables inline editor mode.',
  },
  {
    name: 'open / onOpenChange',
    type: 'boolean / (open) => void',
    description: isZh.value ? '受控弹窗开关。' : 'Controlled dialog state.',
  },
  {
    name: 'value / onChange',
    type: 'string / (latex) => void',
    description: isZh.value ? '受控 LaTeX 输入值。' : 'Controlled LaTeX input value.',
  },
  {
    name: 'existingLatex',
    type: 'string',
    description: isZh.value ? '打开弹窗时使用的初始公式。' : 'Initial formula used when opening the dialog.',
  },
  {
    name: 'theme',
    type: "'light' | 'dark'",
    description: isZh.value ? '组件主题。' : 'Component theme.',
  },
  {
    name: 'locale',
    type: "'zh-CN' | 'en-US'",
    description: isZh.value ? '组件内置文案语言。' : 'Built-in component locale.',
  },
  {
    name: 'onInsert',
    type: '(latex: string) => void',
    description: isZh.value ? '用户点击插入时触发。' : 'Fires when the user inserts a formula.',
  },
]);

function scrollTo(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  window.scrollTo({ top: element.offsetTop - 96, behavior: 'smooth' });
}
</script>
