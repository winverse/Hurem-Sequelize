import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div``;

const Title = styled.div`
	font-size: 1.5rem;
	font-weight: 500;
	color: ${oc.gray[8]};
	margin-bottom: 1rem;
`;

interface IProps {
	title: string;
	children: React.ReactNode;
}

const AuthContent: React.SFC<IProps> = ({ children, title }) => (
	<Wrapper>
		<Title>{title}</Title>
		{children}
	</Wrapper>
);

export default AuthContent;
