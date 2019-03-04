import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { postsActions } from 'store/modules/posts';

import { State } from 'store/modules';
import {
	CommentBlock
} from 'components/Shared/CommentBlock';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
interface IOwnProps {
	post: {
		_id: string;
		comments: any[];
	};
}

type CommentBlockContainerProps = StateProps & DispatchProps & IOwnProps;

class CommentBlockContainer extends React.Component<CommentBlockContainerProps> {

	public handlePostIdSet = () => {
		const { PostsActions, postId } = this.props;
		PostsActions.postIdSet(postId);
	}
	
	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const { PostsActions, post } = this.props;
		PostsActions.changeCommentInput({ 
			postId: post._id,
			value 
		});
	}

	public comment = () => {
		const { PostsActions, status, postId } = this.props;
		const value = status.value;
		if (value === '') return;
		PostsActions.comment({
			postId,
			text: value
		});
	}

	public handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		if (key === 'Enter') {
			this.comment();
		}
	}

	public componentDidMount() {
		this.handlePostIdSet();
	}

	public render() {
		const { handleChange, handleKeyPress } = this;
		const { status } = this.props;
		if (!status) return null;
		const { visible, value } = status;

		if (!visible) return null;

		return (
			<CommentBlock
				value={value}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				comments={this.props.post.comments}
			/>
		);
	}
}

const mapStateToProps = ({ posts }: State, ownProps: IOwnProps) => {
	const postId = ownProps.post._id;
	return {
		postId: ownProps.post._id,
		status: posts.comments[postId],
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	PostsActions: bindActionCreators(postsActions, dispatch)
});

export default connect<StateProps, DispatchProps, IOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(CommentBlockContainer);