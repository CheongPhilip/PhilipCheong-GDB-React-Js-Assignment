import React from "react";
import styled from "styled-components";
import {ColProps} from "./types";

const StyledCol = styled.div<ColProps>`
    max-width: 100%;
    width: ${({lg}) => `${!lg ? "100" : 100 / (12 / lg)}%`};
    flex-grow: 1;
    @media (min-width: ${(props) => props.theme.mobile}px) and (max-width: ${(props) =>
            props.theme.tablet}px) {
        width: ${({sm}) => `${!sm ? "100" : 100 / (12 / sm)}%`};
    }
    @media (min-width: ${(props) => props.theme.tablet}px) and (max-width: ${(props) =>
            props.theme.desktop}px) {
        width: ${({md}) => `${!md ? "100" : 100 / (12 / md)}%`};
    }
    @media (min-width: ${(props) => props.theme.desktop}px) {
        width: ${({lg}) => `${!lg ? "100" : 100 / (12 / lg)}%`};
    }
`;

export const Col: React.FunctionComponent<ColProps> = ({
    sm,
    md,
    lg,
    children,
    ...rest
}): JSX.Element => {
    return (
        <StyledCol sm={sm} md={md} lg={lg} {...rest}>
            {children}
        </StyledCol>
    );
};
