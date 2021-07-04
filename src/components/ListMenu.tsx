import { connect } from 'react-redux';
import styled from 'styled-components';

import {ListObj, State, UserObj} from '../types';
import {setActiveList} from '../actions';

const Container = styled.div`
    background-color: var(--menu-color);
    width: 100%;
    max-width: 350px;
    height: 100%;
`;

const Head = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AvatarImage = styled.img`
    width: 30%;
    border-radius: 50%;
`;

const HeaderText = styled.h1`
    margin: 0;
    font-size: 1.2rem;
`;

const Rule = styled.hr`
    border: none;

    background-color: var(--hover-color);
    width: 90%;
    height: 1px;
`;

const List = styled.div`
    width: 100%;
`;

interface StyledDivProps{
    isSelected?: boolean
}

const ListItem = styled.div<StyledDivProps>`
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;

    transition: 150ms;

    color: var(${props => props.isSelected ? '--primary-text-color' : '--secondary-text-color'});

    cursor: pointer;

    :hover{
        background-color: var(--hover-color);
    }

`;

interface Props {
    user: UserObj
    lists: ListObj[]
    activeListId: string

    setActiveList: any
}

const ListMenu = (props: Props) => {

    const renderedList = props.lists.map(item => {
        return <ListItem 
                    key={item.listId} 
                    onClick={() => props.setActiveList(item.listId)}
                    isSelected={props.activeListId === item.listId}
                >
                    {item.listName}
                </ListItem>;
    });

    return (
        <Container>
            <Head>
                <AvatarImage src={require('../assets/avatar_placeholder.png').default} alt="Avatar" />
                <HeaderText>
                    {props.user.name}
                </HeaderText>
            </Head>
            <Rule />
            <List>
                {renderedList}
            </List>
        </Container>
    );
}

const mapStateToProps = (state: State) => {
    return {user: state.user, lists: state.lists, activeListId: state.activeListId};
}

export default connect(mapStateToProps, {setActiveList})(ListMenu);