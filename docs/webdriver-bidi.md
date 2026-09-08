> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# WebDriver BiDi 支持

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) 是一个正在开发中的新一代跨浏览器自动化协议,目标是融合 WebDriver "Classic" 与 CDP 双方之所长。WebDriver BiDi 支持双向通信,默认即具备高速度,并自带丰富的底层控制能力。

## 同时自动化 Chrome 与 Firefox

Puppeteer 支持用 WebDriver BiDi 自动化 Chrome 和 Firefox。用 Puppeteer 启动 Firefox 时,默认启用 WebDriver BiDi 协议;启动 Chrome 时默认仍使用 CDP,因为并非所有 CDP 特性都已获得 WebDriver BiDi 支持。如果某个 Puppeteer 特性暂不支持通过 WebDriver BiDi 使用,会抛出
[`UnsupportedOperation`](https://pptr.dev/api/puppeteer.unsupportedoperation)
错误。WebDriver BiDi 的支持范围另见下方列表。

## 快速开始

下面是用 WebDriver BiDi 启动 Firefox 或 Chrome 的示例:

```ts
import puppeteer from 'puppeteer';

const firefoxBrowser = await puppeteer.launch({
  browser: 'firefox', // 默认使用 WebDriver BiDi。
});
const page = await firefoxBrowser.newPage();
...
await firefoxBrowser.close();

const chromeBrowser = await puppeteer.launch({
  browser: 'chrome',
  protocol: 'webDriverBiDi', // Chrome 默认使用 CDP。
});
const page = await chromeBrowser.newPage();
...
await chromeBrowser.close();
```

## 通过 WebDriver BiDi 暂不支持的 Puppeteer 特性

- 各类仿真(emulation)
  - Page.emulate()
  - Page.emulateCPUThrottling()
  - Page.emulateIdleState()
  - Page.emulateMediaFeatures()
  - Page.emulateMediaType()
  - Page.emulateVisionDeficiency()
  - Page.setBypassCSP()

- CDP 专属特性
  - HTTPRequest.client()
  - HTTPRequest.resourceType()
  - Page.createCDPSession()
  - Page.extensionRealms()
  - Page.triggerExtensionAction()
  - Frame.extensionRealms()
  - Realm.extension()
  - Realm.realmId()

- 无障碍(Accessibility)
- 覆盖率(Coverage)
- 追踪(Tracing)

- 其他方法:
  - Frame.waitForDevicePrompt()
  - HTTPResponse.buffer()
  - HTTPResponse.content()
  - HTTPResponse.text()
  - HTTPResponse.fromServiceWorker()
  - HTTPResponse.securityDetails()
  - Input.drag()
  - Input.dragAndDrop()
  - Input.dragOver()
  - Input.drop()
  - Page.emulateNetworkConditions()
  - Page.isDragInterceptionEnabled()
  - Page.isServiceWorkerBypassed()
  - Page.metrics()
  - Page.queryObjects()
  - Page.screencast()
  - Page.setBypassServiceWorker()
  - Page.setDragInterception()
  - Page.setOfflineMode()
  - Page.waitForDevicePrompt()
  - PageEvent.popup

## 通过 WebDriver BiDi 完全支持的 Puppeteer 特性

- 浏览器自动化
  - Browser.close()
  - Browser.userAgent()
  - Browser.version()
  - Puppeteer.launch()

- 页面自动化
  - Frame.goto()(除 `referer` 与 `referrerPolicy`)
  - Page 'popup' 事件
  - Page.bringToFront()
  - Page.cookies()
  - Page.deleteCookie()
  - Page.goBack()
  - Page.goForward()
  - Page.goto(除 `referer` 与 `referrerPolicy`)
  - Page.reload(除 `ignoreCache` 参数)
  - Page.setCacheEnabled()
  - Page.setCookie()
  - Page.setExtraHTTPHeaders()
  - Page.setGeolocation()
  - Page.setViewport(仅 `width`、`height`、`deviceScaleFactor`)
  - Page.waitForFileChooser()
  - Page.workers()
  - PageEvent.WorkerCreated
  - PageEvent.WorkerDestroyed
  - Target.opener()

- [脚本执行](https://pptr.dev/guides/evaluate-javascript):
  - JSHandle.evaluate()
  - JSHandle.evaluateHandle()
  - Page.evaluate()
  - Page.evaluateOnNewDocument()
  - Page.exposeFunction()

- [选择器](https://pptr.dev/guides/query-selectors)与[定位器](https://pptr.dev/guides/locators)(ARIA 除外):
  - Page.$
  - Page.$$
  - Page.$$eval
  - Page.$eval
  - Page.waitForSelector
  - Page.locator() 及所有 locator API

- 输入
  - ElementHandle.click
  - ElementHandle.uploadFile
  - Keyboard.down
  - Keyboard.press
  - Keyboard.sendCharacter
  - Keyboard.type
  - Keyboard.up
  - 鼠标事件(专用的拖放 API 方法除外)
  - Page.tap
  - TouchScreen.*

- JavaScript 对话框拦截
  - page.on('dialog')
  - Dialog.*

- 截图(并非所有参数都受支持)
  - Page.screenshot(支持 `clip`、`encoding`、`fullPage`)

- PDF 生成(并非所有参数都受支持)
  - Page.pdf(仅支持 `format`、`height`、`landscape`、`margin`、`pageRanges`、`printBackground`、`scale`、`width`)
  - Page.createPDFStream(仅支持 `format`、`height`、`landscape`、`margin`、`pageRanges`、`printBackground`、`scale`、`width`)

- 权限
  - BrowserContext.clearPermissionOverrides()
  - BrowserContext.overridePermissions()

- 各类仿真
  - Page.emulateTimezone()
  - Page.isJavaScriptEnabled()
  - Page.setJavaScriptEnabled()

- [请求拦截](https://pptr.dev/guides/request-interception)
  - HTTPRequest.abort()(不支持自定义错误)
  - HTTPRequest.abortErrorReason()
  - HTTPRequest.continue()
  - HTTPRequest.continueRequestOverrides()
  - HTTPRequest.failure()
  - HTTPRequest.finalizeInterceptions()
  - HTTPRequest.interceptResolutionState()
  - HTTPRequest.isInterceptResolutionHandled()
  - HTTPRequest.respond()
  - HTTPRequest.responseForRequest()
  - Page.authenticate()
  - Page.setRequestInterception()
  - Page.setUserAgent()

## 另请参阅

- [WebDriver BiDi - The future of cross-browser automation](https://developer.chrome.com/articles/webdriver-bidi/)
- [WebDriver BiDi: 2023 status update](https://developer.chrome.com/blog/webdriver-bidi-2023/)
- [Puppeteer Support for the Cross-Browser WebDriver BiDi Standard](https://hacks.mozilla.org/2023/12/puppeteer-webdriver-bidi/)
