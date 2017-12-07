import _ from 'lodash';
import { FETCH_DATA } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DATA: {
      const { data } = action.payload;
      const sortedHouses = _.sortBy(data.houses, ['postcode']);
      data.houses = sortedHouses;
      return data;
    }
    default:
      return state;
  }
}
