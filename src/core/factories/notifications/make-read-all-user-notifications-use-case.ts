import { NotificationRepository } from '@/repositories/notifications-repository';
import { ReadAllUserNotificationsUseCase } from '@/core/use-cases/notifications/read-all-user-notifications-use-case';

export function makeReadAllUserNotificationsUseCase() {
	const notificationRepository = new NotificationRepository();
	const readAllUserNotificationsUseCase = new ReadAllUserNotificationsUseCase(notificationRepository);

	return readAllUserNotificationsUseCase;
}
