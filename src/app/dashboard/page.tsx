import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { parseTokenData } from '@/lib/tokenParser'
import { DataCard } from '@/components/DataCard'
import { ProviderBadge } from '@/components/ProviderBadge'
import type { ProviderName, ParsedField } from '@/types'

const categoryOrder: ParsedField['category'][] = [
  'identity', 'contact', 'account', 'permissions', 'metadata'
]

const categoryLabel: Record<ParsedField['category'], string> = {
  identity: 'Identidad',
  contact: 'Contacto',
  account: 'Cuenta',
  permissions: 'Permisos',
  metadata: 'Metadatos',
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/')

  const provider = session.provider as ProviderName
  const rawProfile = session.rawProfile ?? {}

  const { fields } = parseTokenData(provider, rawProfile)

  // Agrupamos los campos por categoría
  const grouped = categoryOrder.reduce((acc, category) => {
    const items = fields.filter(f => f.category === category)
    if (items.length > 0) acc[category] = items
    return acc
  }, {} as Partial<Record<ParsedField['category'], ParsedField[]>>)

  // Resumen de sensibilidad
  const highCount = fields.filter(f => f.sensitivity === 'high').length
  const medCount  = fields.filter(f => f.sensitivity === 'medium').length
  const lowCount  = fields.filter(f => f.sensitivity === 'low').length

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔍</span>
            <span className="font-medium text-gray-900 text-sm">¿Qué saben de ti?</span>
          </div>
          <div className="flex items-center gap-3">
            <ProviderBadge provider={provider} />
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button
                type="submit"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Intro */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Hola, {session.user?.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-gray-500">
            Esto es exactamente lo que{' '}
            <span className="font-medium text-gray-700">cualquier app</span>{' '}
            recibe cuando inicias sesión con {provider.charAt(0).toUpperCase() + provider.slice(1)}.
          </p>
        </div>

        {/* Resumen de sensibilidad */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-semibold text-red-500">{highCount}</p>
            <p className="text-xs text-gray-400 mt-1">Alta sensibilidad</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-semibold text-amber-400">{medCount}</p>
            <p className="text-xs text-gray-400 mt-1">Media sensibilidad</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-semibold text-green-500">{lowCount}</p>
            <p className="text-xs text-gray-400 mt-1">Baja sensibilidad</p>
          </div>
        </div>

        {/* Campos agrupados por categoría */}
        {categoryOrder.map(category => {
          const items = grouped[category]
          if (!items) return null

          return (
            <section key={category} className="mb-8">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {categoryLabel[category]}
              </h2>
              <div className="flex flex-col gap-3">
                {items.map(field => (
                  <DataCard key={field.key} field={field} />
                ))}
              </div>
            </section>
          )
        })}

        {/* Raw profile */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Objeto crudo del provider
          </h2>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-xs text-green-400 leading-relaxed whitespace-pre-wrap break-all">
              {JSON.stringify(rawProfile, null, 2)}
            </pre>
          </div>
        </section>

      </div>
    </main>
  )
}