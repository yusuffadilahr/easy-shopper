import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from 'redux-persist/lib/storage'
import authReducer from './slice/authSlice'
import { persistStore } from "redux-persist";

const filteredState = createFilter(
    'token', ['token']
)

const persistConfig = {
    key: 'token',
    storage,
    transform: filteredState
}

const persistedReducer: any = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        token: persistedReducer,
        keepAuth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
                ignoredPaths: ['token', 'keepAuth'],
            },
        }),
})

export const persistedStore: any = persistStore(store)
export default store