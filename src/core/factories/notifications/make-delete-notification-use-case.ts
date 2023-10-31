import { NotificationRepository } from '@/repositories/notifications-repository';
import { DeleteNotificationUseCase } from '@/core/use-cases/notifications/delete-notification-use-case';

export function makeDeleteNotificationUseCase() {
	const notificationRepository = new NotificationRepository();
	const deleteNotificationUseCase = new DeleteNotificationUseCase(notificationRepository);

	return deleteNotificationUseCase;
}
