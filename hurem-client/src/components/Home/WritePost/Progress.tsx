import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

interface IStyled {
	percentage: number;
}

const Wrapper = styled.div`
	${(props: IStyled) => {
		return css`
			background: ${oc.cyan[4]};
			height: 4px;
			position: absolute;
			left: 0px;
			bottom: 0px;
			${props.percentage !== 0 && `transition: all 1s ease-in-out`};
			width: ${`${props.percentage}%`};
		`;
	}}
`;

interface IState {
	percentage: number;
}

interface IProps {
	value: string;
	onPost(): void;
}

class Progress extends React.Component<IProps, IState> {
	state = {
		percentage: 0
	};

	timeoutId: any;

	public handlePost = () => {
		const { onPost } = this.props;
		onPost();
	}

	public componentWillReceiveProps(nextProps: IProps) {
		clearTimeout(this.timeoutId);

		this.setState({
			percentage: 0
		});
		
		if (nextProps.value === '') return;

		setTimeout(() => {
			this.setState({
				percentage: 100
			});
		}, 0);

		this.timeoutId = setTimeout(this.handlePost, 1000);
	}

	render() {
		const { percentage } = this.state;
		return (
			<Wrapper percentage={percentage} />
		);
	}
}

export default Progress;