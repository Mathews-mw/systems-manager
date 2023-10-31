import { StoreRepository } from '@/repositories/store-repository';
import { GetStoresUseCase } from '@/core/use-cases/stores/get-stores-use-case';

export function makeGetStoresUseCase() {
	const storesRepository = new StoreRepository();
	const getStoresUseCase = new GetStoresUseCase(storesRepository);

	return getStoresUseCase;
}
