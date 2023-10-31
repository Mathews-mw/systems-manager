import { ApplicationsReository } from '@/repositories/applications-repository';
import { CreateApplicationUseCase } from '../../use-cases/applications/create-application-use-case';

export function makeCreateApplicationUseCase() {
	const applicationRepository = new ApplicationsReository();
	const createApplicationUseCase = new CreateApplicationUseCase(applicationRepository);

	return createApplicationUseCase;
}
