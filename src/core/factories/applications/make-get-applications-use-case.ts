import { ApplicationsReository } from '@/repositories/applications-repository';
import { GetApplicationsUseCase } from '@/core/use-cases/applications/get-applications-use-case';

export function makeGetApplicationsUseCase() {
	const applicationRepository = new ApplicationsReository();
	const getApplicationsUseCase = new GetApplicationsUseCase(applicationRepository);

	return getApplicationsUseCase;
}
