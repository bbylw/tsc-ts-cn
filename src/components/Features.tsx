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
    desc: '由 scriptc 0.4.8 与两阶段 profile 从 TypeScript-Go 源码编译为原生可执行文件，各平台通过 npm 可选依赖分发，无需额外运行时。',
    mono: '@tsc-ts/linux-x64-gnu',
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
    desc: '--api 跟随 TypeScript 7.1 的 API 协议：补全可直接补上项目与依赖里的自动导入，getImportAdderEdits 给出添加 import 的编辑；Windows 走命名管道，macOS 与 Linux 走 Unix socket。',
    mono: 'tsc-ts/api · --listen',
  },
  {
    Icon: IconLayers,
    title: '增量构建',
    desc: '支持 --build、--incremental 与 --watch；监视模式的首个构建在解析线程上加载程序，.tsbuildinfo 输出与 tsgo 的所有场景一致。',
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
    title: '多线程与自动调优',
    desc: '--checkers N 在 N 个线程上检查；每个项目的运行记录写入 ~/.cache/tsc-ts/runs-v1/，后续运行据此挑更快的配置，tsc-ts doctor 还会实测并给出建议。',
    mono: '--checkers 16 · doctor',
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
