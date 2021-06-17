const isProd = process.env.NODE_ENV === 'production';

export const API_URL = isProd
	? 'https://fishkee.herokuapp.com/api'
	: 'http://localhost:4000/api';
