import { INotificaticationsRepository } from '../../../repositories/implementations/INotificationsRepository';

export interface IReadAllUserNotificationsUseCaseRequest {
	recipientId: string;
}

interface IReadAllUserNotificationsUseCaseResponse {
	count: number;
}

export class ReadAllUserNotificationsUseCase {
	constructor(private notificationRepository: INotificaticationsRepository) {}

	async execute({ recipientId }: IReadAllUserNotificationsUseCaseRequest): Promise<IReadAllUserNotificationsUseCaseResponse> {
		const result = await this.notificationRepository.updateManyByRecipientId(recipientId);

		return {
			count: result,
		};
	}
}
