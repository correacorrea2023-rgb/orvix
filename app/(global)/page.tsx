import Link from 'next/link'
import { getWorkspacesForCurrentUser } from '@/lib/data/workspaces'
import { getWorkspaceIcon } from '@/lib/workspace-icons'
import { WORKSPACE_COLORS } from '@/lib/workspace-colors'
import { Button } from '@/components/ui/button'

// El layout de (global) ya se aseguró de que haya sesión — esta página
// no necesita repetir esa comprobación.
export default async function HomePage() {
  const workspaces = await getWorkspacesForCurrentUser()

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-medium">Buenos días.</h1>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted">Tus workspaces</h2>
          {workspaces.length > 0 && (
            <Link
              href="/workspaces/new"
              className="text-sm text-accent underline underline-offset-4"
            >
              + Nuevo workspace
            </Link>
          )}
        </div>

        {workspaces.length === 0 ? (
          <div className="mt-4 rounded-md border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted">Todavía no tenés ningún workspace en ORVIX.</p>
            <Link href="/workspaces/new" className="mt-4 inline-block">
              <Button>Crear el primero</Button>
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {workspaces.map((workspace) => {
              const Icon = getWorkspaceIcon(workspace.icon)
              const color = WORKSPACE_COLORS.find((c) => c.value === workspace.color)?.hex

              return (
                <li key={workspace.id}>
                  <Link
                    href={`/w/${workspace.slug}`}
                    className="flex items-center gap-3 rounded-md border border-border px-4 py-3 hover:border-accent"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white"
                      style={{ backgroundColor: color ?? '#6E56CF' }}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{workspace.name}</p>
                      {workspace.description && (
                        <p className="text-xs text-muted">{workspace.description}</p>
                      )}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
