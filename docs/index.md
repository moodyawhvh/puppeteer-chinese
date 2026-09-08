---
hide_table_of_contents: true
---

> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# Puppeteer

[![build](https://github.com/puppeteer/puppeteer/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/puppeteer/puppeteer/actions/workflows/ci.yml)
[![npm puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)

<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" height="200" align="right"/>

> Puppeteer 是一个 JavaScript 库,它提供高层 API,通过
> [DevTools 协议](https://chromedevtools.github.io/devtools-protocol/)或 [WebDriver BiDi](https://pptr.dev/webdriver-bidi) 控制
> Chrome 或 Firefox。
> Puppeteer 默认以无头模式(headless,无可见 UI)运行。

## [快速上手](https://pptr.dev/docs) | [API](https://pptr.dev/api) | [常见问题](https://pptr.dev/faq) | [参与贡献](https://pptr.dev/contributing) | [故障排查](https://pptr.dev/troubleshooting)

## 安装

```bash npm2yarn
npm i puppeteer # 安装时下载兼容的 Chrome。
npm i puppeteer-core # 或者作为库安装,不下载 Chrome。
```

:::note

现代包管理器(包括 npm(参见该 [RFC](https://github.com/npm/rfcs/pull/868))、pnpm、Yarn、Bun 和 Deno)默认会阻止依赖的安装脚本。如果安装脚本被阻止,Puppeteer 将不会在安装期间下载浏览器,从而导致运行时错误。

你可以在安装之后手动下载所需的浏览器,运行:

```bash npm2yarn
npx puppeteer browsers install
```

或者,你也可以配置包管理器允许安装脚本运行(例如对 npm 而言,在 `package.json` 的 `"allowScripts"` 中加入 `"puppeteer"`)。

:::

## MCP

安装 [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp),
一个基于 Puppeteer、面向浏览器自动化与调试的 MCP 服务器。

Puppeteer 还支持实验性的 [WebMCP](https://pptr.dev/guides/webmcp) API。

## 示例

```ts
import puppeteer from 'puppeteer';
// 或者 import puppeteer from 'puppeteer-core';

// 启动浏览器并打开一个空白页面。
const browser = await puppeteer.launch();
const page = await browser.newPage();

// 将页面导航到指定 URL。
await page.goto('https://developer.chrome.com/');

// 设置屏幕尺寸。
await page.setViewport({width: 1080, height: 1024});

// 使用键盘打开搜索菜单。
await page.keyboard.press('/');

// 通过无障碍输入框名称在搜索框中输入内容。
await page.locator('::-p-aria(Search)').fill('automate beyond recorder');

// 等待并点击第一条结果。
await page.locator('.devsite-result-item-link').click();

// 用一个唯一的字符串定位完整标题。
const textSelector = await page
  .locator('::-p-text(Customize and automate)')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// 打印完整标题。
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
```
