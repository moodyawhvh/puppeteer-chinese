> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# 常见问题(FAQ)

## 问:Puppeteer 由谁维护?

Puppeteer 由 Chrome 浏览器自动化团队维护,但我们非常欢迎你为项目贡献帮助和专长!参见我们的
[贡献指南](https://pptr.dev/contributing)。

## 问:跨浏览器支持目前是什么状态?

从 Puppeteer v23.0.0 开始,Puppeteer 同时支持 Chrome 和 Firefox。

自动化 Chrome 时,Puppeteer 默认使用 Chrome DevTools 协议(CDP),但也可以改用 WebDriver BiDi;自动化 Firefox 则默认使用 WebDriver BiDi。

关于 API 支持上的细微差异,请参考我们的
[WebDriver BiDi 指南](https://pptr.dev/webdriver-bidi)。

## 问:Puppeteer 支持 WebDriver BiDi 吗?

从 Puppeteer v23.0.0 起,Puppeteer 已提供可用于生产环境的 WebDriver BiDi 支持,可以同时自动化 Chrome 和 Firefox。

## 问:Puppeteer 会继续支持 CDP 吗?

尽管 Puppeteer 已经支持 WebDriver BiDi,我们不会停止支持用 CDP 自动化 Chrome——这是为了不破坏已有依赖 CDP 的自动化流程,同时也是为了继续支撑那些 Chrome 独有、尚未被 WebDriver BiDi 标准化的自动化场景。

## 问:Puppeteer 的目标和原则是什么?

项目目标包括:

- 提供一个参考实现,展示
  [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/)
  和 [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) 协议的能力。
- 推动自动化跨浏览器测试的普及。
- 帮助"吃自己的狗粮",验证新的 DevTools 协议和 WebDriver BiDi 特性……顺便抓 bug!
- 深入了解自动化浏览器测试的痛点,并帮助填补这些空白。

我们借鉴
[Chromium 原则](https://www.chromium.org/developers/core-principles)来指导产品决策:

- **速度**:Puppeteer 对被自动化页面的性能开销几乎为零。
- **安全**:Puppeteer 相对于浏览器运行在独立进程之外,因此自动化潜在恶意页面也是安全的。
- **稳定**:Puppeteer 不应该行为飘忽,也不应该泄漏内存。
- **简单**:Puppeteer 提供易于使用、易于理解、易于调试的高层 API。

## 问:Puppeteer 是 Selenium 的替代品吗?

Puppeteer 是一个基于 Node.js 的参考实现,演示如何用 CDP 和 WebDriver BiDi 自动化浏览器——WebDriver BiDi 正是 Selenium 项目同样在参与贡献的 Web 标准。

Selenium 项目在多个方面超出了 Puppeteer 的范围:它提供的语言绑定不止 JavaScript,还提供大规模编排自动化的工具(例如 Selenium Grid)。这两点都不在 Puppeteer 的目标范围内。

有一些社区项目在 Puppeteer 核心之上扩展能力,让测试等工作更方便。例如:

- [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer),或者
- [Puppeteer 的 Angular 集成](https://pptr.dev/integrations/ng-schematics)

## 问:为什么 Puppeteer v.XXX 无法配合某个版本的 Chrome 或 Firefox 工作?

每个 Puppeteer 版本都与一个特定的浏览器版本紧密绑定,以确保与底层协议(Chrome DevTools 协议和 WebDriver BiDi)的实现保持兼容。

这是为了防止 [Chrome](https://pptr.dev/supported-browsers#chrome) 或 [Firefox](https://pptr.dev/supported-browsers#firefox) 的变更意外破坏 Puppeteer。

## 问:Puppeteer 使用哪个版本的 Chrome 和 Firefox?

查看
[revisions.ts](https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/src/revisions.ts)
中的 `chrome` 和 `firefox` 条目。

## 问:什么算一次"导航(Navigation)"?

在 Puppeteer 看来,**"导航"就是任何改变页面 URL 的行为**。除了浏览器访问网络、从 Web 服务器获取新文档这种常规导航之外,它还包括
[锚点导航](https://www.w3.org/TR/html5/single-page.html#scroll-to-fragid)
和 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
的使用。

按照这个"导航"定义,**Puppeteer 可以无缝配合单页应用(SPA)工作。**

## 问:"可信(trusted)"和"不可信(untrusted)"输入事件有什么区别?

在浏览器中,输入事件可以分为两大类:可信与不可信。

- **可信事件**:由用户与页面交互产生的事件,例如使用鼠标或键盘。
- **不可信事件**:由 Web API 产生的事件,例如 `document.createEvent` 或 `element.click()` 方法。

网站可以区分这两类事件:

- 使用
  [`Event.isTrusted`](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)
  事件标志;
- 探测伴随事件。例如,每个可信的 `'click'` 事件之前都会有 `'mousedown'` 和 `'mouseup'` 事件。

就自动化而言,生成可信事件非常重要。**Puppeteer 生成的所有输入事件都是可信的,并且会正确触发伴随事件。**如果出于某些原因你需要不可信事件,随时可以用 `page.evaluate` 进入页面上下文并生成一个模拟事件:

```ts
await page.evaluate(() => {
  document.querySelector('button[type=submit]').click();
});
```

## 问:Puppeteer 支持媒体和音频播放吗?

Puppeteer 默认使用 [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 二进制文件,自
[M120](https://chromiumdash.appspot.com/commit/12d607016c31ea13579e897740c765be189ed6eb)
起这些构建自带专有编解码器支持。

## 问:我在测试环境中安装/运行 Puppeteer 遇到问题,该去哪里找帮助?

我们有一份针对各类操作系统的
[故障排查](https://pptr.dev/troubleshooting)
指南,其中列出了所需的依赖。

## 问:我还有更多问题!在哪里提问?

通过 Puppeteer 获取帮助有很多途径:

- 提问:[Stack Overflow](https://stackoverflow.com/questions/tagged/puppeteer)
- 报告 bug:[GitHub Issues](https://github.com/puppeteer/puppeteer/issues)

发帖之前,请务必先在这些渠道中搜索一下是否已有答案。
