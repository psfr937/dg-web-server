import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {createWrapper} from 'next-redux-wrapper';
import reducer from '../redux/reducers/index';
import rootSaga from '../redux/actions/index';






const makeStore = (context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const makeConfiguredStore = (reducer) => {
    // 2: Add an extra parameter for applying middleware:
    const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
    // 3: Run your sagas on server
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store
  };

  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(reducer);
  } else {
    const {persistStore, persistReducer} = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['cartItems'], // make sure it does not clash with server keys
      storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = makeConfiguredStore(persistedReducer);

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }

  // 4: now return the store:
};

export const wrapper = createWrapper(makeStore);