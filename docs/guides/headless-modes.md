> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# 无头模式(Headless mode)

默认情况下,Puppeteer 以
[无头模式](https://developer.chrome.com/docs/chromium/new-headless/)
启动浏览器。

```ts
const browser = await puppeteer.launch();
// 等价于
const browser = await puppeteer.launch({headless: true});
```

在 v22 之前,Puppeteer 默认启动的是[旧版无头模式](https://developer.chrome.com/docs/chromium/new-headless/)。旧版无头模式现在称为
[`chrome-headless-shell`](https://developer.chrome.com/blog/chrome-headless-shell),以独立二进制文件的形式发布。`chrome-headless-shell` 与常规 Chrome 的行为不完全一致,但对不需要完整 Chrome 功能集的自动化任务而言,它目前性能更好。如果你的使用场景更看重性能,可按如下方式切换到 `chrome-headless-shell`:

```ts
const browser = await puppeteer.launch({headless: 'shell'});
```

要启动"有头"(headful)版本的 Chrome,在启动浏览器时把
[`headless`](https://pptr.dev/api/puppeteer.launchoptions) 选项设为 `false`:

```ts
const browser = await puppeteer.launch({headless: false});
```
