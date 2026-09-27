import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getWorkspacesForCurrentUser } from '@/lib/data/workspaces'
import { getWorkspaceIcon } from '@/lib/workspace-icons'
import { WORKSPACE_COLORS } from '@/lib/workspace-colors'
import { Button } from '@/components/ui/button'

// Todavía es un placeholder (el Dashboard Global real es M8), pero ya
// muestra datos reales: tus workspaces, tal como quedaron guardados.
export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const workspaces = await getWorkspacesForCurrentUser()

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Buenos días.</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="secondary">
            Cerrar sesión
          </Button>
        </form>
      </div>

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
                <li
                  key={workspace.id}
                  className="flex items-center gap-3 rounded-md border border-border px-4 py-3"
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
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <p className="mt-10 text-xs text-muted">
        Todavía no se puede entrar a un workspace (eso es M2) — esta pantalla confirma que
        crear y listar workspaces ya funciona de punta a punta, con cada usuario viendo
        solo lo suyo.
      </p>
    </main>
  )
}
