import { StoreRepository } from '@/repositories/store-repository';
import { WatchStoresDatabaseUseCase } from '@/core/use-cases/stores/watch-stores-database-use-case';

export function makeWatchStoresDatabaseUseCase() {
	const storeRepository = new StoreRepository();
	const watchStoresDatabaseUseCase = new WatchStoresDatabaseUseCase(storeRepository);

	return watchStoresDatabaseUseCase;
}
