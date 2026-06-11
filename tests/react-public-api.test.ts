import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as publicApi from 'react-mathjax-beautiful';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readReactPackageJson() {
  return JSON.parse(readFileSync(resolve(rootDir, 'packages/react/package.json'), 'utf8')) as {
    name: string;
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

describe('react package public API', () => {
  it('keeps the formula component and utilities available from the package root', () => {
    const expectedExports = [
      'MathjaxBeautiful',
      'initMathJax',
      'loadMathJax',
      'lazyLoadMathJax',
      'isMathJaxReady',
      'preloadMathJax',
      'resetMathJaxLoadState',
      'convertLatexToSvg',
      'matchLatex',
      'hasLatexFormula',
      'sanitizeHtml',
      'escapeHtml',
    ];

    expectedExports.forEach((exportName) => {
      expect(publicApi).toHaveProperty(exportName);
    });
  });

  it('exposes the documented style subpaths', () => {
    const reactPackage = readReactPackageJson();

    expect(reactPackage.name).toBe('react-mathjax-beautiful');
    expect(reactPackage.exports['.']).toEqual({
      import: './dist/react-mathjax-beautiful.js',
      require: './dist/react-mathjax-beautiful.umd',
      types: './dist/index.d.ts',
    });
    expect(reactPackage.exports['./style.css']).toBe('./dist/style.css');
    expect(reactPackage.exports['./dist/style.css']).toBe('./dist/style.css');
  });
});
