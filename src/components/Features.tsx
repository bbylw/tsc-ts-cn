import type { ComponentType } from 'react'
import type { CSSVars } from '../cssvars'
import {
  IconBolt,
  IconBraces,
  IconCompare,
  IconCpu,
  IconGlobe,
  IconLayers,
} from './icons'

type Card = {
  Icon: ComponentType<{ size?: number }>
  title: string
  desc: string
  mono: string
}

const CARDS: Card[] = [
  {
    Icon: IconBolt,
    title: '原生速度',
    desc: '由 scriptc 0.4.2 从 TypeScript-Go 源码编译为原生可执行文件，各平台通过 npm 可选依赖分发，无需额外运行时。',
    mono: '@tsc-ts/win32-x64-msvc',
  },
  {
    Icon: IconCompare,
    title: '逐项对比 tsgo',
    desc: '扫描器、解析器、绑定器、检查器——每个部分都在官方语料上与 tsgo 逐项对比，token、语法树、符号表全部匹配。',
    mono: '11 parts · all matched',
  },
  {
    Icon: IconBraces,
    title: 'API 与编程接口',
    desc: '--api 与 tsc --api 7.0.2 逐条响应一致；tsc-ts/api 提供 createProgram、TypeChecker 等编程接口，Windows 上还支持命名管道。',
    mono: 'tsc-ts/api · --pipe',
  },
  {
    Icon: IconLayers,
    title: '增量构建',
    desc: '支持 --build、--incremental 与 --watch；复合项目的重建也跑在检查线程上，.tsbuildinfo 输出与 tsgo 的所有场景一致。',
    mono: 'npx tsc-ts -b --incremental',
  },
  {
    Icon: IconGlobe,
    title: '诊断本地化',
    desc: '诊断目录的 13 种语言翻译、输出格式与错误消息全部匹配，中文终端同样可信。',
    mono: '--locale zh-CN',
  },
  {
    Icon: IconCpu,
    title: '多线程检查',
    desc: '--checkers N 在 N 个线程上检查，按可用内存自动选择线程数（最多 16 个）；诊断结果与单线程完全一致。',
    mono: '--checkers 16',
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
            <span className="card-ico" aria-hidden="true">
              <c.Icon size={18} />
            </span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <code className="card-mono">{c.mono}</code>
          </article>
        ))}
      </div>
    </section>
  )
}
