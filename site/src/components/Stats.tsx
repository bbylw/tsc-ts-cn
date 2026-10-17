const PARTS = [
  { name: '扫描器', hot: true },
  { name: '解析器与 AST' },
  { name: '绑定器' },
  { name: '模块解析' },
  { name: 'tsconfig 与程序' },
  { name: '命令行与选项', hot: true },
  { name: '诊断目录', hideM: true },
  { name: 'JavaScript 输出' },
  { name: '声明文件输出', hideM: true },
  { name: '--build 与增量', hideM: true },
  { name: '类型检查器', accent: true, hot: true },
]

export default function Stats() {
  return (
    <section id="corpus" className="stats" data-chapter="dark">
      <div className="stats-head rv">
        <p className="stats-figure">100%</p>
        <p className="stats-claim">11 个部分，全部匹配</p>
      </div>
      <div className="stat-bars rv" data-ui role="img" aria-label="11 个对比部分全部与 tsgo 匹配，匹配率 100%">
        {PARTS.map((p) => (
          <div
            key={p.name}
            className={`bar${p.accent ? ' bar-accent' : ''}${p.hideM ? ' hide-m' : ''}`}
            tabIndex={0}
            aria-label={`${p.name}：匹配率 100%`}
          >
            {p.hot && <span className="bar-val">100%</span>}
            {!p.hot && <span className="bar-tip">{p.name} · 匹配 100%</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
