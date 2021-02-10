import React from "react";
import styled from "styled-components";
import {RowProps} from "./types";

const StyledRow = styled.div<RowProps>`
    width: 100%;
    justify-content: ${({align}) => `${!align ? "flex-start" : align}`};
    flex-grow: 1;
`;

export const Row: React.FunctionComponent<RowProps> = ({align, children, ...rest}): JSX.Element => {
    return (
        <StyledRow align={align} {...rest}>
            {children}
        </StyledRow>
    );
};
