import {Action} from '../types';

const signInUserReducer = (state: object = {}, action: Action) => {
    switch(action.type){
        case 'SIGNED_IN_USER':
            return action.payload;
        default:
            return state;
    }
}

export default signInUserReducer;