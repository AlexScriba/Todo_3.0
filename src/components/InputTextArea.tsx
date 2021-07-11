import styled from 'styled-components';

interface InputProps {
	error?: boolean;
}

const InputTextArea = styled.textarea<InputProps>`
	margin: 0;
	margin-bottom: 10px;
	padding: 5px;
	resize: none;

	background-color: var(--menu-color);

	border: ${(props) => (props.error ? '1px solid red' : 'none')};
	border-radius: 5px;

	outline: none;

	color: var(--secondary-text-color);
	font-size: 0.8rem;
	font-family: inherit;

	:focus {
		margin: -1px -1px 9px -1px;
		border: 1px solid var(--accent-color);
	}
`;

export default InputTextArea;
