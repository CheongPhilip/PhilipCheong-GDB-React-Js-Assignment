export interface LayoutStates {
    navLink: string;
    screenWidth: number;
    mobileVer: boolean;
    expanded: boolean;
    resources: Resources[];
    fetching: boolean;
    success: boolean;
    error: Record<string, unknown>;
}

export interface Resources {
    title: string;
    link: string;
}

export enum ActionTypes {
    SET_NAV_LINK = "SET_NAV_LINK",
    SET_SCREEN_WIDTH = "SET_SCREEN_WIDTH",
    SET_MOBILE_VER = "SET_MOBILE_VER",
    SET_EXPANDED = "SET_EXPANDED",
    INIT_RESOURCES = "INIT_RESOURCES",
    INIT_RESOURCES_SUCCESS = "INIT_RESOURCES_SUCCESS",
    INIT_RESOURCES_FAILURE = "INIT_RESOURCES_FAILURE"
}

export const initialState: LayoutStates = {
    navLink: "home",
    screenWidth: 0,
    mobileVer: false,
    expanded: false,
    resources: [],
    fetching: false,
    success: false,
    error: null
};
