import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';
import 'style/ReactToasify.css';

import { userActions } from 'store/modules/user';

import storage from 'lib/storage';
import { State } from 'store/modules';
import { inform } from 'lib/shouldCancel';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type CoreContaienrProps = StateProps & DispatchProps;

class CoreContaienr extends React.Component<CoreContaienrProps> {

	public initializeUserInfo = async () => {
		const loggedInfo = storage.get('loggedInfo');
		if (!loggedInfo) return;

		const { UserActions } = this.props;
		UserActions.setLoggedInfo(loggedInfo);

		try {
			await UserActions.checkStatus();
		} catch (e) {
			console.log(e);
			storage.remove('loggedInfo');
			window.location.href = '/auth/login?expired';
		}
	}

	componentDidMount() {
		this.initializeUserInfo();
		inform();
	}

	public render() {
		return (
			<React.Fragment>
				<ToastContainer style={{ zIndex: 2990 }} hideProgressBar={true} position="bottom-right"/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ }: State) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CoreContaienr);