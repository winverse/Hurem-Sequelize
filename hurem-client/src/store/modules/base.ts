import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBLITY';
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY';

export const baseActions = {
	setHeaderVisibility: createAction<boolean, boolean>(SET_HEADER_VISIBILITY, visible => visible),
	setUserMeunVisibility: createAction<boolean, boolean>(SET_USER_MENU_VISIBILITY, visible => visible)
};

type SetHeaderVisibilityAction = ReturnType<typeof baseActions.setHeaderVisibility>;
type SetUserMenuVisibilityAction = ReturnType<typeof baseActions.setUserMeunVisibility>;

export interface IBaseState {
	header: {
		visible: boolean;
	};
	usermenu: {
		visibile: boolean;
	};
}

const initialState: IBaseState = {
	header: {
		visible: true
	},
	usermenu: {
		visibile: false
	}
};

const reducer = handleActions<IBaseState, any>({
	[SET_HEADER_VISIBILITY]: (state, action: SetHeaderVisibilityAction) => {
		return produce(state, draft => {
			draft.header.visible = action.payload!;
		});
	},
	[SET_USER_MENU_VISIBILITY]: (state, action: SetUserMenuVisibilityAction) => {
		return produce(state, draft => {
			draft.usermenu.visibile = action.payload!;
		});
	}
}, initialState);

export default reducer;