import { Application } from '@prisma/client';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IApplicationRepository } from '@/repositories/implementations/IApplicationsRepository';

interface IGetApplicationByIdResponse {
	application: Application;
}

export class GetApplicationByIdUseCase {
	constructor(private applicationRepository: IApplicationRepository) {}

	async execute(id: string): Promise<IGetApplicationByIdResponse> {
		const application = await this.applicationRepository.findById(id);

		if (!application) {
			throw new ResourceNotFoundError();
		}

		return {
			application,
		};
	}
}
