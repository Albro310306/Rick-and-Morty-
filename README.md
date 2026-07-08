# Rick and Morty API Endpoints

## Base URL
`https://rickandmortyapi.com/api`

## 1. Personajes (Characters)

- **Listar personajes:**
  `GET /character`

- **Detalle de un personaje:**
  `GET /character/1`

- **Varios personajes:**
  `GET /character/1,2,3`

- **Paginación:**
  `GET /character/?page=2`

- **Filtros:**
  - `GET /character/?name=rick`
  - `GET /character/?status=alive`
  - `GET /character/?name=rick&status=alive`

  **Filtros disponibles:**
  - `name`
  - `status`
  - `species`
  - `type`
  - `gender`

## 2. Ubicaciones (Locations)

- **Listar ubicaciones:**
  `GET /location`

- **Detalle de una ubicación:**
  `GET /location/1`

- **Varias ubicaciones:**
  `GET /location/1,2,3`

- **Filtros:**
  - `GET /location/?name=earth`
  - `GET /location/?type=planet`
  - `GET /location/?dimension=Dimension C-137`

  **Filtros disponibles:**
  - `name`
  - `type`
  - `dimension`

## 3. Episodios (Episodes)

- **Listar episodios:**
  `GET /episode`

- **Detalle de un episodio:**
  `GET /episode/1`

- **Varios episodios:**
  `GET /episode/1,2,3`

- **Filtros:**
  - `GET /episode/?name=pilot`
  - `GET /episode/?episode=S01E01`

  **Filtros disponibles:**
  - `name`
  - `episode`

---
> **Nota para el proyecto:**
> Utilizaremos el endpoint `https://rickandmortyapi.com/api/character` para mostrar los personajes en la vista principal y la vista detalle, aplicando paginación y filtros por nombre.
