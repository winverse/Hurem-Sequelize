import * as React from 'react';
import styled, { css } from 'styled-components';

import { media } from 'style/styleUtils';

interface IStyled {
	responsive: any;
}

const Wrapper = styled.div`
	${(props: IStyled) => {
		return css`
			margin-top: 58px;
			padding: 1rem;
			width: 1200px;
			margin-left: auto;
			margin-right: auto;

			@media ${media.laptopM} {
				width: 992px;
			}

			@media ${media.laptopS} {
				width: 100%;
			}
		`;
	}};
`;

interface IProps {
	responsive?: any;
	children: React.ReactNode;
}

const PageWrapper: React.SFC<IProps> = ({ responsive, children }) => (
	<Wrapper responsive={responsive}>
		{children}
	</Wrapper>
);

export default PageWrapper;