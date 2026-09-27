import Link from 'next/link'
import { register } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; check_email?: string }>
}) {
  const { error, check_email } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium">Creá tu cuenta</h1>
        <p className="mt-1 text-sm text-muted">Vas a poder crear tu primer Workspace después.</p>

        {check_email ? (
          <p className="mt-8 text-sm text-foreground">
            Te enviamos un email para confirmar la cuenta. Una vez confirmada, iniciá sesión
            desde <Link href="/login" className="underline underline-offset-4">acá</Link>.
          </p>
        ) : (
          <form action={register} className="mt-8 space-y-4">
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
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            {error && <p className="text-sm text-red-500">{decodeURIComponent(error)}</p>}

            <Button type="submit" className="w-full">
              Crear cuenta
            </Button>
          </form>
        )}

        <p className="mt-6 text-sm text-muted">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-foreground underline underline-offset-4">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  )
}
