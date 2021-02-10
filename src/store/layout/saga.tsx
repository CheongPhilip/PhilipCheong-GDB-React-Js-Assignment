import axios from "axios";
import {all, call, put, takeLatest} from "redux-saga/effects";

import {actCollections} from "./actions";
import {Resources, ActionTypes} from "./types";

function* handleInitResources() {
    try {
        const response = yield call(() => require("../../assets/data/nav.json"));
        yield put(actCollections.initResourcesSuccess(response));
    } catch (e) {
        yield put(actCollections.initResourcesFailure({...e}));
    }
}

export default function* layoutSaga(): unknown {
    yield all([takeLatest(ActionTypes.INIT_RESOURCES, handleInitResources)]);
}
