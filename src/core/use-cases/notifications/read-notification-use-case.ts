import { Notification } from '@prisma/client';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { INotificaticationsRepository } from '../../../repositories/implementations/INotificationsRepository';

export interface IReadNotificationUseCaseRequest {
	recipientId: string;
	notificationId: string;
}

interface IReadNotificationUseCaseResponse {
	notification: Notification;
}

export class ReadNotificationUseCase {
	constructor(private notificationRepository: INotificaticationsRepository) {}

	async execute({ notificationId, recipientId }: IReadNotificationUseCaseRequest): Promise<IReadNotificationUseCaseResponse> {
		const notification = await this.notificationRepository.findById(notificationId);

		if (!notification) {
			throw new ResourceNotFoundError();
		}

		if (notification.recipient_id !== recipientId) {
			throw new NotAllowedError();
		}

		notification.reade_at = new Date();

		const result = await this.notificationRepository.update(notification);

		return {
			notification: result,
		};
	}
}
