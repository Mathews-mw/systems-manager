import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IApplicationRepository } from '@/repositories/implementations/IApplicationsRepository';

interface IDeleteApplicationResponse {
	message: string;
}

export class DeleteApplicationUseCase {
	constructor(private applicationRepository: IApplicationRepository) {}

	async execute(id: string): Promise<IDeleteApplicationResponse> {
		const application = await this.applicationRepository.findById(id);

		if (!application) {
			throw new ResourceNotFoundError();
		}

		await this.applicationRepository.delete(application);

		return {
			message: `A aplicação ${application.name} foi deletada com sucesso.`,
		};
	}
}
