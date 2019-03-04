import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

interface IStyled {
	image: string;
}

const Wrapper = styled.div`
	${(props: IStyled) => {
		return css`
			position: relative;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			cursor: pointer;

			background: ${oc.cyan[5]};
			background-image: url(${props.image});
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			&:hover {
				filter: brightness(105%);
			}
		`;
	}}
`;

interface IProps {
	thumbnail: string;
	onClick(): void;
}

const UserThumbnail: React.SFC<IProps> = ({ thumbnail, onClick }) => (
	<Wrapper image={thumbnail} onClick={onClick} />
);

export default UserThumbnail;