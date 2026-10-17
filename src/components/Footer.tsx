import { IconArrowUp, IconTriangle } from './icons'

const COLS = [
  {
    head: '项目',
    items: [
      { href: 'https://github.com/vercel-labs/tsc-ts', label: 'GitHub 仓库' },
      { href: 'https://www.npmjs.com/package/tsc-ts', label: 'npm 包' },
      { href: 'https://vercel.com/labs', label: 'Vercel Labs' },
    ],
  },
  {
    head: '记录',
    items: [
      { href: 'https://github.com/vercel-labs/tsc-ts/blob/main/CHANGELOG.md', label: 'CHANGELOG' },
      { href: 'https://github.com/vercel-labs/tsc-ts/releases', label: 'Releases' },
    ],
  },
  {
    head: '阅读',
    items: [
      { href: 'https://github.com/vercel-labs/tsc-ts/blob/main/apps/web/README.md', label: '使用指南' },
      { href: '#proof', label: '对比测试' },
    ],
  },
  {
    head: '许可',
    items: [
      { href: 'https://github.com/vercel-labs/tsc-ts/blob/main/LICENSE', label: 'Apache-2.0' },
      {
        href: 'https://github.com/vercel-labs/tsc-ts/blob/main/THIRD_PARTY_NOTICES.md',
        label: '第三方声明',
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cols">
          {COLS.map((c) => (
            <div className="f-col" key={c.head}>
              <p className="f-head">{c.head}</p>
              {c.items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  target={it.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {it.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-last">
          <span className="wordmark-footer">
            <IconTriangle className="tri" size={15} />
            tsc-ts
            <span className="labs-tag">Labs</span>
          </span>
          <div className="footer-meta">
            <span className="footer-legal">2026 · Vercel Labs 实验项目 · Apache-2.0</span>
            <a className="to-top" href="#top">
              <IconArrowUp size={14} />
              回到顶部
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
