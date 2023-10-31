import { File } from 'fastify-multer/lib/interfaces';

import { VersionType } from '@prisma/client';
import { selectLocalFile } from '@/utils/select-local-file';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { LocalFileNotExistError } from '@/core/errors/local-file-not-exist-error';
import { IStorageProvider } from '@/shared/providers/implementations/IStorageProvider';
import { IAppVersionRepository } from '@/repositories/implementations/IAppVersionRepository';
import { IRemotePathsRepository } from '@/repositories/implementations/IRemotePathsRepository';
import { IApplicationRepository } from '@/repositories/implementations/IApplicationsRepository';

interface IUploadAppUseCaseRequest {
	file: File;
	id_app: string;
	version: string;
	version_type: VersionType;
}

interface IUploadAppUseCaseResponse {
	message: string;
}

export class UploadAppUseCase {
	constructor(
		private storageProvider: IStorageProvider,
		private appVersionRepository: IAppVersionRepository,
		private applicationRepository: IApplicationRepository,
		private remotePathsRepository: IRemotePathsRepository
	) {}

	async execute({ file, id_app, version, version_type }: IUploadAppUseCaseRequest): Promise<IUploadAppUseCaseResponse> {
		const application = await this.applicationRepository.findById(id_app);

		if (!application) {
			throw new ResourceNotFoundError();
		}

		const remotePath = await this.remotePathsRepository.findByApplicationId(application.id);

		if (!remotePath) {
			throw new ResourceNotFoundError();
		}

		const result = await this.appVersionRepository.create({
			file_name: file.filename ? file.filename : file.originalname,
			version,
			application_id: application.id,
			version_type,
			remote_path_id: remotePath.id,
		});

		const pathMoveTo = selectLocalFile({
			applicationName: application.name,
			fileName: result.file_name,
		});

		if (!pathMoveTo) {
			throw new LocalFileNotExistError();
		}

		await this.storageProvider.save(result.file_name, pathMoveTo);

		return {
			message: `Upload da versão ${result.version} do sistema ${application.name} foi concluída com sucesso.`,
		};
	}
}
