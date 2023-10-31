import { FastifyInstance } from 'fastify';

import { getApplicationsController } from '@/core/controller/applications/get-applications-controller';
import { deleteApplicationController } from '@/core/controller/applications/delete-application-controlle';
import { createApplicationController } from '@/core/controller/applications/create-application-controller';
import { updateApplicationController } from '@/core/controller/applications/update-application-controller';
import { getApplicationByIdController } from '@/core/controller/applications/get-application-by-id-controller';

export async function applicationsRoutes(app: FastifyInstance) {
	app.get('/', getApplicationsController);
	app.get('/:id', getApplicationByIdController);
	app.post('/create', createApplicationController);
	app.put('/update/:id', updateApplicationController);
	app.delete('/delete/:id', deleteApplicationController);
}
