import { combineReducers } from 'redux';
import SearchReducer from './reducer_search';

const rootReducer = combineReducers({
  searchResults: SearchReducer,
});

export default rootReducer;
