import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const CommentWrapper = styled.div`
	font-size: 0.9rem;
	& + & {
		margin-top: 0.25rem;
	}
`;

const User = styled(Link)`
	font-weight: 500;
	margin-right: 0.25rem;
	color: ${oc.gray[9]};
	text-decoration: none;
`;

const Text = styled.span`	
	color: ${oc.gray[6]};
`;

interface IProps {
	username: string;
	text: string;
}

const Comment: React.SFC<IProps> = ({ username, text }) => (
	<CommentWrapper>
		<User to={`@${username}`}>{username}</User>
		<Text>{text}</Text>
	</CommentWrapper>
);

export default Comment;