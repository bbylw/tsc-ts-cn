# tsc-ts

<p>
  <a href="https://vercel.com/labs#active-experiments"><img alt="Vercel Labs Experiment" src="https://img.shields.io/badge/LABS-EXPERIMENT-0a0a0a.svg?style=for-the-badge&amp;logo=Vercel&amp;labelColor=000000" height="28"></a>
  <a href="https://github.com/vercel-labs/tsc-ts/blob/main/LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/github/license/vercel-labs/tsc-ts.svg?style=for-the-badge&amp;labelColor=000000" height="28"></a>
</p>

这是一个实验性的 TypeScript 移植版本，移植自 TypeScript 7.0.2 编译器（即 [TypeScript-Go](https://github.com/microsoft/typescript-go)，简称 tsgo），并使用 [scriptc](https://scriptc.dev) 编译为原生代码。

## 安装

通过 npm 安装编译器：

```sh
npm install -D tsc-ts
npx tsc-ts -p tsconfig.json
```

`tsc-ts` 包会运行一个原生可执行文件，该文件来自各平台对应的可选依赖（`@tsc-ts/darwin-arm64`、`@tsc-ts/linux-x64-gnu` 等）。详见 [`packages/tsc-ts`](https://github.com/vercel-labs/tsc-ts/blob/main/packages/tsc-ts/README.md)。

发布说明请参见 [CHANGELOG.md](https://github.com/vercel-labs/tsc-ts/blob/main/CHANGELOG.md)，打包归档请参见 [GitHub Releases](https://github.com/vercel-labs/tsc-ts/releases)。

为当前平台构建软件包：

```sh
npm run pack:npm -w tsc-ts             # packages/tsc-ts/dist/npm/*.tgz
npm run pack:npm -w tsc-ts -- --check  # 同时安装 tarball 并编译一个项目
```

`-- --binary dist/tsc` 会打包一个已有的原生构建（相对于 `packages/tsc-ts`），而不是重新构建。

## 软件包

| 软件包                               | 说明                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [`packages/tsc-ts`](https://github.com/vercel-labs/tsc-ts/tree/main/packages/tsc-ts) | 用 TypeScript 编写的编译器，包含 `tsc-ts` 命令行与 `--api` 服务。                              |
| [`packages/tsgo`](https://github.com/vercel-labs/tsc-ts/tree/main/packages/tsgo)     | tsgo 的参考构建（其命令行与分阶段驱动），测试会与之对比。                                       |

任务通过 [Turborepo](https://turborepo.com) 运行。

## 文档

[`apps/web`](https://github.com/vercel-labs/tsc-ts/blob/main/apps/web/README.md) 包含 tsc-ts 编译器使用指南。

```sh
npm run dev:web
npm run build:web
```

## 环境要求

- Node.js 24+ 与 npm
- Go 1.26
- 一个 scriptc 宿主环境：macOS、Linux 或 Windows，且具备可用的 `clang` 用于链接

## 构建

```sh
npm ci
npm run fetch:upstream   # 在固定的 commit 上克隆 tsgo
npm run build            # 构建 tsc-ts 的 Node 版本（packages/tsc-ts/dist）以及文档站点
npm run build:oracle     # 在 packages/tsgo/dist 中构建 tsgo 参考版本
```

`package.json` 固定使用 scriptc `0.3.5` 及其 `@scriptc/threads` 包。使用其他任何版本都会导致构建失败。

## 编译器

`packages/tsc-ts/src/compiler` 是编译器，从 tsgo 7.0.2 以符合 TypeScript 习惯的方式移植而来。每一部分都会在 TypeScript 的测试语料库（约 12,500 个文件，拆分多文件用例后约 17,000 个单元）上与 tsgo 进行对比：

| 部分                        | 对比 tsgo 的内容                                    | 状态                     |
| ---------------------------- | --------------------------------------------------- | ------------------------ |
| 扫描器（Scanner）           | token、取值、错误、重扫描、JSDoc                    | 所有文件均匹配           |
| 解析器与 AST                | 语法树、诊断信息、API 源文件编码                    | 所有单元均匹配           |
| 绑定器（Binder）            | 符号、符号表、流图、名称解析                        | 所有单元均匹配           |
| 模块解析                     | 结果、包 ID、`--traceResolution`                   | 所有请求均匹配           |
| `tsconfig.json` 与程序       | `--showConfig`、`--listFilesOnly`、`--explainFiles` | 所有用例均匹配           |
| 命令行与选项                 | 输出、错误、退出码、`--locale`                     | 所有用例均匹配           |
| 诊断目录                     | 消息、13 种翻译、输出格式                           | 全部匹配                 |
| JavaScript 输出              | 输出文件、39 种选项组合                             | 所有对比单元均匹配       |
| 声明文件输出                 | `.d.ts` 与 `.d.ts.map` 输出、声明错误              | 所有单元均匹配           |
| `--build`、`--incremental`   | 输出、`.tsbuildinfo`、输出文件、`--watch`         | 所有场景均匹配           |
| 类型检查器                   | 每个文件的诊断信息                                  | 所有文件均匹配           |

语料库脚本位于 `packages/tsc-ts/scripts`（`*-corpus.mjs`）。

## API 服务

`tsc-ts --api` 提供与 TypeScript 7.0.2 的 `tsc --api` 相同的 API，通过 stdin 与 stdout 通信，因此驱动 `tsc --api` 的工具（例如 scriptc）可以改用 `tsc-ts`。

```sh
npm run build -w tsc-ts
node packages/tsc-ts/dist/tsc-ts/src/main.js --api --cwd path/to/project
```

原生构建会从可执行文件所在目录读取 lib 文件，或从 `TSC_TS_LIB_DIR` 读取：

```sh
npm run build:native -w tsc-ts       # packages/tsc-ts/dist/tsc
npm run build:native:dev -w tsc-ts   # 未优化版本，构建更快
TSC_TS_LIB_DIR=upstream/typescript-go/internal/bundled/libs packages/tsc-ts/dist/tsc -p path/to/project
```

`TSC_TS_BIN=packages/tsc-ts/dist/tsc` 用于运行 tsc-ts 中那些针对原生构建的测试。

该服务会针对 `tsc --api` 7.0.2 逐条响应进行校验，scriptc 用两种实现都能构建出相同的程序。它运行在 tsc-ts 编译器之上，既可以是原生方式，也可以在 Node 下运行。

支持的语言服务方法包括：`getCompletionsAtPosition`、`getJsDocTags`、`getDocumentationComment`、`getReferencesToSymbolInFile`、`getReferencedSymbolsForNode` 与 `getSignatureUsages`。与 `tsc --api` 一样，需要自动导入的补全（全局标识符、import 语句、穷尽式 `switch` 分支）会报告 `completion list needs auto imports`。性能分析方法（`startCPUProfile`、`stopCPUProfile`、`saveHeapProfile`）暂不支持。

## 测试

```sh
npm test                     # 将 tsc-ts 与 tsgo 进行对比
npm run bench -w tsc-ts      # 对 tsc-ts 计时，对比 tsgo 与 TypeScript 的 JavaScript 编译器
npm run lint                 # oxlint
npm run format               # oxfmt
```

## 许可证

[Apache-2.0](https://github.com/vercel-labs/tsc-ts/blob/main/LICENSE)。TypeScript-Go 及其他第三方声明请参见 [THIRD_PARTY_NOTICES.md](https://github.com/vercel-labs/tsc-ts/blob/main/THIRD_PARTY_NOTICES.md)。
