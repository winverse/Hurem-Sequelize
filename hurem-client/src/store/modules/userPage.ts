import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as UserAPI from 'lib/api/users';

const GET_USER_INFO = 'userPage/GET_USER_INFO';

export const userPageActions = {
	getUserInfo: createAction(GET_USER_INFO, UserAPI.getUserInfo)
};

type GetUserInfoAction = ReturnType<typeof userPageActions.getUserInfo>;

export interface IUserPageState {
	info: {
		profile: {
			thumbnail: string | null;
			username: string | null;
		};

		thoughtCount: number | null;
	};
}

const initialState: IUserPageState = {
	info: {
		profile: {
			thumbnail: null,
			username: null
		},
		thoughtCount: null
	}
};

const reducer = handleActions<IUserPageState, any>({

}, initialState);

export default applyPenders(reducer, [
	{
		type: GET_USER_INFO,
		onSuccess: (state: IUserPageState, action: GetUserInfoAction) => {
			return produce(state, draft => {
				const { data } = (action.payload as any);
				draft.info = data;
			});
		}
	}
]);