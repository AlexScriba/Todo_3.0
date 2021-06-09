import {combineReducers} from 'redux';

import UserDataReducer from './UserDataReducer';
import UserListsReducer from './UserListsReducer';
import ListTodosReducer from './ListTodosReducer';
import ActiveListReducer from './ActiveListReducer';

export default combineReducers({
    user: UserDataReducer,
    lists: UserListsReducer,
    activeListId: ActiveListReducer,
    todos: ListTodosReducer,
});