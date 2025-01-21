import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userSlice from '../slices/userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';


const persistConfig = {
    key: "root",
    storage
}

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

const rootReducer = combineReducers({
    userAuth: persistedUserReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
