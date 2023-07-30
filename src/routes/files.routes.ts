import { FastifyInstance } from 'fastify';

export async function filesRoutes(app: FastifyInstance) {
	app.get('/', () => {});
}
