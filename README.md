# Olmo Cobo — Web

Next.js + TypeScript + Tailwind. Datos en local (JSON + imágenes en disco).

---

## Setup en local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env
```

Rellena al menos:

- `ADMIN_PASSWORD` (acceso a `/admin`)
- `ADMIN_SESSION_SECRET` (genera uno con `openssl rand -base64 32`)
- `NEXT_PUBLIC_CONTACT_EMAIL` (opcional, visible en la web)
- `RESEND_API_KEY`, `LEADS_NOTIFICATION_EMAIL` (opcional, alertas por email de nuevos leads)

### 3. Desarrollo

```bash
npm run dev
```

- Web: [http://localhost:3000](http://localhost:3000)
- Admin propiedades: `/admin`
- Admin leads: `/admin/leads`

Los datos se guardan en `.data/` (propiedades y leads). Las imágenes subidas desde el panel van a `public/uploads/`.

Al arrancar por primera vez, las propiedades demo de `src/data/properties.ts` se copian automáticamente a `.data/properties.json`.

---

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Persistencia local (JSON + filesystem)
