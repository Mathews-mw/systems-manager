import { NotificationRepository } from '@/repositories/notifications-repository';
import { GetNotificationsUseCase } from '@/core/use-cases/notifications/get-notifications-use-case';

export function makeGetNotificationsUseCase() {
	const notificationRepository = new NotificationRepository();
	const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);

	return getNotificationsUseCase;
}
