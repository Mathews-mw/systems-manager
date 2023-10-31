import { RemotePathsRepository } from '@/repositories/remote-paths-repository';
import { CreateRemotePathUseCase } from '@/core/use-cases/remote-paths/create-remote-path-use-case';

export function makeCreateRemotePathUseCase() {
	const remotePathsRepository = new RemotePathsRepository();
	const createRemotePathUseCase = new CreateRemotePathUseCase(remotePathsRepository);

	return createRemotePathUseCase;
}
