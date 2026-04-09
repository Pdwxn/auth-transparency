
export type SensitivityLevel = 'high' | 'medium' | 'low'

export type ProviderName = 'google' | 'github' | 'discord'

export interface ParsedField {
  key: string
  label: string
  value: string | null
  description: string        // qué puede hacer la empresa con este dato
  sensitivity: SensitivityLevel
  category: 'identity' | 'contact' | 'account' | 'permissions' | 'metadata'
}

export interface ParsedTokenData {
  provider: ProviderName
  fields: ParsedField[]
  rawProfile: Record<string, unknown>  // el objeto crudo del provider
  scopes: string[]
}

// Extendemos el tipo Session de NextAuth para incluir datos extra
declare module 'next-auth' {
  interface Session {
    provider?: ProviderName
    accessToken?: string
    rawProfile?: Record<string, unknown>
  }
}