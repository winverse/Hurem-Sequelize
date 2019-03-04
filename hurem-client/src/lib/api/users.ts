import axios from 'axios';

export const getUserInfo = (username: string) => {
	return axios.get(`/api/users/${username}`);
};
