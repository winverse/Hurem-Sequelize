import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { isEmail, isLength } from 'validator';
import { withRouter } from 'react-router-dom';
import { debounce } from 'lodash';

import { authActions } from 'store/modules/auth';
import { userActions } from 'store/modules/user';

import storage from 'lib/storage';
import { IRouterProps } from 'components/App';
import { State } from 'store/modules';
import {
	AuthContent,
	AuthButton,
	InputWithLabel,
	RightAlignedLink,
	AuthError
} from 'components/Auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type RegisterContainerProps = StateProps & DispatchProps & IRouterProps;

class RegisterContainer extends React.Component<RegisterContainerProps> {

	public setError = (message: string) => {
		const { AuthActions } = this.props;
		AuthActions.setError({
			form: 'register',
			message
		});
	}

	public validate = {
		email: (value: string) => {
			const { setError } = this;
			if (!isEmail(value)) {
				setError('잘못된 이메일 형식입니다.');
				return false;
			}
			return true;
		},
		username: (value: string) => {
			const { setError } = this;
			if (value.length < 1) {
				setError('닉네임을 입력해주세요');
				return false;
			}
			const displaynamePattern = /^[a-zA-Z0-9가-힣]{2,10}$/;
			if (!displaynamePattern.test(value)) {
				setError('닉네임은 2~10자의 한글/영문/숫자가 허용됩니다.');
				return false;
			}
			return true;
		},
		password: (value: string) => {
			const { setError } = this;
			if (!isLength(value, { min: 6 })) {
				setError('비밀번호를 6자 이상 입력하세요');
				return false;
			}
			return true;
		},
		passwordConfirm: (value: string) => {
			const { setError } = this;
			if (this.props.form.password !== value) {
				setError('비밀번호확인이 일치하지 않습니다.');
				return false;
			}
			setError('');
			return true;
		}
	};

	public checkEmailExists = debounce(async (email: string) => {
		const { AuthActions } = this.props;
		try {
			await AuthActions.checkEmailExists(email);
			if (this.props.exists.email) {
				this.setError('이미 존재하는 이메일 입니다.');
			} else {
				this.setError('');
			}
		} catch (e) {
			console.log(e);
		}
	}, 300);

	public checkUsenameExists = debounce(async (username: string) => {
		const { AuthActions } = this.props;
		try {
			await AuthActions.checkUsernameExists(username);
			if (this.props.exists.username) {
				this.setError('이미 존재하는 닉네임입니다.');
			} else {
				this.setError('');
			}
		} catch (e) {
			console.log(e);
		}
	}, 300);

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { AuthActions } = this.props;
		const { name, value } = e.target;
		AuthActions.changeInput({
			form: 'register',
			name,
			value
		});

		const validation = this.validate[name](value);
		if (name.indexOf('password') > -1 || !validation) return;

		const check = name === 'email' ? this.checkEmailExists : this.checkUsenameExists;
		check(value);
	}

	public handleRegister = async (e: React.MouseEvent<HTMLDivElement>) => {
		const { form, AuthActions, UserActions, error, history } = this.props;
		const { email, username, password, passwordConfirm } = form;

		const { validate } = this;

		if (error) return;
		if (!validate['email'](email) ||
				!validate['username'](username) ||
				!validate['password'](password) ||
				!validate['passwordConfirm'](passwordConfirm)) {
			return;
		}

		try {
			await AuthActions.localRegister({
				email,
				username,
				password
			});
			
			interface ILoggedInfo {
				username: string;
				thumbnail: string;
			}

			const loggedInfo = this.props.result;
			storage.set('loggedInfo', loggedInfo);
			UserActions.setLoggedInfo(loggedInfo as ILoggedInfo);
			UserActions.setValidated(true);
			history.push('/');
		} catch (e) {
			if (e.response.status === 409) {
				const { key } = e.response.data;
				const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 닉네임입니다';
				return this.setError(message);
			}

			this.setError('알 수 없는 에러가 발생했습니다.');
		}
	}

	public componentWillUnmount() {
		const { AuthActions } = this.props;
		AuthActions.initailizeForm('register');
	}

	public render() {
		const { handleRegister, handleChange } = this;
		const { form, error } = this.props;
		const { email, username, password, passwordConfirm } = form;
		return (
			<AuthContent title="회원가입">
				<InputWithLabel
					label="이메일"
					name="email"
					placeholder="이메일"
					type="text"
					value={email}
					onChange={handleChange}
				/>
				<InputWithLabel
					label="아이디"
					name="username"
					placeholder="아이디"
					type="text"
					value={username}
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
				<InputWithLabel
					label="비밀번호 확인"
					name="passwordConfirm"
					placeholder="비밀번호 확인"
					type="password"
					value={passwordConfirm}
					onChange={handleChange}
				/>
				{
					error && <AuthError>{error}</AuthError>
				}
				<AuthButton onClick={handleRegister}>회원가입</AuthButton>
				<RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
			</AuthContent>
		);
	}
}

const mapStateToProps = ({ auth }: State) => ({
	form: auth.register.form,
	error: auth.register.error,
	exists: auth.register.exists,
	result: auth.result
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	AuthActions: bindActionCreators(authActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(RegisterContainer));
