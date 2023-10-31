import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { IStorageProvider } from '@/shared/providers/implementations/IStorageProvider';
import { IAppVersionRepository } from '@/repositories/implementations/IAppVersionRepository';

interface IDeleteAppVersionUseCaseRequest {
	id: string;
}

interface IDeleteAppVersionUseCaseResponse {
	message: string;
}

export class DeleteAppVersionUseCase {
	constructor(
		private storageProvider: IStorageProvider,
		private appVersionRepository: IAppVersionRepository
	) {}

	async execute({ id }: IDeleteAppVersionUseCaseRequest): Promise<IDeleteAppVersionUseCaseResponse> {
		const appVersion = await this.appVersionRepository.findById(id);

		if (!appVersion) {
			throw new ResourceNotFoundError();
		}

		await this.storageProvider.delete(appVersion.file_name);

		await this.appVersionRepository.delete(appVersion);

		return {
			message: `${appVersion.file_name} deletado com sucesso.`,
		};
	}
}
