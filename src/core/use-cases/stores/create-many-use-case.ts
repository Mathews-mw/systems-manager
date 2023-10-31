import { IStoreRepository } from '@/repositories/implementations/IStoreRepository';

interface ICreateManyStoreRequest {
	id_loja: number;
	name: string;
	ip: string;
}

interface ICreateManyStoreResponse {
	count: number;
}

export class CreateManyStoresUseCase {
	constructor(private storeRepository: IStoreRepository) {}

	async execute(data: ICreateManyStoreRequest[]): Promise<ICreateManyStoreResponse> {
		const result = await this.storeRepository.createMany(data);

		return {
			count: result,
		};
	}
}
