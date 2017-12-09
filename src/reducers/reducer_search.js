import _ from 'lodash';
import { FETCH_DATA } from '../actions/index';

const utilities = [
  'Alternative Schools',
  'Beaches',
  'Cemeteries',
  'Elementary Schools',
  'Farmers Markets',
  'Fire Stations',
  'General Attractions',
  'Health Centers - Public',
  'Health Centers - Community',
  'High Schools',
  'Higher Education',
  'Hospitals',
  'Libraries',
  'Middle Schools',
  'Museums and Galleries',
  'Parks',
  'Police Precincts',
];

const crimes = [
  'ASSAULTS',
  'PERSONS - LOST, FOUND, MISSING',
  'RESIDENTIAL BURGLARIES',
  'ROBBERY',
  'SEX OFFENSE (NO RAPE)',
];

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DATA: {
      const { data } = action.payload;
      const sortedHouses = _.sortBy(data.houses, ['postcode']);
      data.houses = sortedHouses;

      const selectedUtilies = _.filter(data.utilities, utility => utilities.includes(utility['city feature']));
      data.utilities = selectedUtilies;

      const selectedCrimes = _.filter(data.crimes, crime => crimes.includes(crime.crime));
      data.crimes = selectedCrimes;
      return data;
    }
    default:
      return state;
  }
}
