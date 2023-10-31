import { AppType, Application } from '@prisma/client';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IApplicationRepository } from '@/repositories/implementations/IApplicationsRepository';

interface IUpdateApplicationRequest {
	id: string;
	name?: string;
	app_type?: AppType;
	description?: string;
}

interface IUpdateApplicationResponse {
	application: Application;
}

export class UpdateApplicationUseCase {
	constructor(private applicationRepository: IApplicationRepository) {}

	async execute({ id, name, app_type, description }: IUpdateApplicationRequest): Promise<IUpdateApplicationResponse> {
		const application = await this.applicationRepository.findById(id);

		if (!application) {
			throw new ResourceNotFoundError();
		}

		application.name = name || application.name;
		application.app_type = app_type || application.app_type;
		application.description = description || application.description;
		application.updated_at = new Date();

		const result = await this.applicationRepository.update(application);

		return {
			application: result,
		};
	}
}
