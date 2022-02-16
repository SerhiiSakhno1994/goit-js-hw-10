const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountryByName(name) {
  return fetch(`${BASE_URL}${name}`).then(responce => {
    return responce.json();
  });
}