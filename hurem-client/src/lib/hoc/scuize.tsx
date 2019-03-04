import * as React from 'react';

export default (FunctionalComponent: any, shouldComponentUpdate: any) => class extends React.Component {
	shouldComponentUpdate(nextProps: any, nextState: any) {
		return shouldComponentUpdate.bind(this)(nextProps, nextState);
	}

	render() {
		return (
			<FunctionalComponent {...this.props}/>
		);
	}
};