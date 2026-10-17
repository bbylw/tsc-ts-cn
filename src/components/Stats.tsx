import { useEffect, useRef, useState } from 'react'
import type { CSSVars } from '../cssvars'

const NUMS = [
  { v: 100, suffix: '%', label: '测试单元与 tsgo 匹配' },
  { v: 11, suffix: '', label: '个编译器部分全部验证' },
  { v: 13, suffix: '', label: '种诊断语言翻译一致' },
  { v: 39, suffix: '', label: '种选项组合逐字节比对' },
]

const DURATION = 1300
const STAGGER = 110

/** 数字带：进入视口后逐项滚动到终值；减少动态偏好时直接显示终值 */
export default function Stats() {
  const bandRef = useRef<HTMLDivElement | null>(null)
  const [vals, setVals] = useState<number[]>(() => NUMS.map(() => 0))

  useEffect(() => {
    const el = bandRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVals(NUMS.map((n) => n.v))
      return
    }

    let raf = 0
    let started = 0
    const step = (now: number) => {
      if (!started) started = now
      const t = now - started
      const total = DURATION + STAGGER * (NUMS.length - 1)
      if (t >= total) {
        setVals(NUMS.map((n) => n.v))
        return
      }
      setVals(
        NUMS.map((n, i) => {
          const p = Math.min(1, Math.max(0, (t - i * STAGGER) / DURATION))
          const eased = p === 0 ? 0 : 1 - Math.pow(2, -10 * p)
          return Math.round(n.v * eased)
        }),
      )
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            io.disconnect()
            raf = requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="stat-band">
      <div className="stat-inner" ref={bandRef}>
        {NUMS.map((s, i) => (
          <div className="stat rv" key={s.label} style={{ '--d': `${i * 80}ms` } as CSSVars}>
            <span className="stat-n">
              {vals[i]}
              {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
