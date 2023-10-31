import { AppVersion } from '@prisma/client';
import { IAppVersionRepository } from '@/repositories/implementations/IAppVersionRepository';

interface IGetLatestAppVersionsUseCaseRequest {
	applicationId?: string;
}

interface IGetLatestAppVersionsUseCaseResponse {
	appVersions: AppVersion[];
}

export class GetLatestAppVersionsUseCase {
	constructor(private appRepository: IAppVersionRepository) {}

	async execute({ applicationId }: IGetLatestAppVersionsUseCaseRequest): Promise<IGetLatestAppVersionsUseCaseResponse> {
		const appVersions = await this.appRepository.getLatestVersions({
			applicationId,
		});

		return {
			appVersions,
		};
	}
}
