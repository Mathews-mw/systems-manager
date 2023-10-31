import { Notification } from '@prisma/client';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { INotificaticationsRepository } from '@/repositories/implementations/INotificationsRepository';

interface IIGetNotificationByIdRequest {
	notificationId: string;
}

interface IGetNotificationByIdResponse {
	notification: Notification;
}

export class GetNotificationByIdUseCase {
	constructor(private notificationsRepository: INotificaticationsRepository) {}

	async execute({ notificationId }: IIGetNotificationByIdRequest): Promise<IGetNotificationByIdResponse> {
		const notification = await this.notificationsRepository.findById(notificationId);

		if (!notification) {
			throw new ResourceNotFoundError();
		}

		return {
			notification,
		};
	}
}
