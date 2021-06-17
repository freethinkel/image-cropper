import { combineReducers, configureStore } from '@reduxjs/toolkit';
import photosReducer, { photosMiddleware } from './slices/photos';

const reducers = combineReducers({
	photos: photosReducer,
});

export const store = configureStore({
	reducer: reducers,
	middleware: [photosMiddleware],
});

export type RootState = ReturnType<typeof reducers>;
