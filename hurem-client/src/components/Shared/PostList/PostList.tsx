import * as React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
// import oc from 'open-color';

import Post from './Post';

const Wrapper = styled.div`
	position: relative;
	margin-top: 1rem;
`;

interface IPropsFace {
	PostId?: string;
	liked?: boolean;
}

interface IProps {
	posts: any;
	masonryRef: any;
	onToggleLike({ PostId, liked }: IPropsFace): void;
	onCommentClick(postId: string): void;
}

const PostList: React.SFC<IProps> = ({ posts, onToggleLike, onCommentClick, masonryRef }) => {
	if (!posts) return null;
	const postList = posts.map(
		(post: any) => (
			<Post key={post._id} post={post} onToggleLike={onToggleLike} onCommentClick={onCommentClick}/>
		)
	);
	
	return (
		<Wrapper>
			<Masonry options={{ gutter: 16 }} ref={masonryRef}>
				{postList}
			</Masonry>
		</Wrapper>
	);
};

export default PostList;