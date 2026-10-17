import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '#features', label: '为什么原生' },
  { href: '#stages', label: '构建原理' },
  { href: '#corpus', label: '对比测试' },
  { href: '#install', label: '安装' },
]

export default function Header() {
  const [chapter, setChapter] = useState('dark')
  const raf = useRef(0)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-chapter]'))
    const onScroll = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const line = 64
        let cur = 'dark'
        for (const s of sections) {
          if (s.getBoundingClientRect().top <= line) cur = s.dataset.chapter
        }
        setChapter(cur)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <header className={`site-header ch-${chapter}`}>
      <a className="wordmark" href="#top">tsc-ts</a>
      <nav aria-label="页面导航">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
      <a className="btn btn-header" href="https://github.com/vercel-labs/tsc-ts" target="_blank" rel="noreferrer">
        GitHub 仓库
      </a>
    </header>
  )
}
