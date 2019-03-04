import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from 'Root';
import { matchPath } from 'react-router';
import 'style/index.css';

import routeConfig from './routeConfig';

const renderApp = async () => {
	if (process.env.NODE_ENV === 'development') {
		return ReactDOM.render(
			<Root />,
			document.getElementById('root') as HTMLElement
		);
	}

	const getComponents: any[] = [];
	const { pathname } = window.location;

	routeConfig.forEach(
		(route): any => {
			const match = matchPath(pathname, route);
			if (!match) return;
			const { getComponents } = route.component;
			if (!getComponents) return;
			getComponents.push(getComponents());
		}
	);

	await Promise.all(getComponents);
	ReactDOM.hydrate(<Root />, document.getElementById('root') as HTMLElement);
};

renderApp();

declare const module: { hot: any };
if (module.hot) {
	module.hot.accept(['./Root'], () => {
		renderApp();
	});
}