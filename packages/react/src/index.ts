import './styles.css';

import {
  convertLatexToSvg as convertLatexToSvgImpl,
  escapeHtml as escapeHtmlImpl,
  hasLatexFormula as hasLatexFormulaImpl,
  initMathJax as initMathJaxImpl,
  isMathJaxReady as isMathJaxReadyImpl,
  lazyLoadMathJax as lazyLoadMathJaxImpl,
  loadMathJax as loadMathJaxImpl,
  matchLatex as matchLatexImpl,
  preloadMathJax as preloadMathJaxImpl,
  resetMathJaxLoadState as resetMathJaxLoadStateImpl,
  sanitizeHtml as sanitizeHtmlImpl,
} from '@vue-mathjax-beautiful/shared';

export { MathjaxBeautiful } from './MathjaxBeautiful';
export type { MathjaxBeautifulLocale, MathjaxBeautifulMessages } from './i18n';
export type { MathjaxBeautifulProps, MathjaxBeautifulTheme } from './MathjaxBeautiful';

export interface MathJaxConfig {
  tex?: Record<string, unknown>;
  svg?: Record<string, unknown>;
  chtml?: Record<string, unknown>;
  options?: Record<string, unknown>;
  startup?: Record<string, unknown>;
  loader?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface MatchLatexResult {
  formula: string;
  content: string;
  start: number;
  end: number;
  wrapper: string;
  isInline: boolean;
}

export const initMathJax = initMathJaxImpl as (config?: MathJaxConfig) => Promise<void>;
export const loadMathJax = loadMathJaxImpl as (urls?: string | string[]) => Promise<void>;
export const lazyLoadMathJax = lazyLoadMathJaxImpl as () => Promise<void>;
export const isMathJaxReady = isMathJaxReadyImpl as () => boolean;
export const preloadMathJax = preloadMathJaxImpl as () => void;
export const resetMathJaxLoadState = resetMathJaxLoadStateImpl as () => void;
export const convertLatexToSvg = convertLatexToSvgImpl as (content: string) => Promise<string>;
export const matchLatex = matchLatexImpl as (content: string) => MatchLatexResult[];
export const hasLatexFormula = hasLatexFormulaImpl as (content: string) => boolean;
export const sanitizeHtml = sanitizeHtmlImpl as (html: string) => string;
export const escapeHtml = escapeHtmlImpl as (value: string) => string;
