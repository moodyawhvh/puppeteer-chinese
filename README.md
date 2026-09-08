<div align="center">

# puppeteer 中文翻译版

**[中文版] puppeteer — 控制 Chrome 与 Firefox 的 JavaScript 高级 API 浏览器自动化库**

[![原项目](https://img.shields.io/badge/原项目-puppeteer--puppeteer-blue?style=flat-square&logo=github)](https://github.com/puppeteer/puppeteer)
[![中文文档](https://img.shields.io/badge/中文文档-README.zh--CN.md-orange?style=flat-square)](README.zh-CN.md)
[![GitHub Stars](https://img.shields.io/github/stars/puppeteer/puppeteer?style=flat-square&label=原项目Stars)](https://github.com/puppeteer/puppeteer/stargazers)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

---

> 这是 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 的中文翻译版本。
> 完整源代码请访问原项目:https://github.com/puppeteer/puppeteer

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

## 📖 项目简介

Puppeteer 是一个 JavaScript 库,通过 [DevTools 协议](https://chromedevtools.github.io/devtools-protocol/) 或 [WebDriver BiDi](https://pptr.dev/webdriver-bidi) 提供控制 Chrome 或 Firefox 浏览器的高级 API。它默认以无头(headless,无可见界面)模式运行,广泛用于网页自动化、爬虫抓取、页面截图、PDF 生成与自动化测试等场景。本仓库是原项目的中文翻译介绍版本,方便中文开发者快速理解与上手。

## ✨ 主要特性

- 提供**高级 API**,可对 Chrome / Firefox 进行精细化控制
- 基于 DevTools 协议与 WebDriver BiDi 双协议驱动浏览器
- 默认无头模式运行,也可切换为有头模式便于调试
- 安装 `puppeteer` 时自动下载匹配版本的浏览器
- 可改用 `puppeteer-core` 作为纯库安装,不附带浏览器
- 支持页面导航、视口设置、键盘输入、元素定位与点击等完整操作链
- 支持 [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp) MCP 服务器,用于浏览器自动化与调试
- 实验性支持 [WebMCP](https://pptr.dev/guides/webmcp) API
- 官方文档、API 参考、FAQ、贡献指南与故障排查齐全([pptr.dev](https://pptr.dev))

## 📁 文件说明

| 文件 | 说明 |
|:-----|:-----|
| README.md | 本文件(中文简介) |
| README.zh-CN.md | 详细中文文档(完整汉化) |

## 🚀 快速开始

1. 安装完整版(自动下载兼容的 Chrome):

```bash
npm i puppeteer
```

2. 或安装纯库版(不下载浏览器):

```bash
npm i puppeteer-core
```

3. 若包管理器拦截了安装脚本(npm/pnpm/Yarn/Bun/Deno 新版默认拦截),安装后手动下载浏览器:

```bash
npx puppeteer browsers install
```

4. 也可以在 `package.json` 的 `"allowScripts"` 中加入 `"puppeteer"` 允许安装脚本执行。

5. 跑一个最小示例:

```ts
import puppeteer from 'puppeteer';
// 或 import puppeteer from 'puppeteer-core';

// 启动浏览器并打开一个空白页
const browser = await puppeteer.launch();
const page = await browser.newPage();

// 导航到指定 URL
await page.goto('https://developer.chrome.com/');

// 设置屏幕尺寸
await page.setViewport({width: 1080, height: 1024});

// 用键盘打开搜索菜单
await page.keyboard.press('/');

// 通过无障碍输入名称定位搜索框并输入
await page.locator('::-p-aria(Search)').fill('automate beyond recorder');

// 等待并点击第一条结果
await page.locator('.devsite-result-item-link').click();

// 用唯一字符串定位完整标题
const textSelector = await page
  .locator('::-p-text(Customize and automate)')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// 打印标题
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
```

6. 想用 MCP 方式驱动浏览器?安装 [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp) 即可。

完整源代码与最新版本请访问原项目:https://github.com/puppeteer/puppeteer

## 📞 联系方式

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

本项目为 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 的中文翻译版本,所有代码版权归原项目作者所有,遵循其原始许可证(Apache-2.0)。

**如果觉得有用,请给原项目点个 Star!** ⭐
