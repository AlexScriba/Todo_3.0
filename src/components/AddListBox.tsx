import styled from 'styled-components';
import Button from './Button';

import { createNewList } from '../actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { State, UserObj } from '../types';

const Container = styled.div`
	border-radius: 5px;
	background-color: var(--hover-color);

	display: flex;
	flex-direction: column;

	padding: 10px;
`;

const HeaderArea = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HeaderText = styled.div`
	margin-bottom: 10px;
	font-size: 0.8rem;
	color: var(--secondary-text-color);
`;

const ExitButton = styled.div`
	color: var(--secondary-text-color);
	font-size: 0.8rem;

	cursor: pointer;

	:hover {
		color: var(--primary-text-color);
	}
`;

const BodyArea = styled.div`
	display: grid;
	grid-template-columns: 8fr 2fr;
`;

interface NameInputProps {
	error?: boolean;
}

const NameInput = styled.input<NameInputProps>`
	background-color: var(--menu-color);

	border: ${(props) => (props.error ? '1px solid red' : 'none')};
	border-radius: 5px;

	outline: none;

	color: var(--primary-text-color);
	font-size: 0.8rem;
	font-family: inherit;

	padding: 5px;
	margin-right: 10px;

	:focus {
		margin: -1px -1px -1px -1px;
		border: 1px solid var(--accent-color);
	}
`;

interface Props {
	user: UserObj;
	onClose: () => void;
	createNewList: (uid: string, listName: string) => void;
}

const AddListBox = (props: Props) => {
	const [listName, setListName] = useState('');

	//function to handle the submit of the name
	const handleSubmit = () => {
		props.createNewList(props.user.uid, listName);
		props.onClose();
	};

	return (
		<Container>
			<HeaderArea>
				<HeaderText>Add new List:</HeaderText>
				<ExitButton onClick={props.onClose}>X</ExitButton>
			</HeaderArea>
			<BodyArea>
				<NameInput
					placeholder="List Name"
					error={false}
					onChange={(e) => setListName(e.target.value)}
					value={listName}
				/>
				<Button onClick={handleSubmit} width="100%">
					ADD
				</Button>
			</BodyArea>
		</Container>
	);
};

const mapStateToProps = (state: State) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, { createNewList })(AddListBox);
