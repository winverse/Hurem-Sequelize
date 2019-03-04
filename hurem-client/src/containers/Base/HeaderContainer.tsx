import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';

import UserMenuContainer from './UserMenuContainer';
import { State } from 'store/modules';
import {
	Header,
	LoginButton,
	UserThumbnail
} from 'components/Base/Header';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {

	public handleThumnailClick = () => {
		const { BaseActions, userMenuVsible } = this.props;
		BaseActions.setUserMeunVisibility(!userMenuVsible);
	}

	public render() {
		const { handleThumnailClick } = this;
		const { visible, user } = this.props;
		const { logged, loggedInfo } = user;

		if (!visible) return null;

		return (
			<Header>
				{
					logged ?
						(<UserThumbnail thumbnail={loggedInfo.thumbnail} onClick={handleThumnailClick} />)
						:
						<LoginButton />
				}
				<UserMenuContainer />
			</Header>
		);
	}
}

const mapStateToProps = ({ base, user }: State) => ({
	visible: base.header.visible,
	userMenuVsible: base.usermenu.visibile,
	user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderContainer);