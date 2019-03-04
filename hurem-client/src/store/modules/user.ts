import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as AuthAPI from 'lib/api/auth';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';
const CHECK_STATUS = 'user/CHECK_STATUS';

interface Info {
	username: string;
	thumbnail: string;
}

export const userActions = {
	setLoggedInfo: createAction<Info, Info>(SET_LOGGED_INFO, ({ username, thumbnail }) => ({ username, thumbnail })),
	setValidated: createAction<boolean>(SET_VALIDATED),

	logout: createAction<any>(LOGOUT, AuthAPI.logout),
	checkStatus: createAction<any>(CHECK_STATUS, AuthAPI.checkStatus)
};

type SetLoggedInfoAction = ReturnType<typeof userActions.setLoggedInfo>;
type SetValidatedAction = ReturnType<typeof userActions.setValidated>;
type LogoutAction = ReturnType<typeof userActions.logout>;
type CheckStatusAction = ReturnType<typeof userActions.checkStatus>;

export interface IUserState {
	loggedInfo: {
		username: string;
		thumbnail: string;
	};
	logged: boolean;
	validated: boolean;
}

const initialState: IUserState = {
	loggedInfo: {
		username: '',
		thumbnail: ''
	},
	logged: false,
	validated: false
};
const reducer = handleActions<IUserState, any>({
	[SET_LOGGED_INFO]: (state, action: SetLoggedInfoAction) => {
		return produce(state, draft => {
			draft.loggedInfo = action.payload!;
			draft.logged = true;
		});
	},
	[SET_VALIDATED]: (state, action: SetValidatedAction) => {
		return produce(state, draft => {
			draft.validated = action.payload!;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: CHECK_STATUS,
		onSuccess: (state: IUserState, action: CheckStatusAction) => {
			return produce(state, draft => {
				const { data } = action.payload!;
				draft.loggedInfo = data;
				draft.validated = true;
			});
		},
		onFailure: (state: IUserState, action: CheckStatusAction) => {
			return initialState;
		}
	},
	{
		type: LOGOUT,
		onSuccess: (state: IUserState, action: LogoutAction) => {
			return produce(state, draft => {
				draft.logged = false;
			});
		}
	}
]);