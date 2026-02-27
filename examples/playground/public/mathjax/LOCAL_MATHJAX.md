# MathJax 本地静态资源说明（Playground）

本目录用于演示本地部署 MathJax 在 `examples/playground` 中的使用方式。

## 目录结构
推荐将 `node_modules/mathjax/es5` 复制到以下路径之一：

- `public/mathjax/`（推荐）
  - 这样浏览器访问路径为：`/mathjax/tex-svg.js`
- `public/mathjax/es5/`
  - 这样浏览器访问路径为：`/mathjax/es5/tex-svg.js`

> 说明：当前库的 `loadMathJax` 会优先尝试上述两种本地路径，再回退到 CDN。

## 运行验证（3 种方式）

1. **Network 面板检查**
   - 打开浏览器开发者工具 → Network。
   - 过滤关键词 `mathjax`。
   - 看到请求 **`/mathjax/tex-svg.js`** 或 **`/mathjax/es5/tex-svg.js`** 返回 `200` 即为本地加载成功。

2. **Console 快速检测**
   在 Console 执行：
   ```js
   window.MathJax?.tex2svgPromise && 'OK'
   ```
   返回 `"OK"` 说明 MathJax 已可用。

3. **实际渲染验证**
   在编辑器输入：`$x^2 + y^2 = z^2$`，能正常渲染为 SVG 公式即说明加载成功。
