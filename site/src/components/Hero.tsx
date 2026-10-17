import { useState } from 'react'
import type { CSSVars } from '../cssvars'

const TABS = [
  { key: 'npm', cmd: 'npm install -D tsc-ts' },
  { key: 'pnpm', cmd: 'pnpm add -D tsc-ts' },
  { key: 'yarn', cmd: 'yarn add -D tsc-ts' },
]

export default function Hero() {
  const [tab, setTab] = useState('npm')
  const [copied, setCopied] = useState(false)
  const cmd = TABS.find((t) => t.key === tab)?.cmd ?? TABS[0].cmd

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd)
    } catch {
      /* 忽略 */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <h1 className="hero-title rv">
          TypeScript 7.0.2，
          <br />
          原生再编译
        </h1>
        <p className="hero-sub rv" style={{ '--d': '80ms' } as CSSVars}>
          tsc-ts 是 TypeScript-Go（tsgo）的实验性原生移植，由 scriptc
          编译为原生可执行文件。编译器的每一部分都在官方测试语料上与 tsgo
          逐项对比，全部匹配。
        </p>
        <div className="hero-actions rv" style={{ '--d': '160ms' } as CSSVars}>
          <button className="btn btn-primary" onClick={copy}>
            {copied ? '已复制，去终端粘贴' : '立即安装'}
          </button>
          <a className="btn btn-secondary" href="https://github.com/vercel-labs/tsc-ts" target="_blank" rel="noreferrer">
            查看源码
          </a>
        </div>
        <div className="term-window rv" style={{ '--d': '240ms' } as CSSVars} data-ui>
          <div className="term-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="term-tabs" role="tablist" aria-label="包管理器">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  className={`term-tab${tab === t.key ? ' on' : ''}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.key}
                </button>
              ))}
            </div>
            <button className="term-copy" onClick={copy}>
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <pre className="term-body">
            <span className="prompt">$ </span>
            {cmd}
            {'\n'}
            <span className="dim">+ tsc-ts 0.0.2 · added 2 packages · 原生二进制随平台可选依赖安装</span>
          </pre>
        </div>
      </div>
    </section>
  )
}
