import axios from 'axios';

interface IPostFace {
	postId: string;
	text: string;
}

export const write = (content: string) => {
	return axios.post('/api/posts', { content });
};

export const list = (username?: string) => {
	return axios.get(`/api/posts${(username ? `?username=${username}` : ``)}`);
};

export const next = (url: string) => {
	return axios.get(url);
};

export const like = (postId: string) => {
	return axios.post(`/api/posts/${postId}/likes`);
};

export const unlike = (postId: string) => {
	return axios.delete(`/api/posts/${postId}/likes`);
};

export const comment = ({ postId, text }: IPostFace) => {
	return axios.post(`/api/posts/${postId}/comments`, { text });
};