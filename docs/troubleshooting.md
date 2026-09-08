> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。
>
> 注:原文超过 10000 字符,以下完整翻译常见故障与本地环境章节;"CI/云平台运行"部分(Travis CI、CircleCI、Docker、GitLab CI、GCP、Heroku、AWS 等)为要点式简要翻译,完整配置示例请以英文原版为准。

# 故障排查

:::note

为保持本页内容不过时,我们在很大程度上依赖社区贡献。如果你发现内容已失效,请提交 PR。

:::

## `Cannot find module 'puppeteer-core/internal/...'`

如果你的 Node.js 版本低于 14,或者你使用了自定义模块解析器(例如
[`jest-resolve`](https://www.npmjs.com/package/jest-resolve)),就可能出现该错误。前者我们不支持已废弃的 Node.js 版本;后者通常升级解析器(或其上层模块,如 `jest`)即可解决(例如
https://github.com/puppeteer/puppeteer/issues/9121)。

## `Could not find expected browser locally`

从 v19.0.0 起,Puppeteer 使用
[`os.homedir`](https://nodejs.org/api/os.html#oshomedir)
把浏览器下载到 `~/.cache/puppeteer`,以便在 Puppeteer 升级之间更好地缓存。一般来说主目录定义明确(Windows 上也是如此),但偶尔主目录可能不可用。这种情况下,我们提供了 `PUPPETEER_CACHE_DIR` 变量,允许你更改安装目录。

例如:

```bash npm2yarn
PUPPETEER_CACHE_DIR=$(pwd) npm install puppeteer
PUPPETEER_CACHE_DIR=$(pwd) node <script-path>
```

你也可以在应用根目录创建一个名为 `.puppeteerrc.js`(或 `puppeteer.config.js`)的配置文件,内容如下:

```js
import {join} from 'path';

/**
 * @type {import("puppeteer").Configuration}
 */
export default {
  cacheDirectory: join(import.meta.dirname, '.cache', 'puppeteer'),
};
```

要让配置生效,需要重新安装 `puppeteer`。更多信息参见 [配置 Puppeteer](./guides/configuration)。

### 安装脚本被阻止

如果你使用的包管理器默认阻止依赖安装脚本(例如遵循新 [RFC](https://github.com/npm/rfcs/pull/868) 的 npm、pnpm、Yarn Berry、Bun 或 Deno),自动下载浏览器的 postinstall 脚本将不会运行。

手动下载所需的浏览器,运行:

```bash npm2yarn
npx puppeteer browsers install
```

或者,更新项目的 `package.json`(以 npm 为例)重新允许运行 postinstall 脚本:

```json
{
  "allowScripts": {
    "puppeteer": true
  }
}
```

## 在 Chrome 中导航到 HTTP URL 时出现 `net::ERR_BLOCKED_BY_CLIENT`

Chrome 正在推出名为 `HttpsFirstBalancedModeAutoEnable` 的功能:当用户导航到 HTTP 站点时会显示警告。该功能在 Puppeteer 默认使用的 Chrome for Testing 构建中默认启用。

该功能会使导航到 HTTP URL 的请求产生 `net::ERR_BLOCKED_BY_CLIENT` 错误,该错误可以被捕获并从中恢复。错误发生时会向用户显示警告页面,上面有一个继续导航的按钮,Puppeteer 可以点击该按钮。本地 HTTP 主机不会触发警告,但远程主机可能会。详情见
https://crbug.com/378022921

可以在启动 Chrome 时传入
`--disable-features=HttpsFirstBalancedModeAutoEnable` 参数来禁用该 Chrome 功能:

```ts
const browser = await puppeteer.launch({
  args: ['--disable-features=HttpsFirstBalancedModeAutoEnable'],
});
```

## Windows 上 Chrome 无法启动

某些 [Chrome 策略](https://support.google.com/chrome/a/answer/7532015)可能强制 Chrome/Chromium 带特定扩展运行。

Puppeteer 默认传入 `--disable-extensions` 标志,在这些策略生效时将无法启动。

要绕过此问题,设置 `enableExtensions` 选项:

```ts
const browser = await puppeteer.launch({
  enableExtensions: true,
});
```

> 背景:
> [issue 3681](https://github.com/puppeteer/puppeteer/issues/3681#issuecomment-447865342)。

## Windows 上 Chrome 报告沙箱错误

Chrome 在 Windows 上使用沙箱,要求下载的 Chrome 文件具备额外权限。从 Puppeteer v22.14.0 起,Puppeteer 会在安装浏览器期间运行 Chrome 提供的 `setup.exe` 工具来配置这些权限。

如果你使用较旧的 Puppeteer 版本,或在浏览器输出中仍看到如下错误:

```
[24452:59820:0508/113713.058:ERROR:sandbox_win.cc(913)] Sandbox cannot access executable. Check filesystem permissions are valid. See https://bit.ly/31yqMJR.: Access is denied. (0x5)
```

可以用 icacls 手动设置权限:

```powershell
icacls "%USERPROFILE%/.cache/puppeteer/chrome" /grant *S-1-15-2-1:(OI)(CI)(RX)
```

:::note

在高安全环境中,应使用更严格的 SID,例如
[安装程序](https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/setup/install_worker.cc;l=74)
中使用的那个。

:::

详情见 https://bit.ly/31yqMJR。

## Linux 上 Chrome 无法启动

确保已安装所有必要的依赖。可以在 Linux 机器上运行 `ldd chrome
| grep not` 检查缺少哪些依赖,常见的列在下面。另外,Chrome 安装器声明的最新依赖列表见
https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json

:::caution

Chrome 目前不提供 Linux arm64 二进制文件,只有 Mac ARM 有 arm64 二进制。这意味着默认下载的 Linux 二进制无法在 Linux arm64 上运行。

:::

<details>
<summary>Debian(例如 Ubuntu)依赖</summary>

```
ca-certificates
fonts-liberation
libasound2
libatk-bridge2.0-0
libatk1.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgbm1
libgcc1
libglib2.0-0
libgtk-3-0
libnspr4
libnss3
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
lsb-release
wget
xdg-utils
```

</details>

<details>
<summary>CentOS 依赖</summary>

```
alsa-lib.x86_64
atk.x86_64
cups-libs.x86_64
gtk3.x86_64
ipa-gothic-fonts
libXcomposite.x86_64
libXcursor.x86_64
libXdamage.x86_64
libXext.x86_64
libXi.x86_64
libXrandr.x86_64
libXScrnSaver.x86_64
libXtst.x86_64
pango.x86_64
xorg-x11-fonts-100dpi
xorg-x11-fonts-75dpi
xorg-x11-fonts-cyrillic
xorg-x11-fonts-misc
xorg-x11-fonts-Type1
xorg-x11-utils
```

安装依赖后,需要用以下命令更新 `nss` 库:

```
yum update nss -y
```

</details>

<details>
  <summary>相关讨论</summary>

- [#290](https://github.com/puppeteer/puppeteer/issues/290) - Debian
  故障排查 <br/>
- [#391](https://github.com/puppeteer/puppeteer/issues/391) - CentOS
  故障排查 <br/>
- [#379](https://github.com/puppeteer/puppeteer/issues/379) - Alpine
  故障排查 <br/>

</details>

## chrome-headless-shell 禁用 GPU 合成

chrome-headless-shell 需要 `--enable-gpu` 才能
[在无头模式下启用 GPU 加速](https://crbug.com/1416283)。

```ts
const browser = await puppeteer.launch({
  headless: 'shell',
  args: ['--enable-gpu'],
});
```

## 为 Chrome 配置 GPU

一般而言,只要系统装了合适的驱动,Chrome 应能自动检测并启用 GPU。更多技巧参见博客 https://developer.chrome.com/blog/supercharge-web-ai-testing。

## 配置 Chrome Linux 沙箱

为了保护宿主环境免受不可信 Web 内容的侵害,Chrome 使用
[多层沙箱](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/design/sandbox.md)。要让它正常工作,需要先正确配置宿主机。如果没有可用的沙箱,Chrome 会崩溃并报错
`No usable sandbox!`。

如果你**完全信任**要在 Chrome 中打开的内容,可以用 `--no-sandbox` 参数启动 Chrome:

```ts
const browser = await puppeteer.launch({
  args: ['--no-sandbox'],
});
```

:::caution

强烈不建议在无沙箱状态下运行。请优先考虑配置沙箱。

:::

**推荐的运行方式是启用沙箱**

### Ubuntu 上 AppArmor 的问题

Ubuntu 23.10+(或将来可能的其他发行版)附带了一个 AppArmor 配置,作用于安装在 /opt/google/chrome/chrome(默认安装路径)的 Chrome 稳定版二进制。该策略存储在 /etc/apparmor.d/chrome。此 AppArmor 策略会阻止 Puppeteer 下载的 Chrome for Testing 二进制使用用户命名空间,导致启动浏览器时报 `No usable sandbox!` 错误。

解决办法见 https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md。

### 使用 [setuid sandbox](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/linux/suid_sandbox_development.md)

:::caution

重要说明:Linux SUID 沙箱几乎(但尚未完全)被移除,见 https://bugs.chromium.org/p/chromium/issues/detail?id=598454。本节内容大部分已过时。

:::

setuid sandbox 是一个独立可执行文件,位于 Puppeteer 下载的 Chrome 旁边。不同 Chrome 版本可以复用同一个沙箱可执行文件,因此以下操作在每个宿主环境上只需执行一次:

```bash
# cd 到 Puppeteer 缓存目录(如果使用其他缓存目录,请调整路径)。
cd ~/.cache/puppeteer/chrome/linux-<version>/chrome-linux64/
sudo chown root:root chrome_sandbox
sudo chmod 4755 chrome_sandbox
# 把沙箱可执行文件复制到共享位置
sudo cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
# 导出 CHROME_DEVEL_SANDBOX 环境变量
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
```

你可能希望默认导出 `CHROME_DEVEL_SANDBOX` 环境变量。这时把下面这行加入 `~/.bashrc` 或 `.zshenv`:

```bash
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
```

或加入你的 `Dockerfile`:

```
ENV CHROME_DEVEL_SANDBOX /usr/local/sbin/chrome-devel-sandbox
```

## CI/云平台运行(要点式简要翻译)

- **Travis CI**:需要启动 [xvfb](https://en.wikipedia.org/wiki/Xvfb) 服务才能以非无头模式运行 Chrome for Testing;Travis 默认在 Xenial Linux 上运行、默认执行 `npm install` 并缓存 `node_modules`。参考配置:`language: node_js`、`node_js: node`、`services: xvfb`、`script: npm test`(历史配置见原版链接)。
- **WSL(Windows 的 Linux 子系统)**:参见 [issue 1837](https://github.com/puppeteer/puppeteer/issues/1837)。核心是补齐缺失依赖:在 WSL 内安装 Chrome 让它顺带装齐依赖,或手动执行 `sudo apt install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2`。注意依赖列表可能过时,且与你已安装的内容有关。
- **CircleCI**:1) 配置使用 [NodeJS 镜像](https://circleci.com/docs/2.0/circleci-images/#nodejs);2) `libXtst6` 等依赖可能需要通过 `apt-get` 安装,可使用 [threetreeslight/puppeteer](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer) orb 或把其源码片段粘进自己的配置;3) 若通过 Jest 使用 Puppeteer 遇到 `Error: spawn ENOMEM`,通常是 Jest 自动探测到了整机进程数(如 `36`)而非容器配额(如 `2`),在测试命令中设置 `jest --maxWorkers=2` 即可。
- **Docker**:Puppeteer 安装的 Chrome for Testing 缺少必要的共享库依赖,需要在 Dockerfile 中补装(完整 Dockerfile 示例见英文原版):安装 google-chrome-stable 及中日韩阿拉伯希伯来泰等字体、创建非特权用户 `pptruser` 以避免 `--no-sandbox`、用 `docker build -t puppeteer-chrome-linux .` 构建、用 `docker run -i --init --rm --cap-add=SYS_ADMIN ... node -e "`cat yourscript.js`"` 运行。
  - **只读容器**:Chrome 启动时会写配置、缓存等文件,只读容器中要确保这些路径指向可写目录,否则 Chrome 可能在 Puppeteer 连接前就失败,常见错误为 `chrome_crashpad_handler: --database is required`。可设置 `ENV XDG_CONFIG_HOME=/tmp/.chromium`、`ENV XDG_CACHE_HOME=/tmp/.chromium`,并用 `userDataDir: '/tmp/.puppeteer-profile'` 指定可写的用户数据目录,或把这些目录挂载为可写卷并保证属主正确。
  - **Alpine**:Chrome 并非开箱即用支持 Alpine,请安装兼容的系统依赖并先行测试(所需系统包列表见原版链接)。注意:Alpine 3.20 当前的 Chromium 版本会导致 Puppeteer 超时,降级到 Alpine 3.19 可解决(见 #11640、#12637、#12189)。做法是找到 Alpine 上[最新的 Chromium 包](https://pkgs.alpinelinux.org/package/edge/community/x86_64/chromium),对照 [Puppeteer 支持的浏览器版本](https://pptr.dev/supported-browsers)选择匹配版本,并设置 `ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser` 跳过 Chrome 下载(完整 Dockerfile 示例见英文原版)。
- **GitLab CI**:常见报错 `Error: Failed to launch chrome! spawn /usr/bin/chromium-browser ENOENT`。两处修改:1) 在 `gitlab-ci.yml` 的 `before_script` 中 `apt-get install` 一批依赖(完整包列表见英文原版);2) 启动时传 `'--no-sandbox'`,即 `puppeteer.launch({ args: ['--no-sandbox'] })`。
- **Google Cloud Run**:默认在 HTTP 响应写回客户端之后会停用 CPU。如果你在响应发出后才"后台启动 puppeteer",它会显得极慢(启动要 1-5 分钟)。正确做法是在响应之前完成 `puppeteer.launch()`,或在服务设置中"始终启用 CPU"(Edit & Deploy Revision > CPU allocation and pricing)。
  - 启动 Chrome 出现奇怪错误时,本地开发可用 `docker run --cap-add=SYS_ADMIN` 运行容器;若僵尸 Chrome 进程堆积,可了解 [dumb-init](https://github.com/Yelp/dumb-init):PID=1 的进程受到特殊处理,某些场景(如 Docker)下难以正确终止 Chrome。
- **Google App Engine(标准环境)**:Node.js 运行时自带运行 Headless Chrome 所需的全部系统包。把 `puppeteer` 加入 `package.json` 依赖,并在应用根目录放一个 `.puppeteerrc.js`,把缓存目录指到 `node_modules/.puppeteer_cache`(代码同前文配置示例);因为 GAE 会在构建间缓存 `node_modules`,这样可以缓解 postinstall 未运行导致找不到浏览器可执行文件的问题。
- **Google Cloud Functions**:同 App Engine,运行时自带所需系统包,配置方法与缓存目录覆盖方式相同。
- **Google Cloud Run(Node.js 运行时)**:默认不带 Headless Chrome 所需系统包,需要自建 `Dockerfile` 并[补齐缺失依赖](#chrome-doesnt-launch-on-linux)。
- **Heroku**:需要额外的依赖。在 Settings > Buildpacks 中添加 Puppeteer Heroku buildpack:https://github.com/jontewks/puppeteer-heroku-buildpack 。启动时确保使用 `'--no-sandbox'`(`puppeteer.launch({ args: ['--no-sandbox'] })`)。若要渲染中日韩字符,可使用带额外字体的 buildpack,如 https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack 。@timleland 另有一份[简明指南](https://timleland.com/headless-chrome-on-heroku/)附示例项目。
- **AWS Lambda**:部署包大小[限制](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)约 50MB,直接跑无头 Chrome(即 Puppeteer)有困难。社区方案:https://github.com/sparticuz/chromium (与厂商和框架无关、支持较新 Chromium 版本的库)。
- **AWS EC2(amazon-linux)**:先启用属于 [EPEL](https://aws.amazon.com/premiumsupport/knowledge-center/ec2-enable-epel/) 的 `amazon-linux-extras`(`sudo amazon-linux-extras install epel -y`),再安装 Chromium(`sudo yum install -y chromium`)。若不启用 EPEL 而让 `npm install` 顺带装 Chromium,会因缺少 `libatk-1.0.so.0` 等包而无法启动。

## 代码转译(Transpilation)问题

如果你使用 babel 或 TypeScript 之类的转译器,向 `evaluate()` 传入 async 函数可能不生效。原因在于 `puppeteer` 使用 `Function.prototype.toString()` 序列化函数,而转译器可能改变输出代码,导致与 `puppeteer` 不兼容。

解决办法是让转译器别动这段代码,例如把 TypeScript 配置为较新的 ECMA 版本(`"target": "es2018"`)。另一个办法是用字符串模板代替函数:

```ts
await page.evaluate(`(async() => {
   console.log('1');
})()`);
```
