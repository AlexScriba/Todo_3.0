import { connect } from 'react-redux';
import styled from 'styled-components';

import { ListObj, State } from '../types';

import { setActiveList, deleteList } from '../actions';
import AddListBox from './AddListBox';
import { useState } from 'react';
import PlusButton from './PlusButton';
import DeleteButton from './DeleteButton';

const List = styled.div`
	height: 100%;
	padding: 10px;
`;

const HeaderArea = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 5px;
`;

const HeaderText = styled.div`
	font-size: 1.1rem;
	color: var(--secondary-text-color);

	padding-top: 0px;
`;

const ListArea = styled.div`
	height: 100%;
	width: 100%;
`;

const ListItem = styled.div`
	border-radius: 5px;
	padding: 5px 10px 5px 10px;

	display: flex;
	justify-content: space-between;

	transition: 150ms;

	cursor: pointer;

	:hover {
		background-color: var(--hover-color);
	}
`;

const DeleteBtnArea = styled.div`
	padding: 0;
	margin: 0;
	visibility: hidden;
	transition: 50ms;

	${ListItem}:hover & {
		visibility: visible;
	}
`;

interface StyledDivProps {
	isSelected?: boolean;
}

const ListName = styled.div<StyledDivProps>`
	color: var(
		${(props) => (props.isSelected ? '--primary-text-color' : '--secondary-text-color')}
	);
`;

interface Props {
	activeListId: string;
	lists: ListObj[];
	setActiveList: any;
	deleteList: (listId: string | undefined) => void;
}

const ListMenu = (props: Props) => {
	const [addListActive, setAddListActive] = useState(false);

	//Rendering list items
	const renderedList = props.lists.map((item) => (
		<ListItem key={item.listId} onClick={() => props.setActiveList(item.listId)}>
			<ListName isSelected={props.activeListId === item.listId}>{item.listName}</ListName>
			<DeleteBtnArea>
				<DeleteButton onClick={() => props.deleteList(item.listId)} />
			</DeleteBtnArea>
		</ListItem>
	));

	return (
		<List>
			<HeaderArea>
				<HeaderText>Available Lists:</HeaderText>
				<PlusButton onClick={() => setAddListActive(true)} />
			</HeaderArea>
			{addListActive ? <AddListBox onClose={() => setAddListActive(false)} /> : null}
			<ListArea>{renderedList}</ListArea>
		</List>
	);
};

const mapStateToProps = (state: State) => {
	return {
		lists: state.lists,
		activeListId: state.activeListId,
	};
};

export default connect(mapStateToProps, { setActiveList, deleteList })(ListMenu);
