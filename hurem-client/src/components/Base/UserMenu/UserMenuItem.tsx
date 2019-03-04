import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
	padding-left: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	color: ${oc.gray[7]};
	cursor: pointer;

	&:hover {
		background: ${oc.gray[7]};
		font-weight: 500;
		color: ${oc.cyan[6]};
	}

	& + & {
		border-top: 1px solid ${oc.gray[3]};
	}
`;

interface IProps {
	children: React.ReactNode;
	onClick?(): void;
}

const UserMenuItem: React.SFC<IProps> = ({ children, onClick }) => (
	<Wrapper onClick={onClick}>
		{children}
	</Wrapper>
);

export default UserMenuItem;