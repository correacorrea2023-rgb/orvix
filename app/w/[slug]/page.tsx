import { notFound } from 'next/navigation'
import { getWorkspaceBySlug } from '@/lib/data/workspaces'

export default async function WorkspaceOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const workspace = await getWorkspaceBySlug(slug)

  if (!workspace) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-xl font-medium">Overview</h1>
      {workspace.description && (
        <p className="mt-2 text-sm text-muted">{workspace.description}</p>
      )}
      <p className="mt-6 text-sm text-muted">
        Todavía no hay módulos activados en este Workspace — Contactos, Pipeline, Tareas y
        Comisiones se agregan en M3.
      </p>
    </div>
  )
}
