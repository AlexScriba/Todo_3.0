import {Action} from '../types';

const ActiveListReducer = (state: string = "", action: Action) => {
    switch(action.type){
        case 'SET_ACTIVE_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default ActiveListReducer;