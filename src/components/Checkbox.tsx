import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;

interface StyledCheckBoxProps{
    checked: boolean
}

const StyledCheckbox = styled.div<StyledCheckBoxProps>`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${props => props.checked? 'salmon': 'papayawhip'};
    border-radius: 3px;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px pink;
    }

    ${Icon} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
`;

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`;



interface Props {
    checked: boolean
    onChange: () => void
}

const Checkbox = (props: Props) => (
    <label>
        <CheckboxContainer>
            <HiddenCheckbox {...props}/>
            <StyledCheckbox checked={props.checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 0 9 13 4 8" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    </label>
);

export default Checkbox;