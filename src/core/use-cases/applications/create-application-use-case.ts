import { AppType, Application } from '@prisma/client';

import { IApplicationRepository } from '@/repositories/implementations/IApplicationsRepository';

interface ICreateApplicationRequest {
	name: string;
	app_type: AppType;
	description?: string;
}

interface ICreateApplicationResponse {
	application: Application;
}

export class CreateApplicationUseCase {
	constructor(private applicationRepository: IApplicationRepository) {}

	async execute({ name, app_type, description }: ICreateApplicationRequest): Promise<ICreateApplicationResponse> {
		const application = await this.applicationRepository.create({
			name,
			app_type,
			description,
		});

		return {
			application,
		};
	}
}
