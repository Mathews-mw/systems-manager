import multer from 'fastify-multer';
import { FastifyInstance } from 'fastify';

import uploadConfig from '@/config/upload';
import { uploadAppController } from '@/core/controller/app-versions/upload-app-controller';
import { getAppVersionsController } from '@/core/controller/app-versions/get-app-versions-controller';
import { deleteAppVersionController } from '@/core/controller/app-versions/delete-app-version-controller';
import { updateAppVersionController } from '@/core/controller/app-versions/update-app-version-controller';
import { getLatestAppVersionsController } from '@/core/controller/app-versions/get-latest-app-versions-controller';

const uploadFile = multer(uploadConfig);

export async function appVersionsRoutes(app: FastifyInstance) {
	app.get('/app-versions', getAppVersionsController);
	app.get('/latest-versions', getLatestAppVersionsController);

	app.post('/upload', { preHandler: uploadFile.single('app_file') }, uploadAppController);

	app.put('/update/:id', updateAppVersionController);
	app.delete('/delete/:id', deleteAppVersionController);
}
