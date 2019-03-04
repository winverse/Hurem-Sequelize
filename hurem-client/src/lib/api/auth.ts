import axios from 'axios';

export const checkEmailExists = (email: string) => axios.get(`/api/auth/exists/email/${email}`);

export const checkUsernameExists = (username: string) => {
	return axios.get(`/api/auth/exists/username/${username}`);
};

export const localRegister = ({ ...rest }) => {
	return axios.post('/api/auth/register/local', { ...rest });
};

export const localLogin = ({ ...rest }) => {
	return axios.post('/api/auth/login/local', { ...rest });
};

export const checkStatus = () => axios.get(`/api/auth/check`);

export const logout = () => axios.post(`/api/auth/logout`);