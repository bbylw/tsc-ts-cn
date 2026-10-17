const LINKS = [
  { href: '#features', label: '特性' },
  { href: '#stages', label: '快速开始' },
  { href: '#proof', label: '对比测试' },
  { href: 'https://vercel.com/labs', label: 'Vercel Labs' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a className="wordmark" href="#top">
          <svg className="tri" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 23 21H1Z" fill="currentColor" />
          </svg>
          tsc-ts
          <span className="labs-tag">Labs</span>
        </a>
        <nav aria-label="页面导航">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-ghost" href="https://github.com/vercel-labs/tsc-ts" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </header>
  )
}
