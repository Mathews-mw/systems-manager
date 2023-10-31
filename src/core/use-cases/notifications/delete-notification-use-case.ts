import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { INotificaticationsRepository } from '@/repositories/implementations/INotificationsRepository';

interface IIDeleteNotificationRequest {
	notificationId: string;
}

interface IDeleteNotificationResponse {
	message: string;
}

export class DeleteNotificationUseCase {
	constructor(private notificationsRepository: INotificaticationsRepository) {}

	async execute({ notificationId }: IIDeleteNotificationRequest): Promise<IDeleteNotificationResponse> {
		const notification = await this.notificationsRepository.findById(notificationId);

		if (!notification) {
			throw new NotAllowedError();
		}

		await this.notificationsRepository.delete(notification);

		return {
			message: `Mensagem ${notification.title} deletada com sucesso.`,
		};
	}
}
