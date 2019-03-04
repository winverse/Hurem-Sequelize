import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { baseActions } from 'store/modules/base';

import { State } from 'store/modules';

import LoginContainer from 'containers/Auth/LoginContainer';
import RegisterContainer from 'containers/Auth/RegisterContainer';

import { AuthWrapper } from 'components/Auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type AuthPageProps = StateProps & DispatchProps;

class AuthPage extends React.Component<AuthPageProps> {
	
	public componentDidMount() {
		const { BaseActions } = this.props;
		BaseActions.setHeaderVisibility(false);
	}

	public componentWillUnmount() {
		const { BaseActions } = this.props;
		BaseActions.setHeaderVisibility(true);
	}

	public render() {
		return (
			<AuthWrapper>
				<Route path="/auth/login" component={LoginContainer} />
				<Route path="/auth/register" component={RegisterContainer} />
			</AuthWrapper>
		);
	}
}

const mapStateToProps = ({  }: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
