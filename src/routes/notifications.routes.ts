import { FastifyInstance } from 'fastify';

import { getNotificationsController } from '@/core/controller/notifications/get-notifications-controller';
import { readNotificationController } from '@/core/controller/notifications/read-notification-controller';
import { deleteNotificationController } from '@/core/controller/notifications/delete-notification-controller';
import { getNotificationByIdController } from '@/core/controller/notifications/get-notification-by-id-controller';
import { readAllUserNotificationController } from '@/core/controller/notifications/read-all-user-notifications-controller';

export async function notificationsRoutes(app: FastifyInstance) {
	app.get('/', getNotificationsController);
	app.get('/:notificationId', getNotificationByIdController);

	app.post('/read', readNotificationController);
	app.post('/read/all', readAllUserNotificationController);

	app.delete('/delete/:notificationId', deleteNotificationController);
}
