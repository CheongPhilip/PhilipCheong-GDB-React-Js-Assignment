import {createReducer} from "@reduxjs/toolkit";
import {initialState} from "./types";
import {actCollections} from "./actions";

export default createReducer(initialState, (builder) => {
    builder.addCase(actCollections.initGames, (state) => {
        return {
            ...state,
            fetching: true,
            success: false
        };
    });
    builder.addCase(actCollections.initGamesSuccess, (state, action) => {
        return {
            ...state,
            fetching: false,
            success: true,
            games: action.payload
        };
    });
    builder.addCase(actCollections.initGamesFailure, (state, action) => {
        return {
            ...state,
            fetching: false,
            success: false,
            error: action.payload
        };
    });
});
