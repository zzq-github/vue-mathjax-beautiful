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

export {
  lazyLoadMathJax,
  isMathJaxReady,
  preloadMathJax,
  resetMathJaxLoadState,
} from './utils/lazyLoad';

export { logger, Logger } from './utils/logger';
export type { LogLevel } from './utils/logger';

export { LRUCache, FormulaCache, MemoryCache, globalFormulaCache } from './utils/cache';
export type { CacheEntry, LRUCacheOptions } from './utils/cache';

export { sanitizeHtml, escapeHtml } from './utils/sanitizeHtml';

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

export type {
  MathJaxConfig,
  MathJaxInstance,
  MathJaxRenderOptions,
  MathJaxStartup,
} from './types/global';
