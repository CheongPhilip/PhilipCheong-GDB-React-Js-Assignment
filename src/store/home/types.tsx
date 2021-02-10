export interface HomeStates {
    games: Game[];
    fetching: boolean;
    success: boolean;
    error: Record<string, unknown>;
}

export interface Game {
    Title: string;
    Grid: {
        Desktop: {
            Row: {
                Start: number;
                End: number;
            };
            Col: {
                Start: number;
                End: number;
            };
        };
        Mobile: {
            Row: {
                Start: number;
                End: number;
            };
            Col: {
                Start: number;
                End: number;
            };
        };
    };
}

export enum ActionTypes {
    INIT_GAMES = "INIT_GAMES",
    INIT_GAMES_SUCCESS = "INIT_GAMES_SUCCESS",
    INIT_GAMES_FAILURE = "INIT_GAMES_FAILURE"
}

export const initialState: HomeStates = {
    games: [],
    fetching: false,
    success: false,
    error: null
};
