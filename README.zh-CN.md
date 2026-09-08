# puppeteer 中文文档

[![原项目](https://img.shields.io/badge/原项目-puppeteer--puppeteer-blue?style=flat-square&logo=github)](https://github.com/puppeteer/puppeteer)
[![npm puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

> Puppeteer 是一个 JavaScript 库,通过 [DevTools 协议](https://chromedevtools.github.io/devtools-protocol/) 或 [WebDriver BiDi](https://pptr.dev/webdriver-bidi) 提供控制 Chrome 或 Firefox 浏览器的高级 API。Puppeteer 默认以无头(headless,即无可见界面)模式运行。

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

## 快速开始 | API | FAQ

- [入门指南](https://pptr.dev/docs) | [API 参考](https://pptr.dev/api) | [常见问题](https://pptr.dev/faq) | [参与贡献](https://pptr.dev/contributing) | [故障排查](https://pptr.dev/troubleshooting)

## 安装

```bash npm2yarn
npm i puppeteer # 安装期间自动下载兼容的 Chrome 浏览器。
npm i puppeteer-core # 或者,作为纯库安装,不下载 Chrome。
```

> **注意**
>
> 现代包管理器(包括 npm(参见该 [RFC](https://github.com/npm/rfcs/pull/868))、pnpm、Yarn、Bun 和 Deno)默认会阻止依赖的安装脚本。如果安装脚本被拦截,Puppeteer 将不会在安装过程中下载浏览器,进而导致运行时错误。
>
> 你可以在安装完成后手动下载所需的浏览器:
>
> ```bash npm2yarn
> npx puppeteer browsers install
> ```
>
> 或者,你也可以配置包管理器以允许安装脚本运行(例如在 npm 中,将 `"puppeteer"` 加入 `package.json` 的 `"allowScripts"`)。

## MCP

安装 [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp)——一个基于 Puppeteer 的 MCP 服务器,可用于浏览器自动化与调试。

Puppeteer 同时支持实验性的 [WebMCP](https://pptr.dev/guides/webmcp) API。

## 示例

```ts
import puppeteer from 'puppeteer';
// 或 import puppeteer from 'puppeteer-core';

// 启动浏览器并打开一个新的空白页面。
const browser = await puppeteer.launch();
const page = await browser.newPage();

// 将页面导航到一个 URL。
await page.goto('https://developer.chrome.com/');

// 设置屏幕尺寸。
await page.setViewport({width: 1080, height: 1024});

// 使用键盘打开搜索菜单。
await page.keyboard.press('/');

// 通过无障碍输入名称向搜索框输入内容。
await page.locator('::-p-aria(Search)').fill('automate beyond recorder');

// 等待并点击第一条结果。
await page.locator('.devsite-result-item-link').click();

// 用唯一字符串定位完整标题。
const textSelector = await page
  .locator('::-p-text(Customize and automate)')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// 打印完整标题。
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
```

## 相关链接

- 原项目仓库:https://github.com/puppeteer/puppeteer
- 官方文档:https://pptr.dev
- npm 包:https://npmjs.org/package/puppeteer

---

> 本文件为 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 官方 README 的中文翻译版本,所有代码与内容版权归原项目作者所有,遵循其原始许可证(Apache-2.0)。

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

**如果觉得有用,请给原项目点个 Star!** ⭐
