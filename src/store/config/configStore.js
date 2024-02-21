// import { createStore, combineReducers } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import letters from '../modules/letters';
import member from '../modules/member';

const store = configureStore({
    reducer: { letters, member },
});

// const rootReducer = combineReducers({ letters, member });
// const store = createStore(rootReducer, devToolsEnhancer());

export default store;
