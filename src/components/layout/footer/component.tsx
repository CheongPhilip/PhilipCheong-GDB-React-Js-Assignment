import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Row, Col} from "../../global/grid";

const StyledFooterRow = styled(Row)`
    position: absolute;
    height: 15.44em;
    background-color: #000000;
    bottom: 0;

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        height: 57.2em;
    }
`;

const StyledFooterCol = styled(Col)`
    position: relative;
    height: 100%;
    img {
        height: 1.8em;
        width: 5.9em;
        position: absolute;
        top: 3em;
        left: 3.35em;
        @media screen and (max-width: ${(props) => props.theme.mobile}px) {
            height: 6.8em;
            width: 23.5em;
            position: absolute;
            top: 12em;
            left: 9.35em;
        }
    }
`;

const StyledFooterList = styled.ul`
    position: absolute;
`;

const StyledFooterListItem = styled.ul`
    list-style: none;
    a {
        font-size: 0.52em;
        color: #ffffff;
        text-decoration: none;

        &.bold {
            font-weight: 900;
        }

        @media screen and (max-width: ${(props) => props.theme.mobile}px) {
            font-size: 2.5em;
            font-weight: 100;
        }
    }
`;

const StyledFooterListLeft = styled(StyledFooterList)`
    top: 2em;
    left: 8em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        top: 12em;
        left: 20em;
    }
`;

const StyledFooterListRight = styled(StyledFooterList)`
    top: 2em;
    left: 15em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        top: 12em;
        left: 44em;
    }
`;

export const LayoutFooterComponent: React.FunctionComponent = (): JSX.Element => {
    return (
        <StyledFooterRow>
            <StyledFooterCol>
                <img src={require("../../../assets/images/logo.png")} alt="logo" />
                <StyledFooterListLeft>
                    <StyledFooterListItem>
                        <Link className={"bold"} to="/contact-us">
                            Contact Us
                        </Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/help-centre">Help Centre</Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/group">The Group</Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/affiliates">Affiliates</Link>
                    </StyledFooterListItem>
                </StyledFooterListLeft>
                <StyledFooterListRight>
                    <StyledFooterListItem>
                        <Link className={"bold"} to="/contact-us">
                            Information
                        </Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/term-and-conditions">Terms & Conditions</Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/payment-methods">Payment methods</Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/bonus">Bonus Terms</Link>
                    </StyledFooterListItem>
                    <StyledFooterListItem>
                        <Link to="/responsible">Responsible Gaming</Link>
                    </StyledFooterListItem>
                </StyledFooterListRight>
            </StyledFooterCol>
        </StyledFooterRow>
    );
};
