import type { CSSVars } from '../cssvars'

export default function Cta() {
  return (
    <section className="cta">
      <h2 className="cta-title rv">现在就装上它</h2>
      <p className="cta-sub rv" style={{ '--d': '80ms' } as CSSVars}>
        在你的项目里跑一次 npx tsc-ts——安静，就是通过。
      </p>
      <div className="cta-actions rv" style={{ '--d': '160ms' } as CSSVars}>
        <a className="btn btn-primary" href="https://www.npmjs.com/package/tsc-ts" target="_blank" rel="noreferrer">
          前往 npm 安装
        </a>
        <a className="btn btn-secondary" href="https://github.com/vercel-labs/tsc-ts" target="_blank" rel="noreferrer">
          GitHub 仓库
        </a>
      </div>
    </section>
  )
}
