import type { ParsedField } from '@/types'

const sensitivityConfig = {
  high: {
    label: 'Sensibilidad alta',
    className: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
    border: 'border-l-red-400',
  },
  medium: {
    label: 'Sensibilidad media',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-400',
    border: 'border-l-amber-400',
  },
  low: {
    label: 'Sensibilidad baja',
    className: 'bg-green-50 text-green-700 border-green-200',
    dot: 'bg-green-500',
    border: 'border-l-green-400',
  },
}

const categoryLabel: Record<ParsedField['category'], string> = {
  identity: 'Identidad',
  contact: 'Contacto',
  account: 'Cuenta',
  permissions: 'Permisos',
  metadata: 'Metadatos',
}

export function DataCard({ field }: { field: ParsedField }) {
  const s = sensitivityConfig[field.sensitivity]

  return (
    <div className={`bg-white rounded-xl border border-gray-100 border-l-4 ${s.border} p-4 flex flex-col gap-2`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-400 font-mono mb-0.5">{field.key}</p>
          <p className="text-sm font-medium text-gray-900">{field.label}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${s.className} flex items-center gap-1`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
            {categoryLabel[field.category]}
          </span>
        </div>
      </div>

      {/* Valor */}
      <div className="bg-gray-50 rounded-lg px-3 py-2">
        {field.key.includes('url') || field.key === 'picture' ? (
          <div className="flex items-center gap-2">
            <img
              src={field.value!}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <p className="text-xs text-gray-500 font-mono truncate">{field.value}</p>
          </div>
        ) : (
          <p className="text-sm font-mono text-gray-700 break-all">{field.value}</p>
        )}
      </div>

      {/* Descripción / qué puede hacer la empresa */}
      <div className="flex gap-2 pt-0.5">
        <span className="text-gray-300 mt-0.5 shrink-0">→</span>
        <p className="text-xs text-gray-500 leading-relaxed">{field.description}</p>
      </div>
    </div>
  )
}