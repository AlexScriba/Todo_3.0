import styled from 'styled-components';

const Header = () => {
	return (
		<Container>
			<Title>Todo List</Title>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--menu-color);

	height: 50px;
`;

const Title = styled.div`
	font-size: 30px;
`;

export default Header;
