import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getWorkspacesForCurrentUser } from '@/lib/data/workspaces'
import { Sidebar } from '@/components/layout/sidebar'

export default async function GlobalLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const workspaces = await getWorkspacesForCurrentUser()

  return (
    <div className="flex">
      <Sidebar workspaces={workspaces} userEmail={user.email ?? ''} />
      <div className="flex-1">{children}</div>
    </div>
  )
}
