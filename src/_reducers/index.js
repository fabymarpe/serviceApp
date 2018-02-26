import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { service } from './service.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  service,
  alert
});

export default rootReducer;