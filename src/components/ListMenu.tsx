import { connect } from 'react-redux';
import styled from 'styled-components';

import { ListObj, State } from '../types';

import { setActiveList } from '../actions';
import AddListBox from './AddListBox';
import { useState } from 'react';
import PlusButton from './PlusButton';

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

interface StyledDivProps {
	isSelected?: boolean;
}

const ListItem = styled.div<StyledDivProps>`
	border-radius: 5px;
	padding: 5px 10px 5px 10px;

	transition: 150ms;

	color: var(
		${(props) => (props.isSelected ? '--primary-text-color' : '--secondary-text-color')}
	);

	cursor: pointer;

	:hover {
		background-color: var(--hover-color);
	}
`;

interface Props {
	activeListId: string;
	lists: ListObj[];
	setActiveList: any;
}

const ListMenu = (props: Props) => {
	const [addListActive, setAddListActive] = useState(false);

	//Rendering list items
	const renderedList = props.lists.map((item) => (
		<ListItem
			key={item.listId}
			onClick={() => props.setActiveList(item.listId)}
			isSelected={props.activeListId === item.listId}
		>
			{item.listName}
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

export default connect(mapStateToProps, { setActiveList })(ListMenu);
