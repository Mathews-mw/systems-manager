import { FastifyInstance } from 'fastify';

import { createRemotePathController } from '@/core/controller/remote-paths/create-remote-paths-controller';

export async function remotePathsRoutes(app: FastifyInstance) {
	app.post('/create', createRemotePathController);
}
