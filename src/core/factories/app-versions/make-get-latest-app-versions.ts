import { AppVersionRepository } from '@/repositories/app-version-repository';
import { GetLatestAppVersionsUseCase } from '../../use-cases/app-versions/get-latest-app-versions';

export function makeGetLatestAppVersions() {
	const appVersionsRepository = new AppVersionRepository();
	const getLatestAppVersionUseCase = new GetLatestAppVersionsUseCase(appVersionsRepository);

	return getLatestAppVersionUseCase;
}
