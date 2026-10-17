import { useEffect, useRef, useState } from 'react'
import type { CSSVars } from '../cssvars'

const GROUPS = {
  all: {
    label: '全部 11 部分',
    rows: ['扫描器', '解析器与 AST', '绑定器', '类型检查器', '声明文件输出'],
  },
  syntax: {
    label: '语法',
    rows: ['扫描器', '解析器与 AST'],
  },
  semantic: {
    label: '语义',
    rows: ['绑定器', '模块解析', '类型检查器'],
  },
  output: {
    label: '输出与构建',
    rows: ['JavaScript 输出', '声明文件输出', '--build 与 --incremental'],
  },
}

type GroupKey = keyof typeof GROUPS

export default function Hero() {
  const [group, setGroup] = useState<GroupKey>('all')
  const [copied, setCopied] = useState(false)
  const figRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = figRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translateY(${Math.min(window.scrollY * 0.08, 72)}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('npm install -D tsc-ts')
    } catch {
      /* 剪贴板不可用时忽略 */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="top" className="hero" data-chapter="dark">
      <div className="hero-controls">
        <div className="hero-toggles" role="tablist" aria-label="对比类别">
          {Object.entries(GROUPS).map(([key, g]) => (
            <button
              key={key}
              role="tab"
              aria-selected={group === key}
              className={`tg${group === key ? ' on' : ''}`}
              onClick={() => setGroup(key as GroupKey)}
            >
              {g.label}
            </button>
          ))}
        </div>
        <button className="btn" onClick={copy}>
          {copied ? '已复制，去终端粘贴' : 'npm install -D tsc-ts'}
        </button>
      </div>

      <div className="hero-main">
        <div className="hero-figure">
          <div className="figure-wrap rv">
            <h1 className="figure" ref={figRef}>
              17,000
            </h1>
          </div>
          <p className="figure-unit">个测试单元 · 全部与 tsgo 匹配</p>
          <p className="hero-note">
            tsc-ts 是 TypeScript 7.0.2 编译器（TypeScript-Go，简称 tsgo）的原生代码移植，
            由 scriptc 编译为原生可执行文件。数字来自 TypeScript 官方测试语料：
            约 12,500 个文件，拆分多文件用例后约 17,000 个单元，逐项与 tsgo 对比。
          </p>
        </div>
        <div className="hero-table rv" style={{ '--d': '120ms' } as CSSVars}>
          {GROUPS[group].rows.map((name) => (
            <div className="hrow" key={name}>
              <span className="hname">{name}</span>
              <span className="hval">匹配 100%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
