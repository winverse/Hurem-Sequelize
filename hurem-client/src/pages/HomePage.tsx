import * as React from 'react';

import PageWrapper from 'components/Base/PageWrapper';

import {
	WritePostContainer
} from 'containers/Home';

import {
	PostListContainer
} from 'containers/Shared/PostList';

const HomePage: React.SFC = () => (
	<PageWrapper>
		<WritePostContainer />
		<PostListContainer />
	</PageWrapper>
);

export default HomePage;