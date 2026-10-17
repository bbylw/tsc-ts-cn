import type { CSSVars } from '../cssvars'

const CARDS = [
  {
    title: '原生速度',
    desc: '由 scriptc 从 TypeScript-Go 源码编译为原生可执行文件，各平台通过 npm 可选依赖分发，无需额外运行时。',
    mono: '@tsc-ts/win32-x64-msvc',
  },
  {
    title: '逐项对比 tsgo',
    desc: '扫描器、解析器、绑定器、检查器——每个部分都在官方语料上与 tsgo 逐项对比，token、语法树、符号表全部匹配。',
    mono: '11 parts · all matched',
  },
  {
    title: 'API 服务',
    desc: 'tsc-ts --api 与 tsc --api 7.0.2 逐条响应校验一致，补全、引用查找、签名用途即插即用。',
    mono: 'getCompletionsAtPosition',
  },
  {
    title: '增量构建',
    desc: '支持 --build、--incremental 与 --watch，.tsbuildinfo 输出与 tsgo 的所有场景一致。',
    mono: 'npx tsc-ts -b --incremental',
  },
  {
    title: '诊断本地化',
    desc: '诊断目录的 13 种语言翻译、输出格式与错误消息全部匹配，中文终端同样可信。',
    mono: '--locale zh-CN',
  },
  {
    title: '工程化就绪',
    desc: '任务由 Turborepo 编排，lint 用 oxlint，格式化用 oxfmt；对比脚本随包发布，结果可复现。',
    mono: 'npm test · *-corpus.mjs',
  },
]

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="section-head rv">
        <h2>原生编译器，全部能力</h2>
        <p>每一项能力都在 TypeScript 官方测试语料上验证过。</p>
      </div>
      <div className="card-grid">
        {CARDS.map((c, i) => (
          <article className="card rv" key={c.title} style={{ '--d': `${(i % 3) * 70}ms` } as CSSVars}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <code className="card-mono">{c.mono}</code>
          </article>
        ))}
      </div>
    </section>
  )
}
