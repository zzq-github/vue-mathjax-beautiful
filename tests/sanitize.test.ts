import { describe, expect, it } from 'vitest';
import { escapeHtml, sanitizeHtml } from '../packages/core/src/utils/sanitizeHtml';

describe('sanitizeHtml', () => {
  it('removes scripts and event handlers', () => {
    const html = sanitizeHtml(
      '<img src="x" onerror="alert(1)"><script>alert(2)</script><strong>ok</strong>'
    );

    expect(html).toContain('<strong>ok</strong>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
  });

  it('keeps MathJax SVG attributes needed for editing', () => {
    const html = sanitizeHtml(
      '<svg data-latex="x^2" data-latex-type="display" viewBox="0 0 10 10"><g data-mml-node="math"><path d="M0 0" /></g></svg>'
    );

    expect(html).toContain('data-latex="x^2"');
    expect(html).toContain('data-latex-type="display"');
    expect(html).toContain('viewBox="0 0 10 10"');
    expect(html).toContain('data-mml-node="math"');
  });
});

describe('escapeHtml', () => {
  it('escapes special HTML characters', () => {
    expect(escapeHtml(`<tag attr="x">'&`)).toBe(
      '&lt;tag attr=&quot;x&quot;&gt;&#39;&amp;'
    );
  });
});
