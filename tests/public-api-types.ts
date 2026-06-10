/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  escapeHtml,
  initMathJax,
  loadMathJax,
  sanitizeHtml,
} from 'vue-mathjax-beautiful';
import type {
  MathJaxConfig,
  MathJaxInstance,
  MathJaxRenderOptions,
  MathJaxStartup,
  MatchLatexResult,
  VueMathjaxBeautifulEvents,
  VueMathjaxBeautifulProps,
  VueMathjaxBeautifulThemeConfig,
  VueMathjaxEditorEvents,
  VueMathjaxEditorProps,
} from 'vue-mathjax-beautiful';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

type Assert<T extends true> = T;

type LoadMathJaxArg = Parameters<typeof loadMathJax>[0];
type LoadMathJaxSignature = Assert<Equal<LoadMathJaxArg, string | string[] | undefined>>;
type InitMathJaxSignature = Assert<
  Equal<Parameters<typeof initMathJax>[0], MathJaxConfig | undefined>
>;
type SanitizeReturn = Assert<Equal<ReturnType<typeof sanitizeHtml>, string>>;
type EscapeReturn = Assert<Equal<ReturnType<typeof escapeHtml>, string>>;

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
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process',
  },
};

const initWithConfig: Promise<void> = initMathJax(mathJaxConfig);

const renderOptions: MathJaxRenderOptions = {
  display: true,
  scale: 1.2,
  containerWidth: 640,
};

const startup: MathJaxStartup = {
  defaultPageReady: async () => undefined,
  ready: () => undefined,
};

const mathJaxInstance: Partial<MathJaxInstance> = {
  startup,
  tex: mathJaxConfig.tex,
  svg: mathJaxConfig.svg,
};

const beautifulTheme: VueMathjaxBeautifulThemeConfig = {
  light: {
    primary: '#3b82f6',
    buttonText: '#ffffff',
  },
  dark: {
    primary: '#60a5fa',
    inputBorder: '#4b5563',
  },
};

const beautifulProps: VueMathjaxBeautifulProps = {
  modelValue: true,
  existingLatex: 'E = mc^2',
  inlineMode: false,
  theme: 'dark',
  themeConfig: beautifulTheme,
  enabledCategories: ['basic', 'greek', 'advanced', 'custom'],
  defaultCategory: 'custom',
  showPreview: true,
  wrapFormula: true,
};

const beautifulEvents: VueMathjaxBeautifulEvents = {
  'update:modelValue': (value) => undefined,
  insert: (latex) => undefined,
  change: (latex) => undefined,
  clear: () => undefined,
  close: () => undefined,
  themeChange: (theme) => undefined,
};

const editorProps: VueMathjaxEditorProps = {
  modelValue: '<p>Hello</p>',
  toolbarPosition: 'top',
  enabledTools: ['bold', 'italic', 'formula'],
  formulaEditorProps: {
    existingLatex: 'x^2',
    wrapFormula: false,
  },
  allowedImageTypes: ['image/png', 'image/jpeg'],
};

const editorEvents: VueMathjaxEditorEvents = {
  'update:modelValue': (value) => undefined,
  change: (value) => undefined,
  focus: () => undefined,
  blur: () => undefined,
  ready: () => undefined,
  error: (error) => undefined,
  themeChange: (theme) => undefined,
  formatToggle: (format, active) => undefined,
  imageUpload: (file) => undefined,
  imageUploaded: (url) => undefined,
  imageError: (error) => undefined,
  formulaInsert: (latex) => undefined,
  save: (content) => undefined,
  charLimitReached: () => undefined,
  wordCountChange: (count) => undefined,
  charCountChange: (count) => undefined,
};

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
