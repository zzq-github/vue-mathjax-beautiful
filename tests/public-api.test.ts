import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as publicApi from 'vue-mathjax-beautiful';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readCorePackageJson() {
  return JSON.parse(
    readFileSync(resolve(rootDir, 'packages/core/package.json'), 'utf8')
  ) as {
    exports: {
      '.': {
        import: string;
        require: string;
        types: string;
      };
      './style.css': string;
      './dist/style.css': string;
    };
  };
}

describe('public package API', () => {
  it('keeps the documented runtime exports available from the package root', () => {
    const expectedExports = [
      'VueMathjaxBeautiful',
      'VueMathjaxEditor',
      'install',
      'initMathJax',
      'loadMathJax',
      'lazyLoadMathJax',
      'isMathJaxReady',
      'preloadMathJax',
      'resetMathJaxLoadState',
      'convertLatexToSvg',
      'batchConvertLatex',
      'extractLatexFromSvg',
      'matchLatex',
      'hasLatexFormula',
      'clearMathTags',
      'protectMathBlocks',
      'restoreMathBlocks',
      'cleanupMathBlockPlaceholders',
      'preprocessLatexDocument',
      'isMathContent',
      'smartProcessContent',
      'processMarkdownTable',
      'sanitizeLatexFormula',
      'latexToReadable',
      'processMarkdownInCode',
      'preprocessFakeCodeBlocks',
      'preprocessCodeBlocks',
      'sanitizeHtml',
      'escapeHtml',
      'logger',
      'Logger',
      'LRUCache',
      'FormulaCache',
      'MemoryCache',
      'globalFormulaCache',
      'useVirtualList',
      'useVirtualGrid',
      'useBatchRender',
      'useTheme',
      'useGlobalTheme',
      'createTheme',
      'presetThemes',
      'useMobile',
      'useMobileOptimization',
      'useSafeArea',
      'defaultMobileConfig',
      'useI18n',
      'basicSymbols',
      'greekSymbols',
      'advancedSymbols',
      'formulaExamples',
      'categories',
      'getLocalizedText',
      'getSymbolDescription',
      'getCategoryName',
    ];

    expectedExports.forEach((exportName) => {
      expect(publicApi).toHaveProperty(exportName);
    });
  });

  it('keeps plugin install and default export aligned', () => {
    expect(typeof publicApi.install).toBe('function');
    expect(publicApi.default.install).toBe(publicApi.install);
    expect(publicApi.default.VueMathjaxBeautiful).toBe(publicApi.VueMathjaxBeautiful);
    expect(publicApi.default.VueMathjaxEditor).toBe(publicApi.VueMathjaxEditor);
  });

  it('exposes sanitize helpers from the package root', () => {
    const html = publicApi.sanitizeHtml(
      '<img src="x" onerror="alert(1)"><script>alert(2)</script><strong>ok</strong>'
    );

    expect(html).toContain('<strong>ok</strong>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
    expect(publicApi.escapeHtml('<span>"x"</span>')).toBe(
      '&lt;span&gt;&quot;x&quot;&lt;/span&gt;'
    );
  });

  it('keeps documented package export subpaths stable', () => {
    const corePackage = readCorePackageJson();

    expect(corePackage.exports['.']).toEqual({
      import: './dist/vue-mathjax-beautiful.js',
      require: './dist/vue-mathjax-beautiful.umd',
      types: './dist/index.d.ts',
    });
    expect(corePackage.exports['./style.css']).toBe('./dist/style.css');
    expect(corePackage.exports['./dist/style.css']).toBe('./dist/style.css');
  });
});
