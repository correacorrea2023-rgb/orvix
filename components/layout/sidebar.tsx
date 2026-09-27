'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Inbox, Plus } from 'lucide-react'
import { signOut } from '@/app/(global)/actions'
import { getWorkspaceIcon } from '@/lib/workspace-icons'
import { WORKSPACE_COLORS } from '@/lib/workspace-colors'
import { cn } from '@/lib/utils'
import type { Workspace } from '@/lib/data/workspaces'

const GLOBAL_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/inbox', label: 'Inbox', icon: Inbox },
]

export function Sidebar({
  workspaces,
  userEmail,
}: {
  workspaces: Workspace[]
  userEmail: string
}) {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border">
      <div className="px-4 py-5">
        <span className="text-sm font-semibold tracking-tight">ORVIX</span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3">
        <div className="space-y-0.5">
          {GLOBAL_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                  active ? 'bg-border/60 text-foreground' : 'text-muted hover:text-foreground'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </div>

        <div>
          <p className="px-2 text-xs font-medium uppercase text-muted">Workspaces</p>
          <div className="mt-1 space-y-0.5">
            {workspaces.map((workspace) => {
              const Icon = getWorkspaceIcon(workspace.icon)
              const color = WORKSPACE_COLORS.find((c) => c.value === workspace.color)?.hex
              const href = `/w/${workspace.slug}`
              const active = pathname.startsWith(href)

              return (
                <Link
                  key={workspace.id}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                    active ? 'bg-border/60 text-foreground' : 'text-muted hover:text-foreground'
                  )}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-white"
                    style={{ backgroundColor: color ?? '#6E56CF' }}
                  >
                    <Icon size={12} />
                  </span>
                  <span className="truncate">{workspace.name}</span>
                </Link>
              )
            })}

            <Link
              href="/workspaces/new"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted hover:text-foreground"
            >
              <Plus size={16} />
              Nuevo espacio
            </Link>
          </div>
        </div>
      </nav>

      <div className="border-t border-border px-3 py-3">
        <p className="truncate px-2 text-xs text-muted">{userEmail}</p>
        <form action={signOut}>
          <button
            type="submit"
            className="mt-1 w-full rounded-md px-2 py-1.5 text-left text-sm text-muted hover:text-foreground"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
