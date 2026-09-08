> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# 快速上手

用过其他浏览器自动化/测试框架的人会对 Puppeteer 感到非常熟悉。你先
[启动](https://pptr.dev/api/puppeteer.puppeteernode.launch)(launch)或
[连接](https://pptr.dev/api/puppeteer.puppeteernode.connect)(connect)一个
[浏览器](https://pptr.dev/api/puppeteer.browser)(browser),
[创建](https://pptr.dev/api/puppeteer.browser.newpage)若干
[页面](https://pptr.dev/api/puppeteer.page)(page),然后用
[Puppeteer 的 API](https://pptr.dev/api) 操控它们。

下面的示例会在 [developer.chrome.com](https://developer.chrome.com/) 上搜索包含文本 "automate beyond recorder" 的博客文章,点击第一条结果,并打印这篇博客的完整标题。

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

想深入了解用法,请查阅我们的[文档](https://pptr.dev/docs)和
[示例](https://github.com/puppeteer/puppeteer/tree/main/examples)。
