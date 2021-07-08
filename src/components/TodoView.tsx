import { connect } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';

import { ListObj, State, TodoObj, TodoObjUpdate } from '../types';
import { updateTodo } from '../actions';

import Checkbox from './Checkbox';
import AddTodoBox from './AddTodoBox';
import { useEffect } from 'react';

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

	:hover {
		background-color: var(--hover-color);
	}
`;

interface TodoTextProps {
	complete: boolean;
}

const TodoText = styled.div<TodoTextProps>`
	color: ${(props) =>
		props.complete ? 'var(--secondary-text-color)' : 'var(--primary-text-color)'};

	text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`;

const HeaderArea = styled.div`
	padding-bottom: 20px;
	display: flex;
	justify-content: space-between;
`;

const ListNameText = styled.span`
	margin-top: 10px;
	font-size: 1.1rem;
`;

const AddButton = styled.div`
	font-size: 1.2rem;
	margin: 0;
	margin-right: 10px;

	padding: 5px 10px 5px 10px;
	border-radius: 5px;

	cursor: pointer;

	color: var(--secondary-text-color);

	:hover {
		background-color: var(--hover-color);
	}
`;

const TodoArea = styled.div``;

interface Props {
	todos: TodoObj[];
	updateTodo: any;
	activeList: ListObj;
}

const TodoView = (props: Props) => {
	const [addingTodo, setAddingTodo] = useState(false);

	//ensure the AddTodoBox disappears when new list is selected
	const listId = props.activeList?.listId;
	useEffect(() => {
		setAddingTodo(false);
	}, [listId]);

	// Function to handle when the checkbox is pressed
	const handleCheckboxChanged = (todoId: string, checked: boolean) => {
		const changes: TodoObjUpdate = {
			complete: !checked,
		};

		props.updateTodo(todoId, changes);
	};

	// rendering the Todo items
	const renderedTodos = props.todos?.map((item) => {
		return (
			<TodoItem key={item.todoId}>
				<TodoText complete={item.complete}>{item.title}</TodoText>
				<Checkbox
					checked={item.complete}
					onChange={handleCheckboxChanged}
					todoId={item.todoId as string}
				/>
			</TodoItem>
		);
	});

	//Return TSX
	return (
		<Container>
			<Card>
				<HeaderArea>
					<ListNameText>{props.activeList?.listName}:</ListNameText>
					<AddButton onClick={() => setAddingTodo(true)}>+</AddButton>
				</HeaderArea>
				<TodoArea>
					{addingTodo ? <AddTodoBox onClosePressed={() => setAddingTodo(false)} /> : null}
					{renderedTodos}
				</TodoArea>
			</Card>
		</Container>
	);
};

const mapStateToProps = (state: State) => {
	const activeListIndex = state.lists.findIndex((item) => item.listId === state.activeListId);

	return { todos: state.todos, activeList: state.lists[activeListIndex] };
};

export default connect(mapStateToProps, { updateTodo })(TodoView);
