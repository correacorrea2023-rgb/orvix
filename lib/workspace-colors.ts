// Paleta fija para M1. Guardamos el "value" (no el hex) en la base,
// así el día de mañana podemos cambiar los tonos sin tocar datos.
export const WORKSPACE_COLORS = [
  { value: 'violet', hex: '#6E56CF' },
  { value: 'blue', hex: '#3B82F6' },
  { value: 'green', hex: '#22C55E' },
  { value: 'orange', hex: '#F97316' },
  { value: 'pink', hex: '#EC4899' },
  { value: 'slate', hex: '#64748B' },
] as const

export const DEFAULT_WORKSPACE_COLOR = 'violet'
