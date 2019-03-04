import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import rootReducer from './modules';

const isDev = process.env.NODE_ENV === 'development';

const devTools = isDev && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const middlewares = [
	penderMiddleware()
];

const configureStore = (preloadedState?: any) => createStore(
	rootReducer,
	preloadedState,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default configureStore;