import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { hot } from 'react-hot-loader';

import App from 'components/App';

const Root: React.SFC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

export default hot(module)(Root);