<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 演示内容 -->
    <div class="container mx-auto px-4 py-8">
      <DemoSection
        :is-dark="isDark"
        v-model:rich-text-content="richTextContent"
        @formula-insert="handleFormulaInsert"
        @clear-content="clearContent"
        @load-sample="loadSample"
        @rich-text-change="handleRichTextChange"
        @editor-focus="handleFocus"
        @editor-blur="handleBlur"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { initMathJax } from 'vue-mathjax-beautiful'
import DemoSection from '../components/DemoSection/index.vue'

const { t } = useI18n()

// 主题状态
const isDark = ref(false)

// 富文本内容
const richTextContent = ref('')

// 初始化示例内容
const initSampleContent = () => {
  richTextContent.value = `${t('sampleContent.welcome')}

${t('sampleContent.intro')}

${t('sampleContent.mainFeatures')}

${t('sampleContent.richText')}
${t('sampleContent.mathFormulas')}
${t('sampleContent.realTimePreview')}

${t('sampleContent.mathExamples')}

${t('sampleContent.massEnergyFormula')}

${t('sampleContent.gaussianIntegral')}
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

${t('sampleContent.quadraticFormula')} $\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

${t('sampleContent.getStarted')}

${t('sampleContent.clickFormula')}`;
}

// 事件处理
function handleRichTextChange(value: string) {

}

function handleFormulaInsert(latex: string) {
}

function handleFocus() {
}

function handleBlur() {
}

function clearContent() {
  richTextContent.value = ''
}

function loadSample() {
  initSampleContent()
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
  } else if (savedTheme === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

onMounted(async () => {
  initTheme()
  initSampleContent()
  
  try {
    await initMathJax()
  } catch (error) {
    console.error('MathJax初始化失败:', error)
  }
})
</script> 