> 🌐 本文档由 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 翻译,英文原版见原项目。
>
> 注:原文超过 10000 字符,以下为核心章节的完整翻译;"面向项目维护者"部分(滚动 Chrome 版本、发布 npm、bug 分诊)为要点式简要翻译,细节请以英文原版为准。

# 参与贡献

首先,感谢你对 Puppeteer 的关注!我们非常乐意接受你的补丁和贡献!

## 贡献者许可协议(CLA)

对本项目的贡献必须附带贡献者许可协议。你(或你的雇主)保留贡献的版权,该协议只是授权我们将你的贡献作为项目的一部分使用和再分发。前往 &lt;[https://cla.developers.google.com/](https://cla.developers.google.com/)&gt; 查看你已签署的协议或签署新协议。

通常只需提交一次 CLA——如果你已经提交过(哪怕是给其他项目的),大概率无需再次提交。

## 开始上手

1. 克隆本仓库

   ```bash
   git clone https://github.com/puppeteer/puppeteer
   cd puppeteer
   ```

   或者

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=90796663&machine=standardLinux32gb&devcontainer_path=.devcontainer%2Fdevcontainer.json)

2. 安装依赖

   ```bash
   npm install
   # 或者默认下载 Firefox
   PUPPETEER_BROWSER=firefox npm install
   ```

3. 构建所有包

   ```bash
   npm run build
   ```

4. 运行全部测试

   ```bash
   npm test
   ```

## 构建单个包

构建单个包,可以运行:

```bash
npm run build --workspace <package> # 例如 puppeteer
```

所有依赖包会自动构建,因此只需指定一个包。这要归功于
[wireit](https://github.com/google/wireit),它的行为类似
[GNU Make](https://www.gnu.org/software/make/)。

### 监视模式

持续构建某个包,可以运行:

```bash
npm run build --watch --workspace <package> # 例如 puppeteer
```

只能指定一个要监视的包,否则行为会不符合预期。如上所述,得益于 [wireit](https://github.com/google/wireit),变更发生时所有依赖都会被构建或重建(如有需要)。

## 清理过期产物

某些生成产物(例如 `packages/puppeteer-core/src/types.ts`)可能过期,因为它们依赖构建系统无法捕捉的复杂条件(例如不同文件的名称)。清理产物可以运行:

```bash
npm run clean
# 或指定包
npm run clean --workspace <package>
```

## 全面测试

除 `npm test` 之外,还有若干其他
[`npm` 脚本](https://docs.npmjs.com/cli/using-npm/scripts)通常由 CI 检查:

- `test-install` - 测试 `puppeteer` 与 `puppeteer-core` 是否正确安装且可用。
- `test-types` - 使用
  [`tsd`](https://github.com/SamVerschueren/tsd) 测试 `puppeteer` 的 TypeScript 类型。
- `test:chrome:**` - 在 Chrome 上测试 `puppeteer`。
- `test:firefox:**` - 在 Firefox 上测试 `puppeteer`。
- `unit` - 运行单元测试。

默认的 `npm test` 运行 `test:{chrome,firefox}:headless`,通常已经足够。

Puppeteer 在 Mocha 之上使用了一个自定义测试运行器,它会查阅
[TestExpectations.json](https://github.com/puppeteer/puppeteer/blob/main/test/TestExpectations.json)
来判断某个测试结果是否符合预期。测试运行器的更多信息见
[`tools/mocha-runner`](https://github.com/puppeteer/puppeteer/tree/main/tools/mocha-runner)。

### 单元测试

只测试代码本身(不启动浏览器)的测试放在被测类旁边,使用 Node 测试运行器执行(需要 Node 22+):

```bash
npm run unit
```

## 代码评审

所有提交(包括项目成员的提交)都需要评审。我们使用 GitHub 拉取请求来完成这一流程。有关拉取请求的更多信息请查阅
[GitHub Help](https://help.github.com/articles/about-pull-requests/)。

## 代码风格

我们的编码风格完整定义在
[`eslint.config`](https://github.com/puppeteer/puppeteer/blob/main/eslint.config.mjs)
([ESLint](https://eslint.org/))和
[`prettier.config.js`](https://github.com/puppeteer/puppeteer/blob/main/prettier.config.js)
([Prettier](https://prettier.io))中。

PR 的代码会被自动检查,你也可以手动检查:

```bash
npm run lint
```

如果返回了错误,可以尝试用以下命令修复:

```bash
npm run format
```

## 项目结构

以下是 Puppeteer 主要文件夹的说明:

- `packages` 包含所有公开源代码。
- `test` 包含所有测试源代码。
- `test-d` 包含使用
  [`tsd`](https://github.com/SamVerschueren/tsd) 的类型测试。
- `tools` 包含构建等用途的杂项脚本。
- `tools/mocha-runner` - 包含我们测试运行器的源代码。

## API 指南

编写新的 API 方法时,请考虑:

- 只暴露尽可能少的信息。拿不准时,就不要暴露新信息。
- 方法优先于 getter/setter。
  - 唯一例外是命名空间,例如 `page.keyboard` 和 `page.coverage`。
- 所有字符串字面量必须小写,包括事件名和选项值。
- 避免添加"语法糖" API(用户空间可以轻易实现的 API),除非需求**极其**强烈。

## 提交信息

提交信息应遵循
[Conventional Commits 格式](https://www.conventionalcommits.org/en/v1.0.0/#summary)。

特别地,破坏性变更必须在提交信息页脚中用 "BREAKING CHANGE:" 明确标注。示例:

```
fix(page): fix page.pizza method

This patch fixes page.pizza so that it works with iframes.

Issues: #123, #234

BREAKING CHANGE: page.pizza now delivers pizza at home by default.
To deliver to a different location, use the "deliver" option:
  `page.pizza({deliver: 'work'})`.
```

## 编写文档

文档由 TSDoc 注释通过 `npm run docs` 生成,合并后自动发布到文档站点,发版时生成对应版本。

因此,请不要手动修改 `docs/api` 中的 markdown 文件。

## 编写 TSDoc 注释

对 Puppeteer 的每处改动都应当用 TSDoc 注释充分文档化。确切语法请参考
[API Extractor 文档](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/)。

- 每个新方法都需要添加 `@public` 或 `@internal` 标签,取决于它是否属于公开 API。
- 注释每行不超过 90 个字符(超出会被 ESLint 警告)。VSCode 用户强烈推荐
  [Rewrap 插件](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap)!

## 本地运行文档站点

1. 在仓库根目录执行 `npm i --ignore-scripts` 安装全部依赖。
2. 运行 `npm run docs`,它会在 `puppeteer/docs/api` 下生成所有 `.md` 文件。
3. 在 `puppeteer/website` 中运行 `npm i`。
4. 在 `puppeteer/website` 中运行 `npm start`。

## 添加新依赖

对所有依赖(运行时与开发依赖)而言:

- 如果所需功能很容易自己实现,**不要**添加依赖。
- 若确需添加,它必须维护良好且值得信任。

引入新的运行时依赖门槛尤其高:

- 除非对项目成败至关重要,**不要**添加运行时依赖。

对环境无关的依赖还有额外注意事项,详见
[`third_party/README.md`](https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/third_party/README.md)。

## 测试建议

- 每个功能都应附带测试。
- 每个公开 API 事件/方法都应附带测试。
- 测试不应依赖外部服务。
- 测试应能在三个平台上运行:Mac、Linux 和 Windows。这对截图类测试尤其重要。

如果某个测试在某些配置下预期失败或变得不稳定,请更新
[TestExpectations.json](https://github.com/puppeteer/puppeteer/blob/main/test/TestExpectations.json)
来反映这一点。更多信息见
[`tools/mocha-runner`](https://github.com/puppeteer/puppeteer/tree/main/tools/mocha-runner)。

## API 覆盖率

每个公开 API 方法或事件都应在测试中至少被调用一次。为此,主 `test` 命令会在测试期间运行覆盖率检查。

## 调试 Puppeteer

参见[调试技巧](https://pptr.dev/guides/debugging)。

### 通过 VSCode 调试 Puppeteer 测试

把自带的 `.vscode/launch.template.json` 复制为 `.vscode/launch.json`,然后用 VSCode 集成调试器调试测试。

启动前记得先构建测试:

```bash
npm run build --workspace @puppeteer-test/test
```

# 面向项目维护者(要点式简要翻译)

- **滚动新版 Chrome**:存在一个每天运行一次的 [GitHub action](https://github.com/puppeteer/puppeteer/blob/main/.github/workflows/update-browser-pins.yml),可在 [Actions 标签页](https://github.com/puppeteer/puppeteer/actions/workflows/update-browser-pins.yml)手动触发;也可本地运行 [`tools/update_browser_revision.mjs`](https://github.com/puppeteer/puppeteer/blob/main/tools/update_browser_revision.mjs)(脚本依赖 `fetch`,可能需要 `node --experimental-fetch`)。
  手动流程要点:1) 从 https://googlechromelabs.github.io/chrome-for-testing/ 或 https://chromiumdash.appspot.com/ 找到合适的 Chrome `revision` 与 `version`;2) 更新 `packages/puppeteer-core/src/revisions.ts`;3) 更新 `versions.json` 的 Chrome-Puppeteer 版本映射及 `lastMaintainedChromeVersion`;4) 运行 `npm run check`,失败则更新 `devtools-protocol` 期望版本并 `npm install`;5) `npm run clean`、`npm install`、`npm run build`;6) `npm test`,失败时对上游变更做二分定位,更新测试期望或在 Puppeteer 中规避;7) 提交推送并开 PR,提交信息须含 `Chrome <version>`(如 `feat(chrome): roll to Chrome 90.0.4427.0`)以便 [pptr.dev](https://pptr.dev/) 解析。
  上游二分:用 https://www.chromium.org/developers/bisect-builds-py/,或直接用 `npx puppeteer browsers bisect -g <known-good> -b <known-bad>`(在 Puppeteer 仓库根目录执行)。
- **发布到 npm**:使用 [release-please](https://github.com/googleapis/release-please) 自动化发布;发布时到 [pull requests](https://github.com/puppeteer/puppeteer/pulls) 找到 release PR 并合并。若 release-please 失败:1) 为每个应发布的包补全 CHANGELOG 缺失内容(如版本标题行,格式见英文原版示例);2) 依照既往惯例为每个包创建 GitHub release。
- **bug 分诊指南**:检查没有 `confirmed` 或 `needs-feedback` 标签的[新进报告](https://github.com/puppeteer/puppeteer/issues):1) 确认 issue 标注了 `bug` 或 `feature`;2) 缺少清晰复现或无法复现时,索取复现并打 `needs-feedback`;3) 跟进此前索取过反馈的 issue;4) 用户无反馈则最终由 stale bot 关闭;5) 能复现则打 `confirmed`;6) 属 Chromium 侧的 bug,建对应 crbug.com issue,给 GitHub issue 打 `upstream` 并在评论中贴 crbug.com 链接;7) 与 Puppeteer 和 Chromium 都无关的 issue 直接关闭;8) 文档缺失/错误的 issue 打 `documentation`。
  PDF 相关 issue:1) 若常规打印对话框和/或有头模式下可复现,向 crbug.com 的 `Blink>Layout` 组件提单;2) 若仅 Headless 模式特有,向 `Internals>Headless` 组件提单。
