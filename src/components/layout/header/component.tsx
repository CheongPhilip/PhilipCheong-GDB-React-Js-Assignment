import React, {useEffect} from "react";
import styled, {useTheme} from "styled-components";

import {Button} from "../../global/button";
import {Props} from ".";
import {Link} from "react-router-dom";

const StyledHeaderContainer = styled.div.attrs(() => ({
    id: "app_header"
}))`
    width: 100%;
    height: 6em;
    max-height: 82px;
    background-color: ${(props) => props.theme.background};
    position: relative;

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        height: 48em;
        transition: all 0.5s;

        &.expanded {
            height: 100vh;
            max-height: 100vh;
            z-index: 1;
            transition: all 0.5s;

            &.fixed {
                position: fixed;
            }
        }
    }
`;

const StyledHeaderLeftSection = styled.section`
    position: absolute;
    top: 1.2em;
    left: 3.5em;
    img {
        width: 9.4em;
    }

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        position: absolute;
        top: 4.5em;
        left: 10em;
        img {
            width: 34.9em;
        }
    }
`;

const StyledHeaderRightSection = styled.section.attrs(() => ({
    id: "menu_right"
}))`
    position: absolute;
    top: 1.2em;
    right: 3.5em;
    width: 13em;
    height: 2.05em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        top: 33.2em;
        right: 8em;
        width: 83em;
        height: 11.7em;
        opacity: 0;
        transition: opacity 0.2s linear;

        &.expanded {
            opacity: 1;
            transition: opacity 0.2s linear;
        }
    }
`;

const StyledLoginContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 6em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        top: 0;
        right: 43em;
        width: 38em;
        height: 11.595em;
    }
`;

const StyledSignUpContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 6em;
    right: 0;

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        top: 0;
        width: 38em;
        height: 11.595em;
    }
`;

const StyledMenuButton = styled(Button).attrs((props) => ({
    btnColor: props.btnColor
}))`
    width: 100%;
    height: 100%;
    font-size: 1em;
    font-weight: 500;

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        font-size: 5.8em;
    }
`;

const StyledHamburgerContainer = styled.div.attrs(() => ({
    id: "hamburger_container"
}))`
    display: none;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        display: block;
        position: absolute;
        top: 3.2em;
        right: 4.5em;
        width: 14em;
        height: 14em;
        span {
            color: #d3d3d3;
            font-size: 13em;
        }
    }
`;

const StyledNavigationContainer = styled.div`
    display: block;
    position: absolute;

    @media screen and (min-width: ${(props) => props.theme.mobile + 1}px) {
        width: 100%;
        bottom: 2%;
    }
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        width: 80%;
        height: 100%;
        top: 50em;
        left: 11em;
        opacity: 0;
        transition: opacity 0.2s linear;

        &.expanded {
            opacity: 1;
            transition: opacity 0.2s linear;
        }
    }
`;

const StyledNavigationList = styled.ul`
    position: relative;
    width: auto;
    list-style-type: none;
    margin: 0;
    padding: 0;

    @media screen and (min-width: ${(props) => props.theme.mobile + 1}px) {
        padding-left: 15%;
        section {
            margin-left: 79.2%;
        }
    }

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        height: 100em;
        width: 80em;
    }
`;

const StyledNavigationListItem = styled.li`
    a {
        display: block;
        color: white;
        text-decoration: none;

        &:hover {
            background-color: #111111;
        }
    }

    @media screen and (min-width: ${(props) => props.theme.mobile + 1}px) {
        font-size: 0.85em;
        float: left;
        display: inline-block;
        a {
            text-align: center;
            padding-left: 16px;
            padding-right: 16px;
            hr {
                height: 0.15rem;
                width: 0%;
                margin-top: 2px;
                margin-bottom: 1px;
                background: #ea215a;
                border: none;
                -webkit-transition: all 0.2s linear;
                transition: all 0.2s linear;
                &.selected {
                    width: 100%;
                }
            }
        }
        &:nth-last-child(2) {
            position: absolute;
            right: 12%;
        }
        &:nth-last-child(1) {
            position: absolute;
            right: 3%;
        }
    }

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        a {
            line-height: 3em;
            font-size: 5.7971em;
            font-weight: 600;
            hr {
                display: none;
            }
        }
    }
`;

export const LayoutHeaderComponent: React.FunctionComponent<Props> = ({
    state,
    actions
}): JSX.Element => {
    const theme = useTheme();

    useEffect(() => {
        actions.initResources();
        actions.setScreenWidth(window.innerWidth);
        actions.setNavLink(
            window.location.pathname === "/" ? "home" : window.location.pathname.replace("/", "")
        );
        window.addEventListener("resize", () => actions.setScreenWidth(window.innerWidth));
    }, [actions]);

    useEffect(() => {
        if (state.screenWidth <= theme.mobile && !state.mobileVer) {
            actions.setMobileVer(true);
        } else if (state.screenWidth > theme.mobile && state.mobileVer) {
            actions.setMobileVer(false);
            actions.setExpanded(false);
        }
    }, [state.screenWidth, state.mobileVer, actions, theme]);

    const handleExpand = (expanded: boolean) => {
        if (expanded) {
            document.querySelector("#app_header").classList.add("expanded");
            setTimeout(() => {
                document.querySelector("#app_header").classList.add("fixed");
                document
                    .querySelectorAll("#menu_right, #nav_container")
                    .forEach((elem) => elem.classList.add("expanded"));
            }, 500);
        } else {
            document.querySelector("#app_header").classList.remove("expanded", "fixed");
            document
                .querySelectorAll("#menu_right, #nav_container")
                .forEach((elem) => elem.classList.remove("expanded"));
        }
        actions.setExpanded(expanded);
    };

    const handleNavigation = (link: string) => {
        document
            .querySelector("#nav_container")
            .querySelectorAll("a")
            .forEach((item) => {
                if (item.id === link) {
                    item.querySelector("hr").classList.add("selected");
                } else {
                    item.querySelector("hr").classList.remove("selected");
                }
            });
        actions.setNavLink(link);
        state.expanded && handleExpand(false);
    };

    return (
        <StyledHeaderContainer>
            <StyledHeaderLeftSection>
                <img src={require("../../../assets/images/logo.png")} alt="logo" />
            </StyledHeaderLeftSection>
            <StyledHamburgerContainer>
                <span className={"material-icons"} onClick={() => handleExpand(!state.expanded)}>
                    {!state.expanded ? "menu" : "close"}
                </span>
            </StyledHamburgerContainer>
            <StyledHeaderRightSection>
                <StyledLoginContainer>
                    <StyledMenuButton btnColor={"#ffffff"}>
                        <span>Login</span>
                    </StyledMenuButton>
                </StyledLoginContainer>
                <StyledSignUpContainer>
                    <StyledMenuButton>
                        <span>Sign Up</span>
                    </StyledMenuButton>
                </StyledSignUpContainer>
            </StyledHeaderRightSection>
            <StyledNavigationContainer id="nav_container">
                <StyledNavigationList>
                    {state.resources &&
                        state.resources.length > 0 &&
                        state.resources.map((item) => (
                            <StyledNavigationListItem key={item.title}>
                                <Link
                                    id={item.title.toLocaleLowerCase().replaceAll(" ", "-")}
                                    to={`${process.env.AppUrl + item.link}`}
                                    onClick={(e) => handleNavigation(e.currentTarget.id)}
                                >
                                    {item.title}
                                    <hr
                                        className={`
                                            ${
                                                state.navLink ===
                                                item.title.toLocaleLowerCase().replaceAll(" ", "-")
                                                    ? "selected"
                                                    : ""
                                            }
                                        `}
                                    />
                                </Link>
                            </StyledNavigationListItem>
                        ))}
                </StyledNavigationList>
            </StyledNavigationContainer>
        </StyledHeaderContainer>
    );
};
