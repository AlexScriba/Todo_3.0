import styled from 'styled-components';

const ExitButtonDiv = styled.div`
	color: var(--secondary-text-color);
	font-size: 0.8rem;

	cursor: pointer;

	:hover {
		color: var(--primary-text-color);
	}
`;

interface Props {
	onClose: () => void;
}

const ExitButton = (props: Props) => {
	return <ExitButtonDiv onClick={props.onClose}>X</ExitButtonDiv>;
};

export default ExitButton;
