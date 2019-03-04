import * as React from 'react';

let relayout = (): any => {
	console.log(new Error('relayout is not defined'));
};

export const setRelayoutHandler = (handler: any) => {
	relayout = handler;
};

export default function withRelayout(WrappedComponent: any) {
	return class extends React.Component {
		render() {
			return (
				<WrappedComponent onRelayout={relayout} { ...this.props}/> 
			);
		}
	};
}