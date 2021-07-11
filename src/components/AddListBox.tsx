import styled from 'styled-components';
import Button from './Button';

import { createNewList } from '../actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { State, UserObj } from '../types';

import ExitButton from './ExitButton';
import InputField from './InputField';

const Container = styled.div`
	border-radius: 5px;
	background-color: var(--hover-color);

	display: flex;
	flex-direction: column;

	padding: 10px;
	margin: 15px 0 15px 0;
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

const BodyArea = styled.div`
	display: grid;
	grid-template-columns: 8fr 2fr;
`;

interface Props {
	user: UserObj;
	onClose: () => void;
	createNewList: (uid: string, listName: string) => void;
}

const AddListBox = (props: Props) => {
	const [listName, setListName] = useState('');
	const [inputError, setInputError] = useState(false);

	//function to handle validation of list name input
	const isValid = (name: string) => {
		if (!name) return false;

		return true;
	};

	//function to handle the submit of the name
	const handleSubmit = () => {
		if (!isValid(listName)) {
			setInputError(true);
			return;
		}

		props.createNewList(props.user.uid, listName);
		props.onClose();
	};

	//function to handle the change of listName
	const handleChange = (name: string) => {
		setInputError(isValid(name));
		setListName(name);
	};

	return (
		<Container>
			<HeaderArea>
				<HeaderText>Add new List:</HeaderText>
				<ExitButton onClose={props.onClose} />
			</HeaderArea>
			<BodyArea>
				<InputField
					placeholder="List Name"
					error={inputError}
					onChange={(e) => handleChange(e.target.value)}
					value={listName}
					margin="0 10px 0 0"
					borderMargin="-1px 9px -1px -1px"
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
