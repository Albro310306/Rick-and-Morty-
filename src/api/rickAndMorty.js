const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (nameFilter = '') => {
  const url = nameFilter ? `${API_URL}/?name=${nameFilter}` : API_URL;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      // The API returns 404 if no characters match the filter
      return { results: [], info: null };
    }
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};
