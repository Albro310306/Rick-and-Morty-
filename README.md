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
