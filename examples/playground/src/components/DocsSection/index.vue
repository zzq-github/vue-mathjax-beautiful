<template>
  <section id="docs" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          {{ t('docs.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {{ t('docs.description') }}
        </p>
      </div>
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- 安装说明 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <CodeIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {{ t('docs.sections.installation.title') }}
          </h3>
          <div class="space-y-3">
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
              npm install vue-mathjax-beautiful
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {{ t('docs.sections.installation.yarn') }}
            </p>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
              yarn add vue-mathjax-beautiful
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {{ t('docs.sections.installation.pnpm') }}
            </p>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
              pnpm add vue-mathjax-beautiful
            </div>
          </div>
        </div>

        <!-- 基本使用 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <ZapIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
            {{ t('docs.sections.basicUsage.title') }}
          </h3>
          <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
            <div class="text-blue-400 dark:text-blue-300">&lt;template&gt;</div>
            <div class="ml-2 text-green-400 dark:text-green-300">
              &lt;VueMathjaxEditor v-model="content" /&gt;
            </div>
            <div class="text-blue-400 dark:text-blue-300">&lt;/template&gt;</div>
            <br />
            <div class="text-blue-400 dark:text-blue-300">&lt;script setup&gt;</div>
            <div class="ml-2 text-yellow-400 dark:text-yellow-300">
              import { VueMathjaxEditor } from 'vue-mathjax-beautiful'
            </div>
            <div class="text-blue-400 dark:text-blue-300">&lt;/script&gt;</div>
          </div>
        </div>

        <!-- 组件介绍 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <CalculatorIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {{ t('docs.sections.coreComponents.title') }}
          </h3>
          <div class="space-y-4 text-sm">
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors duration-300">
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong class="text-purple-900 dark:text-purple-200 transition-colors duration-300">{{ t('docs.sections.coreComponents.beautiful.title') }}</strong>
                  <p class="text-purple-700 dark:text-purple-300 mt-1 transition-colors duration-300">
                    {{ t('docs.sections.coreComponents.beautiful.description') }}
                  </p>
                </div>
              </div>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors duration-300">
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong class="text-blue-900 dark:text-blue-200 transition-colors duration-300">{{ t('docs.sections.coreComponents.editor.title') }}</strong>
                  <p class="text-blue-700 dark:text-blue-300 mt-1 transition-colors duration-300">
                    {{ t('docs.sections.coreComponents.editor.description') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- API 属性 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <SettingsIcon class="h-5 w-5 text-orange-600 dark:text-orange-400" />
            {{ t('docs.sections.apiProps.title') }}
          </h3>
          <div class="space-y-3 text-sm">
            <div class="border-l-4 border-blue-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                v-model
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.apiProps.modelValue') }}
              </div>
            </div>
            <div class="border-l-4 border-green-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                placeholder
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.apiProps.placeholder') }}
              </div>
            </div>
            <div class="border-l-4 border-purple-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                min-height
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.apiProps.minHeight') }}
              </div>
            </div>
            <div class="border-l-4 border-orange-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                readonly
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.apiProps.readonly') }}
              </div>
            </div>
          </div>
        </div>

        <!-- 事件说明 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <ZapIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
            {{ t('docs.sections.events.title') }}
          </h3>
          <div class="space-y-3 text-sm">
            <div class="border-l-4 border-blue-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                @change
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.events.change') }}
              </div>
            </div>
            <div class="border-l-4 border-green-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                @focus
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.events.focus') }}
              </div>
            </div>
            <div class="border-l-4 border-purple-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                @blur
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.events.blur') }}
              </div>
            </div>
          </div>
        </div>

        <!-- 快捷键说明 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <KeyboardIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {{ t('docs.sections.shortcuts.title') }}
          </h3>
          <div class="space-y-3">
            <div
              v-for="shortcut in shortcuts"
              :key="shortcut.key"
              class="flex items-center justify-between"
            >
              <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                {{ shortcut.key }}
              </kbd>
              <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{{ shortcut.action }}</span>
            </div>
          </div>
        </div>

        <!-- LaTeX 语法 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <FileTextIcon class="h-5 w-5 text-orange-600 dark:text-orange-400" />
            {{ t('docs.sections.latexSyntax.title') }}
          </h3>
          <div class="space-y-3">
            <div
              v-for="example in latexExamples"
              :key="example.code"
              class="flex items-center justify-between"
            >
              <code class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-mono transition-colors duration-300">{{ example.code }}</code>
              <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{{ example.description }}</span>
            </div>
          </div>
        </div>

        <!-- 高级用法 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <SettingsIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {{ t('docs.sections.advancedUsage.title') }}
          </h3>
          <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
            <div class="text-gray-400 dark:text-gray-500">// 自定义配置</div>
            <div class="text-blue-400 dark:text-blue-300">&lt;VueMathjaxEditor</div>
            <div class="ml-2 text-green-400 dark:text-green-300">v-model="content"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">:min-height="'500px'"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">:readonly="false"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">
              placeholder="请输入内容..."
            </div>
            <div class="ml-2 text-green-400 dark:text-green-300">@change="handleChange"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">@focus="handleFocus"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">@blur="handleBlur"</div>
            <div class="text-blue-400 dark:text-blue-300">/&gt;</div>
          </div>
        </div>

        <!-- 公式编辑器用法 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <CalculatorIcon class="h-5 w-5 text-pink-600 dark:text-pink-400" />
            {{ t('docs.sections.formulaEditorUsage.title') }}
          </h3>
          <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
            <div class="text-gray-400 dark:text-gray-500">// 公式编辑器弹窗</div>
            <div class="text-blue-400 dark:text-blue-300">&lt;VueMathjaxBeautiful</div>
            <div class="ml-2 text-green-400 dark:text-green-300">v-model="showDialog"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">:existing-latex="formula"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">@insert="handleInsert"</div>
            <div class="text-blue-400 dark:text-blue-300">/&gt;</div>
            <br />
            <div class="text-gray-400 dark:text-gray-500">// 处理公式插入</div>
            <div class="text-yellow-400 dark:text-yellow-300">
              const handleInsert = (latex) => {
            </div>
            <div class="ml-2 text-white dark:text-gray-100">formula.value = latex</div>
            <div class="text-yellow-400 dark:text-yellow-300">}</div>
          </div>
        </div>

        <!-- 常见问题 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <FileTextIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
            {{ t('docs.sections.faq.title') }}
          </h3>
          <div class="space-y-4 text-sm">
            <div>
              <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.complexFormulas.q') }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.complexFormulas.a') }}
              </div>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.latexSupport.q') }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.latexSupport.a') }}
              </div>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.customStyle.q') }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.customStyle.a') }}
              </div>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.mobile.q') }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.faq.questions.mobile.a') }}
              </div>
            </div>
          </div>
        </div>

        <!-- 更多资源 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
            <GithubIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            {{ t('docs.sections.resources.title') }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.github') }}</span>
            </a>
            <a
              href="#examples"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.examples') }}</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.api') }}</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.issues') }}</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group sm:col-span-2"
            >
              <div class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.changelog') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Code as CodeIcon,
  Zap as ZapIcon,
  Calculator as CalculatorIcon,
  Settings as SettingsIcon,
  Keyboard as KeyboardIcon,
  FileText as FileTextIcon,
  Github as GithubIcon,
} from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// 快捷键数据（国际化）
const shortcuts = computed(() => [
  { key: 'Ctrl + B', action: t('docs.sections.shortcuts.bold') },
  { key: 'Ctrl + I', action: t('docs.sections.shortcuts.italic') },
  { key: 'Ctrl + U', action: t('docs.sections.shortcuts.underline') },
  { key: 'Ctrl + S', action: t('docs.sections.shortcuts.strikethrough') },
  { key: 'Ctrl + Z', action: t('docs.sections.shortcuts.undo') },
  { key: 'Ctrl + Y', action: t('docs.sections.shortcuts.redo') },
  { key: 'Ctrl + M', action: t('docs.sections.shortcuts.editFormula') },
  { key: '$...$', action: t('docs.sections.shortcuts.inlineFormula') },
  { key: '$$...$$', action: t('docs.sections.shortcuts.displayFormula') },
]);

// LaTeX 示例（国际化）
const latexExamples = computed(() => [
  { code: '$E = mc^2$', description: t('docs.sections.latexSyntax.inlineFormula') },
  { code: '$$\\int_0^1 x^2 dx$$', description: t('docs.sections.latexSyntax.displayFormula') },
  { code: '\\frac{a}{b}', description: t('docs.sections.latexSyntax.fraction') },
  { code: '\\sqrt{x}', description: t('docs.sections.latexSyntax.sqrt') },
  { code: 'x^2', description: t('docs.sections.latexSyntax.superscript') },
  { code: 'x_i', description: t('docs.sections.latexSyntax.subscript') },
  { code: '\\sum_{i=1}^n', description: t('docs.sections.latexSyntax.sum') },
  { code: '\\alpha \\beta \\gamma', description: t('docs.sections.latexSyntax.greekLetters') },
  { code: '\\begin{matrix} a & b \\\\ c & d \\end{matrix}', description: t('docs.sections.latexSyntax.matrix') },
  { code: '\\lim_{x \\to 0}', description: t('docs.sections.latexSyntax.limit') },
  { code: '\\sin \\cos \\tan', description: t('docs.sections.latexSyntax.trigFunctions') },
  { code: '\\infty \\pm \\neq', description: t('docs.sections.latexSyntax.specialSymbols') },
]);
</script> 