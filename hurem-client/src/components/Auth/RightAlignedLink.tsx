import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';

const Wrapper = styled.div`
	margin-top: 1rem;
	text-align: right;
`;

const StyledLink = styled(Link)`
	color: ${oc.gray[6]};
	&:hover {
		color: ${oc.gray[7]};
	}
`;
interface IProps {
	to: string;
	children: React.ReactNode;
}

const RightAlignedLink: React.SFC<IProps> = ({ to, children }) => (
	<Wrapper>
		<StyledLink to={to}>{children}</StyledLink>
	</Wrapper>
);

export default RightAlignedLink;