import axios from "axios";
import {all, call, delay, put, takeLatest} from "redux-saga/effects";

import {actCollections} from "./actions";
import {ActionTypes, Game} from "./types";

function* handleInitGames() {
    try {
        const response = yield call(() => axios.get<Game[]>("/public/data/games.json"));
        yield delay(2000); // Simulate loading on requesting api
        yield put(actCollections.initGamesSuccess(response.data));
    } catch (e) {
        yield put(actCollections.initGamesFailure({...e}));
    }
}

export default function* saga(): unknown {
    yield all([takeLatest(ActionTypes.INIT_GAMES, handleInitGames)]);
}
