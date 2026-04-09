import type { ProviderName } from '@/types'

const config: Record<ProviderName, { label: string; color: string; bg: string }> = {
  google: {
    label: 'Google',
    color: '#1a73e8',
    bg: '#e8f0fe',
  },
  github: {
    label: 'GitHub',
    color: '#24292f',
    bg: '#f6f8fa',
  },
  discord: {
    label: 'Discord',
    color: '#5865f2',
    bg: '#eef0fd',
  },
}

export function ProviderBadge({ provider }: { provider: ProviderName }) {
  const { label, color, bg } = config[provider]

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: bg, color }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}