import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export interface Workspace {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  created_at: string
}

// Gracias a RLS, esta consulta "sin filtros" ya devuelve solo los
// workspaces del usuario logueado. La base de datos filtra por nosotros.
export async function getWorkspacesForCurrentUser(): Promise<Workspace[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workspaces')
    .select('id, name, slug, description, icon, color, created_at')
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

// cache() de React deduplica: si layout.tsx y page.tsx piden el mismo
// slug en el mismo request, esto corre la consulta una sola vez.
export const getWorkspaceBySlug = cache(async (slug: string): Promise<Workspace | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workspaces')
    .select('id, name, slug, description, icon, color, created_at')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
})
