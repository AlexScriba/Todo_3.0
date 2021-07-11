import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createNewTodo } from '../actions';
import { State } from '../types';

import Button from './Button';
import ExitButton from './ExitButton';
import InputField from './InputField';
import InputTextArea from './InputTextArea';

const Container = styled.div`
	padding: 10px;

	border-radius: 5px;
	background-color: var(--hover-color);

	margin: 15px 0 15px 0;
`;

const HeadingArea = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Heading = styled.div`
	font-size: 0.8rem;
	color: var(--secondary-text-color);
`;

const BodyArea = styled.div`
	display: flex;
	flex-direction: column;
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
				<ExitButton onClose={props.onClosePressed} />
			</HeadingArea>
			<BodyArea>
				<InputField
					placeholder="Item Name"
					value={todoName}
					onChange={(e) => handleValidation(setTodoName, setNameError, e.target.value)}
					error={nameError}
				/>
				<InputTextArea
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
