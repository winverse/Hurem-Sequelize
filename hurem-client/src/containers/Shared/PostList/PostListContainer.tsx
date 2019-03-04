import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import { postsActions } from 'store/modules/posts';

import shouldCancel from 'lib/shouldCancel';
import { State } from 'store/modules';
import { setRelayoutHandler } from 'lib/hoc/withRelayout';
import {
	PostList
} from 'components/Shared/PostList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PostListContainerProps = StateProps & DispatchProps & IPostContainerFace;

interface IPostContainerFace {
	postId?: string;
	liked?: boolean;
	username?: string;
}

class PostListContainer extends React.Component<PostListContainerProps> {

	prev: string | null = null;
	masonry: any;

	constructor(props: PostListContainerProps) {
		super(props);
		this.masonry = React.createRef();
	}
	
	public handleLoad = async () => {
		if (shouldCancel()) return;
		const { PostsActions, username } = this.props;
		try {
			await PostsActions.loadPost(username);

			const { next } = this.props;

			if (next) {
				await PostsActions.prefetchPost(next);
			}
		} catch (e) {
			console.log(e);
		}
	}

	public handleScroll = () => {
		const { nextData } = this.props;
		if (nextData.length === 0) return;

		const { scrollHeight } = document.body;
		const { innerHeight } = window;
		// IE 에서는 body.scrollTop 대신에 document.documentElement.scrollTop 사용해야함
		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if (scrollHeight - innerHeight - scrollTop < 100) {
			this.handleNextLoad();
		}
	}

	public handleNextLoad = async () => {
		const { PostsActions, next } = this.props;
		PostsActions.showPrefetchedPost();

		if (next === this.prev || !next) return;

		this.prev = next;
		try {
			await PostsActions.prefetchPost(next);
		} catch (e) {
			console.log(e);
		}
		this.handleScroll();
	}

	public handleToggleLike = async ({ postId, liked }: IPostContainerFace) => {
		const { PostsActions, logged, likeInProcess } = this.props;

		const message = (message: string) => {
			return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
		};

		if (!logged) {
			return toast(message('로그인 후 이용 하실 수 있습니다.'), { type: 'error' });
		}

		if (likeInProcess) return;
		
		if (liked) {
			PostsActions.unlikePost(postId);
		} else {
			PostsActions.likePost(postId);
		}

		return;
	}

	public handleCommentClick = (postId: string) => {
		const { PostsActions } = this.props;
		PostsActions.toggleComment(postId);
		setTimeout(() => this.masonry.current.masonry.layout(), 0);
	}

	public handleRelayout = () => {
		setTimeout(() => this.masonry.current.masonry.layout(), 0);
	}

	public componentDidMount() {
		this.handleLoad();
		window.addEventListener('scroll', this.handleScroll);
		setRelayoutHandler(this.handleRelayout);
	}

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	public componentDidUpdate(prevProps: PostListContainerProps, prevState: any) {
		if (prevProps.username !== this.props.username) {
			this.handleLoad();
		}
	}

	public render() {
		const { handleToggleLike, handleCommentClick, masonry } = this;
		const { data } = this.props;
		return (
			<PostList
				posts={data}
				onToggleLike={handleToggleLike}
				onCommentClick={handleCommentClick}
				masonryRef={masonry}
			/>
		);
	}
}

const mapStateToProps = ({ posts, user, pender }: State) => ({
	next: posts.next,
	data: posts.data,
	nextData: posts.nextData,
	logged: user.logged,
	likeInProcess: pender.pending['posts/LIKE_POST'] || pender.pending['posts/UNLIKE_POST']
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	PostsActions: bindActionCreators(postsActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostListContainer);