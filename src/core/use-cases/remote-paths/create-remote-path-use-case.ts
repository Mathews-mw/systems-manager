import { RemotePaths } from '@prisma/client';
import { RemotePathAlreadyExistsError } from '@/core/errors/remote-path-already-exists-error';
import { IRemotePathsRepository } from '@/repositories/implementations/IRemotePathsRepository';

interface ICreateRemotePathRequest {
	application_id: string;
	remote_path: string;
}

interface ICreateRemotePathResponse {
	remotePath: RemotePaths;
}

export class CreateRemotePathUseCase {
	constructor(private remotePathRepoitory: IRemotePathsRepository) {}

	async execute({ application_id, remote_path }: ICreateRemotePathRequest): Promise<ICreateRemotePathResponse> {
		const remotePath = await this.remotePathRepoitory.findByApplicationId(application_id);

		if (remotePath) {
			throw new RemotePathAlreadyExistsError();
		}

		const result = await this.remotePathRepoitory.create({
			application_id,
			remote_path,
		});

		return {
			remotePath: result,
		};
	}
}
