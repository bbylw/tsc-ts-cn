import type { CSSVars } from '../cssvars'
import CopyButton from './CopyButton'

const STEPS = [
  {
    head: '安装',
    call: 'npm install -D tsc-ts',
    resp: '+ tsc-ts 0.0.8 · added 3 packages in 3s',
  },
  {
    head: '编译',
    call: 'npx tsc-ts -p tsconfig.json',
    resp: 'Found 1 error in src/index.ts:3 · 诊断格式与 tsc 一致',
  },
  {
    head: '验证',
    call: 'npm test',
    resp: '11 parts · ~17,000 units · all matched',
  },
]

export default function Stages() {
  return (
    <section id="stages" className="stages">
      <div className="section-head rv">
        <h2>三步用上它</h2>
        <p>和 tsc 相同的命令行界面：同样的 tsconfig、同样的诊断格式、同样的退出码。</p>
      </div>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li className="step rv" key={s.head} style={{ '--d': `${i * 90}ms` } as CSSVars}>
            <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.head}</h3>
            <div className="step-term" data-ui>
              <pre className="term-body">
                <span className="prompt">$ </span>
                {s.call}
                {'\n'}
                <span className="dim">{s.resp}</span>
              </pre>
              <div className="step-copy">
                <CopyButton text={s.call} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
