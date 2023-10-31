import { FastifyInstance } from 'fastify';

import { getStoresController } from '@/core/controller/stores/get-stores-controller';
import { createStoreController } from '@/core/controller/stores/create-store-controller';
import { createManyStoresController } from '@/core/controller/stores/create-many-stores-controller';
import { watchStoresDataBaseController } from '@/core/controller/stores/watch-stores-database-controller';

export async function storesRoutes(app: FastifyInstance) {
	app.get('/', getStoresController);

	app.post('/', createStoreController);
	app.post('/create-many', createManyStoresController);

	app.get('/watch', watchStoresDataBaseController);
}
