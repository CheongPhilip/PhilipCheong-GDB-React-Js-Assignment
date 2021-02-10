import {configureStore} from "@reduxjs/toolkit";
import layoutReducer from "./layout";
import homeReducer from "./home";
import createSagaMiddleware from "redux-saga";
import {all, fork} from "redux-saga/effects";
import logger from "redux-logger";

import layoutSaga from "./layout/saga";
import homeSaga from "./home/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        home: homeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .prepend(sagaMiddleware)
            .concat(logger)
});

function* rootSaga() {
    yield all([fork(layoutSaga), fork(homeSaga)]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
