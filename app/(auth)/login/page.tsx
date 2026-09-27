import Link from 'next/link'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium">Iniciá sesión</h1>
        <p className="mt-1 text-sm text-muted">Entrá a tu espacio de trabajo en ORVIX.</p>

        <form action={login} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-500">{decodeURIComponent(error)}</p>}

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted">
          ¿Todavía no tenés cuenta?{' '}
          <Link href="/register" className="text-foreground underline underline-offset-4">
            Creá una
          </Link>
        </p>
      </div>
    </main>
  )
}
