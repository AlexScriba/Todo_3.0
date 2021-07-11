import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
	return (
		<ExitButtonDiv onClick={props.onClose}>
			<FontAwesomeIcon icon="times" />
		</ExitButtonDiv>
	);
};

export default ExitButton;
