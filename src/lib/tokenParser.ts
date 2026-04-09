import type { ParsedField, ParsedTokenData, ProviderName } from '@/types'

// Cada provider devuelve un objeto diferente — normalizamos todo aquí
export function parseTokenData(
  provider: ProviderName,
  rawProfile: Record<string, unknown>,
  scopes: string[] = []
): ParsedTokenData {
  const fields: ParsedField[] = []

  switch (provider) {
    case 'google':
      fields.push(
        field('sub', 'ID único de Google', rawProfile.sub, {
          description: 'Tu identidad permanente en Google. No cambia aunque cambies tu email o nombre. Permite rastrearte entre servicios y sesiones indefinidamente.',
          sensitivity: 'high',
          category: 'identity',
        }),
        field('name', 'Nombre completo', rawProfile.name, {
          description: 'Tu nombre real tal como aparece en tu cuenta Google. Las empresas lo usan para personalización, marketing directo y perfiles de usuario.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('given_name', 'Nombre de pila', rawProfile.given_name, {
          description: 'Tu primer nombre. Usado para saludos personalizados en emails y notificaciones.',
          sensitivity: 'low',
          category: 'identity',
        }),
        field('family_name', 'Apellido', rawProfile.family_name, {
          description: 'Tu apellido. Combinado con el nombre, permite identificarte en bases de datos y sistemas externos.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('email', 'Correo electrónico', rawProfile.email, {
          description: 'Tu email verificado. Es tu identificador principal: permite enviarte marketing, recuperar tu cuenta, compartir tu contacto con terceros y vincularte entre plataformas.',
          sensitivity: 'high',
          category: 'contact',
        }),
        field('email_verified', 'Email verificado', rawProfile.email_verified, {
          description: 'Confirma que tienes acceso real a esta dirección. Un email verificado tiene más valor comercial y credibilidad para servicios de terceros.',
          sensitivity: 'low',
          category: 'metadata',
        }),
        field('picture', 'Foto de perfil', rawProfile.picture, {
          description: 'URL pública de tu foto. Puede usarse para reconocimiento facial, entrenamiento de modelos de IA, o simplemente mostrarse en la interfaz.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('locale', 'Idioma y región', rawProfile.locale, {
          description: 'Tu idioma y región configurados en Google. Revela tu ubicación aproximada y se usa para segmentación geográfica de contenido y publicidad.',
          sensitivity: 'low',
          category: 'metadata',
        }),
        field('hd', 'Dominio de organización', rawProfile.hd, {
          description: 'Si usas una cuenta de Google Workspace (empresa o universidad), expone el dominio de tu organización. Permite inferir tu empleador o institución.',
          sensitivity: 'high',
          category: 'account',
        })
      )
      break

    case 'github':
      fields.push(
        field('id', 'ID de GitHub', rawProfile.id, {
          description: 'Tu identificador numérico permanente en GitHub. No cambia aunque cambies tu username. Usado para vincularte entre servicios que usan GitHub login.',
          sensitivity: 'high',
          category: 'identity',
        }),
        field('login', 'Username', rawProfile.login, {
          description: 'Tu nombre de usuario público en GitHub. Permite encontrar tu perfil, tus repositorios y tu actividad pública sin ninguna barrera.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('name', 'Nombre público', rawProfile.name, {
          description: 'El nombre que pusiste en tu perfil de GitHub. Puede ser tu nombre real o un alias.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('email', 'Correo electrónico', rawProfile.email, {
          description: 'Tu email principal de GitHub. Solo se expone si lo tienes como público o si el scope email fue concedido.',
          sensitivity: 'high',
          category: 'contact',
        }),
        field('avatar_url', 'Foto de perfil', rawProfile.avatar_url, {
          description: 'URL de tu avatar en GitHub. Accesible públicamente. Puede usarse para mostrar tu identidad visual en servicios de terceros.',
          sensitivity: 'low',
          category: 'identity',
        }),
        field('bio', 'Biografía', rawProfile.bio, {
          description: 'Tu descripción personal en GitHub. Puede revelar tu rol profesional, intereses, o empleador.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('company', 'Empresa', rawProfile.company, {
          description: 'La empresa u organización que pusiste en tu perfil. Expone directamente tu empleador o afiliación profesional.',
          sensitivity: 'high',
          category: 'account',
        }),
        field('location', 'Ubicación', rawProfile.location, {
          description: 'Tu ubicación declarada en GitHub. Puede revelar tu ciudad o país, usado para segmentación geográfica.',
          sensitivity: 'high',
          category: 'metadata',
        }),
        field('public_repos', 'Repositorios públicos', rawProfile.public_repos, {
          description: 'Número de repos públicos. Indica tu nivel de actividad y experiencia como desarrollador.',
          sensitivity: 'low',
          category: 'account',
        }),
        field('followers', 'Seguidores', rawProfile.followers, {
          description: 'Tu popularidad en la comunidad. Usado como señal de influencia técnica.',
          sensitivity: 'low',
          category: 'account',
        }),
        field('created_at', 'Cuenta creada', rawProfile.created_at, {
          description: 'Cuándo creaste tu cuenta de GitHub. Indica tu antigüedad como desarrollador.',
          sensitivity: 'low',
          category: 'metadata',
        })
      )
      break

    case 'discord':
      fields.push(
        field('id', 'ID de Discord', rawProfile.id, {
          description: 'Tu identificador único y permanente en Discord. No cambia con el tiempo. Permite rastrearte entre bots, servidores y aplicaciones terceras.',
          sensitivity: 'high',
          category: 'identity',
        }),
        field('username', 'Username', rawProfile.username, {
          description: 'Tu nombre de usuario actual en Discord. Visible para cualquier persona en servidores compartidos.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('global_name', 'Nombre para mostrar', rawProfile.global_name, {
          description: 'Tu nombre de display global en Discord (el que ven todos). Puede diferir del username técnico.',
          sensitivity: 'medium',
          category: 'identity',
        }),
        field('email', 'Correo electrónico', rawProfile.email, {
          description: 'Tu email de Discord. Solo accesible si el scope "email" fue concedido. Alto valor para marketing y vinculación de identidades entre plataformas.',
          sensitivity: 'high',
          category: 'contact',
        }),
        field('verified', 'Email verificado', rawProfile.verified, {
          description: 'Si tu email está verificado en Discord. Determina el nivel de confianza de tu cuenta.',
          sensitivity: 'low',
          category: 'metadata',
        }),
        field('avatar', 'Hash del avatar', rawProfile.avatar, {
          description: 'Hash que identifica tu foto de perfil. Se combina con tu ID para construir la URL de tu avatar: cdn.discordapp.com/avatars/{id}/{avatar}.png',
          sensitivity: 'low',
          category: 'identity',
        }),
        field('discriminator', 'Discriminador', rawProfile.discriminator, {
          description: 'El número de 4 dígitos histórico de Discord (#0000). En cuentas nuevas es "0" pero se mantiene por compatibilidad.',
          sensitivity: 'low',
          category: 'identity',
        }),
        field('locale', 'Idioma', rawProfile.locale, {
          description: 'El idioma configurado en tu cliente de Discord. Revela tu región e idioma preferido.',
          sensitivity: 'low',
          category: 'metadata',
        }),
        field('mfa_enabled', 'Autenticación en dos pasos', rawProfile.mfa_enabled, {
          description: 'Si tienes 2FA activado. Indica el nivel de seguridad de tu cuenta. Datos de seguridad que no deberían ser necesarios para una app de terceros.',
          sensitivity: 'medium',
          category: 'account',
        }),
        field('premium_type', 'Tipo de Nitro', rawProfile.premium_type, {
          description: 'Si tienes Discord Nitro (0=ninguno, 1=básico, 2=completo). Revela información sobre tu poder adquisitivo y hábitos de gasto.',
          sensitivity: 'high',
          category: 'account',
        })
      )
      break
  }

  // Filtramos campos con valor null o undefined para no mostrar vacíos
  return {
    provider,
    fields: fields.filter(f => f.value !== null && f.value !== undefined && f.value !== ''),
    rawProfile,
    scopes,
  }
}

// Helper para crear un campo de forma concisa
function field(
  key: string,
  label: string,
  value: unknown,
  meta: Omit<ParsedField, 'key' | 'label' | 'value'>
): ParsedField {
  return {
    key,
    label,
    value: value != null ? String(value) : null,
    ...meta,
  }
}