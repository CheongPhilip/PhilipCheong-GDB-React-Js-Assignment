import React from "react";
import styled from "styled-components";
import {Container} from "../global/grid";
import {Props} from ".";
import {LayoutHeader} from "./header";
import {LayoutFooter} from "./footer";

const StyledContainer = styled(Container)`
    position: relative;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    min-height: 100vh;
    background-color: #2a2a2a;
`;

const StyledContentSection = styled(Container)`
    height: 100%;
    width: auto;
    padding: 3.4em;
    padding-bottom: 18.44em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        padding: 0;
        padding-bottom: 57.2em;
    }
`;

export const LayoutComponent: React.FunctionComponent<Props> = ({children}): JSX.Element => {
    return (
        <StyledContainer>
            <LayoutHeader />
            <StyledContentSection>{children}</StyledContentSection>
            <LayoutFooter />
        </StyledContainer>
    );
};
