> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# 安装

在你的项目中使用 Puppeteer,执行:

```bash npm2yarn
npm i puppeteer
```

安装 Puppeteer 时,它会自动下载一个较新版本的
[Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/)(macOS 约 170MB,Linux 约 282MB,Windows 约 280MB),以及一个 `chrome-headless-shell` 二进制文件(自 Puppeteer v21.6.0 起),后者[保证可以与](https://pptr.dev/faq#q-why-doesnt-puppeteer-vxxx-work-with-a-certain-version-of-chrome-or-firefox) Puppeteer 配合工作。从 Puppeteer v19.0.0 起,浏览器默认下载到 `$HOME/.cache/puppeteer` 文件夹。控制下载行为的配置选项与环境变量见[配置文档](https://pptr.dev/api/puppeteer.configuration)。

:::caution

### 自动下载可能被拦截

许多现代包管理器(例如遵循新 [RFC](https://github.com/npm/rfcs/pull/868) 的 npm、pnpm、Yarn Berry、Bun 和 Deno)默认会阻止依赖的安装脚本。如果你的包管理器被配置为阻止这些脚本,自动下载会被跳过,运行 Puppeteer 时会抛出错误:`Could not find Chrome (ver. ...)`。

解决方法:

1. **在安装依赖之后手动安装浏览器**,运行:
   ```bash npm2yarn
   npx puppeteer browsers install
   ```
2. **重新允许** Puppeteer 运行 postinstall 脚本(例如对 npm 而言,在 `package.json` 的 `"allowScripts"` 中加入 `"puppeteer"`):
   ```json
   {
     "allowScripts": {
       "puppeteer": true
     }
   }
   ```

:::

自 v1.7.0 起,每个版本我们都会发布两个包:

- [`puppeteer`](https://www.npmjs.com/package/puppeteer)
- [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core)

`puppeteer` 是一个浏览器自动化_产品_。安装它会下载一个版本的 Chrome,然后通过 `puppeteer-core` 来驱动它。作为面向最终用户的产品,`puppeteer` 使用合理的默认值自动化了多种工作流程,而这些默认值[可以自定义](https://pptr.dev/guides/configuration)。

`puppeteer-core` 是一个_库_,用来驱动任何支持 DevTools 协议的东西。作为库,`puppeteer-core` 完全通过编程接口驱动,不假设任何默认值,安装时也不会下载 Chrome。

如果你要[连接远程浏览器](https://pptr.dev/api/puppeteer.puppeteer.connect)或者[自己管理浏览器](https://pptr.dev/browsers-api),就应该用 `puppeteer-core`。自己管理浏览器时,你需要调用
[`puppeteer.launch`](https://pptr.dev/api/puppeteer.puppeteernode.launch) 并显式传入
[`executablePath`](https://pptr.dev/api/puppeteer.launchoptions)
(如果浏览器安装在标准位置,也可以用 [`channel`](https://pptr.dev/api/puppeteer.launchoptions))。

使用 `puppeteer-core` 时,记得修改导入语句:

```ts
import puppeteer from 'puppeteer-core';
```
