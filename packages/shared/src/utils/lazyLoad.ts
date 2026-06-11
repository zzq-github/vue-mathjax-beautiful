/**
 * MathJax lazy loading helpers.
 * This module keeps the public lazy-load API while delegating the actual
 * loading work to the shared loader in latex.ts.
 */

import { initMathJax } from './latex';
import { logger } from './logger';

let mathJaxLoadPromise: Promise<void> | null = null;

export function isMathJaxReady(): boolean {
  return typeof window !== 'undefined' && !!window.MathJax?.tex2svgPromise;
}

export async function lazyLoadMathJax(): Promise<void> {
  if (isMathJaxReady()) return;

  if (!mathJaxLoadPromise) {
    mathJaxLoadPromise = initMathJax()
      .then(() => {
        logger.info('MathJax lazy loaded successfully');
      })
      .catch((error) => {
        mathJaxLoadPromise = null;
        logger.error('MathJax lazy load failed', error);
        throw error;
      });
  }

  await mathJaxLoadPromise;
}

export function preloadMathJax(): void {
  if (typeof window === 'undefined') return;

  const schedule =
    (window as unknown as { requestIdleCallback?: typeof setTimeout }).requestIdleCallback ||
    setTimeout;

  schedule(() => {
    if (!isMathJaxReady()) {
      lazyLoadMathJax().catch(() => {
        // Preload failures are intentionally non-blocking.
      });
    }
  });
}

export function resetMathJaxLoadState(): void {
  mathJaxLoadPromise = null;
}
