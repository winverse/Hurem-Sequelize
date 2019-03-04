/* tslint:disable */
import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import base, { IBaseState } from './base';
import auth, { IAuthState } from './auth';
import user, { IUserState } from './user';
import home, { IHomeState } from './home';
import posts, { IPostState } from './posts';
import userPage, { IUserPageState } from './userPage';

export default combineReducers({
	base,
	auth,
	user,
	home,
	posts,
	userPage,
	pender
});

export interface State {
	base: IBaseState;
	auth: IAuthState;
	user: IUserState;
	home: IHomeState;
	posts: IPostState;
	userPage: IUserPageState;
	pender: {
		pending: any;
		success: any;
		failure: any;
	}
}