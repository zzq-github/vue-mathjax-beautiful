import type { App } from 'vue';
import VueMathjaxEditor from './components/VueMathjaxEditor/index.vue';
import VueMathjaxBeautiful from './components/VueMathjaxBeautiful/index.vue';

// 导出核心组件
export { VueMathjaxEditor, VueMathjaxBeautiful };

// 导出类型
export * from './types';

// 导出所有LaTeX工具函数 (完整API)
export {
  // 核心转换函数
  initMathJax,
  loadMathJax,
  convertLatexToSvg,
  batchConvertLatex,
  extractLatexFromSvg,
  
  // 匹配和检测函数
  matchLatex,
  hasLatexFormula,
  
  // DOM操作函数
  clearMathTags,
  
  // 类型定义
  type MatchLatexResult,
} from './utils/latex';

// 导出日志工具
export { logger, Logger } from './utils/logger';
export type { LogLevel } from './utils/logger';

// 导出缓存工具
export { LRUCache, FormulaCache, MemoryCache, globalFormulaCache } from './utils/cache';
export type { CacheEntry, LRUCacheOptions } from './utils/cache';

// 导出懒加载工具
export { lazyLoadMathJax, isMathJaxReady, preloadMathJax, resetMathJaxLoadState } from './utils/lazyLoad';

// 导出虚拟列表组合式函数
export { useVirtualList, useVirtualGrid, useBatchRender } from './composables/useVirtualList';
export type { VirtualListOptions, VirtualGridOptions, VirtualListItem, VirtualGridItem } from './composables/useVirtualList';

// 导出主题组合式函数
export { useTheme, useGlobalTheme, createTheme, presetThemes } from './composables/useTheme';
export type { Theme, ThemeColors, ThemeConfig } from './composables/useTheme';

// 导出移动端优化组合式函数
export { useMobile, useMobileOptimization, useSafeArea, defaultMobileConfig } from './composables/useMobile';
export type { Breakpoint, MobileOptimizationConfig } from './composables/useMobile';

// 导出国际化
export { useI18n } from './composables/useI18n';
export type { Locale, Messages } from './composables/useI18n';

// 数据相关
export {
  type Symbol,
  type Category,
  type LocalizedText,
  basicSymbols,
  greekSymbols,
  advancedSymbols,
  formulaExamples,
  categories,
  getLocalizedText,
  getSymbolDescription,
  getCategoryName,
} from './data';
export type { Locale as DataLocale } from './data';

// 样式
import './styles/index.scss';

// 插件安装函数
export function install(app: App) {
  app.component('VueMathjaxEditor', VueMathjaxEditor);
  app.component('VueMathjaxBeautiful', VueMathjaxBeautiful);
}

// 默认导出
export default {
  install,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  VueMathjaxEditor: VueMathjaxEditor as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  VueMathjaxBeautiful: VueMathjaxBeautiful as any,
};
