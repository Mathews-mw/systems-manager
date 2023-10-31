import { GetAppVersionsUseCase } from '../../use-cases/app-versions/get-app-versions';
import { AppVersionRepository } from '@/repositories/app-version-repository';

export function makeGetAppVersions() {
	const appVersionsRepository = new AppVersionRepository();
	const getAppVersionsUseCase = new GetAppVersionsUseCase(appVersionsRepository);

	return getAppVersionsUseCase;
}
