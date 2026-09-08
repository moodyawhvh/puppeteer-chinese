> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# 示例与使用场景

## 官方示例

[Puppeteer 仓库](https://github.com/puppeteer/puppeteer/tree/main/examples)包含少量由 Puppeteer 团队维护的示例。

按照 README 中的说明即可运行这些示例,涵盖从网页生成 PDF、生成截图、拦截请求等使用场景。

## 示例合集

在 Puppeteer 的专属[示例仓库](https://github.com/puppeteer/examples)中可以找到一组非结构化的示例。

该合集是随时间不断积累的示例集合,涵盖各种使用场景,例如把 Puppeteer 进程中的事件转发到浏览器、与页面元素交互、执行 CDP 命令等。

## 其他项目、文章与演示

以下列表收录了渲染、网页抓取、测试等类别的使用场景与示例。

### 渲染与网页抓取

- **[Puppetron](https://github.com/cheeaun/puppetron)**:演示站点,展示如何用 Puppeteer 和 Headless Chrome 渲染页面。灵感来自
  [GoogleChrome/rendertron](https://github.com/GoogleChrome/rendertron)。
- **[Thal](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)**:
  使用 Puppeteer 和 Chrome Headless 进行网页抓取的入门文章。
- **[pupperender](https://github.com/LasaleFamine/pupperender)**:Express
  中间件,检查传入请求的 User-Agent 头,若匹配一组可配置的爬虫之一,就用 Puppeteer 渲染页面。对 PWA 渲染很有用。
- **[headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)**:
  提供 Headless Chrome 操控 API 的爬虫,可以爬取动态网站。
- **[Checkly 的 Puppeteer 示例](https://web.archive.org/web/20240811200732/https://www.checklyhq.com/learn/headless/basics-puppeteer-intro/)**:
  面向真实场景的端到端 Puppeteer 示例,例如从网页提取有用信息、常见登录流程等。
- **[browserless](https://github.com/browserless/browserless)**:以服务形式提供的
  Headless Chrome,支持远程执行 Puppeteer 脚本。
- **[Puppeteer on AWS Lambda](https://github.com/jay-deshmukh/headless-chrome-with-puppeteer-on-AWS-lambda-with-serverless-framework)**:
  用 Serverless 框架在 AWS Lambda 上运行 Puppeteer。
- **[Apify SDK](https://github.com/apifytech/apify-js)**:面向 JavaScript 的可扩展网页爬取与抓取库。自动管理 Puppeteer 浏览器池,并提供错误处理、任务管理、代理轮换等功能。

### 测试

- **[angular-puppeteer-demo](https://github.com/Quramy/angular-puppeteer-demo)**:
  演示如何在 Karma 中使用 Puppeteer 的示例仓库。
- **[mocha-headless-chrome](https://github.com/direct-adv-interfaces/mocha-headless-chrome)**:
  通过 Headless Chrome 在命令行运行客户端 mocha 测试的工具。
- **[puppeteer-to-istanbul-example](https://github.com/bcoe/puppeteer-to-istanbul-example)**:
  演示如何以 Istanbul 格式输出 Puppeteer 覆盖率数据的示例仓库。
- **[jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)**:(几乎)
  零配置即可搭建并运行 Jest 与 Puppeteer 的工具,还附带一个面向 Puppeteer 的断言库。
- **[puppeteer-har](https://github.com/Everettss/puppeteer-har)**:用 puppeteer 生成
  HAR 文件。
- **[puppetry](https://puppetry.app/)**:无需编码即可构建 Puppeteer 与 Jest 驱动测试的桌面应用。
- **[puppeteer-loadtest](https://github.com/svenkatreddy/puppeteer-loadtest)**:
  对 Puppeteer 脚本执行负载测试的命令行工具。
- **[cucumber-puppeteer-example](https://github.com/mlampedx/cucumber-puppeteer-example)**:
  演示如何用 Puppeteer 与 Cucumber 做集成测试的示例仓库。
