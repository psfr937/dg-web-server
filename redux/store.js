import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import promiseListener from '../helpers/reduxPromiseListener';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers';

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['exampleData'] // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const initializeStore = (initialState = {}, ctx = null, options = null) => {

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  /* eslint-enable */

  const middlewares = [
    thunk,
    promiseListener.middleware
    // Add other middlewares here
  ];

  return createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};