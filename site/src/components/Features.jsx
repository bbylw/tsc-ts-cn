const MODULES = [
  {
    title: '原生可执行文件',
    paras: [
      'tsc-ts 运行一个原生二进制，由 scriptc 从 TypeScript-Go 源码编译而来，各平台通过 npm 可选依赖分发。',
      '构建锁定 scriptc 0.3.5 与 @scriptc/threads，换用其他版本会直接失败。',
    ],
    frag: (
      <pre className="term" data-ui>
        <span className="c">{"# 平台可选依赖（节选）"}</span>
        {'\n'}@tsc-ts/darwin-arm64{'   '}optional
        {'\n'}@tsc-ts/linux-x64-gnu{'   '}optional
        {'\n'}@tsc-ts/win32-x64{'       '}optional
        {'\n'}
        <span className="c">{"# 产物：packages/tsc-ts/dist/tsc"}</span>
      </pre>
    ),
  },
  {
    title: '与 tsgo 逐项对比',
    paras: [
      '编译器每一部分都在官方语料上与 tsgo 对比：token、语法树、符号表、流图、名称解析、诊断，全部匹配。',
      '对比脚本位于 packages/tsc-ts/scripts（*-corpus.mjs），可随时复跑。',
    ],
    frag: (
      <pre className="term" data-ui>
        binder{'    '}symbols · flow graph{'   '}<span className="ok">匹配</span>
        {'\n'}resolver{'  '}package IDs · trace{'  '}<span className="ok">匹配</span>
        {'\n'}checker{'   '}diagnostics per file{' '}<span className="ok">匹配</span>
      </pre>
    ),
  },
  {
    title: 'API 服务',
    paras: [
      'tsc-ts --api 通过 stdin 与 stdout 通信，与 TypeScript 7.0.2 的 tsc --api 逐条响应校验一致。',
      '支持 getCompletionsAtPosition、getReferencesToSymbolInFile 等方法；CPU 与堆性能分析暂不支持。',
    ],
    frag: (
      <pre className="term" data-ui>
        {'→ {"method":"getCompletionsAtPosition",'}
        {'\n'}{'     "position":128}'}
        {'\n'}{'← {"entries":[{ "name":"checker" }],'}
        {'\n'}{'    "needsAutoImports":true}'}
      </pre>
    ),
  },
  {
    title: '增量与工程化',
    paras: [
      '支持 --build、--incremental 与 --watch，.tsbuildinfo 输出与 tsgo 全部场景匹配。',
      '任务通过 Turborepo 运行，lint 用 oxlint，格式化用 oxfmt。',
    ],
    frag: (
      <pre className="term" data-ui>
        {'$ npx tsc-ts -b --incremental'}
        {'\n'}core → core.d.ts · core.tsbuildinfo
        {'\n'}app{'  '}→ app.js · app.d.ts
        {'\n'}
        <span className="c">{'watch: waiting for changes'}</span>
      </pre>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="features" data-chapter="light">
      <h2 className="sec-title rv">为什么是原生</h2>
      <div className="feat-list">
        {MODULES.map((m) => (
          <article className="feat-module" key={m.title}>
            <div className="fpanel rv" data-ui>{m.frag}</div>
            <div className="ftext rv" style={{ '--d': '90ms' }}>
              <h3>{m.title}</h3>
              {m.paras.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
