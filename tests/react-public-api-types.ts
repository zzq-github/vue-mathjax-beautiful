/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MathjaxBeautiful,
  escapeHtml,
  initMathJax,
  loadMathJax,
  sanitizeHtml,
} from 'react-mathjax-beautiful';
import type { ComponentType } from 'react';
import type {
  MathJaxConfig,
  MatchLatexResult,
  MathjaxBeautifulLocale,
  MathjaxBeautifulProps,
  MathjaxBeautifulTheme,
} from 'react-mathjax-beautiful';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

type Assert<T extends true> = T;

type ThemeSignature = Assert<Equal<MathjaxBeautifulTheme, 'light' | 'dark'>>;
type LocaleSignature = Assert<Equal<MathjaxBeautifulLocale, 'zh-CN' | 'en-US'>>;
type LoadMathJaxArg = Parameters<typeof loadMathJax>[0];
type LoadMathJaxSignature = Assert<Equal<LoadMathJaxArg, string | string[] | undefined>>;
type InitMathJaxSignature = Assert<
  Equal<Parameters<typeof initMathJax>[0], MathJaxConfig | undefined>
>;
type SanitizeReturn = Assert<Equal<ReturnType<typeof sanitizeHtml>, string>>;
type EscapeReturn = Assert<Equal<ReturnType<typeof escapeHtml>, string>>;

const component: ComponentType<MathjaxBeautifulProps> = MathjaxBeautiful;

const loadDefault: Promise<void> = loadMathJax();
const loadSingleUrl: Promise<void> = loadMathJax('/mathjax/tex-svg.js');
const loadUrlList: Promise<void> = loadMathJax([
  '/mathjax/tex-svg.js',
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
]);

// @ts-expect-error loadMathJax only accepts a URL string or URL string array.
loadMathJax(123);

const mathJaxConfig: MathJaxConfig = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    processEscapes: true,
  },
  svg: {
    fontCache: 'global',
    displayAlign: 'center',
  },
};

const initWithConfig: Promise<void> = initMathJax(mathJaxConfig);

const controlledProps: MathjaxBeautifulProps = {
  open: true,
  value: 'E = mc^2',
  inline: false,
  theme: 'dark',
  locale: 'en-US',
  enabledCategories: ['basic', 'greek', 'advanced'],
  defaultCategory: 'greek',
  showFormulaExamples: true,
  wrapFormula: true,
  onOpenChange: (open) => undefined,
  onInsert: (latex) => undefined,
  onChange: (latex) => undefined,
  onThemeChange: (theme) => undefined,
  onLocaleChange: (locale) => undefined,
};

const inlineProps: MathjaxBeautifulProps = {
  inline: true,
  defaultValue: '\\frac{a}{b}',
  showPreview: true,
  showSymbols: false,
  rows: 3,
  maxLength: 300,
};

// @ts-expect-error theme only accepts light or dark.
const invalidTheme: MathjaxBeautifulProps = { theme: 'auto' };

// @ts-expect-error locale only accepts zh-CN or en-US.
const invalidLocale: MathjaxBeautifulProps = { locale: 'zh' };

const match: MatchLatexResult = {
  formula: '$E = mc^2$',
  content: 'E = mc^2',
  start: 0,
  end: 10,
  wrapper: '$E = mc^2$',
  isInline: true,
};

const safeHtml: string = sanitizeHtml('<strong>ok</strong>');
const escapedHtml: string = escapeHtml('<strong>ok</strong>');
