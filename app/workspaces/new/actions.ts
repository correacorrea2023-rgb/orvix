'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createWorkspaceSchema } from '@/schemas/workspace'
import { slugify } from '@/lib/utils'

export async function createWorkspace(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const parsed = createWorkspaceSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    color: formData.get('color'),
    icon: formData.get('icon'),
  })

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Datos inválidos'
    redirect(`/workspaces/new?error=${encodeURIComponent(message)}`)
  }

  const { name, description, color, icon } = parsed.data
  const baseSlug = slugify(name) || 'workspace'

  // unique(owner_id, slug) en la base: solo nos importa no chocar
  // con OTRO workspace tuyo, no con los de otros usuarios.
  let slug = baseSlug
  const { data: existing } = await supabase
    .from('workspaces')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
  }

  const { error } = await supabase.from('workspaces').insert({
    owner_id: user.id,
    name,
    slug,
    description: description || null,
    color,
    icon,
  })

  if (error) {
    redirect(`/workspaces/new?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/')
}
