import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

interface IStyled {
	image: string | null;
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const Thumbnail = styled.div`
	${(props: IStyled) => {
		return css `
			background-image: url(${props.image});
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			width: 100px;
			height: 100px;
			border-radius: 50%;
		`;
	}}
`;

const Username = styled.div`
	margin-top: 0.5rem;
	font-size: 1.5rem;
	font-weight: 800;
	color: ${oc.gray[8]};
`;

const Count = styled.div`
	margin-top: 0.25rem;
	font-weight: 300;
	color: ${oc.gray[6]};
	b{
		font-weight: 500;
	}
`;

interface IProps {
	image?: string | null;
	username: string | null;
	thoughtCount: number | null;

}

const UserHead: React.SFC<IProps> = ({ image = `/static/images/default_thumbnail.png`, username = 'username', thoughtCount = 150 }) => (
	<Wrapper>
		<Thumbnail image={image} />
		<Username>{username}</Username>
		<Count>흐른 생각 <b>{thoughtCount}</b></Count>
	</Wrapper>
);

export default UserHead;