import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';

import storage from 'lib/storage';
import { State } from 'store/modules';
import { IRouterProps } from 'components/App';
import {
	UserMenu,
	UserMenuItem,
	Username
} from 'components/Base/UserMenu';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type UserMenuContainerProps = StateProps & DispatchProps & IRouterProps;

class UserMenuContainer extends React.Component<UserMenuContainerProps> {

	public handleLogout = async () => {
		const { UserActions } = this.props;
		try {
			await UserActions.logout();
		} catch (e) {
			console.log(e);
		}
		storage.remove('loggedInfo');
		window.location.href = '/';
	}

	public handleOpenMyHurem = () => {
		const { history, BaseActions, username } = this.props;
		history.push(`/@${username}`);
		BaseActions.setUserMeunVisibility(false);
	}

	public render() {
		const { handleLogout, handleOpenMyHurem } = this;
		const { username, visible } = this.props;

		if (!visible) return null;

		return (
			<UserMenu>
				<Username username={username} />
				<UserMenuItem onClick={handleOpenMyHurem}>나의 흐름</UserMenuItem>
				<UserMenuItem>설정</UserMenuItem>
				<UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
			</UserMenu>
		);
	}
}

const mapStateToProps = ({ base, user }: State) => ({
	visible: base.usermenu.visibile,
	username: user.loggedInfo.username
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UserMenuContainer));