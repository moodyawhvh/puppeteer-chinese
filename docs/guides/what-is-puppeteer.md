> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# Puppeteer 是什么?

Puppeteer 是一个 JavaScript 库,提供高层 API,通过
[DevTools 协议](https://chromedevtools.github.io/devtools-protocol/)或
[WebDriver BiDi](https://pptr.dev/webdriver-bidi) 控制 Chrome 或 Firefox。Puppeteer 默认以无头模式(headless,无可见 UI)运行,但也可以配置为在可见的("headful")浏览器中运行。

# 功能特性

凡是能在浏览器里手动完成的事情,几乎都能用 Puppeteer 完成!以下是一些入门示例:

- 自动化表单提交、UI 测试、键盘输入等。
- 使用最新的 JavaScript 和浏览器特性搭建自动化测试环境。
- 采集站点的
  [时间线追踪](https://developer.chrome.com/docs/devtools/performance/reference)
  (timeline trace),帮助诊断性能问题。
- [测试 Chrome 扩展](https://pptr.dev/guides/chrome-extensions)。
- 生成页面截图和 PDF。
- 爬取 SPA(单页应用)并生成预渲染内容(即 "SSR"(服务端渲染))。
