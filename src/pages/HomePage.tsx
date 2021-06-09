import react, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { attemptLogin } from '../actions';

import Header from '../components/Header';
import ListMenu from '../components/ListMenu';
import TodoView from '../components/TodoView';

interface Props {
    attemptLogin: any
}

const HomePage = (props: Props) => {

    useEffect(() => {
        props.attemptLogin('test@gmail.com', 'test1234');

    }, []);

    return (
        <Container>
            <Header />
            <Body>
                <ListMenu />
                <TodoView />
            </Body>
        </Container>
    );
}

const Container = styled.div`

`;

const Body = styled.div`
    
`;

export default connect(null, {attemptLogin})(HomePage);