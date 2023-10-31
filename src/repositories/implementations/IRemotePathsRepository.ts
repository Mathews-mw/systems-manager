import { Prisma, RemotePaths } from '@prisma/client';

export interface IRemotePathsRepository {
	create(data: Prisma.RemotePathsUncheckedCreateInput): Promise<RemotePaths>;
	update(data: RemotePaths): Promise<RemotePaths>;
	delete(data: RemotePaths): Promise<void>;
	index(): Promise<RemotePaths[]>;
	findById(id: string): Promise<RemotePaths | null>;
	findByApplicationId(ApplicationId: string): Promise<RemotePaths | null>;
}
