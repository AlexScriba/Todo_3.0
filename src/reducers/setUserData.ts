import {Action, UserObj} from '../types';

const setUserData = (state: UserObj | object = {}, action: Action) => {
    switch(action.type){
        case 'SET_USER_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default setUserData;