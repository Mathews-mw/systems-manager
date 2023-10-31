import { ApplicationsReository } from '@/repositories/applications-repository';
import { UpdateApplicationUseCase } from '@/core/use-cases/applications/update-application-use-case';

export function makeUpdateApplicationUseCase() {
	const applicationRepository = new ApplicationsReository();
	const updateApplicationUseCase = new UpdateApplicationUseCase(applicationRepository);

	return updateApplicationUseCase;
}
