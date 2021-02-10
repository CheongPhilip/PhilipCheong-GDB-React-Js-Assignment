import {createAction} from "@reduxjs/toolkit";
import {ActionTypes, Game} from "./types";

export const actCollections = {
    initGames: createAction(ActionTypes.INIT_GAMES),
    initGamesSuccess: createAction<Game[]>(ActionTypes.INIT_GAMES_SUCCESS),
    initGamesFailure: createAction<Record<string, unknown>>(ActionTypes.INIT_GAMES_FAILURE)
};

export type Actions = Omit<typeof actCollections, "Type">;
