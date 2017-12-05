import { combineReducers } from 'redux';

import { appReducer } from 'modules/app';

export default combineReducers({
  app: appReducer,
});
