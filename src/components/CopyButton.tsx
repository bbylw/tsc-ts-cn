import { useEffect, useRef, useState } from 'react'
import { IconCheck, IconCopy } from './icons'

type Props = {
  text: string
  /** 待复制状态的按钮文案 */
  label?: string
  className?: string
}

/** 复制按钮：图标切换 + aria-live 反馈，2 秒后自动复位 */
export default function CopyButton({ text, label = '复制', className }: Props) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* 剪贴板不可用时静默忽略 */
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      className={`copy-btn${className ? ` ${className}` : ''}`}
      onClick={copy}
      aria-label={copied ? '已复制到剪贴板' : `复制命令：${text}`}
    >
      {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
      <span aria-live="polite">{copied ? '已复制' : label}</span>
    </button>
  )
}
