import styled from 'styled-components';

interface InputProps {
	error?: boolean;
	margin?: string;
}

const InputField = styled.input<InputProps>`
	padding: 5px;
	margin: ${(props) => (props.margin ? props.margin : '10px 0 10px 0')};

	background-color: var(--menu-color);

	border: ${(props) => (props.error ? '1px solid red' : 'none')};
	border-radius: 5px;

	outline: none;

	color: var(--primary-text-color);
	font-size: 0.8rem;
	font-family: inherit;

	:focus {
		margin: 9px -1px 9px -1px;
		border: 1px solid var(--accent-color);
	}
`;

export default InputField;
