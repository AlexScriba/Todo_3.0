import  { useEffect } from 'react';
import {connect} from 'react-redux';

import {attemptLogin, createNewUser} from '../actions';
import {UserObj} from '../types';
import {State} from '../types';

interface Props {
    attemptLogin: any
    createNewUser: any
    user: UserObj
}

const ListPage = ({user, attemptLogin, createNewUser}: Props) => {
    
    useEffect(() => {
        // attemptLogin('test@gmail.com', 'test1234')
        // createNewUser('test1@gmail.com', 'test1234', 'Alexander');
    }, [attemptLogin]);

    return (
        <div>
            <div>{user.name}</div>
        </div>
    )
}
    
const mapStateToProps = (state: State) => {
    return {user: state.user};
}

export default connect(mapStateToProps, {attemptLogin, createNewUser})(ListPage);