import { connect } from 'react-redux';
import styled from 'styled-components';

import { State, UserObj } from '../types';
import { setActiveList } from '../actions';

import ListMenu from './ListMenu';

const Container = styled.div`
	margin: 0;
	padding: 0;
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

interface Props {
	user: UserObj;
	activeListId: string;

	setActiveList: any;
}

const SideBar = (props: Props) => {
	return (
		<Container>
			<Head>
				<AvatarImage
					src={require('../assets/avatar_placeholder.png').default}
					alt="Avatar"
				/>
				<HeaderText>{props.user.name}</HeaderText>
			</Head>
			<Rule />
			<ListMenu />
		</Container>
	);
};

const mapStateToProps = (state: State) => {
	return {
		user: state.user,
		lists: state.lists,
		activeListId: state.activeListId,
	};
};

export default connect(mapStateToProps, { setActiveList })(SideBar);
