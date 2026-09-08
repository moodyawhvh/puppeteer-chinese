> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。

# 安全策略

Puppeteer 项目高度重视安全。请使用 [Chromium 的安全漏洞报告流程](https://www.chromium.org/Home/chromium-security/reporting-security-bugs/)来报告安全问题。

## 范围

Puppeteer 提供了强大的浏览器安装、自动化与检查能力,确保这些能力被安全、按预期地使用是调用方代码的责任。

本项目中若干 API 能够执行诸如向磁盘写入文件(例如通过浏览器下载或截图)或动态加载 Chrome 扩展等操作。这些是有意设计、有文档说明的功能,不属于漏洞。特别地,中间人(MITM)攻击,以及通过本地访问操纵 Puppeteer 或浏览器下载,均不被视为漏洞。

我们欢迎开发者就"如何让这个工具帮助构建更安全的用户体验"提出反馈与建议,但此类内容一律按功能请求处理,而不视为 Puppeteer 本身的漏洞。
