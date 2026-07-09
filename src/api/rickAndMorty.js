const API_URL = "https://rickandmortyapi.com/api/character";

/**
 * Obtiene la lista de personajes con filtros opcionales y paginación.
 * @param {string} nameFilter - Filtro por nombre.
 * @param {string} status - Filtro por estado (alive, dead, unknown).
 * @param {number} page - Número de página.
 */
export const fetchCharacters = async (nameFilter = '', status = '', page = 1) => {
  const params = new URLSearchParams();
  if (nameFilter) params.set('name', nameFilter);
  if (status) params.set('status', status);
  if (page > 1) params.set('page', page);
  const query = params.toString();
  const url = query ? `${API_URL}/?${query}` : API_URL;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return { results: [], info: null };
    }
    throw new Error('Network response was not ok');
  }

  return response.json();
};

/**
 * Obtiene un personaje por su ID.
 * @param {string|number} id - ID del personaje.
 */
export const fetchCharacterById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Personaje no encontrado');
  }
  return response.json();
};

/**
 * Obtiene los detalles de un episodio por su URL completa.
 * Devuelve datos como nombre, código (S01E01) y fecha de emisión.
 * @param {string} url - URL completa del episodio.
 */
export const fetchEpisodeByUrl = async (url) => {
  if (!url) return null;
  const response = await fetch(url);
  if (!response.ok) return null;
  return response.json();
};

/**
 * Obtiene los detalles de una ubicación por su URL completa.
 * Devuelve tipo de lugar y dimensión.
 * @param {string} url - URL completa de la ubicación.
 */
export const fetchLocationByUrl = async (url) => {
  if (!url || url === 'https://rickandmortyapi.com/api/location/0') return null;
  const response = await fetch(url);
  if (!response.ok) return null;
  return response.json();
};
