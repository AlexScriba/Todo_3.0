import {Action} from '../types';

const UserListsReducer = (state: object[] = [], action: Action) => {
    switch(action.type){
        case 'SET_USER_LISTS':
            return action.payload;
        default:
            return state;
    }
}

export default UserListsReducer;