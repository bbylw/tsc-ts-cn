import { useState } from 'react'

const STAGES = [
  {
    name: '安装',
    l1: '先装，',
    l2: '一条命令',
    term: (
      <pre className="term" data-ui>
        {'$ npm install -D tsc-ts'}
        {'\n'}+ tsc-ts
        {'\n'}added 2 packages in 4s
        {'\n'}
        {'\n'}{'$ npx tsc-ts -p tsconfig.json'}
      </pre>
    ),
  },
  {
    name: '编译',
    l1: '再编，',
    l2: '原生速度',
    term: (
      <pre className="term" data-ui>
        {'$ npx tsc-ts -p tsconfig.json'}
        {'\n'}src/index.ts(3,7): <span className="err">error TS2322</span>:
        {'\n'}{"  Type 'string' is not assignable to type 'number."}
        {'\n'}
        {'\n'}Found 1 error in src/index.ts:3
      </pre>
    ),
  },
  {
    name: '校验',
    l1: '后验，',
    l2: '逐项对齐',
    term: (
      <pre className="term" data-ui>
        {'$ npm test'}
        {'\n'}
        <span className="c">{'对比 tsgo · TypeScript 官方测试语料'}</span>
        {'\n'}scanner{'          '}匹配
        {'\n'}parser / ast{'     '}匹配
        {'\n'}binder{'           '}匹配
        {'\n'}checker{'          '}匹配
        {'\n'}
        <span className="ok">{'11 个部分全部匹配'}</span>
      </pre>
    ),
  },
  {
    name: '服务',
    l1: '终接，',
    l2: 'API 服务',
    term: (
      <pre className="term" data-ui>
        {'$ tsc-ts --api --cwd ./my-project'}
        {'\n'}{'→ {"method":"getCompletionsAtPosition"}'}
        {'\n'}{'← {"entries":[…],"isIncomplete":false}'}
        {'\n'}
        <span className="c">{'completion list needs auto imports'}</span>
      </pre>
    ),
  },
]

export default function Stages() {
  const [i, setI] = useState(0)
  const s = STAGES[i]

  return (
    <section id="stages" className="stages" data-chapter="dark">
      <div className="stage-left">
        <p className="clause" key={`c${i}`}>
          {s.l1}
          <br />
          {s.l2}
        </p>
      </div>
      <div className="stage-right">
        <div className="stage-frag" key={`t${i}`} data-ui>
          {s.term}
        </div>
      </div>
      <div className="stage-slider">
        <div className="track">
          <div className="track-fill" style={{ width: `${(i / (STAGES.length - 1)) * 100}%` }} />
          <input
            type="range"
            min="0"
            max={STAGES.length - 1}
            step="1"
            value={i}
            aria-label="构建流程阶段"
            aria-valuetext={s.name}
            onChange={(e) => setI(Number(e.target.value))}
          />
        </div>
        <div className="stage-names">
          {STAGES.map((st, idx) => (
            <button
              key={st.name}
              className={`sname${idx === i ? ' on' : ''}`}
              onClick={() => setI(idx)}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
