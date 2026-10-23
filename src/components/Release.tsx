import type { CSSVars } from '../cssvars'
import { IconArrowRight } from './icons'

const ITEMS = [
  {
    metric: '9.2–11.1%',
    title: '类型检查提速',
    desc: '相比 0.0.7；16 个检查线程时为 6.8–15.3%，输出完全一致。',
  },
  {
    metric: '18–22%',
    title: '峰值内存下降',
    desc: '单检查线程下的峰值 RSS 降幅；16 线程时为 15–22%。',
  },
  {
    metric: '--pipe',
    title: 'Windows 命名管道',
    desc: '--api --pipe 提供与 tsc --api --pipe 相同的服务，仅运行服务的用户可打开该管道。',
  },
]

export default function Release() {
  return (
    <section id="releases" className="releases">
      <div className="release-inner">
        <div className="release-head rv">
          <h2>0.0.8，更快也更省内存</h2>
          <p>
            10 月 23 日发布：由 scriptc 0.4.2 构建，类型检查更快、峰值内存更低，
            Windows 上新增命名管道 API。
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
