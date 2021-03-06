import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddButton = styled.div`
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
	return (
		<AddButton onClick={props.onClick}>
			<FontAwesomeIcon icon="plus" size="xs" />
		</AddButton>
	);
};

export default PlusButton;
