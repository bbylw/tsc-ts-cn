import type { CSSProperties } from 'react'

/** 允许在 style 里写 CSS 自定义属性（如 --d） */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>
