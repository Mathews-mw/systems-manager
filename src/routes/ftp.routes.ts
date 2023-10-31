import { FastifyInstance } from 'fastify';
import { transferManagerController } from '@/core/controller/transfer/transfer-manager-controller';
import { transferLaunchersController } from '@/core/controller/transfer/transfer-launchers-controller';

export async function ftpRoutes(app: FastifyInstance) {
	app.post('/', transferManagerController);
	app.post('/launchers', transferLaunchersController);
}
