import styled from 'styled-components';

const AddButton = styled.div`
	font-size: 1.1rem;
	color: var(--secondary-text-color);

	border-radius: 5px;
	cursor: pointer;

	padding: 0 10px 5px 10px;

	:hover {
		background-color: var(--hover-color);
	}
`;

interface Props {
	onClick: () => void;
}

const PlusButton = (props: Props) => {
	return <AddButton onClick={props.onClick}>+</AddButton>;
};

export default PlusButton;
