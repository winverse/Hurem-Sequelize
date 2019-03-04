import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import HeaderContainer from 'containers/Base/HeaderContainer';
import CoreContainer from 'containers/Core/CoreContainer';

import {
	HomePage,
	AuthPage,
	UserPage
} from 'pages';

export interface IRouterProps extends RouteComponentProps<any> { }

class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<HeaderContainer />
				<Switch>
					<Route exact={true} path="/" component={HomePage} />
					<Route path="/auth" component={AuthPage} />
					<Route path="/@:username" component={UserPage}/>
				</Switch>
				<CoreContainer />
			</React.Fragment>
		);
	}
}

export default App;