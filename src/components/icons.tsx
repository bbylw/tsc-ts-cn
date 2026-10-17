/** 统一线性图标（stroke 1.7 · 24 视窗 · currentColor） */
import type { ReactNode } from 'react'

type IconProps = {
  size?: number
  className?: string
}

function Line({ size = 16, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/* ── 品牌 ─────────────────────────────────────── */

export function IconTriangle({ size = 16, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3 23 21H1Z" fill="currentColor" />
    </svg>
  )
}

export function IconGithub({ size = 16, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.95.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
      />
    </svg>
  )
}

/* ── 操作 ─────────────────────────────────────── */

export function IconCopy(props: IconProps) {
  return (
    <Line {...props}>
      <rect width="12.5" height="12.5" x="8.75" y="8.75" rx="2" />
      <path d="M5.25 15.25h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Line>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Line>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Line>
  )
}

export function IconArrowUp(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </Line>
  )
}

/* ── 特性 ─────────────────────────────────────── */

export function IconBolt(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </Line>
  )
}

export function IconCompare(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
    </Line>
  )
}

export function IconBraces(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </Line>
  )
}

export function IconLayers(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </Line>
  )
}

export function IconGlobe(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </Line>
  )
}

export function IconPackage(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </Line>
  )
}
