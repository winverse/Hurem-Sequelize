import * as React from 'react';
import styled from 'styled-components';
// import oc from 'open-color';

const Wrapper = styled.div`
	position: absolute;
	right: -40px;
	top: 55px;
`;

const MenuWrapper = styled.div`
	background: white;
	min-width: 140px;
	box-shadow: 0 1px 3px rgba(0,0,0, 0.12), 0, 1px, 2px rgba(0,0,0, 0.24);
	user-select: none;
`;

interface IProps {
	children: React.ReactNode;
}

const UserMenu: React.SFC<IProps> = ({ children }) => (
	<Wrapper>
		<MenuWrapper>
			{children}
		</MenuWrapper>
	</Wrapper>
);

export default UserMenu;