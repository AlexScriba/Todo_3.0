import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { State, TodoObj } from '../types';
import Checkbox from './Checkbox';

const Container = styled.div`
    margin: 0;
    padding: 25px;

    height: 100%;

    display: flex;
    justify-content: center;
`;

const Card = styled.div`
    margin: 0;
    padding: 20px;

    width: 100%;
    height: 88%;

    max-width: 700px;

    border-radius: 5px;
    background-color: var(--menu-color);
`;

const TodoItem = styled.div`
    font-size: 0.8rem;
    
    padding: 10px;
    border-radius: 5px;

    cursor: pointer;

    transition: 150ms;

    display: flex;
    justify-content: space-between;

    :hover{
        background-color: var(--hover-color);
    }
    
`;

interface Props {
    todos: TodoObj[]
}

const TodoView = (props: Props) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChanged = () => {
        setChecked(!checked);
    }

    const renderedTodos = props.todos.map(item => {
        return <TodoItem key={item.todoId}>
                    {item.title}
                    <Checkbox 
                        checked={item.complete}
                        onChange={handleCheckboxChanged}
                    />
                </TodoItem>;
    })

    return (
        <Container>
            <Card>
                {renderedTodos}
                <Checkbox checked={checked} onChange={handleCheckboxChanged} />
            </Card>
        </Container>
    );
}

const mapStateToProps = (state: State) => {
    return {todos: state.todos};
}

export default connect(mapStateToProps, {})(TodoView);