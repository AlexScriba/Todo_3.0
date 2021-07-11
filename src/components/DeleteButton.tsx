import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DelButton = styled.div`
	color: var(--secondary-text-color);

	border-radius: 5px;
	padding: 0 10px 5px 10px;
	cursor: pointer;

	:hover {
		color: var(--primary-text-color);
	}
`;

interface Props {
	onClick: () => void;
}

const DeleteButton = (props: Props) => {
	return (
		<DelButton onClick={props.onClick}>
			<FontAwesomeIcon icon="trash" size="xs" />
		</DelButton>
	);
};

export default DeleteButton;
