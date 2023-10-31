import { IStoreRepository, IStoreResponse } from '@/repositories/implementations/IStoreRepository';

interface IRequestQuery {
	search?: string;
	page: number;
	perPage: number;
}

type TGetStoresUseCaseResponse = IStoreResponse;

export class GetStoresUseCase {
	constructor(private storesRepository: IStoreRepository) {}

	async execute({ search, page, perPage }: IRequestQuery): Promise<TGetStoresUseCaseResponse> {
		const result = await this.storesRepository.index({
			search,
			page,
			perPage,
		});

		return result;
	}
}
