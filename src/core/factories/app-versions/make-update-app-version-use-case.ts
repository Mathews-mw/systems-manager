import { StorageProvider } from '@/shared/providers/storage-provider';
import { AppVersionRepository } from '@/repositories/app-version-repository';
import { UpdateAppVersionUseCase } from '@/core/use-cases/app-versions/update-app-version-use-case';

export function makeUpdateAppVersionUseCase() {
	const storageProvider = new StorageProvider();
	const appVersionRepository = new AppVersionRepository();

	const updateAppVersionUseCase = new UpdateAppVersionUseCase(storageProvider, appVersionRepository);

	return updateAppVersionUseCase;
}
