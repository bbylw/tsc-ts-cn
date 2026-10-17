import { useEffect, useState } from 'react'

const NAV = [
  { href: 'https://github.com/vercel-labs/tsc-ts', label: 'GitHub 仓库' },
  { href: 'https://www.npmjs.com/package/tsc-ts', label: 'npm 包' },
  { href: 'https://github.com/vercel-labs/tsc-ts/blob/main/CHANGELOG.md', label: 'CHANGELOG' },
  { href: 'https://github.com/vercel-labs/tsc-ts/releases', label: 'GitHub Releases' },
  { href: 'https://github.com/vercel-labs/tsc-ts/blob/main/apps/web/README.md', label: '使用指南（apps/web）' },
]

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="clock" suppressHydrationWarning>
      {now.toLocaleTimeString('zh-CN', { hour12: false })}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="footer" data-chapter="dark">
      <div className="tiles">
        <div className="tile t-statement">
          <p className="t-sentence">一个实验性的 TypeScript 原生移植，由 Vercel Labs 发布。</p>
          <p className="t-legal">Apache-2.0 许可证 · tsgo 与第三方声明见 THIRD_PARTY_NOTICES.md</p>
        </div>
        <nav className="tile t-nav" aria-label="页脚链接">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} target="_blank" rel="noreferrer">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="tile t-time">
          <p className="t-label">本地时间</p>
          <Clock />
        </div>
        <div className="tile t-link">
          <a href="https://github.com/vercel-labs/tsc-ts" target="_blank" rel="noreferrer">
            vercel-labs/tsc-ts
          </a>
        </div>
        <div className="tile t-mark">
          <p className="t-wordmark">tsc-ts</p>
        </div>
        <a
          className="tile t-go"
          href="https://github.com/vercel-labs/tsc-ts/blob/main/apps/web/README.md"
          target="_blank"
          rel="noreferrer"
        >
          <span>读完整指南</span>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M8 40 40 8 M16 8h24v24" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
