import Link from 'next/link'
import { createWorkspace } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WORKSPACE_COLORS, DEFAULT_WORKSPACE_COLOR } from '@/lib/workspace-colors'
import { WORKSPACE_ICONS, DEFAULT_WORKSPACE_ICON } from '@/lib/workspace-icons'

export default async function NewWorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <Link href="/" className="text-sm text-muted underline underline-offset-4">
        ← Volver
      </Link>

      <h1 className="mt-4 text-2xl font-medium">Nuevo Workspace</h1>
      <p className="mt-1 text-sm text-muted">
        Un Workspace es un espacio separado para uno de tus trabajos o proyectos.
      </p>

      <form action={createWorkspace} className="mt-8 space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" required placeholder="FollowMe" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Descripción (opcional)</Label>
          <Input id="description" name="description" placeholder="Seguimiento de colegios" />
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Color</legend>
          <div className="flex flex-wrap gap-2">
            {WORKSPACE_COLORS.map((c) => (
              <label key={c.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={c.value}
                  defaultChecked={c.value === DEFAULT_WORKSPACE_COLOR}
                  className="peer sr-only"
                />
                <span
                  className="block h-8 w-8 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-background peer-checked:ring-foreground"
                  style={{ backgroundColor: c.hex }}
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Ícono</legend>
          <div className="flex flex-wrap gap-2">
            {Object.entries(WORKSPACE_ICONS).map(([key, Icon]) => (
              <label key={key} className="cursor-pointer">
                <input
                  type="radio"
                  name="icon"
                  value={key}
                  defaultChecked={key === DEFAULT_WORKSPACE_ICON}
                  className="peer sr-only"
                />
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted peer-checked:border-accent peer-checked:text-accent">
                  <Icon size={18} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="text-sm text-red-500">{decodeURIComponent(error)}</p>}

        <Button type="submit" className="w-full">
          Crear Workspace
        </Button>
      </form>
    </main>
  )
}
