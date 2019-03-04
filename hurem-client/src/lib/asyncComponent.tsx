import * as React from 'react';

export default function asyncComponent(getComponent: any) {
	console.log(getComponent);
	return class AsyncComponent extends React.Component<any, any> {
		static setComponent = null;
		state = { Component: AsyncComponent.setComponent };

		constructor(props: any) {
			super(props);
			if (AsyncComponent.setComponent) return;
			getComponent().then(({ default: Component }: any) => {
				AsyncComponent.setComponent = Component;
				this.setState({ Component });
			});
		}

		public render() {
			const { Component } = this.state;
			return Component ? React.createElement(Component, {} as any) : null;
		}
	};
}