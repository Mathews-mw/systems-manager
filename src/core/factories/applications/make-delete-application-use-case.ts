import { ApplicationsReository } from '@/repositories/applications-repository';
import { DeleteApplicationUseCase } from '../../use-cases/applications/delete-application-use-case';

export function makeDeleteApplicationUseCase() {
	const applicationRepository = new ApplicationsReository();
	const deleteApplicationUseCase = new DeleteApplicationUseCase(applicationRepository);

	return deleteApplicationUseCase;
}
