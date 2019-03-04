import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as AuthAPI from 'lib/api/auth';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';

const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOGOUT = 'auth/LOGOUT';

interface Info {
	form: string;
	name: string;
	value: string;
}

interface IMessage {
	form: string;
	message: string;
}

export const authActions = {
	initailizeForm: createAction<any, string>(INITIALIZE_FORM, form => form),
	changeInput: createAction<Info, Info>(CHANGE_INPUT, ({ form, name, value }) => ({ form, name, value })),
	setError: createAction<IMessage, IMessage>(SET_ERROR, message => message),

	checkEmailExists: createAction<any, any>(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists),
	checkUsernameExists: createAction<any, any>(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists),
	localRegister: createAction<any, any>(LOCAL_REGISTER, AuthAPI.localRegister),
	localLogin: createAction<any, any>(LOCAL_LOGIN, AuthAPI.localLogin),
	logout: createAction<any, any>(LOGOUT, AuthAPI.logout)
};

type InitializeFormAction = ReturnType<typeof authActions.initailizeForm>;
type ChangeInputAction = ReturnType<typeof authActions.changeInput>;
type SetErrorAction = ReturnType<typeof authActions.setError>;

type CheckEmailExistsAction = ReturnType<typeof authActions.checkEmailExists>;
type CheckUsernameExistsAction = ReturnType<typeof authActions.checkUsernameExists>;
type LocalRegisterAction = ReturnType<typeof authActions.localRegister>;
type LocalLoginAction = ReturnType<typeof authActions.localLogin>;
type LogoutAction = ReturnType<typeof authActions.logout>;

export interface IAuthState {
	register: {
		form: {
			email: string;
			username: string;
			password: string;
			passwordConfirm: string;
		};
		exists: {
			email: boolean;
			username: boolean;
		};
		error: string;
	};
	login: {
		form: {
			email: string;
			password: string;
		};
		error: string | null;
	};
	result: {};
}

const initialState: IAuthState = {
	register: {
		form: {
			email: '',
			username: '',
			password: '',
			passwordConfirm: ''
		},
		exists: {
			email: false,
			username: false
		},
		error: ''
	},
	login: {
		form: {
			email: '',
			password: ''
		},
		error: ''
	},
	result: {}
};

const reducer = handleActions<IAuthState, any>({
	[INITIALIZE_FORM]: (state, action: InitializeFormAction) => {
		return produce(state, draft => {
			const form = action.payload!;
			draft[form].form = initialState[form];
		});
	},
	[CHANGE_INPUT]: (state, action: ChangeInputAction) => {
		return produce(state, draft => {
			const { form, name, value } = action.payload!;
			draft[form].form[name] = value;
		});
	},
	[SET_ERROR]: (state, action: SetErrorAction) => {
		return produce(state, draft => {
			const { form, message } = action.payload!;
			draft[form].error = message;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: CHECK_EMAIL_EXISTS,
		onSuccess: (state: IAuthState, action: CheckEmailExistsAction) => {
			return produce(state, draft => {
				const { data } = action.payload!;
				draft.register.exists.email = data.exists;
			});
		}
	},
	{
		type: CHECK_USERNAME_EXISTS,
		onSuccess: (state: IAuthState, action: CheckUsernameExistsAction) => {
			return produce(state, draft => {
				const { data } = action.payload!;
				draft.register.exists.username = data.exists;
			});
		}
	},
	{
		type: LOCAL_REGISTER,
		onSuccess: (state: IAuthState, action: LocalRegisterAction) => {
			return produce(state, draft => {
				const { data } = action.payload!;
				draft.result = data;
			});
		}
	},
	{
		type: LOCAL_LOGIN,
		onSuccess: (state: IAuthState, action: LocalLoginAction) => {
			return produce(state, draft => {
				const { data } = action.payload!;
				draft.result = data;
			});
		}
	},
	{
		type: LOGOUT,
		onSuccess: (state: IAuthState, action: LogoutAction) => {
			return produce(state, draft => {
				draft.result = initialState.result;
			});
		}
	}
]);