import { useEffect, useState } from 'react'
import { IconGithub, IconTriangle } from './icons'

const LINKS = [
  { href: '#features', label: '特性' },
  { href: '#stages', label: '快速开始' },
  { href: '#proof', label: '对比测试' },
  { href: '#releases', label: '更新' },
  { href: 'https://vercel.com/labs', label: 'Vercel Labs' },
]

const GITHUB = 'https://github.com/vercel-labs/tsc-ts'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  /* 滚动后加深发丝线并抬升导航 */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* 高亮当前所在章节；回到顶部时清除 */
  useEffect(() => {
    const ids = [...LINKS.map((l) => l.href.slice(1)), 'top']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          setActive(e.target.id === 'top' ? '' : `#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Esc 关闭移动菜单；放大到桌面宽度时自动收起 */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 981px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="wordmark" href="#top" aria-label="回到页面顶部">
          <IconTriangle className="tri" size={18} />
          tsc-ts
          <span className="labs-tag">Labs</span>
        </a>

        <nav className="nav-desktop" aria-label="页面导航">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'on' : undefined}
              aria-current={active === l.href ? 'true' : undefined}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
            <IconGithub size={15} />
            GitHub
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            data-open={open || undefined}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="页面导航（移动端）"
          data-open={open || undefined}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'on' : undefined}
              onClick={() => setOpen(false)}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
          <a className="mobile-nav-github" href={GITHUB} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <IconGithub size={16} />
            GitHub 仓库
          </a>
        </nav>
      </div>
    </header>
  )
}
