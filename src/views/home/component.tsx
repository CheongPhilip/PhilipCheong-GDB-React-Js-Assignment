import React, {useEffect} from "react";
import {Props} from ".";
import {Button} from "../../components/global/button";
import {Props as BtnProps} from "../../components/global/button/types";
import styled from "styled-components";
import {Loader} from "components/global/loader";
import {Game} from "src/store/home/types";

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 5vw);
    grid-gap: 1.5rem;
`;

const StyledFigure = styled.figure.attrs(() => ({
    className: "fig"
}))<Props>`
    position: relative;
    grid-column-start: ${({cssProps}) => cssProps.gridColumnStart};
    grid-column-end: ${({cssProps}) => cssProps.gridColumnEnd};
    grid-row-start: ${({cssProps}) => cssProps.gridRowStart};
    grid-row-end: ${({cssProps}) => cssProps.gridRowEnd};
    margin: 0;
    opacity: 0;
    transform: translateY(10%);

    img {
        width: 100%;
        height: 100%;
        transition: opacity 0.5s;
    }

    &.displayFigure {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.35s ease-in-out;
    }

    &:hover {
        cursor: pointer;
        img {
            transition: opacity 0.5s;
            opacity: 0.2;
        }
        .exploreBtn {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.5s;
        }
    }
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        grid-column-start: ${({cssPropsMobile}) => cssPropsMobile.gridColumnStart};
        grid-column-end: ${({cssPropsMobile}) => cssPropsMobile.gridColumnEnd};
        grid-row-start: ${({cssPropsMobile}) => cssPropsMobile.gridRowStart};
        grid-row-end: ${({cssPropsMobile}) => cssPropsMobile.gridRowEnd};
    }
`;

const StyledFigureCaption = styled.section<Props>`
    position: absolute;
    width: ${({cssProps}) => (!cssProps.width ? "10em" : cssProps.width)};
    height: ${({cssProps}) => (!cssProps.height ? "10em" : cssProps.height)};
    top: ${({cssProps}) => (!cssProps.top ? "0" : cssProps.top)};
    left: ${({cssProps}) => (!cssProps.left ? "0" : cssProps.left)};
    text-align: ${({cssProps}) => (!cssProps.textAlign ? "left" : cssProps.textAlign)};

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        width: ${({cssPropsMobile}) => (!cssPropsMobile.width ? "10em" : cssPropsMobile.width)};
        height: ${({cssPropsMobile}) => (!cssPropsMobile.height ? "10em" : cssPropsMobile.height)};
        top: ${({cssPropsMobile}) => (!cssPropsMobile.top ? "0" : cssPropsMobile.top)};
        left: ${({cssPropsMobile}) => (!cssPropsMobile.left ? "0" : cssPropsMobile.left)};
        text-align: ${({cssPropsMobile}) =>
            !cssPropsMobile.textAlign ? "left" : cssPropsMobile.textAlign};
    }
`;

const StyledFigureCaptionText = styled.span<Props>`
    color: #ffffff;
    font-size: ${({cssProps}) => (!cssProps.fontSize ? "2em" : cssProps.fontSize)};
    font-weight: ${({cssProps}) => (!cssProps.fontWeight ? "2em" : cssProps.fontWeight)};
    line-height: ${({cssProps}) => (!cssProps.lineHeight ? "2em" : cssProps.lineHeight)};

    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        font-size: ${({cssPropsMobile}) =>
            !cssPropsMobile.fontSize ? "2em" : cssPropsMobile.fontSize};
        font-weight: ${({cssPropsMobile}) =>
            !cssPropsMobile.fontWeight ? "2em" : cssPropsMobile.fontWeight};
        line-height: ${({cssPropsMobile}) =>
            !cssPropsMobile.lineHeight ? "1em" : cssPropsMobile.lineHeight};
    }
`;

const StyledFigureCaptionButton = styled(Button)<Props>`
    font-size: ${({cssProps}) => (!cssProps.fontSize ? "1em" : cssProps.fontSize)};
    color: ${({cssProps}) => (!cssProps.color ? "#000000" : cssProps.color)};
    width: ${({cssProps}) => cssProps.width && cssProps.width};
    height: ${({cssProps}) => cssProps.height && cssProps.height};
    margin-top: 1em;
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        font-size: ${({cssPropsMobile}) =>
            !cssPropsMobile.fontSize ? "2em" : cssPropsMobile.fontSize};
        color: ${({cssPropsMobile}) => (!cssPropsMobile.color ? "#000000" : cssPropsMobile.color)};
        width: ${({cssPropsMobile}) => cssPropsMobile.width && cssPropsMobile.width};
        height: ${({cssPropsMobile}) => cssPropsMobile.height && cssPropsMobile.height};
    }
`;

const StyledFigureExploreButton = styled(Button).attrs(() => ({
    className: "exploreBtn",
    textBtn: true
}))<Props>`
    width: ${({cssProps}) => cssProps.width && cssProps.width};
    font-size: ${({cssProps}) => (!cssProps.fontSize ? "1em" : cssProps.fontSize)};
    color: ${({cssProps}) => (!cssProps.color ? "#000000" : cssProps.color)};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0;
    transform: translateY(10%);
    transition: all 0.5s;
    &::after {
        font-size: 1.59em;
        font-family: "Material Icons";
        content: "chevron_right";
        -webkit-font-feature-settings: "liga" 1;
        -moz-font-feature-settings: "liga" 1;
        font-feature-settings: "liga" 1;
    }
    @media screen and (max-width: ${(props) => props.theme.mobile}px) {
        width: ${({cssPropsMobile}) => cssPropsMobile.width && cssPropsMobile.width};
        font-size: ${({cssPropsMobile}) =>
            !cssPropsMobile.fontSize ? "1em" : cssPropsMobile.fontSize};
        color: ${({cssPropsMobile}) => (!cssPropsMobile.color ? "#000000" : cssPropsMobile.color)};
    }
`;

const StyledGridRenderer = (props: Game): JSX.Element => {
    const figureCss: Props = {
        cssProps: {
            gridRowStart: props.Grid.Desktop.Row.Start,
            gridRowEnd: props.Grid.Desktop.Row.End,
            gridColumnStart: props.Grid.Desktop.Col.Start,
            gridColumnEnd: props.Grid.Desktop.Col.End,
            lineHeight: "0.9em"
        },
        cssPropsMobile: {
            gridRowStart: props.Grid.Mobile.Row.Start,
            gridRowEnd: props.Grid.Mobile.Row.End,
            gridColumnStart: props.Grid.Mobile.Col.Start,
            gridColumnEnd: props.Grid.Mobile.Col.End,
            lineHeight: "0.9em"
        }
    };

    if (props.Title === "jackpot") {
        const figureCaptionCss: Props = {
            cssProps: {
                width: "20em",
                height: "20em",
                top: "10em",
                left: "12.2em"
            },
            cssPropsMobile: {
                width: "20em",
                height: "30em",
                top: "18em",
                left: "23.2em"
            }
        };

        const figureCaptionTextCss: Props = {
            cssProps: {
                fontSize: "4.75em",
                fontWeight: 900,
                lineHeight: "0.9em"
            },
            cssPropsMobile: {
                fontSize: "11em",
                fontWeight: 900,
                lineHeight: "0.9em"
            }
        };

        const figureCaptionButtonCss: Props = {
            cssProps: {
                width: "10.55em",
                height: "2.35em",
                color: "#ffffff"
            },
            cssPropsMobile: {
                width: "10em",
                height: "2.5em",
                color: "#ffffff"
            }
        };

        return (
            <StyledFigure
                key={props.Title}
                cssProps={figureCss.cssProps}
                cssPropsMobile={figureCss.cssPropsMobile}
            >
                <img src={require(`../../assets/images/${props.Title}.png`)} alt={props.Title} />
                <StyledFigureCaption
                    cssProps={figureCaptionCss.cssProps}
                    cssPropsMobile={figureCaptionCss.cssPropsMobile}
                >
                    <StyledFigureCaptionText
                        cssProps={figureCaptionTextCss.cssProps}
                        cssPropsMobile={figureCaptionTextCss.cssPropsMobile}
                    >
                        PLAY WIN EXCITE
                    </StyledFigureCaptionText>
                    <StyledFigureCaptionButton
                        cssProps={figureCaptionButtonCss.cssProps}
                        cssPropsMobile={figureCaptionButtonCss.cssPropsMobile}
                    >
                        Get Started!
                    </StyledFigureCaptionButton>
                </StyledFigureCaption>
            </StyledFigure>
        );
    } else if (props.Title === "casino") {
        const figureCaptionCss: Props = {
            cssProps: {
                width: "21em",
                height: "10em",
                top: "5.3em",
                left: "11.7em",
                textAlign: "center"
            },
            cssPropsMobile: {
                width: "55em",
                height: "10em",
                top: "13.3em",
                left: "20.7em",
                textAlign: "center"
            }
        };

        const figureCaptionTextCss: Props = {
            cssProps: {
                fontSize: "2.8em",
                fontWeight: 600,
                lineHeight: "0.9em"
            },
            cssPropsMobile: {
                fontSize: "7.5em",
                fontWeight: 600,
                lineHeight: "0.9em"
            }
        };

        const figureCaptionButtonCss: Props = {
            cssProps: {
                fontSize: "1.59em",
                color: "#ffffff"
            },
            cssPropsMobile: {
                fontSize: "1.59em",
                color: "#ffffff"
            }
        };

        return (
            <StyledFigure
                key={props.Title}
                cssProps={figureCss.cssProps}
                cssPropsMobile={figureCss.cssPropsMobile}
            >
                <img src={require(`../../assets/images/${props.Title}.png`)} alt={props.Title} />
                <StyledFigureCaption
                    cssProps={figureCaptionCss.cssProps}
                    cssPropsMobile={figureCaptionCss.cssPropsMobile}
                >
                    <StyledFigureCaptionText
                        cssProps={figureCaptionTextCss.cssProps}
                        cssPropsMobile={figureCaptionTextCss.cssPropsMobile}
                    >
                        LIVE GAMES WITH FRIENDS
                    </StyledFigureCaptionText>
                </StyledFigureCaption>
                <StyledFigureExploreButton
                    cssProps={figureCaptionButtonCss.cssProps}
                    cssPropsMobile={figureCaptionButtonCss.cssPropsMobile}
                >
                    Explore
                </StyledFigureExploreButton>
            </StyledFigure>
        );
    } else if (props.Title === "esport") {
        const figureCaptionCss: Props = {
            cssProps: {
                width: "13em",
                height: "3em",
                top: "6em",
                left: "4.5em",
                textAlign: "center"
            },
            cssPropsMobile: {
                width: "13em",
                height: "3em",
                top: "12em",
                left: "7.5em",
                textAlign: "center"
            }
        };

        const figureCaptionTextCss: Props = {
            cssProps: {
                fontSize: "2.8em",
                fontWeight: 800,
                lineHeight: "0.9em"
            },
            cssPropsMobile: {
                fontSize: "6.8em",
                fontWeight: 800,
                lineHeight: "0.9em"
            }
        };

        return (
            <StyledFigure
                key={props.Title}
                cssProps={figureCss.cssProps}
                cssPropsMobile={figureCss.cssPropsMobile}
            >
                <img src={require(`../../assets/images/${props.Title}.png`)} alt={props.Title} />
                <StyledFigureCaption
                    cssProps={figureCaptionCss.cssProps}
                    cssPropsMobile={figureCaptionCss.cssPropsMobile}
                >
                    <StyledFigureCaptionText
                        cssProps={figureCaptionTextCss.cssProps}
                        cssPropsMobile={figureCaptionTextCss.cssPropsMobile}
                    >
                        ESPORTS
                    </StyledFigureCaptionText>
                </StyledFigureCaption>
            </StyledFigure>
        );
    } else if (props.Title === "multicollection") {
        const figureCaptionCss: Props = {
            cssProps: {
                width: "35em",
                height: "10em",
                top: "2.7em",
                left: "0.5em",
                textAlign: "center"
            },
            cssPropsMobile: {
                width: "90em",
                height: "10em",
                top: "6.7em",
                left: "0em",
                textAlign: "center"
            }
        };

        const figureCaptionTextCss: Props = {
            cssProps: {
                fontSize: "3.65em",
                fontWeight: 900,
                lineHeight: "0.9em"
            },
            cssPropsMobile: {
                fontSize: "10em",
                fontWeight: 800,
                lineHeight: "0.9em"
            }
        };

        const figureCaptionButtonCss: Props = {
            cssProps: {
                fontSize: "1.59em",
                color: "#ffffff",
                width: "7em"
            },
            cssPropsMobile: {
                fontSize: "1.59em",
                color: "#ffffff",
                width: "7em"
            }
        };

        return (
            <StyledFigure
                key={props.Title}
                cssProps={figureCss.cssProps}
                cssPropsMobile={figureCss.cssPropsMobile}
            >
                <img src={require(`../../assets/images/${props.Title}.png`)} alt={props.Title} />
                <StyledFigureCaption
                    cssProps={figureCaptionCss.cssProps}
                    cssPropsMobile={figureCaptionCss.cssPropsMobile}
                >
                    <StyledFigureCaptionText
                        cssProps={figureCaptionTextCss.cssProps}
                        cssPropsMobile={figureCaptionTextCss.cssPropsMobile}
                    >
                        LOVE PLAYING? JOIN THE LEAGUE
                    </StyledFigureCaptionText>
                </StyledFigureCaption>
                <StyledFigureExploreButton
                    cssProps={figureCaptionButtonCss.cssProps}
                    cssPropsMobile={figureCaptionButtonCss.cssPropsMobile}
                >
                    Apply Now
                </StyledFigureExploreButton>
            </StyledFigure>
        );
    } else {
        return (
            <StyledFigure
                key={props.Title}
                cssProps={figureCss.cssProps}
                cssPropsMobile={figureCss.cssPropsMobile}
            >
                <img src={require(`../../assets/images/${props.Title}.png`)} alt={props.Title} />
            </StyledFigure>
        );
    }
};

export const HomeComponent: React.FunctionComponent<Props> = ({state, actions}): JSX.Element => {
    useEffect(() => {
        actions.initGames();
    }, [actions]);

    useEffect(() => {
        document.querySelectorAll(".fig").forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("displayFigure");
            }, index * 150);
        });
    }, [state]);

    return state.fetching ? (
        <Loader width="4rem" height="4rem" />
    ) : (
        <StyledGrid>
            {state.games &&
                state.games.length > 0 &&
                state.games.map((item) => StyledGridRenderer(item))}
        </StyledGrid>
    );
};
