import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';

import { shadow, media } from 'style/styleUtils';

const Positioner = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	${shadow(0)};
	z-index: 10;
`;

const WhiteBackground = styled.div`
	background: white;
	display: flex;
	justify-content: center;
	height: auto;
`;

const HeaderContents = styled.div`
	position: relative;
	width: 1200px;
	height: 55px;
	display: flex;
	flex-direction: row;
	align-items: center;

	padding-right: 1rem;
	padding-left: 1rem;

	@media ${media.laptopM} {
		width: 992px;
	}

	@media ${media.tablet} {
		width: 100%;
	}
`;

const Logo = styled(Link)`
	font-size: 1.4rem;
	letter-spacing: 2px;
	color: ${oc.teal[7]};
	font-family: 'Rajdhani';
	font-weight: 800;
	letter-spacing: -2px;
`;

const Spacer = styled.div`
	flex-grow: 1;
`;

const GradientBoarder = styled.div`
	height: 3px;
	background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

interface IProps {
	children: React.ReactNode;
}

const Header: React.SFC<IProps> = ({ children }) => (
	<Positioner>
		<WhiteBackground>
			<HeaderContents>
				<Logo to="/">HUREM</Logo>
				<Spacer />
				{children}
			</HeaderContents>
		</WhiteBackground>
		<GradientBoarder />
	</Positioner>
);

export default Header;