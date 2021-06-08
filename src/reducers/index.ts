import {combineReducers} from 'redux';

import signInUserReducer from './signInUserReducer';

export default combineReducers({
    user: signInUserReducer,
});