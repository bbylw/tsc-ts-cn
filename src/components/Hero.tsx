import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { CSSVars } from '../cssvars'
import { IconArrowRight, IconCheck, IconCopy, IconGithub, IconTriangle } from './icons'

const TABS = [
  { key: 'npm', cmd: 'npm install -D tsc-ts' },
  { key: 'pnpm', cmd: 'pnpm add -D tsc-ts' },
  { key: 'yarn', cmd: 'yarn add -D tsc-ts' },
]

export default function Hero() {
  const [tabIdx, setTabIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const cmd = TABS[tabIdx].cmd

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd)
    } catch {
      /* 剪贴板不可用时静默忽略 */
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  const onTabKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' ? 1 : -1
    const next = (tabIdx + dir + TABS.length) % TABS.length
    setTabIdx(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="top" className="hero">
      <div className="atmos" aria-hidden="true" />
      <div className="hero-inner">
        <a
          className="hero-badge rv"
          href="https://vercel.com/labs"
          target="_blank"
          rel="noreferrer"
        >
          <IconTriangle size={11} />
          Vercel Labs · 实验项目
          <span className="badge-ver">v0.0.8</span>
          <IconArrowRight size={12} className="badge-arrow" />
        </a>
        <h1 className="hero-title rv" style={{ '--d': '70ms' } as CSSVars}>
          TypeScript 7.0.2，
          <br />
          原生再编译
        </h1>
        <p className="hero-sub rv" style={{ '--d': '140ms' } as CSSVars}>
          tsc-ts 是 TypeScript-Go（tsgo）的实验性原生移植，由 scriptc
          编译为原生可执行文件。编译器的每一部分都在官方测试语料上与 tsgo
          逐项对比，全部匹配。
        </p>
        <div className="hero-actions rv" style={{ '--d': '210ms' } as CSSVars}>
          <button type="button" className="btn btn-primary" onClick={copy}>
            {copied ? <IconCheck size={15} /> : <IconCopy size={15} />}
            <span aria-live="polite">{copied ? '已复制，去终端粘贴' : '立即安装'}</span>
          </button>
          <a
            className="btn btn-secondary"
            href="https://github.com/vercel-labs/tsc-ts"
            target="_blank"
            rel="noreferrer"
          >
            <IconGithub size={15} />
            查看源码
          </a>
        </div>

        <div className="term-window rv" style={{ '--d': '280ms', '--i': tabIdx } as CSSVars} data-ui>
          <div className="term-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="term-tabs" role="tablist" aria-label="包管理器" onKeyDown={onTabKey}>
              <span className="term-tab-ind" aria-hidden="true" />
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  aria-selected={i === tabIdx}
                  tabIndex={i === tabIdx ? 0 : -1}
                  className={`term-tab${i === tabIdx ? ' on' : ''}`}
                  onClick={() => setTabIdx(i)}
                >
                  {t.key}
                </button>
              ))}
            </div>
            <button type="button" className="term-copy" onClick={copy} aria-label={copied ? '已复制到剪贴板' : `复制命令：${cmd}`}>
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              <span aria-live="polite">{copied ? '已复制' : '复制'}</span>
            </button>
          </div>
          <pre className="term-body" key={tabIdx}>
            <span className="prompt">$ </span>
            {cmd}
            <span className="caret" aria-hidden="true" />
            {'\n'}
            <span className="dim">+ tsc-ts 0.0.8 · added 3 packages · 原生二进制随平台可选依赖安装</span>
          </pre>
        </div>
      </div>
    </section>
  )
}
