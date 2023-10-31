import { StorageProvider } from '@/shared/providers/storage-provider';
import { AppVersionRepository } from '@/repositories/app-version-repository';
import { DeleteAppVersionUseCase } from '@/core/use-cases/app-versions/delete-app-version';

export function makeDeleteAppVersionUseCase() {
	const storageProvider = new StorageProvider();
	const appVersionRepository = new AppVersionRepository();

	const deleteAppVersionUseCase = new DeleteAppVersionUseCase(storageProvider, appVersionRepository);

	return deleteAppVersionUseCase;
}
