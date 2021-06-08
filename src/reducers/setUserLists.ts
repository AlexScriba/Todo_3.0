import {Action} from '../types';

const setUserLists = (state: object[] = [], action: Action) => {
    switch(action.type){
        case 'SET_USER_LISTS':
            return action.payload;
        default:
            return state;
    }
}

export default setUserLists;