import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import configure from 'store/configureStore';

import routeConfig from './routeConfig';
import App from 'components/App';

const serverRender = async (ctx: any) => {

	const store = configure();
	const { url, origin } = ctx; 

	axios.defaults.baseURL = origin;

	const promises: any[] = [];

	routeConfig.every((route): any => {
		const match = matchPath(url, route);
		if (match) {
			if (route.preload) {
				promises.push(route.preload(ctx, store, match));
			}
			if (route.stop) return false;
		}
	});
	
	try {
		await Promise.all(promises);
	} catch (e) {
		console.log(e);
	}
	
	const context = {};
	const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter context={context} location={url}>
				<App/>
			</StaticRouter>
		</Provider>
	);

	return { html, preloadedState };
};

export default serverRender;