import { IApplicationRepository, IApplicationsIndexResponse } from '@/repositories/implementations/IApplicationsRepository';

interface IGetApplicationsRequest {
	search?: string;
	page: number;
	perPage: number;
}

type TGetApplicationsResponse = IApplicationsIndexResponse;

export class GetApplicationsUseCase {
	constructor(private applicationRepository: IApplicationRepository) {}

	async execute({ search, page, perPage }: IGetApplicationsRequest): Promise<TGetApplicationsResponse> {
		const applications = await this.applicationRepository.index({
			search,
			page,
			perPage,
		});

		return applications;
	}
}
