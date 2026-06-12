<template>
  <section
    id="docs"
    class="relative min-h-screen py-20"
  >
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-100/80 px-4 py-2 backdrop-blur-sm dark:border-indigo-700/50 dark:bg-indigo-900/80"
        >
          <div class="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
          <span class="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {{ copy.badge }}
          </span>
        </div>

        <h2
          class="mb-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
        >
          {{ copy.title }}
        </h2>
        <p
          class="mx-auto mt-4 max-w-3xl text-lg text-gray-600 transition-colors duration-300 dark:text-gray-300"
        >
          {{ copy.description }}
        </p>
      </div>

      <div class="mb-8 lg:hidden">
        <div
          class="rounded-2xl border border-gray-200/50 bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
        >
          <h3
            class="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white"
          >
            <div class="h-2 w-2 rounded-full bg-indigo-500" />
            {{ copy.tocTitle }}
          </h3>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button
              v-for="tocItem in tocItems"
              :key="`mobile-${tocItem.id}`"
              type="button"
              :class="[
                'flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
                activeSection === tocItem.id
                  ? 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-600 hover:bg-gray-50/50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-700/30 dark:hover:text-indigo-400',
              ]"
              @click="scrollToSection(tocItem.id)"
            >
              <component
                :is="tocItem.icon"
                class="h-3 w-3 flex-shrink-0"
              />
              <span class="truncate text-xs">{{ tocItem.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="relative grid items-start gap-8 lg:grid-cols-12">
        <div class="order-2 col-span-12 lg:order-1 lg:pr-20">
          <div class="grid gap-8 lg:grid-cols-1">
            <article
              id="install"
              class="rounded-2xl border border-gray-200/50 bg-white/80 p-4 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-gray-700/50 dark:bg-gray-800/80"
            >
              <h3
                class="mb-6 flex items-center gap-3 text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-white"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-sm"
                >
                  <CodeIcon class="h-4 w-4" />
                </div>
                {{ copy.install.title }}
              </h3>

              <div class="grid gap-6 md:grid-cols-2">
                <div class="space-y-4">
                  <h4 class="mb-4 text-base font-semibold text-blue-800 dark:text-blue-300">
                    {{ copy.install.packageManagers }}
                  </h4>
                  <div
                    v-for="command in installCommands"
                    :key="command.name"
                  >
                    <div class="mb-2 flex items-center gap-2">
                      <div
                        class="h-2 w-2 rounded-full"
                        :class="command.dotClass"
                      />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ command.name }}
                      </span>
                    </div>
                    <div
                      class="rounded-lg border border-gray-700/50 bg-gray-900/90 p-3 font-mono text-sm text-gray-100 backdrop-blur-sm transition-colors duration-300 dark:bg-gray-950/90 dark:text-gray-200"
                    >
                      {{ command.code }}
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="mb-4 text-base font-semibold text-blue-800 dark:text-blue-300">
                    {{ copy.install.requirements }}
                  </h4>
                  <div>
                    <div class="mb-3 flex items-center gap-2">
                      <div class="h-2 w-2 rounded-full bg-emerald-500" />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ copy.install.quickImport }}
                      </span>
                    </div>
                    <pre
                      class="overflow-x-auto whitespace-pre-wrap rounded-xl border border-gray-700/50 bg-gray-900/90 p-3 font-mono text-xs text-gray-100 backdrop-blur-sm transition-colors duration-300 dark:bg-gray-950/90 dark:text-gray-200"
                    ><code>{{ quickImportCode }}</code></pre>
                  </div>

                  <div>
                    <div class="mb-3 flex items-center gap-2">
                      <div class="h-2 w-2 rounded-full bg-purple-500" />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ copy.install.scope }}
                      </span>
                    </div>
                    <div
                      class="space-y-2 rounded-lg border border-gray-200/60 bg-white/80 p-4 text-xs text-gray-700 backdrop-blur-sm transition-colors duration-300 dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-200"
                    >
                      <p class="text-gray-600 dark:text-gray-300">
                        {{ copy.install.scopeNote }}
                      </p>
                      <p class="text-amber-600 dark:text-amber-300">
                        {{ copy.install.editorNote }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              id="basicUsage"
              class="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-gray-700/50 dark:bg-gray-800/80"
            >
              <h3
                class="mb-6 flex items-center gap-3 text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-white"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm"
                >
                  <ZapIcon class="h-4 w-4" />
                </div>
                {{ copy.basic.title }}
              </h3>

              <div class="space-y-6">
                <div>
                  <h4 class="mb-3 text-base font-semibold text-green-800 dark:text-green-300">
                    {{ copy.basic.inline }}
                  </h4>
                  <pre
                    class="overflow-x-auto whitespace-pre-wrap rounded-xl border border-gray-700/50 bg-gray-900/90 p-4 font-mono text-sm text-gray-100 backdrop-blur-sm transition-colors duration-300 dark:bg-gray-950/90 dark:text-gray-200"
                  ><code>{{ inlineCode }}</code></pre>
                </div>

                <div>
                  <h4 class="mb-3 text-base font-semibold text-green-800 dark:text-green-300">
                    {{ copy.basic.dialog }}
                  </h4>
                  <pre
                    class="overflow-x-auto whitespace-pre-wrap rounded-xl border border-gray-700/50 bg-gray-900/90 p-4 font-mono text-sm text-gray-100 backdrop-blur-sm transition-colors duration-300 dark:bg-gray-950/90 dark:text-gray-200"
                  ><code>{{ dialogCode }}</code></pre>
                </div>

                <div>
                  <h4 class="mb-3 text-base font-semibold text-green-800 dark:text-green-300">
                    {{ copy.basic.commonConfig }}
                  </h4>
                  <div class="grid gap-4 text-sm md:grid-cols-2">
                    <div
                      v-for="configItem in commonConfigs"
                      :key="configItem.title"
                      class="rounded-xl border border-emerald-200/50 bg-emerald-50/80 p-4 backdrop-blur-sm transition-colors duration-300 dark:border-emerald-800/50 dark:bg-emerald-900/40"
                    >
                      <div class="flex items-start gap-3">
                        <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                        <div>
                          <strong
                            class="text-emerald-900 transition-colors duration-300 dark:text-emerald-200"
                          >
                            {{ configItem.title }}
                          </strong>
                          <p
                            class="mt-1 font-mono text-xs text-emerald-700 transition-colors duration-300 dark:text-emerald-300"
                          >
                            {{ configItem.code }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              id="coreComponents"
              class="rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-blue-800/50 dark:from-blue-900/40 dark:to-indigo-900/40"
            >
              <h3
                class="mb-6 flex items-center gap-3 text-lg font-semibold text-blue-900 transition-colors duration-300 dark:text-blue-200"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-sm"
                >
                  <CpuIcon class="h-4 w-4" />
                </div>
                {{ copy.core.title }}
              </h3>

              <div class="grid gap-6 md:grid-cols-2">
                <div
                  v-for="coreItem in coreItems"
                  :key="coreItem.title"
                  class="rounded-xl border border-blue-200/50 bg-white/60 p-4 backdrop-blur-sm dark:border-blue-800/50 dark:bg-gray-900/40"
                >
                  <h4 class="mb-2 font-semibold text-blue-900 dark:text-blue-200">
                    {{ coreItem.title }}
                  </h4>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    {{ coreItem.description }}
                  </p>
                </div>
              </div>
            </article>

            <article
              id="beautifulApi"
              class="rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-purple-800/50 dark:from-purple-900/40 dark:to-pink-900/40"
            >
              <h3
                class="mb-6 flex items-center gap-3 text-lg font-semibold text-purple-900 transition-colors duration-300 dark:text-purple-200"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm"
                >
                  <CalculatorIcon class="h-4 w-4" />
                </div>
                {{ copy.api.title }}
              </h3>

              <div class="grid gap-6 md:grid-cols-2">
                <div class="space-y-4">
                  <h4 class="text-base font-semibold text-purple-800 dark:text-purple-300">
                    {{ copy.api.props }}
                  </h4>
                  <div
                    v-for="propItem in propItems"
                    :key="propItem.name"
                    class="rounded-r-lg border-l-4 bg-white/50 py-2 pl-4 backdrop-blur-sm dark:bg-gray-800/50"
                    :class="propItem.color"
                  >
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">
                      {{ propItem.name }}
                    </div>
                    <div class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {{ propItem.description }}
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="text-base font-semibold text-purple-800 dark:text-purple-300">
                    {{ copy.api.events }}
                  </h4>
                  <div
                    v-for="eventItem in eventItems"
                    :key="eventItem.name"
                    class="rounded-r-lg border-l-4 bg-white/50 py-2 pl-4 backdrop-blur-sm dark:bg-gray-800/50"
                    :class="eventItem.color"
                  >
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">
                      {{ eventItem.name }}
                    </div>
                    <div class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {{ eventItem.description }}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              id="advancedFeatures"
              class="rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-cyan-800/50 dark:from-cyan-900/40 dark:to-blue-900/40"
            >
              <h3
                class="mb-6 flex items-center gap-3 text-lg font-semibold text-cyan-900 transition-colors duration-300 dark:text-cyan-200"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-sm"
                >
                  <ZapIcon class="h-4 w-4" />
                </div>
                {{ copy.advanced.title }}
              </h3>

              <div class="grid gap-6 md:grid-cols-2">
                <div
                  v-for="featureItem in advancedItems"
                  :key="featureItem.title"
                  class="space-y-4"
                >
                  <h4 class="text-base font-semibold text-cyan-800 dark:text-cyan-300">
                    {{ featureItem.title }}
                  </h4>
                  <pre
                    v-if="featureItem.code"
                    class="overflow-x-auto whitespace-pre-wrap rounded-xl border border-gray-700/50 bg-gray-900/90 p-4 font-mono text-sm text-gray-100 backdrop-blur-sm transition-colors duration-300 dark:bg-gray-950/90 dark:text-gray-200"
                  ><code>{{ featureItem.code }}</code></pre>
                  <p
                    v-else
                    class="rounded-xl border border-cyan-200/50 bg-white/60 p-4 text-sm text-cyan-800 backdrop-blur-sm dark:border-cyan-800/50 dark:bg-gray-900/40 dark:text-cyan-200"
                  >
                    {{ featureItem.description }}
                  </p>
                </div>
              </div>
            </article>

            <article
              id="examples"
              class="rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-amber-800/50 dark:from-amber-900/40 dark:to-orange-900/40"
            >
              <h3
                class="mb-6 flex items-center gap-3 text-lg font-semibold text-amber-900 transition-colors duration-300 dark:text-amber-200"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm"
                >
                  <BookOpenIcon class="h-4 w-4" />
                </div>
                {{ copy.examples.title }}
              </h3>

              <div class="grid gap-6 md:grid-cols-2">
                <div class="space-y-4">
                  <h4 class="font-semibold text-amber-800 dark:text-amber-300">
                    {{ copy.examples.commonUsage }}
                  </h4>
                  <pre
                    class="overflow-x-auto whitespace-pre-wrap rounded-xl border border-gray-700/50 bg-gray-900/90 p-4 font-mono text-sm text-gray-100 backdrop-blur-sm transition-colors duration-300 dark:bg-gray-950/90 dark:text-gray-200"
                  ><code>{{ exampleCode }}</code></pre>
                </div>
                <div class="space-y-4">
                  <h4 class="font-semibold text-amber-800 dark:text-amber-300">
                    {{ copy.examples.bestPractices }}
                  </h4>
                  <ul class="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li
                      v-for="practice in practices"
                      :key="practice"
                      class="flex items-start gap-2"
                    >
                      <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                      <span>{{ practice }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div
          class="fixed z-30 hidden lg:block"
          style="top: 6rem; right: 1rem; width: 16rem; max-height: 80vh"
        >
          <div
            class="overflow-y-auto rounded-2xl border border-gray-200/50 bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
          >
            <h3
              class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              <div class="h-2 w-2 rounded-full bg-indigo-500" />
              {{ copy.tocTitle }}
            </h3>
            <nav class="space-y-2">
              <a
                v-for="tocItem in tocItems"
                :key="tocItem.id"
                :href="`#${tocItem.id}`"
                :class="[
                  'block rounded-lg px-3 py-2 text-sm transition-all duration-200',
                  activeSection === tocItem.id
                    ? 'border-l-2 border-indigo-500 bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                    : 'text-gray-600 hover:bg-gray-50/50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-700/30 dark:hover:text-indigo-400',
                ]"
                @click.prevent="scrollToSection(tocItem.id)"
              >
                <div class="flex items-center gap-2">
                  <component
                    :is="tocItem.icon"
                    class="h-4 w-4 flex-shrink-0"
                  />
                  <span class="truncate">{{ tocItem.label }}</span>
                </div>
              </a>
            </nav>
            <div class="mt-6 border-t border-gray-200/50 pt-4 dark:border-gray-700/50">
              <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ copy.quickLinks }}
              </h4>
              <div class="space-y-2">
                <a
                  href="https://github.com/zzq-github/vue-mathjax-beautiful/tree/master/packages/react"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-50/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/30 dark:hover:text-gray-200"
                >
                  <GithubIcon class="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLinkIcon class="ml-auto h-3 w-3" />
                </a>
                <a
                  href="https://www.npmjs.com/package/react-mathjax-beautiful"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-50/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/30 dark:hover:text-gray-200"
                >
                  <PackageIcon class="h-4 w-4" />
                  <span>NPM</span>
                  <ExternalLinkIcon class="ml-auto h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
  BookOpen as BookOpenIcon,
  Calculator as CalculatorIcon,
  Code as CodeIcon,
  Cpu as CpuIcon,
  ExternalLink as ExternalLinkIcon,
  Github as GithubIcon,
  Package as PackageIcon,
  Zap as ZapIcon,
} from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

interface ApiDocItem {
  name: string;
  description: string;
  color: string;
}

const { currentLocale } = useI18n();
const activeSection = ref('install');

const isZh = computed(() => currentLocale.value.code === 'zh-CN');

const copy = computed(() => ({
  badge: isZh.value ? 'React 公式组件' : 'React Formula Component',
  title: isZh.value ? 'React 使用文档' : 'React Documentation',
  description: isZh.value
    ? 'React 包使用与 Vue 文档一致的结构展示，聚焦 MathjaxBeautiful 公式编辑组件、JSX 用法和公共 API。'
    : 'The React package uses the same documentation structure as Vue, focused on MathjaxBeautiful usage, JSX examples, and public APIs.',
  tocTitle: isZh.value ? '目录' : 'Contents',
  quickLinks: isZh.value ? '快速链接' : 'Quick Links',
  install: {
    title: isZh.value ? '安装说明' : 'Installation',
    packageManagers: isZh.value ? '包管理器安装' : 'Package Managers',
    requirements: isZh.value ? '快速导入' : 'Quick Import',
    quickImport: isZh.value ? '样式与组件' : 'Component and Styles',
    scope: isZh.value ? '包范围' : 'Package Scope',
    scopeNote: isZh.value
      ? 'react-mathjax-beautiful 是独立 React 包，样式从 react-mathjax-beautiful/style.css 引入。'
      : 'react-mathjax-beautiful is a standalone React package. Import styles from react-mathjax-beautiful/style.css.',
    editorNote: isZh.value
      ? '当前 React 包只提供公式组件，不包含 Vue 包里的富文本编辑器。'
      : 'The React package currently provides the formula component only, without the Vue rich text editor.',
  },
  basic: {
    title: isZh.value ? '基本使用' : 'Basic Usage',
    inline: isZh.value ? '内联模式' : 'Inline Mode',
    dialog: isZh.value ? '弹窗模式' : 'Dialog Mode',
    commonConfig: isZh.value ? '常用配置' : 'Common Config',
  },
  core: {
    title: isZh.value ? '核心能力' : 'Core Capabilities',
  },
  api: {
    title: isZh.value ? 'MathjaxBeautiful API' : 'MathjaxBeautiful API',
    props: isZh.value ? '属性' : 'Props',
    events: isZh.value ? '事件' : 'Events',
  },
  advanced: {
    title: isZh.value ? '高级特性' : 'Advanced Features',
  },
  examples: {
    title: isZh.value ? '示例和最佳实践' : 'Examples and Best Practices',
    commonUsage: isZh.value ? '常见用法' : 'Common Usage',
    bestPractices: isZh.value ? '最佳实践' : 'Best Practices',
  },
}));

const tocItems = computed(() => [
  { id: 'install', icon: CodeIcon, label: copy.value.install.title },
  { id: 'basicUsage', icon: ZapIcon, label: copy.value.basic.title },
  { id: 'coreComponents', icon: CpuIcon, label: copy.value.core.title },
  { id: 'beautifulApi', icon: CalculatorIcon, label: copy.value.api.title },
  { id: 'advancedFeatures', icon: ZapIcon, label: copy.value.advanced.title },
  { id: 'examples', icon: BookOpenIcon, label: copy.value.examples.title },
]);

const installCommands = [
  { name: 'NPM', code: 'npm install react-mathjax-beautiful', dotClass: 'bg-red-500' },
  { name: 'Yarn', code: 'yarn add react-mathjax-beautiful', dotClass: 'bg-blue-500' },
  { name: 'PNPM', code: 'pnpm add react-mathjax-beautiful', dotClass: 'bg-yellow-500' },
];

const quickImportCode = `import { MathjaxBeautiful } from 'react-mathjax-beautiful';
import 'react-mathjax-beautiful/style.css';`;

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

const exampleCode = `<MathjaxBeautiful inline />

<MathjaxBeautiful
  open={open}
  onOpenChange={setOpen}
  showSymbols
  showPreview
  showFormulaExamples
/>`;

const commonConfigs = computed(() => [
  {
    title: isZh.value ? '最小内联' : 'Minimal Inline',
    code: '<MathjaxBeautiful inline />',
  },
  {
    title: isZh.value ? '受控弹窗' : 'Controlled Dialog',
    code: 'open={open} onOpenChange={setOpen}',
  },
  {
    title: isZh.value ? '隐藏符号面板' : 'Hide Symbol Panel',
    code: 'showSymbols={false}',
  },
  {
    title: isZh.value ? '中文界面' : 'Chinese Locale',
    code: 'locale="zh-CN"',
  },
]);

const coreItems = computed(() => [
  {
    title: 'MathjaxBeautiful',
    description: isZh.value
      ? 'React 公式编辑组件，支持内联和弹窗两种模式。'
      : 'React formula editor component with inline and dialog modes.',
  },
  {
    title: 'style.css',
    description: isZh.value
      ? '独立样式入口，支持 react-mathjax-beautiful/style.css 子路径导入。'
      : 'Standalone style entry available through react-mathjax-beautiful/style.css.',
  },
  {
    title: 'MathJax rendering',
    description: isZh.value
      ? '实时预览、符号面板和常用公式均使用 MathJax SVG 渲染。'
      : 'Preview, symbol panel, and formula examples are rendered with MathJax SVG.',
  },
  {
    title: 'TypeScript',
    description: isZh.value
      ? '组件属性和事件提供完整类型声明。'
      : 'Props and callbacks are shipped with TypeScript declarations.',
  },
]);

const propItems = computed<ApiDocItem[]>(() => [
  {
    name: 'inline',
    description: isZh.value ? '启用内联编辑模式。' : 'Enables inline editor mode.',
    color: 'border-red-500',
  },
  {
    name: 'open / defaultOpen',
    description: isZh.value
      ? '控制或初始化弹窗打开状态。'
      : 'Controls or initializes dialog open state.',
    color: 'border-indigo-500',
  },
  {
    name: 'value / defaultValue',
    description: isZh.value
      ? '控制或初始化 LaTeX 输入值。'
      : 'Controls or initializes the LaTeX input value.',
    color: 'border-blue-500',
  },
  {
    name: 'existingLatex',
    description: isZh.value
      ? '打开编辑器时填入已有公式。'
      : 'Provides an existing formula when opening the editor.',
    color: 'border-pink-500',
  },
  {
    name: 'theme',
    description: isZh.value
      ? '设置 light 或 dark 组件主题。'
      : 'Sets the light or dark component theme.',
    color: 'border-green-500',
  },
  {
    name: 'locale',
    description: isZh.value
      ? '设置 zh-CN 或 en-US 内置文案。'
      : 'Sets built-in zh-CN or en-US copy.',
    color: 'border-orange-500',
  },
]);

const eventItems = computed<ApiDocItem[]>(() => [
  {
    name: 'onInsert',
    description: isZh.value
      ? '点击插入时返回最终 LaTeX。'
      : 'Returns the final LaTeX when inserting.',
    color: 'border-green-500',
  },
  {
    name: 'onChange',
    description: isZh.value
      ? '输入变化时返回当前 LaTeX。'
      : 'Returns the current LaTeX when input changes.',
    color: 'border-blue-500',
  },
  {
    name: 'onOpenChange',
    description: isZh.value ? '弹窗打开状态变化时触发。' : 'Fires when dialog open state changes.',
    color: 'border-indigo-500',
  },
  {
    name: 'onClear / onClose',
    description: isZh.value
      ? '清空或关闭编辑器时触发。'
      : 'Fires when clearing or closing the editor.',
    color: 'border-red-500',
  },
]);

const advancedItems = computed(() => [
  {
    title: isZh.value ? '受控与非受控' : 'Controlled and Uncontrolled',
    code: `value={latex}
onChange={setLatex}
defaultValue="E = mc^2"`,
  },
  {
    title: isZh.value ? '显示控制' : 'Visibility Controls',
    code: `showSymbols={false}
showPreview={true}
showFormulaExamples={true}`,
  },
  {
    title: isZh.value ? '插入包装' : 'Formula Wrapping',
    code: `wrapFormula={true}
inline={false}
// inserts $$...$$`,
  },
  {
    title: isZh.value ? '当前范围' : 'Current Scope',
    description: isZh.value
      ? 'React 首版聚焦公式组件 MVP，后续可继续扩展更多 Vue 包能力。'
      : 'The React first release focuses on the formula component MVP, with room to add more Vue package capabilities later.',
  },
]);

const practices = computed(() => [
  isZh.value
    ? '在应用入口统一引入 style.css，避免重复导入。'
    : 'Import style.css once at the application entry.',
  isZh.value
    ? '弹窗模式建议使用 open/onOpenChange 受控管理。'
    : 'Use open/onOpenChange for controlled dialog usage.',
  isZh.value
    ? '保存前根据业务需要选择是否启用 wrapFormula。'
    : 'Choose wrapFormula according to how your content is stored.',
]);

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  window.scrollTo({
    top: element.offsetTop - 100,
    behavior: 'smooth',
  });
};

const throttle = <Args extends unknown[]>(func: (...args: Args) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;

  return (...args: Args) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(
      () => {
        func(...args);
        lastExecTime = Date.now();
      },
      delay - (currentTime - lastExecTime)
    );
  };
};

const checkActiveSection = () => {
  const sections = tocItems.value.map((item) => item.id);
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const offset = 120;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const element = document.getElementById(sections[index]);
    if (element && element.offsetTop - offset <= scrollTop + 30) {
      activeSection.value = sections[index];
      break;
    }
  }
};

const throttledCheckActiveSection = throttle(checkActiveSection, 100);

onMounted(() => {
  window.addEventListener('scroll', throttledCheckActiveSection);
  checkActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', throttledCheckActiveSection);
});
</script>
