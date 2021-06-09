import  { useEffect } from 'react';
import {connect} from 'react-redux';

import {attemptLogin, createNewUser, createNewList, setUserLists, setActiveListTodos, } from '../actions';
import {TodoObj, UserObj} from '../types';
import {State} from '../types';

interface Props {
    attemptLogin: any
    createNewUser: any
    createNewList: any
    setActiveListTodos: any
    user: UserObj
    activeListId: string
    todos: TodoObj[]
}

const ListPage = ({user, attemptLogin, createNewUser, createNewList, setActiveListTodos, activeListId, todos}: Props) => {
    
    useEffect(() => {
        // attemptLogin('test@gmail.com', 'test1234')
        // // createNewUser('test1@gmail.com', 'test1234', 'Alexander');

        // if(user){
        //     setUserLists(user.uid);
        // }

    }, [attemptLogin]);

    const todosList = todos.map(todo => {
        return <div key={todo.todoId}>{todo.title}</div>
    })

    return (
        <div>
            <div>{user.name}</div>
            <div>{activeListId}</div>
            <div>{todosList}</div>
        </div>
    )
}
    
const mapStateToProps = (state: State) => {
    return {user: state.user, activeListId: state.activeListId, todos: state.todos};
}

export default connect(mapStateToProps, {attemptLogin, createNewUser, createNewList, setActiveListTodos})(ListPage);