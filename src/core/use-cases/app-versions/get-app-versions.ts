import { IAppVersionRepository, IApplicationsIndexResponse } from '@/repositories/implementations/IAppVersionRepository';

interface IRequestQuery {
	search?: string;
	page: number;
	perPage: number;
}

type TGetAppVersionUseCaseResponse = IApplicationsIndexResponse;

export class GetAppVersionsUseCase {
	constructor(private appVersionRepository: IAppVersionRepository) {}

	async execute({ search, page, perPage }: IRequestQuery): Promise<TGetAppVersionUseCaseResponse> {
		const result = await this.appVersionRepository.index({
			search,
			page,
			perPage,
		});

		return result;
	}
}
