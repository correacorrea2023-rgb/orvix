import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

// Placeholder temporal. El Dashboard Global real se construye en M8.
// Esta pantalla existe solo para confirmar que el login/logout
// funciona de punta a punta antes de seguir con el resto del MVP.
export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-medium">Buenos días.</h1>
      <p className="mt-2 text-muted">
        Sesión iniciada como {user.email}. Esta pantalla es un placeholder de M0 — el Dashboard
        Global real (agenda, tareas, ingresos consolidados) se construye en M8.
      </p>
      <form action={signOut} className="mt-8">
        <Button type="submit" variant="secondary">
          Cerrar sesión
        </Button>
      </form>
    </main>
  )
}
