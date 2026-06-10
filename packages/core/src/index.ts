import type { App } from 'vue';
import VueMathjaxBeautiful from './components/VueMathjaxBeautiful/index.vue';
import VueMathjaxEditor from './components/VueMathjaxEditor/index.vue';
import './styles/index.scss';

export { VueMathjaxBeautiful, VueMathjaxEditor };

export * from './types';

export {
  initMathJax,
  loadMathJax,
  convertLatexToSvg,
  batchConvertLatex,
  extractLatexFromSvg,
  matchLatex,
  hasLatexFormula,
  clearMathTags,
  protectMathBlocks,
  restoreMathBlocks,
  cleanupMathBlockPlaceholders,
  preprocessLatexDocument,
  isMathContent,
  smartProcessContent,
  processMarkdownTable,
  sanitizeLatexFormula,
  latexToReadable,
  processMarkdownInCode,
  preprocessFakeCodeBlocks,
  preprocessCodeBlocks,
  type MatchLatexResult,
} from './utils/latex';

export { logger, Logger } from './utils/logger';
export type { LogLevel } from './utils/logger';

export { LRUCache, FormulaCache, MemoryCache, globalFormulaCache } from './utils/cache';
export type { CacheEntry, LRUCacheOptions } from './utils/cache';

export {
  lazyLoadMathJax,
  isMathJaxReady,
  preloadMathJax,
  resetMathJaxLoadState,
} from './utils/lazyLoad';

export { sanitizeHtml, escapeHtml } from './utils/sanitizeHtml';

export { useVirtualList, useVirtualGrid, useBatchRender } from './composables/useVirtualList';
export type {
  VirtualListOptions,
  VirtualGridOptions,
  VirtualListItem,
  VirtualGridItem,
} from './composables/useVirtualList';

export { useTheme, useGlobalTheme, createTheme, presetThemes } from './composables/useTheme';
export type { Theme, ThemeColors, ThemeConfig } from './composables/useTheme';

export { useMobile, useMobileOptimization, useSafeArea, defaultMobileConfig } from './composables/useMobile';
export type { Breakpoint, MobileOptimizationConfig } from './composables/useMobile';

export { useI18n } from './composables/useI18n';
export type { Locale, Messages } from './composables/useI18n';

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

export function install(app: App) {
  app.component('VueMathjaxEditor', VueMathjaxEditor);
  app.component('VueMathjaxBeautiful', VueMathjaxBeautiful);
}

const plugin = {
  install,
  VueMathjaxEditor,
  VueMathjaxBeautiful,
};

export default plugin;
