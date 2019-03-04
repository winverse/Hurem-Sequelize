import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './Comment';
import withRelayout from 'lib/hoc/withRelayout';

const CommentListWrapper = styled.div`
	margin-top: 0.7rem;
`;

const ReadMore = styled.div`
	color: ${oc.gray[6]};
	font-size: 0.9rem;
	text-align: center;
	cursor: pointer;

	&:hover {
		color: ${oc.cyan[6]};
		font-weight: 600;
	}
`;

interface IProps {
	comments: any[];
}

interface IState {
	limit: number;
}

class CommentList extends React.Component<IProps, IState> {

	state = {
		limit: 5
	};

	public handleReadMore = () => {
		this.setState({
			limit: this.state.limit + 10
		});
		(this as any).props.onRelayout();
	}

	public handleFolding = () => {
		this.setState({
			limit: 5
		});
	}

	public render() {
		const { handleReadMore, handleFolding } = this;
		const { comments } = this.props;
		const { limit } = this.state;
		
		if (comments.length === 0) return null;
 
		const commentList = comments.slice(0, limit).map(
			(comment) => {
				return <Comment {...comment} key={comment._id}/>;
			}
		);

		return (
			<CommentListWrapper>
				{commentList}
				{ limit < comments.length && <ReadMore onClick={handleReadMore}>{comments.length - limit}개 더 보기</ReadMore>}
				{ (comments.length > 5 && limit >= comments.length) && <ReadMore onClick={handleFolding}> 댓글 접기</ReadMore>}
			</CommentListWrapper>
		);
	}
}

export default (withRelayout as any)(CommentList);