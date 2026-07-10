# Rick and Morty App — Estructura y Modularización

Resumen rápido sobre dónde está implementada la modularización (features, hooks personalizados), componentes UI reutilizables y cómo probar el manejo de errores.

## Estructura relevante
- `src/features/` — Carpetas por *feature* (ej. `teams`). Cada feature agrupa páginas, componentes y hooks relacionados.
  - Ejemplo: [src/features/teams](src/features/teams)
- `src/features/teams/hooks/useTeams.js` — Hooks personalizados para queries y mutaciones (`useTeams`, `useTeam`, `useTeamMutations`).
  - Archivo: [src/features/teams/hooks/useTeams.js](src/features/teams/hooks/useTeams.js)
- `src/api/` — Capa API centralizada (llamadas a servicios externos). Ej: [src/api/rickAndMorty.js](src/api/rickAndMorty.js)
- `src/components/ui/` — Componentes UI reutilizables (cards, pagination, skeletons, `ToastContext`).
  - Toasts y contexto: [src/components/ui/ToastContext.jsx](src/components/ui/ToastContext.jsx)
- `src/components/pages/` y `src/components/sections/` — Páginas y secciones reutilizables (ej. `Home`, `Header`, `FloatingNav`).

## Hooks personalizados y slices conceptuales
- Hooks centrales encontrados:
  - `useTeams`, `useTeam`, `useTeamMutations` — [src/features/teams/hooks/useTeams.js](src/features/teams/hooks/useTeams.js)
  - `useToast` — desde [src/components/ui/ToastContext.jsx](src/components/ui/ToastContext.jsx)

Nota: no se usa Redux en este repo; el patrón "slices" está implementado de forma modular por feature folders (cada feature actúa como slice lógico: api, hooks, components, pages).

## UI reutilizable
- Componentes en: [src/components/ui](src/components/ui)
  - `CharacterCard`, `Pagination`, `SkeletonCard`, `SearchInput`, `ToastContext`.

## Manejo de errores y cómo probarlo
- Se añadió una simulación de fallo en la API (buscar exactamente `simulate-error`) en:
  - [src/api/rickAndMorty.js](src/api/rickAndMorty.js)
- Alternativamente, la URL de la API fue cambiada temporalmente a un host inválido para forzar errores de red.

Pasos para reproducir el fallo en tu entorno local:
```bash
npm install
npm run dev
```
- Abre `http://localhost:5173` (puede variar según Vite). En la página principal, escribe `simulate-error` en la búsqueda y espera: verás el banner inline (en `Home` o en `TeamFormPage`) y un toast deslizante con el mensaje de error.

## Notas sobre accesibilidad y UX
- Los toasts ahora usan animación de deslizamiento (slide-in desde la derecha) y tienen `role="status"` y `aria-live="polite"` para anunciarse a lectores de pantalla.

Si quieres, puedo:
- Ajustar la duración/velocidad de la animación.
- Restaurar la URL real de la API (cuando termines de probar).

---
Archivo generado automáticamente para documentación básica del proyecto.
# Rick and Morty App - Multiverso Explorer (Nivel 3)

Esta aplicación es un proyecto React avanzado que consume la API de Rick and Morty y cuenta con un CRUD completo utilizando un servidor local (JSON Server).

## Tecnologías Utilizadas

- **React 19**
- **React-Router v7** para navegación y manejo de layouts.
- **React Query** para fetching y cacheo de datos.
- **Axios** para mutaciones del CRUD.
- **React Hook Form** junto a **Zod** para manejo y validación de formularios.
- **Tailwind CSS V.3** para estilos modernos y responsivos.
- **Framer Motion** para transiciones y animaciones fluidas.
- **JSON Server** para la simulación de un backend local.

## Características de Nivel 3

- **CRUD de Equipos:** Permite Crear, Listar, Ver Detalle, Editar y Eliminar equipos personalizados ("Teams").
- **Manejo de Errores Personalizado:** Sistema de notificaciones (Toasts) globales implementado con Context API.
- **Integración con 2 APIs:** El detalle del equipo combina los datos guardados en el `json-server` (nombres y IDs) cruzándolos con la API oficial de Rick & Morty para cargar la información real de los personajes de ese equipo.
- **Modularización Avanzada:** Arquitectura basada en Features (`src/features/teams`), custom hooks para lógica de mutaciones (`useTeams`) y schemas independientes.
- **Animaciones:** Se incorporó Framer Motion para entradas suaves de tarjetas, notificaciones y carga de página.

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Levantar servidor local (JSON Server) y Vite (Frontend) simultáneamente:
   ```bash
   npm run dev:all
   ```

   - El **frontend** se ejecutará en el puerto de Vite (ej. `http://localhost:5173`).
   - El **backend** local se ejecutará en `http://localhost:3001` (leyendo el archivo `server/db.json`).

## Arquitectura de Carpetas Destacada

- `/server/db.json` -> Base de datos local.
- `/src/features/teams` -> Contiene toda la lógica del CRUD de equipos (api, hooks, pages, schemas).
- `/src/components/ui/ToastContext.jsx` -> Proveedor de notificaciones global.

## Endpoints Originales (Referencia)
- API Rick and Morty: `https://rickandmortyapi.com/api`
- Personajes: `GET /character`
