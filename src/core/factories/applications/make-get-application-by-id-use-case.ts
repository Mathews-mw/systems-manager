import { ApplicationsReository } from '@/repositories/applications-repository';
import { GetApplicationByIdUseCase } from '@/core/use-cases/applications/get-application-by-id-use-case';

export function makeGetApplicationByIdUseCase() {
	const applicationRepository = new ApplicationsReository();
	const getApplicationByIdUseCase = new GetApplicationByIdUseCase(applicationRepository);

	return getApplicationByIdUseCase;
}
