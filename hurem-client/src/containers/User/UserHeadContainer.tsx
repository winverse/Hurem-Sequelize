import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { userPageActions } from 'store/modules/userPage';

import { State } from 'store/modules';
import {
	UserHead
} from 'components/User';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
interface IOwnProps {
	username: string;
}

type UserHeadContainerProps = StateProps & DispatchProps & IOwnProps;

class UserHeadContainer extends React.Component<UserHeadContainerProps> {

	public getUserInfo = async () => {
		const { UserPageActions, username } = this.props;
		try {
			await UserPageActions.getUserInfo(username);
		} catch (e) {
			console.log(e);
		}
	}

	public componentDidMount() {
		this.getUserInfo();
	}

	public componentDidUpdate(prevProps: UserHeadContainerProps, prevState: any) {
		if (prevProps.username !== this.props.username) {
			this.getUserInfo();
		}
	}

	public render() {
		const { username, thumbnail, thoughtCount, fetched } = this.props;

		if (!fetched) return null;

		return (
			<UserHead 
				username={username}
				thoughtCount={thoughtCount}
				image={thumbnail}
			/>
		);
	}
}

const mapStateToProps = ({ userPage, pender }: State) => ({
	thumbnail: userPage.info.profile.thumbnail,
	thoughtCount: userPage.info.thoughtCount,
	fetched: pender.success['userPage/GET_USER_INFO']
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	UserPageActions: bindActionCreators(userPageActions, dispatch)
});

export default connect<StateProps, DispatchProps>(
	mapStateToProps,
	mapDispatchToProps
)(UserHeadContainer);