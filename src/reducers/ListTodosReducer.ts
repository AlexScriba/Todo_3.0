import { TodoObj, Action } from "../types";

const ListTodosReducer = (state: TodoObj[] = [], action: Action) => {
    switch(action.type){
        case 'SET_ACTIVE_LIST_TODOS':
            return action.payload;
        default:
            return state;
    }
}

export default ListTodosReducer;