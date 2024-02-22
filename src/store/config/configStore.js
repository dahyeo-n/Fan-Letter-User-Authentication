// import { createStore, combineReducers } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import letterSlice from '../modules/letterSlice';
import memberSlice from '../modules/memberSlice';
import authSlice from '../modules/authSlice';

const store = configureStore({
    reducer: { letterSlice, memberSlice, authSlice },
});

// const rootReducer = combineReducers({ letters, member });
// const store = createStore(rootReducer, devToolsEnhancer());

const getStore = () => store;
export default getStore;
