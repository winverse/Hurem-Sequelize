import { HomePage, UserPage } from 'pages';
import { RegisterContainer, LoginContainer } from 'containers/Auth';
import { bindActionCreators } from 'redux';
import { postsActions } from 'store/modules/posts';
import { match } from 'react-router';

const routes: any[] = [
	{
		path: '/',
		exact: true,
		component: HomePage,
		preload: async(ctx: any, { dispatch }: any, match: match<string>) => {
			const PostsActions = bindActionCreators(postsActions, dispatch);
			return await PostsActions.loadPost(null);
		}
	},
	{
		path: '/auth/login',
		component: LoginContainer
	},
	{
		path: '/auth/register',
		component: RegisterContainer
	},
	{
		path: '/@:username',
		component: UserPage
	}
];

export default routes;