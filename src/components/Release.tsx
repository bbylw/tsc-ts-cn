import type { CSSVars } from '../cssvars'
import { IconArrowRight } from './icons'

const ITEMS = [
  {
    metric: '1.16–1.21×',
    title: '类型检查提速',
    desc: '0.1.0 对比 0.0.10：五个基准项目在 --checkers 1 下快 1.16–1.21 倍（VS Code 33.2 s → 28.6 s），16 线程下快 1.08–1.19 倍。',
  },
  {
    metric: '27%',
    title: '共享检查（实验）',
    desc: 'TSC_TS_SHARE=1 时检查线程共享已算出的类型，T3 服务端项目在 16 检查器下快 27%，诊断与单线程一致。',
  },
  {
    metric: 'doctor',
    title: '运行记录与自动调优',
    desc: '每个项目把运行配置与阶段耗时写入 ~/.cache/tsc-ts/runs-v1/，后续运行据此采用更快的配置；tsc-ts doctor 实测后给出建议。',
  },
]

export default function Release() {
  return (
    <section id="releases" className="releases">
      <div className="release-inner">
        <div className="release-head rv">
          <h2>0.1.5，跟随 TypeScript 7.1.0-beta</h2>
          <p>
            11 月 11 日发布：0.1 系列重新移植到 TypeScript 7.1.0-beta，由 scriptc 0.4.8
            构建，检查更快，并加入共享检查、运行记录与自动调优，以及 Unix socket 上的 --api 服务。
          </p>
          <a
            className="release-link"
            href="https://github.com/vercel-labs/tsc-ts/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
          >
            查看完整更新日志
            <IconArrowRight size={14} />
          </a>
        </div>
        <ul className="release-list rv" style={{ '--d': '90ms' } as CSSVars}>
          {ITEMS.map((it) => (
            <li key={it.metric}>
              <span className={`release-metric${it.metric.startsWith('--') ? ' code' : ''}`}>
                {it.metric}
              </span>
              <div className="release-copy">
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
