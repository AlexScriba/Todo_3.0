import  { useEffect } from 'react';
import {connect} from 'react-redux';

import {attemptLogin} from '../actions';

interface Props {
    attemptLogin: any
}

const ListPage = (props: Props) => {
    
    useEffect(() => {
        props.attemptLogin('test@gmail.com', 'test1234');
    }, [props]);

    return <div>List Page</div>
}

export default connect(null, {attemptLogin})(ListPage);