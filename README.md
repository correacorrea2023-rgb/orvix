# ORVIX

Todo tu trabajo. Un solo lugar.

Este repo contiene **M0**: el esqueleto del proyecto con Next.js + Tailwind + Supabase conectados,
y autenticación básica (email/password) funcionando de punta a punta. Todavía no hay Workspaces,
módulos ni datos — eso empieza en M1.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (config vía `@theme` en `app/globals.css`, no hay `tailwind.config.js`)
- Supabase (Auth por ahora; Postgres + RLS llegan en M1)

## Qué es real y qué es placeholder

- ✅ Real: login, registro y logout contra Supabase Auth.
- ✅ Real: middleware que protege todas las rutas excepto `/login` y `/register`.
- 🔜 Placeholder: la página `/` (home) es un stub que solo confirma que la sesión funciona.
  El Dashboard Global de verdad se construye en M8.

No hay botones que no hagan nada ni datos inventados — lo que ves es lo que hay.

## 1. Crear el repo en GitHub

Si todavía no existe:

1. Creá un repositorio nuevo (vacío, sin README) en GitHub, por ejemplo `orvix`.
2. En tu máquina, dentro de esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "feat: project setup (Next.js + Tailwind + Supabase Auth)"
   git branch -M main
   git remote add origin <URL_DE_TU_REPO>
   git push -u origin main
   ```

## 2. Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá un proyecto nuevo (elegí una región cercana).
2. En **Project Settings → API**, copiá:
   - `Project URL`
   - `anon public` key
3. En **Authentication → Providers**, confirmá que **Email** esté habilitado.
4. Para probar más rápido en local, en **Authentication → Sign In / Providers → Email**
   podés desactivar temporalmente "Confirm email" (si no, tenés que confirmar por mail
   antes de poder iniciar sesión). Recordá reactivarlo antes de ir a producción.

## 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Completá `.env.local` con los dos valores del paso anterior:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

## 4. Instalar y correr

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). Como no hay sesión, te va a redirigir a
`/login`. Creá una cuenta desde `/register`, confirmá el mail (o desactivá esa opción como se
explicó arriba), iniciá sesión, y deberías ver la pantalla placeholder con tu email y un botón
para cerrar sesión.

## Estructura

```
app/
├── (auth)/login/        # página + server action de login
├── (auth)/register/     # página + server action de registro
├── layout.tsx           # layout raíz, tipografía (Inter)
├── globals.css          # design tokens (colores, radius) vía @theme
└── page.tsx             # placeholder de Dashboard Global (M0)
lib/
├── supabase/client.ts   # cliente para Client Components
├── supabase/server.ts   # cliente para Server Components / Server Actions
└── supabase/middleware.ts
middleware.ts             # protege rutas privadas, refresca la sesión
components/ui/            # Button, Input, Label (hechos a mano, sin shadcn todavía)
```

## Por qué así (para ir aprendiendo)

- **Server Actions** (`'use server'` en `actions.ts`) en vez de armar rutas de API propias:
  el formulario llama directo a una función que corre en el servidor. Menos código, menos capas.
- **`lib/supabase/server.ts` vs `client.ts`**: Supabase necesita dos formas de crear el cliente
  porque en el servidor la sesión vive en cookies (hay que leerlas/escribirlas explícitamente),
  y en el navegador se maneja distinto. Es la separación que pide la propia librería `@supabase/ssr`.
- **`middleware.ts`**: corre antes de cualquier página y decide si te deja pasar o te manda a
  `/login`. Es el único lugar donde vive esa regla — no está repetida en cada página.
- **Design tokens en `globals.css`**: los colores no están hardcodeados en cada componente,
  están en variables (`--color-background`, `--color-accent`, etc.). Cambiar el color de marca
  el día de mañana es tocar un solo archivo.

## shadcn/ui (opcional, todavía no instalado)

Los componentes en `components/ui/` son versiones mínimas hechas a mano para no depender de
una instalación interactiva en este momento. Cuando quieras, podés correr:

```bash
npx shadcn@latest init -d
```

y después ir reemplazando `button.tsx`, `input.tsx`, `label.tsx` por las versiones oficiales
sin romper nada, porque el resto del código los importa desde `@/components/ui/*`.

## Próximo milestone (M1)

Base multi-tenant: tablas `profiles`, `workspaces`, `workspace_members` en Supabase con RLS,
y la posibilidad de crear tu primer Workspace.
