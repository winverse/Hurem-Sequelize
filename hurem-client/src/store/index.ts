import configure from './configureStore';
import socket from 'lib/socket';

const preloadedState = (window as any).__PRELOADED_STATE__ && (window as any).__PRELOADED_STATE__;

const socketURI = process.env.NODE_ENV === 'production' 
	? ((window.location.protocol === 'https:') ? 'wss://' : 'ws://') + window.location.host + '/ws'
	: 'ws://localhost:4000/ws';

const store = configure(preloadedState);

export const socketHelper = new socket({ store, uri: socketURI });

export default store;