import { StoreRepository } from '@/repositories/store-repository';
import { CreateStoreUseCase } from '@/core/use-cases/stores/create-use-case';

export function makeCreateStoreUseCase() {
	const storeRepository = new StoreRepository();
	const createStoreUseCase = new CreateStoreUseCase(storeRepository);

	return createStoreUseCase;
}
