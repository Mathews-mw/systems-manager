import { NotificationRepository } from '@/repositories/notifications-repository';
import { ReadNotificationUseCase } from '@/core/use-cases/notifications/read-notification-use-case';

export function makeReadNotificationUseCase() {
	const notificationRepository = new NotificationRepository();
	const readNotificationUseCase = new ReadNotificationUseCase(notificationRepository);

	return readNotificationUseCase;
}
