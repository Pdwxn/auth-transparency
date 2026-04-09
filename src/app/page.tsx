import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginButton } from '../components/LoginButtons'

export default async function LandingPage() {
  // Si ya tiene sesión, lo mandamos directo al dashboard
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            ¿Qué saben de ti?
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Inicia sesión con cualquier proveedor y descubre exactamente
            qué datos recibe la aplicación sobre ti.
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
            Elige un proveedor
          </p>

          <div className="flex flex-col gap-3">
            <LoginButton provider="google" />
            <LoginButton provider="github" />
            <LoginButton provider="discord" />
          </div>

          <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
            No almacenamos ningún dato. Todo se procesa en memoria
            y desaparece al cerrar sesión.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Un experimento de transparencia sobre OAuth y privacidad
        </p>

      </div>
    </main>
  )
}