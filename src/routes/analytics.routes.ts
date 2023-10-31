import { FastifyInstance } from 'fastify';

import { getAmountUpdateStoresController } from '@/core/controller/analytics/get-amount-update-stores-controller';
import { getApplicationsanalitycsController } from '@/core/controller/analytics/get-applications-analitycs-controller';

export async function analyticsRoutes(app: FastifyInstance) {
	app.get('/update-stores', getAmountUpdateStoresController);
	app.get('/applications', getApplicationsanalitycsController);
}
