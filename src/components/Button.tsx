import styled from "styled-components";

interface ButtonProps {
	width?: string
}

const StyledButton = styled.button<ButtonProps>`
	width: ${props => props.width};
	min-height: 30px;

	cursor: pointer;

	font-family: inherit;
	color: var(--primary-text-color);

	background-color: var(--accent-color);

	border: none;
	border-radius: 5px;
	box-shadow: 1px 1px 10px var(--menu-color);

	transition: 100ms;

	:hover {
		background-color: var(--accent-color-lighter);
	}
`;

interface Props {
	children?: any
	width?: string
	onClick: () => void
}

const Button = (props: Props) => {
	return <StyledButton 
				onClick={props.onClick} 
				width={props.width? props.width: "25%"}
			>
				{props.children}
			</StyledButton>
}

export default Button;