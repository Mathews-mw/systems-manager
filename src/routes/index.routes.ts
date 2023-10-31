import { ftpRoutes } from './ftp.routes';
import { FastifyInstance } from 'fastify';
import { storesRoutes } from './stores.routes';
import { appVersionsRoutes } from './app-versions.routes';
import { applicationsRoutes } from './applications.routes';
import { notificationsRoutes } from './notifications.routes';
import { analyticsRoutes } from './analytics.routes';
import { remotePathsRoutes } from './remote-paths.routes';

export async function routes(app: FastifyInstance) {
	app.register(ftpRoutes, { prefix: '/ftp' });
	app.register(storesRoutes, { prefix: '/stores' });
	app.register(appVersionsRoutes, { prefix: '/app-versions' });
	app.register(remotePathsRoutes, { prefix: '/remote-paths' });
	app.register(applicationsRoutes, { prefix: '/applications' });

	app.register(analyticsRoutes, { prefix: '/analytics' });
	app.register(notificationsRoutes, { prefix: '/notifications' });
}
