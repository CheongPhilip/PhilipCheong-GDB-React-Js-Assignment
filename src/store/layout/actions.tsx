import {createAction} from "@reduxjs/toolkit";
import {ActionTypes, Resources} from "./types";

export const actCollections = {
    initResources: createAction(ActionTypes.INIT_RESOURCES),
    initResourcesSuccess: createAction<Resources[]>(ActionTypes.INIT_RESOURCES_SUCCESS),
    initResourcesFailure: createAction<Record<string, unknown>>(ActionTypes.INIT_RESOURCES_FAILURE),
    setNavLink: createAction<string | undefined>(ActionTypes.SET_NAV_LINK),
    setMobileVer: createAction<boolean>(ActionTypes.SET_MOBILE_VER),
    setExpanded: createAction<boolean>(ActionTypes.SET_EXPANDED),
    setScreenWidth: createAction<number>(ActionTypes.SET_SCREEN_WIDTH)
};

export type Actions = Omit<typeof actCollections, "Type">;
