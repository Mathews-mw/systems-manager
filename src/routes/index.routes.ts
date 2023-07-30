import { FastifyInstance } from 'fastify';
import { filesRoutes } from './files.routes';

export async function routes(app: FastifyInstance) {
	app.register(filesRoutes, { prefix: '/files' });
}
