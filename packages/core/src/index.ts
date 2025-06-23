import type { App } from 'vue'
import VueMathjaxEditor from './components/VueMathjaxEditor.vue'
import VueMathjaxBeautiful from './components/VueMathjaxBeautiful.vue'

// 导出核心组件
export { 
  VueMathjaxEditor,
  VueMathjaxBeautiful
}

// 导出类型
export * from './types'

// 导出工具函数
export { initMathJax } from './utils/mathjax'
export { convertLatexToSvg, extractLatexFromSvg } from './utils/latex'

// 样式
import './styles/index.scss'

// 插件安装函数
export function install(app: App) {
  app.component('VueMathjaxEditor', VueMathjaxEditor)
  app.component('VueMathjaxBeautiful', VueMathjaxBeautiful)
}

// 默认导出
export default {
  install,
  VueMathjaxEditor: VueMathjaxEditor as any,
  VueMathjaxBeautiful: VueMathjaxBeautiful as any
} 