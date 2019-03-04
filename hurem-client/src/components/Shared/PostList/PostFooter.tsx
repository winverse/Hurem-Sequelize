import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

import { GoHeart } from 'react-icons/go';
import { IoIosChatbubbles } from 'react-icons/io';

interface IStyled {
	active: boolean;
}

const Wrapper = styled.div`
	padding: 1rem;
	border-top: 1px solid ${oc.gray[1]};
	display: flex;
	color: ${oc.gray[5]};
	svg {
		font-size: 1.75rem;
		cursor: pointer;
	}

	span {
		margin-left: 0.25rem;
		font-size: 0.8rem;
		padding-bottom: 0.25rem;
	}
`;

const Likes = styled.div`
	${(props: IStyled) => {
		return css`
			display: flex;
			align-items: center;
			svg {
				&:hover {
					color: ${oc.gray[6]};
				}

				&:active {
					color: ${oc.pink[6]};
				}
			}

			${props.active && `
				svg {
					color: ${oc.pink[6]};
					&:hover {
						color: ${oc.pink[5]};
					}
				}			
			`}
		`;
	}};
`;

const Comments = styled.div`
	margin-left: auto;
	display: flex;
	align-items: center;
	svg {
		&:hover {
			color: ${oc.gray[6]};
		}
		&:active {
			color: ${oc.cyan[6]};
		}
	}
`;

interface IProps {
	liked: boolean;
	likesCount: number;
	comments: any[];
	onToggleLike(): void;
	onCommentClick(): void;
}

const PostFooter: React.SFC<IProps> = ({ liked, likesCount = 0, comments = [], onToggleLike, onCommentClick }) => (
	<Wrapper>
		<Likes active={liked}>
			<GoHeart onClick={onToggleLike} />
			<span>좋아요 {likesCount}개</span>
		</Likes>
		<Comments>
			<IoIosChatbubbles onClick={onCommentClick}/>
			<span>덧글 {comments.length}개</span>
		</Comments>
	</Wrapper>
);

export default PostFooter;