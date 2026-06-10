# vue-mathjax-beautiful

## 1.4.0

### Minor Changes

- Align and harden the public API surface.
  - Export the documented components, utilities, composables, data helpers, and public types from the package root.
  - Add the `vue-mathjax-beautiful/style.css` export while keeping `vue-mathjax-beautiful/dist/style.css` compatible.
  - Expose HTML sanitizing helpers and sanitize rendered MathJax SVG/HTML before `v-html` usage.
  - Stabilize MathJax loading APIs and add regression tests for runtime exports, type exports, `loadMathJax`, `sanitizeHtml`, and style subpaths.
  - Update README API documentation to match the actual component props, events, and utility exports.
