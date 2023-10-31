import { Notification } from '@prisma/client';
import { INotificaticationsRepository } from '../../../repositories/implementations/INotificationsRepository';

export interface ISendNotificationUseCaseRequest {
	recipient_id: string;
	title: string;
	content: string;
}

interface ISendNotificationUseCaseResponse {
	notification: Notification;
}

export class SendNotificationUseCase {
	constructor(private notificationRepository: INotificaticationsRepository) {}

	async execute({ recipient_id, title, content }: ISendNotificationUseCaseRequest): Promise<ISendNotificationUseCaseResponse> {
		const notification = await this.notificationRepository.create({
			recipient_id,
			title,
			content,
		});

		return {
			notification,
		};
	}
}
