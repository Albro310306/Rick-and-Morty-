const API_URL = "https://rickandmortyapi.com/api/character";

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

export const fetchCharacterById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Personaje no encontrado');
  }
  return response.json();
};

