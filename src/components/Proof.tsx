import type { CSSVars } from '../cssvars'
import { IconCheck } from './icons'

const ROWS: Array<{ part: string; what: string; how: string }> = [
  { part: '扫描器', what: 'token、取值、错误、重扫描、JSDoc', how: '所有文件' },
  { part: '解析器与 AST', what: '语法树、诊断信息、API 源文件编码', how: '所有单元' },
  { part: '绑定器', what: '符号、符号表、流图、名称解析', how: '所有单元' },
  { part: '模块解析', what: '结果、包 ID、--traceResolution', how: '所有请求' },
  { part: 'tsconfig 与程序', what: '--showConfig、--listFilesOnly、--explainFiles', how: '所有用例' },
  { part: '命令行与选项', what: '输出、错误、退出码、--locale', how: '所有用例' },
  { part: '诊断目录', what: '消息、13 种翻译、输出格式', how: '全部' },
  { part: 'JavaScript 输出', what: '输出文件、39 种选项组合', how: '所有对比单元' },
  { part: '声明文件输出', what: '.d.ts 与 .d.ts.map、声明错误', how: '所有单元' },
  { part: '--build 与 --incremental', what: '输出、.tsbuildinfo、--watch', how: '所有场景' },
  { part: '类型检查器', what: '每个文件的诊断信息', how: '所有文件' },
]

export default function Proof() {
  return (
    <section id="proof" className="proof">
      <div className="section-head rv">
        <h2>对比测试</h2>
        <p>在 TypeScript 官方测试语料（约 12,500 个文件，拆分多文件用例后约 17,000 个单元）上，与 tsgo 逐项对比。</p>
      </div>
      <div className="table-wrap rv" style={{ '--d': '90ms' } as CSSVars}>
        <table className="proof-table">
          <caption className="sr-only">tsc-ts 与 tsgo 在各编译器部分上的对比测试结果</caption>
          <thead>
            <tr>
              <th scope="col">部分</th>
              <th scope="col">对比 tsgo 的内容</th>
              <th scope="col" className="th-right">范围</th>
              <th scope="col" className="th-right">状态</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.part} style={{ '--i': i } as CSSVars}>
                <td className="td-part">{r.part}</td>
                <td className="td-what">{r.what}</td>
                <td className="td-how">{r.how}</td>
                <td className="td-ok">
                  <span className="pill-ok">
                    <IconCheck size={11} />
                    匹配
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="proof-src">来源：vercel-labs/tsc-ts README · 对比脚本随包发布（packages/tsc-ts/scripts），可随时复跑。</p>
      </div>
    </section>
  )
}
