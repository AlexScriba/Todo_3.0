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
    payload: object
}


export interface UserObj {
    name: string
    uid: string
}

export interface State {
    user: UserObj
}