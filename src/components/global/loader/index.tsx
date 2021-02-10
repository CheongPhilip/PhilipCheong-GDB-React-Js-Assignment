import React from "react";
import styled, {keyframes} from "styled-components";
import {Props} from "./types";

const loaderAnim = keyframes`
0% {
	top: 36px;
	left: 36px;
	width: 0;
	height: 0;
	opacity: 1;
}
100% {
	top: 0px;
	left: 0px;
	width: 72px;
	height: 72px;
	opacity: 0;
}
`;

const StyledLoaderContainer = styled.div`
    margin: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform: -webkit-translate(-50%, -50%);
    transform: -moz-translate(-50%, -50%);
    transform: -ms-translate(-50%, -50%);
    transform: translate(-50%, -35%);
    width: 9em;
    height: 9em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        top: 50%;
        left: 50%;
        width: 17em;
        height: 50em;
        transform: translate(-50%, -50%);
    }
`;

const StyledLoader = styled.div<Props>`
	position: relative;
	width: ${(props) => (!props.width ? "5em" : props.width)}};
    height: ${(props) => (!props.height ? "5em" : props.height)}};
    div {
		position: absolute;
        border: 4px solid #f23a3a;
        opacity: 1;
        border-radius: 50%;
		animation: ${loaderAnim} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		&:nth-child(2) {
			animation-delay: -0.5s;
		}
	}
`;

export const Loader: React.FunctionComponent<Props> = ({width, height, ...rest}): JSX.Element => {
    return (
        <StyledLoaderContainer>
            <StyledLoader width={width} height={height} {...rest}>
                <div></div>
                <div></div>
            </StyledLoader>
        </StyledLoaderContainer>
    );
};
