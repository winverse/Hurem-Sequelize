import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';

import { shadow } from 'style/styleUtils';

const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const ShadowedBox = styled.div`
	width: 500px;
	${shadow(2)};
`;

const LogoWrapper = styled.div`
	background: ${oc.teal[7]};
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Logo = styled(Link)`
	color: white;
	font-family: 'Rajdhani';
	font-size: 2.4rem;
	letter-spacing: 5px;
`;

const Contents = styled.div`
	background: white;
	padding: 2rem;
	height: auto;
`;

interface IProps {
	children: React.ReactNode;
}

const AuthWrapper: React.SFC<IProps> = ({ children }) => (
	<Wrapper>
		<ShadowedBox>
			<LogoWrapper>
				<Logo to="/">HUREM</Logo>
			</LogoWrapper>
			<Contents>
				{children}
			</Contents>
		</ShadowedBox>
	</Wrapper>
);

export default AuthWrapper;