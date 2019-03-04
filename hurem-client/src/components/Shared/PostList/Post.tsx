import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import * as moment from 'moment';
import 'moment/locale/ko';

import { shadow, media } from 'style/styleUtils';
import PostFooter from './PostFooter';
import { CommentBlockContainer } from 'containers/Shared/Comment';
// import scuize from 'lib/hoc/scuize';

interface IStyled {
	image: string;
}

const Wrapper = styled.div`
	width: calc((100% - 32px) / 3);
	margin-bottom: 1rem;
	background: white;
	${shadow(1)};

	@media ${media.laptopS} {
		width: calc((100% - 16px) / 2);
	}

	@media ${media.tablet} {
		width: 100%;
	}
`;

const PostHead = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid ${oc.gray[2]};
`;

const UserThumbnail = styled.div`
	${(props: IStyled) => {
		return css`
			background-color: ${oc.gray[6]};
			background-size: cover;
			background-position: center;
			background-image: url(${props.image});
			background-repeat: no-repeat;
			width: 30px;
			height: 30px;
			border-radius: 50%;
		`;
	}};
`;

const Username = styled(Link)`
	font-weight: 500;
	margin-left: 0.5rem;
	font-size: 0.9rem;
`;

const Count = styled.div`
	color: ${oc.gray[6]};
	margin-left: 0.3rem;
	font-size: 0.8rem;
`;

const Time = styled.div`
	color: ${oc.gray[4]};
	font-size: 0.8rem;
	margin-left: auto;
`;

const Content = styled.div`
	font-size: 1.25rem;
	color: ${oc.gray[8]};
	font-weight: 500;
	padding: 1rem;
	word-break: break-all;
	white-space: pre-wrap;
`;

interface IProps {
	post: any;
	onToggleLike({ postId, liked }: IPropsFace): void;
	onCommentClick(postId: string): void;
}

interface IPropsFace {
	postId: string;
	liked: boolean;
}

export default class Post extends React.Component<IProps> {

	public shouldComponentUpdate(nextProps: IProps, nextState: any): any {
		return this.props.post !== nextProps.post;
	}

	public render() {
		const { post, onToggleLike, onCommentClick } = this.props;

		const { 
			_id,
			count,
			username,
			content,
			comments,
			likesCount,
			liked,
			createdAt
		} = post;

		const toggleLike = () => onToggleLike({
			postId: _id,
			liked
		});
	
		const commentClick = () => onCommentClick(_id);

		return (
			<Wrapper>
				<PostHead>
					<UserThumbnail image={`/api/users/${username}/thumbnail`} />
					<Username to={`/@${username}`}>{username}</Username>
					<Count>#{count} 번째 생각</Count>
					<Time>{moment(createdAt).fromNow()}</Time>
				</PostHead>
				<Content>
					{content}
				</Content>
				<PostFooter
					comments={comments}
					likesCount={likesCount}
					liked={liked}
					onToggleLike={toggleLike}
					onCommentClick={commentClick}
				/>
				<CommentBlockContainer post={post} />
			</Wrapper>
		);
	}
}