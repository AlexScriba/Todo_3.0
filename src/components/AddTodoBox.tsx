import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createNewTodo } from '../actions';
import { State } from '../types';

import Button from './Button';

const Container = styled.div`
	padding: 10px;

	border-radius: 5px;
	background-color: var(--hover-color);

	margin-bottom: 15px;
`;

const HeadingArea = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Heading = styled.div`
	font-size: 0.8rem;
	color: var(--secondary-text-color);
`;

const ExitButton = styled.div`
	font-size: 0.8rem;
	color: var(--secondary-text-color);

	margin-right: 5px;

	cursor: pointer;

	:hover {
		color: var(--primary-text-color);
	}
`;

const BodyArea = styled.div`
	display: flex;
	flex-direction: column;
`;

interface InputProps {
	error?: boolean;
}

const TodoNameInput = styled.input<InputProps>`
	margin: 10px 0 10px 0;
	padding: 5px;

	background-color: var(--menu-color);

	border: ${(props) => (props.error ? '1px solid red' : 'none')};
	border-radius: 5px;

	outline: none;

	color: var(--primary-text-color);
	font-size: 0.8rem;
	font-family: inherit;

	:focus {
		margin: 9px -1px 9px -1px;
		border: 1px solid var(--accent-color);
	}
`;

const TodoDescriptionInput = styled.textarea<InputProps>`
	margin: 0;
	margin-bottom: 10px;
	padding: 5px;
	resize: none;

	background-color: var(--menu-color);

	border: ${(props) => (props.error ? '1px solid red' : 'none')};
	border-radius: 5px;

	outline: none;

	color: var(--secondary-text-color);
	font-size: 0.8rem;
	font-family: inherit;

	:focus {
		margin: -1px -1px 9px -1px;
		border: 1px solid var(--accent-color);
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

interface Props {
	activeListId: string;
	onClosePressed: () => void;
	createNewTodo: (listId: string, todoName: string, todoDescription: string) => void;
}

const AddTodoBox = (props: Props) => {
	const [todoName, setTodoName] = useState('');
	const [todoDescription, setTodoDescription] = useState('');
	const [nameError, setNameError] = useState(false);

	//function to add new todo item to db
	const handleSubmit = () => {
		if (!todoName) {
			setNameError(true);
			return;
		}

		console.log('clicked');
		props.createNewTodo(props.activeListId, todoName, todoDescription);
		props.onClosePressed();
	};

	//function to handle validation
	const handleValidation = (
		onChangeFunc: React.Dispatch<React.SetStateAction<string>>,
		onErrorFunc: React.Dispatch<React.SetStateAction<boolean>>,
		val: string
	) => {
		if (!val) {
			onErrorFunc(true);
		} else {
			onErrorFunc(false);
		}

		onChangeFunc(val);
	};

	return (
		<Container>
			<HeadingArea>
				<Heading>Add new Item:</Heading>
				<ExitButton onClick={props.onClosePressed}>X</ExitButton>
			</HeadingArea>
			<BodyArea>
				<TodoNameInput
					placeholder="Item Name"
					value={todoName}
					onChange={(e) => handleValidation(setTodoName, setNameError, e.target.value)}
					error={nameError}
				/>
				<TodoDescriptionInput
					placeholder="Description"
					value={todoDescription}
					onChange={(e) => setTodoDescription(e.target.value)}
				/>
				<ButtonContainer>
					<Button onClick={handleSubmit} width="25%">
						ADD
					</Button>
				</ButtonContainer>
			</BodyArea>
		</Container>
	);
};

const mapStateToProps = (state: State) => {
	return { activeListId: state.activeListId };
};

export default connect(mapStateToProps, { createNewTodo })(AddTodoBox);
