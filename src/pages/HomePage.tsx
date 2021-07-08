import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { attemptLogin } from '../actions';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import TodoView from '../components/TodoView';

const Container = styled.div`
	position: fixed;

	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`;

const Body = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;

	height: 100%;

	@media (min-width: 960px) {
		grid-template-columns: 1fr 2fr 1fr;
	}
`;

const ListMenuWrapper = styled.div`
	width: 100%;
	height: 100%;
`;

interface Props {
	attemptLogin: any;
}

const HomePage = (props: Props) => {
	useEffect(() => {
		props.attemptLogin('test@gmail.com', 'test1234');

		// eslint-disable-next-line
	}, []);

	return (
		<Container>
			<Header />
			<Body>
				<ListMenuWrapper>
					<SideBar />
				</ListMenuWrapper>
				<TodoView />
			</Body>
		</Container>
	);
};

export default connect(null, { attemptLogin })(HomePage);
