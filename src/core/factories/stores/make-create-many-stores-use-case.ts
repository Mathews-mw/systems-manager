import { StoreRepository } from '@/repositories/store-repository';
import { CreateManyStoresUseCase } from '@/core/use-cases/stores/create-many-use-case';

export function makeCreateManyStoresUserCase() {
	const storeRepository = new StoreRepository();
	const createManyStoresUserCase = new CreateManyStoresUseCase(storeRepository);

	return createManyStoresUserCase;
}
