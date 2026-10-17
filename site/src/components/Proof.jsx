const NAMES = ['TypeScript-Go', 'scriptc', 'Vercel Labs', 'Turborepo', 'npm', 'Go', 'oxlint']

export default function Proof() {
  return (
    <section className="proof" data-chapter="light">
      <div className="proof-row rv">
        <p className="proof-lead">一切站在这些项目之上</p>
        {NAMES.map((n) => (
          <span className="proof-name" key={n}>{n}</span>
        ))}
      </div>
    </section>
  )
}
