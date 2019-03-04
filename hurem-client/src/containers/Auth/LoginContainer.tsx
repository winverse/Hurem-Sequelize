import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import * as queryString from 'query-string';

import { authActions } from 'store/modules/auth';
import { userActions } from 'store/modules/user';

import storage from 'lib/storage';
import { IRouterProps } from 'components/App';
import { State } from 'store/modules';
import {
	AuthContent,
	InputWithLabel,
	AuthButton,
	RightAlignedLink,
	AuthError
} from 'components/Auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type LoginContainerProps = StateProps & DispatchProps & IRouterProps;

class LoginContainer extends React.Component<LoginContainerProps> {

	public setError = (message: string) => {
		const { AuthActions } = this.props;
		AuthActions.setError({
			form: 'login',
			message
		});
		return false;
	}

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { AuthActions } = this.props;
		const { name, value } = e.target;

		AuthActions.changeInput({
			form: 'login',
			name,
			value
		});
	}

	public handleLocalLogin = async () => {
		const { form, AuthActions, UserActions, history } = this.props;
		const { email, password } = form;

		interface ILoggedInfo {
			username: string;
			thumbnail: string;
		}

		try {
			await AuthActions.localLogin({ email, password });
			const loggedInfo = this.props.result;

			UserActions.setLoggedInfo(loggedInfo as ILoggedInfo);
			storage.set('loggedInfo', loggedInfo);
			history.push('/');
		} catch (e) {
			console.log(e);
			this.setError('잘못된 계정정보입니다.');
		}
	}

	public componentDidMount() {
		const { location } = this.props;
		const query = queryString.parse(location.search);
		if (query.expired !== undefined) {
			this.setError('세션이 만료되었습니다. 다시 로그인해주세요');
		}
	}

	public componentWillUnmount() {
		const { AuthActions } = this.props;
		AuthActions.initailizeForm('login');
	}

	public render() {
		const { handleLocalLogin, handleChange } = this;
		const { form, error } = this.props;
		const { email, password } = form;
		return (
			<AuthContent title="로그인">
				<InputWithLabel
					label="이메일"
					name="email"
					placeholder="이메일"
					type="text"
					value={email}
					onChange={handleChange}
				/>
				<InputWithLabel
					label="비밀번호"
					name="password"
					placeholder="비밀번호"
					type="password"
					value={password}
					onChange={handleChange}
				/>
				{
					error && <AuthError>{error}</AuthError>
				}
				<AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
				<RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
			</AuthContent>
		);
	}
}

const mapStateToProps = ({ auth }: State) => ({
	form: auth.login.form,
	result: auth.result,
	error: auth.login.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	AuthActions: bindActionCreators(authActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LoginContainer));
