export interface Action {
    type: string
    payload: any
}

export interface SignedInUserAction extends Action {
    type: 'SIGNED_IN_USER'
    payload: object
}

export interface SetUserIDAction extends Action {
    type: 'SET_USER_ID',
    payload: string;
}

export interface SetUserDataAction extends Action {
    type: 'SET_USER_DATA',
    payload: UserObj
}

export interface SetListTodosAction extends Action {
    type: 'SET_ACTIVE_LIST_TODOS',
    payload: TodoObj
}

export interface SetActiveListAction extends Action {
    type: 'SET_ACTIVE_LIST'
    payload: string
}


export interface UserObj {
    name: string
    uid: string
}

export interface State {
    user: UserObj
    lists: ListObj[]
    activeListId: string
    todos: TodoObj[]
}

export interface ListObj {
    listName: string
    userId: string
    listId?: string
}

export interface TodoObj {
    complete: boolean
    description: string
    list: string
    title: string
    todoId?: string
}