import NextAuth from 'next-auth'
import { providers } from './providers'
import type { ProviderName } from '@/types'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,

  pages: {
    signIn: '/',         // nuestra propia landing, no la de NextAuth
    error: '/?error=1',  // errores vuelven a la landing
  },

  callbacks: {
    // jwt() se ejecuta cada vez que se crea o refresca el token
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Guardamos datos extra en el token la primera vez que el usuario inicia sesión
        token.provider = account.provider as ProviderName
        token.accessToken = account.access_token
        token.rawProfile = profile as Record<string, unknown>
        token.providerAccountId = account.providerAccountId
      }
      return token
    },

    // session() expone al cliente solo lo que nosotros decidimos
    async session({ session, token }) {
      session.provider = token.provider as ProviderName
      session.accessToken = token.accessToken as string
      session.rawProfile = token.rawProfile as Record<string, unknown>
      return session
    },
  },

  // En desarrollo no necesitas HTTPS
  trustHost: true,
})