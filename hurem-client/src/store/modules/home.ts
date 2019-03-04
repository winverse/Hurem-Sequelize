import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as postsAPI from 'lib/api/posts';

const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';
const WRITE_POST = 'home/WRITE_POST';

export const homeActions = {
	changeWritePostInput: createAction<string, string>(CHANGE_WRITE_POST_INPUT, value => value),

	writePost: createAction<any, string>(WRITE_POST, postsAPI.write)
};

type ChangeWritePostInputAction = ReturnType<typeof homeActions.changeWritePostInput>;
type WritePostAction = ReturnType<typeof homeActions.writePost>;

export interface IHomeState {
	writePost: {
		value: string;
	};
}

const initialState: IHomeState = {
	writePost: {
		value: ''
	}
};
const reducer = handleActions<IHomeState, any>({
	[CHANGE_WRITE_POST_INPUT]: (state, action: ChangeWritePostInputAction) => {
		return produce(state, draft => {
			draft.writePost.value = action.payload!;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: WRITE_POST,
		onPending: (state: IHomeState, action: WritePostAction) => {
			return produce(state, draft => {
				draft.writePost.value = '';
			});
		}
	}
]);