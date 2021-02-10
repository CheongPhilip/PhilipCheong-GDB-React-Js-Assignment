import React from "react";
import styled from "styled-components";
import {Props} from "./types";

const StyledButton = styled.button.attrs((props: Props) => ({
    className: props.textBtn && "textBtn"
}))<Props>`
	background-color: ${(props) => (!props.btnColor ? props.theme.primary : props.btnColor)}};
	color: ${(props) => (!props.btnColor ? "#ffffff" : "#000000")}};
	width: 6.1em;
	height: 2.325em;
	border-radius: 5px;
	border-color:transparent;
	cursor:pointer;
	outline-style: none;
	&.textBtn{
		border: none;
 		background-color: inherit;
		 cursor: pointer;
	}
`;

export const Button: React.FunctionComponent<Props> = ({
    children,
    textBtn,
    btnColor,
    ...rest
}): JSX.Element => {
    return (
        <StyledButton textBtn={textBtn} btnColor={btnColor} {...rest}>
            {children}
        </StyledButton>
    );
};
