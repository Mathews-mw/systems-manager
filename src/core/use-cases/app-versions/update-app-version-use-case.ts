import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { AppVersionAlredyExists } from '../../errors/app-version-alredy-exists';
import { IStorageProvider } from '@/shared/providers/implementations/IStorageProvider';
import { IAppVersionRepository } from '@/repositories/implementations/IAppVersionRepository';
import { AppVersionNameAlredyExistsError } from '@/core/errors/app-version-name-alredy-exists-error';
import { AppVersionNotAllowedDotsNominationError } from '@/core/errors/app-version-notAllowed-dots-nomination-error';

interface IUpdateAppVersionUseCaseRequest {
	id: string;
	fileName?: string;
	version?: string;
}

interface IUpdateAppVersionUseCaseResponse {
	message: string;
}

export class UpdateAppVersionUseCase {
	constructor(
		private storageProvider: IStorageProvider,
		private appVersionRepository: IAppVersionRepository
	) {}

	async execute({ id, fileName, version }: IUpdateAppVersionUseCaseRequest): Promise<IUpdateAppVersionUseCaseResponse> {
		const appVersion = await this.appVersionRepository.findById(id);

		if (!appVersion) {
			throw new ResourceNotFoundError();
		}

		if (version) {
			const appVersionByCurrentVersion = await this.appVersionRepository.findByVersion({
				version,
				applicationId: appVersion.application_id,
			});

			if (appVersionByCurrentVersion && appVersionByCurrentVersion.version === version) {
				throw new AppVersionAlredyExists(version, appVersionByCurrentVersion.file_name);
			}

			if (appVersion && appVersion.version === version) {
				throw new AppVersionAlredyExists(version, appVersion.file_name);
			}
		}

		if (fileName) {
			const { appVersions } = await this.appVersionRepository.index({
				search: fileName,
				page: 1,
				perPage: 10,
			});

			if (appVersions.length > 0 && appVersions[0].file_name.split('.')[0] === fileName) {
				throw new AppVersionNameAlredyExistsError(fileName);
			}

			if (fileName.includes('.')) {
				throw new AppVersionNotAllowedDotsNominationError();
			}

			const getExtensionFileName = appVersion.file_name.split('.')[1];
			const composeFileName = fileName.concat('.', getExtensionFileName);

			await this.storageProvider.save(appVersion.file_name, composeFileName);

			appVersion.file_name = composeFileName;
		}

		appVersion.version = version || appVersion.version;

		const result = await this.appVersionRepository.update(appVersion);

		return {
			message: `${result.file_name} atualizado com sucesso.`,
		};
	}
}
