import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import VueMathjaxEditor from '../packages/core/src/components/VueMathjaxEditor/index.vue';

describe('VueMathjaxEditor sanitization', () => {
  beforeEach(() => {
    window.MathJax = {
      tex2svgPromise: vi.fn(async () => document.createElement('div')),
    };
  });

  afterEach(() => {
    delete window.MathJax;
  });

  it('sanitizes external modelValue before rendering into the editable area', async () => {
    const wrapper = mount(VueMathjaxEditor, {
      props: {
        modelValue:
          '<img src="x" onerror="alert(1)"><script>alert(2)</script><strong>safe</strong>',
        enableFormula: false,
        showToolbar: false,
      },
    });

    await flushPromises();

    const html = wrapper.find('.editor-content').html();
    expect(html).toContain('<strong>safe</strong>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
  });
});
