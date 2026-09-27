import type { ReactNode } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWorkspaceBySlug } from '@/lib/data/workspaces'
import { getWorkspaceIcon } from '@/lib/workspace-icons'
import { WORKSPACE_COLORS } from '@/lib/workspace-colors'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const workspace = await getWorkspaceBySlug(slug)

  // RLS hace que esto sea null tanto si el workspace no existe como si
  // es de otro usuario — en los dos casos, 404. Nunca hay forma de
  // distinguir "no existe" de "no es tuyo" desde afuera.
  if (!workspace) {
    notFound()
  }

  const Icon = getWorkspaceIcon(workspace.icon)
  const color = WORKSPACE_COLORS.find((c) => c.value === workspace.color)?.hex

  return (
    <div>
      <header className="flex items-center gap-3 border-b border-border px-6 py-4">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-md text-white"
          style={{ backgroundColor: color ?? '#6E56CF' }}
        >
          <Icon size={16} />
        </span>
        <div>
          <p className="text-sm font-medium">{workspace.name}</p>
          <Link href="/" className="text-xs text-muted hover:text-foreground">
            ← Volver a ORVIX
          </Link>
        </div>
      </header>

      <div className="px-6 py-8">{children}</div>
    </div>
  )
}
