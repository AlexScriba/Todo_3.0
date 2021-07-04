import { connect } from 'react-redux';
import styled from 'styled-components';

import { State, TodoObj, TodoObjUpdate } from '../types';
import {updateTodo} from '../actions';

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
    updateTodo: any
}

const TodoView = (props: Props) => {

    const handleCheckboxChanged = (todoId: string, checked: boolean) => {
        const changes: TodoObjUpdate = {
            complete: !checked,
        }

        props.updateTodo(todoId, changes);
    }

    const renderedTodos = props.todos.map(item => {
        return (
            <TodoItem key={item.todoId}>
                <span style={{textDecoration: item.complete? 'line-through': 'none'}} >
                    {item.title}
                </span>
                <Checkbox 
                    checked={item.complete}
                    onChange={handleCheckboxChanged}
                    todoId={item.todoId as string}
                />
            </TodoItem>
        );
    });

    return (
        <Container>
            <Card>
                {renderedTodos}
            </Card>
        </Container>
    );
}

const mapStateToProps = (state: State) => {
    return {todos: state.todos};
}

export default connect(mapStateToProps, {updateTodo})(TodoView);