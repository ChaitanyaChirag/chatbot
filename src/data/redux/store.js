import { createStore as _createStore, applyMiddleware, compose } from 'redux';

import socketMiddleware from './chat_details/middleware';
import rootReducer from './rootreducer';

export default function createStore() {
  const middlewares = [
    socketMiddleware
  ];
  return _createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
