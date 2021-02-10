import React from "react";
import styled from "styled-components";
import {ContainerProps} from "./types";

const StyledContainer = styled.div<ContainerProps>`
    max-width: 1920px;
    width: 100%;
    flex-grow: 1;
`;

export const Container: React.FunctionComponent<ContainerProps> = ({
    children,
    ...rest
}): JSX.Element => {
    return <StyledContainer {...rest}>{children}</StyledContainer>;
};
