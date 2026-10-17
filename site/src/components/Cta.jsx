import { useState } from 'react'

const MANAGERS = [
  { key: 'npm', cmd: 'npm install -D tsc-ts' },
  { key: 'pnpm', cmd: 'pnpm add -D tsc-ts' },
]

export default function Cta() {
  const [mgr, setMgr] = useState('npm')
  const [copied, setCopied] = useState(false)
  const cmd = MANAGERS.find((m) => m.key === mgr).cmd

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd)
    } catch {
      /* 忽略 */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="install" className="cta" data-chapter="accent">
      <div className="cta-left">
        <p className="cta-close rv">
          现在，
          <br />
          装上它
        </p>
        <p className="cta-note rv" style={{ '--d': '90ms' }}>
          复制命令，粘贴到你的项目终端——第一步就这样完成了。
        </p>
      </div>
      <div className="cta-dialog-wrap rv" style={{ '--d': '120ms' }}>
        <div className="cta-dialog" data-ui role="group" aria-label="安装命令生成器">
          <h3>把 tsc-ts 装进你的项目</h3>
          <label className="dlabel" htmlFor="proj">
            包管理器
          </label>
          <div className="seg" role="radiogroup" aria-label="选择包管理器">
            {MANAGERS.map((m) => (
              <button
                key={m.key}
                role="radio"
                aria-checked={mgr === m.key}
                className={`seg-btn${mgr === m.key ? ' on' : ''}`}
                onClick={() => setMgr(m.key)}
              >
                {m.key}
              </button>
            ))}
          </div>
          <pre className="term dcmd">{cmd}</pre>
          <button className="btn dgo" onClick={copy}>
            {copied ? '已复制，去终端粘贴' : '复制安装命令'}
          </button>
        </div>
      </div>
    </section>
  )
}
