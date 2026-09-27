import { z } from 'zod'
import { WORKSPACE_COLORS } from '@/lib/workspace-colors'
import { WORKSPACE_ICONS, DEFAULT_WORKSPACE_ICON } from '@/lib/workspace-icons'

const colorValues = WORKSPACE_COLORS.map((c) => c.value) as [string, ...string[]]
const iconValues = Object.keys(WORKSPACE_ICONS) as [string, ...string[]]

// Esto es lo único en lo que confiamos: lo que mande el formulario
// se valida acá antes de tocar la base de datos.
export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(2, 'El nombre tiene que tener al menos 2 caracteres').max(60),
  description: z.string().trim().max(200).optional().or(z.literal('')),
  color: z.enum(colorValues),
  icon: z.enum(iconValues).default(DEFAULT_WORKSPACE_ICON),
})

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>
