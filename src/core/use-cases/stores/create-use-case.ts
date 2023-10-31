import { Store } from '@prisma/client';
import { IStoreRepository } from '@/repositories/implementations/IStoreRepository';
import { StoreAlreadyExistsError } from '@/core/errors/store-already-exists-error';

interface ICreateStoreRequest {
	id_loja: number;
	name: string;
	ip: string;
}

interface ICreateStoreResponse {
	sotre: Store;
}

export class CreateStoreUseCase {
	constructor(private storeRepository: IStoreRepository) {}

	async execute({ id_loja, name, ip }: ICreateStoreRequest): Promise<ICreateStoreResponse> {
		const store = await this.storeRepository.findByIp(ip);

		if (store) {
			throw new StoreAlreadyExistsError();
		}

		const result = await this.storeRepository.create({
			id_loja,
			name,
			ip,
		});

		return {
			sotre: result,
		};
	}
}
