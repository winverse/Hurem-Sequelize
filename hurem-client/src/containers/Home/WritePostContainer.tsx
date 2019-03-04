import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import { homeActions } from 'store/modules/home';

import { State } from 'store/modules';
import {
	WritePost
} from 'components/Home/WritePost';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type WritePostContainerProps = StateProps & DispatchProps;

class WritePostContainer extends React.Component<WritePostContainerProps> {

	textElement: any;
	
	public refHandlers = {
		text: (ref: React.RefObject<HTMLElement>) => this.textElement = ref
	};

	public message = (message: string) => {
		return <div style={{ fontSize: '1rem' }}>{message}</div>;
	}

	public handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		const { HomeActions } = this.props;
		HomeActions.changeWritePostInput(value);
	}

	public handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
	}

	public handlePost = async () => {
		this.textElement.blur();
		setTimeout(() => {
			this.textElement.focus();
		}, 100);

		const { HomeActions, value } = this.props;

		if (value.length < 5) {
			HomeActions.changeWritePostInput('');
			return toast(this.message('너무 짧습니다, 5자 이상 입력해주세요'), { type: 'error' });
		}

		if (value.length > 1000) {
			HomeActions.changeWritePostInput('');
			return toast(this.message('최대 1000자까지 입력 할 수 있습니다.'), { type: 'error' });
		}

		try {
			await HomeActions.writePost(value);
			toast(this.message('생각이 작성되었습니다.'), { type: 'success' });
		} catch (e) {
			if (e.response.status === 401) {
				toast(this.message('로그인을 해주세요!'), { type: 'error' });
				return false;
			}
			toast(this.message('오류가 발생했습니다.'), { type: 'error' });
			console.log(e);
		}
		return true;
	}

	public render() {
		const { handleChange, handlePost, handlePaste, } = this;
		const { value } = this.props;
		
		return (
			<WritePost
				value={value}
				onChange={handleChange}
				onPost={handlePost}
				onPaste={handlePaste}
				inputRef={this.refHandlers.text}
			/>
		);
	}
}

const mapStateToProps = ({ home }: State) => ({
	value: home.writePost.value
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	HomeActions: bindActionCreators(homeActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WritePostContainer);