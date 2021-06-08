import {combineReducers} from 'redux';

import setUserData from './setUserData';
import setUserLists from './setUserLists';

export default combineReducers({
    user: setUserData,
    lists: setUserLists,
});