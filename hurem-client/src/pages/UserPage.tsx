import * as React from 'react';
import { withRouter } from 'react-router-dom';

import PageWrapper from 'components/Base/PageWrapper';
import UserHeadContainer from 'containers/User/UserHeadContainer';
import PostListContainer from 'containers/Shared/PostList/PostListContainer';

import { IRouterProps } from 'components/App';
import { socketHelper } from 'store';

type UserPageProps = IRouterProps;

class UserPage extends React.Component<UserPageProps> {

	componentDidMount() {
		socketHelper.ignore();
	}

	componentWillUnmount() {
		socketHelper.listen();
	}

	render() {
		const { match } = this.props;
		const { username } = match.params;
		return (
			<PageWrapper>
				<UserHeadContainer username={username}/>
				<PostListContainer username={username}/>
			</PageWrapper>
		);
	}
}

export default withRouter(UserPage);