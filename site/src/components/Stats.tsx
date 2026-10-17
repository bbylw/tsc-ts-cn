import type { CSSVars } from '../cssvars'

const NUMS = [
  { n: '100%', label: '测试单元与 tsgo 匹配' },
  { n: '11', label: '个编译器部分全部验证' },
  { n: '13', label: '种诊断语言翻译一致' },
  { n: '39', label: '种选项组合逐字节比对' },
]

export default function Stats() {
  return (
    <section className="stat-band">
      <div className="stat-inner">
        {NUMS.map((s, i) => (
          <div className="stat rv" key={s.n} style={{ '--d': `${i * 80}ms` } as CSSVars}>
            <span className="stat-n">{s.n}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
