import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as postsAPI from 'lib/api/posts';

const SHOW_PREFETECHED_POST = 'posts/SHOW_PREFETCHED_POST';
const RECEIVE_NEW_POST = 'posts/RECEIVE_NEW_POST';
const POSTID_SET = 'posts/POSTID_SET';
const TOGGLE_COMMENT = 'posts/TOGGLE_COMMENT';
const CHANGE_COMMENT_INPUT = 'posts/CHANGE_COMMENT_INPUT';

const LOAD_POST = 'posts/LOAD_POST';
const PREFETCH_POST = 'posts/PREFETCH_POST';
const LIKE_POST = 'posts/LIKE_POST';
const UNLIKE_POST = 'posts/UNLIKE_POST';
const COMMENT = 'posts/COMMENT';

interface IActionFace {
	postId?: string;
	value?: string;
}

export const postsActions = {
	showPrefetchedPost: createAction(SHOW_PREFETECHED_POST),
	toggleComment: createAction<string, string>(TOGGLE_COMMENT, postId => postId),
	changeCommentInput: createAction(CHANGE_COMMENT_INPUT, ({ postId, value }: IActionFace) => ({ postId, value })),
	postIdSet: createAction(POSTID_SET, (postId: string) => postId),

	loadPost: createAction<any, any>(LOAD_POST, postsAPI.list),
	prefetchPost: createAction<any, any>(PREFETCH_POST, postsAPI.next),
	likePost: createAction<any, any, any>(LIKE_POST, postsAPI.like, (payload) => payload),
	unlikePost: createAction<any, any, any>(UNLIKE_POST, postsAPI.unlike, (payload) => payload),
	comment: createAction(COMMENT, postsAPI.comment, ({ postId }) => postId)
};

type ShowPrefetchedPostAction = ReturnType<typeof postsActions.showPrefetchedPost>;
type PostIdSetAction = ReturnType<typeof postsActions.postIdSet>;
type ToggleCommentAction = ReturnType<typeof postsActions.toggleComment>;
type ChangeCommentInputAction = ReturnType<typeof postsActions.changeCommentInput>;

type LoasPostAction = ReturnType<typeof postsActions.loadPost>;
type PrefetchePostAction = ReturnType<typeof postsActions.prefetchPost>;
type LikePostAction = ReturnType<typeof postsActions.likePost>;
type UnlikePostAction = ReturnType<typeof postsActions.unlikePost>;
type CommentAction = ReturnType<typeof postsActions.comment>;

export interface IPostState {
	next: string;
	data: any[];
	nextData: any[];
	comments: {};
}

const initialState: IPostState = {
	next: '',
	data: [],
	nextData: [],
	comments: {}
};

const reducer = handleActions<IPostState, any>({
	[SHOW_PREFETECHED_POST]: (state, action: ShowPrefetchedPostAction) => {
		return produce(state, draft => {
			const nextData = draft.nextData;
			draft.data = draft.data.concat(nextData);
			draft.nextData = [];
		});
	},
	[RECEIVE_NEW_POST]: (state, action: any) => {
		return produce(state, draft => {
			draft.data.unshift(action.payload);
		});
	},
	[POSTID_SET]: (state, action: PostIdSetAction) => {
		return produce(state, draft => {
			draft.comments[action.payload!] = {
				visible: false,
				value: ''
			};
		});
	},
	[TOGGLE_COMMENT]: (state, action: ToggleCommentAction) => {
		return produce(state, draft => {
			const comment = draft.comments[action.payload!];
			if (comment) {
				draft.comments[action.payload!].visible = !draft.comments[action.payload!].visible;
			} else {
				draft.comments[action.payload!].visible = false;
				draft.comments[action.payload!].value = '';
			}
		});
	},
	[CHANGE_COMMENT_INPUT]: (state, action: ChangeCommentInputAction) => {
		return produce(state, draft => {
			const { postId, value } = action.payload!;
			draft.comments[postId!].value = value;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: LOAD_POST,
		onSuccess: (state: IPostState, action: LoasPostAction) => {
			return produce(state, draft => {
				const { data: { next, data } } = action.payload;
				draft.next = next;
				draft.data = data;
			});
		}
	},
	{
		type: PREFETCH_POST,
		onSuccess: (state: IPostState, action: PrefetchePostAction) => {
			return produce(state, draft => {
				const { next, data } = action.payload.data;
				draft.next = next;
				draft.nextData = data;
			});
		}
	},
	{
		type: LIKE_POST,
		onPending: (state: IPostState, action: LikePostAction) => {
			const index = state.data.findIndex(post => post._id === action.meta);
			return produce(state, draft => {
				const nowCount: number = draft.data[index].likesCount;
				draft.data[index].liked = true;
				draft.data[index].likesCount = nowCount + 1;
			});
		},
		onSuccess: (state: IPostState, action: LikePostAction) => {
			const index = state.data.findIndex(post => post._id === action.meta);
			return produce(state, draft => {
				draft.data[index].likesCount = action.payload!.data.likesCount;
			});
		}
	},
	{
		type: UNLIKE_POST,
		onPending: (state: IPostState, action: UnlikePostAction) => {
			const index = state.data.findIndex(post => post._id === action.meta);
			return produce(state, draft => {
				const nowCount: number = draft.data[index].likesCount;
				draft.data[index].liked = false;
				draft.data[index].likesCount = nowCount - 1;
			});
		},
		onSuccess: (state: IPostState, action: UnlikePostAction) => {
			const index = state.data.findIndex(post => post._id === action.meta);

			return produce(state, draft => {
				draft.data[index].likesCount = action.payload.data.likesCount;
			});
		}
	},
	{
		type: COMMENT,
		onPending: (state: IPostState, action: CommentAction) => {
			return produce(state, draft => {
				draft.comments[action.meta].value = '';
			});
		},
		onSuccess: (state: IPostState, action: CommentAction) => {
			const index = state.data.findIndex(post => post._id === action.meta);
			return produce(state, draft => {
				const { data } = (action.payload as any); 
				draft.data[index].comments = data;
			});
		}
	}
]);