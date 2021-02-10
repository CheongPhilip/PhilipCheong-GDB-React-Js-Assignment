import React from "react";
import configureMockStore, {MockStore} from "redux-mock-store";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {mount, ReactWrapper} from "enzyme";
import {LayoutHeader as ConnectedLayoutHeader} from ".";
import {actCollections, Actions} from "../../../store/layout/actions";
import {ActionTypes, LayoutStates, Resources} from "../../../store/layout/types";
import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";
import {Theme} from "../../../theme";

interface actionType {
    type: string;
    payload: unknown;
}

const dummyLink: Resources[] = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "RPG",
        link: "/rpg"
    },
    {
        title: "Arcade",
        link: "/arcade"
    },
    {
        title: "Brain Games",
        link: "/brain-games"
    },
    {
        title: "Support",
        link: "/support"
    },
    {
        title: "Contact Us",
        link: "/contact-us"
    }
];

describe("Layout Header", () => {
    const state: LayoutStates = {
        navLink: "home",
        screenWidth: 1280,
        mobileVer: false,
        expanded: false,
        resources: [],
        fetching: false,
        success: false,
        error: null
    };

    const initialState = {
        layout: {
            state: state
        }
    };

    let store: MockStore;
    let wrapper: ReactWrapper;

    const mockStore = configureMockStore();

    beforeEach(() => {
        const div = document.createElement("div");
        div.setAttribute("id", "container");
        document.body.appendChild(div);

        store = mockStore(() => {
            const actions = store.getActions();
            if (actions.length < 1) {
                return initialState;
            } else {
                const last: actionType = actions[actions.length - 1];
                if (last.type === ActionTypes.INIT_RESOURCES_SUCCESS) {
                    return {
                        layout: {...initialState.layout.state, resources: last.payload}
                    };
                } else if (last.type === ActionTypes.SET_MOBILE_VER) {
                    return {
                        layout: {mobileVer: last.payload}
                    };
                } else if (last.type === ActionTypes.SET_SCREEN_WIDTH) {
                    return {
                        layout: {screenWidth: last.payload}
                    };
                } else if (last.type === ActionTypes.SET_EXPANDED) {
                    return {
                        layout: {expanded: last.payload}
                    };
                } else if (last.type === ActionTypes.SET_NAV_LINK) {
                    return {
                        layout: {...initialState.layout.state, navLink: last.payload}
                    };
                }
            }
            return {
                ...initialState,
                resources: state
            };
        });

        wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={Theme}>
                    <Router>
                        <ConnectedLayoutHeader />
                    </Router>
                </ThemeProvider>
            </Provider>,
            {attachTo: document.getElementById("container")}
        );
    });

    afterEach(() => {
        const div = document.getElementById("container");
        if (div) {
            document.body.removeChild(div);
        }
    });

    describe("Default", () => {
        it("Should render without crash", () => {
            expect(wrapper.find(ConnectedLayoutHeader).length).toEqual(1);
        });

        it("Should contain a logo", () => {
            expect(wrapper.find("img").prop("src")).toMatch(/^\/public\/images\/Logo(_2x)?\.png$/);
        });

        it("Should contains login and sign up button", () => {
            wrapper.find("button > span").map((item) => {
                expect(item.text()).toMatch(/^(Login|Sign Up)$/);
            });
        });

        it("Should execute initResources & setScreenWidth on initialization", () => {
            expect(
                store
                    .getActions()
                    .filter(
                        (item: actionType) =>
                            item.type === actCollections.initResources().type ||
                            item.type === actCollections.setScreenWidth().type
                    )
            ).toHaveLength(2);
        });

        it("Should trigger setScreenWidth on window resize", () => {
            global.innerWidth = 360;
            global.innerHeight = 640;
            global.dispatchEvent(new Event("resize"));
            wrapper.update();

            const actions = store.getActions();
            const last: actionType = actions[actions.length - 1];
            expect(last.type === "SET_SCREEN_WIDTH" && last.payload === 360).toBeTruthy();
        });
    });

    describe("Navigation", () => {
        it("Should generate navigation link on initResourcesSuccess", async () => {
            store.dispatch(actCollections.initResourcesSuccess(dummyLink));
            wrapper.update();

            expect(wrapper.find("#nav_container li")).toHaveLength(6);
        });

        it("Should change navLink value when execute setNavLink", async () => {
            store.dispatch(actCollections.setNavLink("rpg"));
            expect(store.getState().layout.navLink).toEqual("rpg");
        });
    });

    describe("Mobile", () => {
        it("Should trigger setExpand on Hamburger icon clicked", () => {
            wrapper.find("#hamburger_container .material-icons").simulate("click");
            wrapper.update();
            const actions = store.getActions();
            const last: actionType = actions[actions.length - 1];
            expect(last.type === "SET_EXPANDED" && last.payload).toBeTruthy();
        });

        it("Should change hamburger icon to close icon when expanded is true", () => {
            expect(wrapper.find("#hamburger_container > span").text()).toEqual("menu");
            wrapper.find(".material-icons").simulate("click");
            wrapper.update();
            expect(wrapper.find("#hamburger_container > span").text()).toEqual("close");
        });
    });
});
