import _ from 'lodash';
import { FETCH_DATA } from '../actions/index';

const features = [
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

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DATA: {
      const { data } = action.payload;
      const sortedHouses = _.sortBy(data.houses, ['postcode']);
      data.houses = sortedHouses;

      const selectedUtilies = _.filter(data.utilities, utility => features.includes(utility['city feature']));
      data.utilities = selectedUtilies;
      return data;
    }
    default:
      return state;
  }
}
