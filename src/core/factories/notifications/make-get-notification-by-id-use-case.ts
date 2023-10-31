import { NotificationRepository } from '@/repositories/notifications-repository';
import { GetNotificationByIdUseCase } from '@/core/use-cases/notifications/get-notification-by-id-use-case';

export function makeGetNotificationByIdUseCase() {
	const notificationRepository = new NotificationRepository();
	const getNotificationByIdUseCase = new GetNotificationByIdUseCase(notificationRepository);

	return getNotificationByIdUseCase;
}
