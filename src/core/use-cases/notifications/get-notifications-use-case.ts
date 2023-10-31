import { Notification } from '@prisma/client';
import { INotificaticationsRepository } from '@/repositories/implementations/INotificationsRepository';

interface IGetNoificationsResponse {
	notifications: Notification[];
}

export class GetNotificationsUseCase {
	constructor(private notificationsRepository: INotificaticationsRepository) {}

	async execute(): Promise<IGetNoificationsResponse> {
		const notifications = await this.notificationsRepository.index();

		return {
			notifications,
		};
	}
}
