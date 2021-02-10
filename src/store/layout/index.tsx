import {createReducer} from "@reduxjs/toolkit";
import {initialState} from "./types";
import {actCollections} from "./actions";

export default createReducer(initialState, (builder) => {
    builder.addCase(actCollections.setNavLink, (state, action) => {
        return {
            ...state,
            navLink: action.payload
        };
    });
    builder.addCase(actCollections.setMobileVer, (state, action) => {
        return {
            ...state,
            mobileVer: action.payload
        };
    });
    builder.addCase(actCollections.setScreenWidth, (state, action) => {
        return {
            ...state,
            screenWidth: action.payload
        };
    });
    builder.addCase(actCollections.setExpanded, (state, action) => {
        return {
            ...state,
            expanded: action.payload
        };
    });
    builder.addCase(actCollections.initResources, (state) => {
        return {
            ...state,
            fetching: true,
            success: false
        };
    });
    builder.addCase(actCollections.initResourcesSuccess, (state, action) => {
        return {
            ...state,
            fetching: false,
            success: true,
            resources: action.payload
        };
    });
    builder.addCase(actCollections.initResourcesFailure, (state, action) => {
        return {
            ...state,
            fetching: false,
            success: false,
            error: action.payload
        };
    });
});
