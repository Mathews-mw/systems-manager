import axios from 'axios';
import { env } from '@/env';

const sapApi = axios.create({
	baseURL: 'http://sapdev.bemol.local:8000/sap/gensis_api',
	timeout: 30000,
	auth: {
		username: env.USERNAME,
		password: env.PASSWORD,
	},
});

export { sapApi };
