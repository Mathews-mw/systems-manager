import { StorageProvider } from '@/shared/providers/storage-provider';
import { AppVersionRepository } from '@/repositories/app-version-repository';
import { ApplicationsReository } from '@/repositories/applications-repository';
import { RemotePathsRepository } from '@/repositories/remote-paths-repository';
import { UploadAppUseCase } from '@/core/use-cases/app-versions/upload-app-use-case';

export function makeUploadAppUseCase() {
	const storageProvider = new StorageProvider();
	const appVersionRepository = new AppVersionRepository();
	const applicationRepository = new ApplicationsReository();
	const remotePathsRepository = new RemotePathsRepository();

	const uploadAppUseCase = new UploadAppUseCase(
		storageProvider,
		appVersionRepository,
		applicationRepository,
		remotePathsRepository
	);

	return uploadAppUseCase;
}
