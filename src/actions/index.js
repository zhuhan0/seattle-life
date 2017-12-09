import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';

export function fetchData(lat, lng, bedrooms, toggled) {
  const url = `http://seattle-life2.herokuapp.com/${lat}/${lng}/${bedrooms}/${toggled}`;
  const request = axios.get(url);

  return {
    type: FETCH_DATA,
    payload: request,
  };
}
