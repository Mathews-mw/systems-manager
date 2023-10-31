import { Prisma, RemotePaths } from '@prisma/client';
import { IRemotePathsRepository } from './implementations/IRemotePathsRepository';
import { prisma } from '@/libs/prisma';

export class RemotePathsRepository implements IRemotePathsRepository {
	async create(data: Prisma.RemotePathsUncheckedCreateInput) {
		const result = await prisma.remotePaths.create({
			data,
		});

		return result;
	}

	async update(data: RemotePaths) {
		const result = await prisma.remotePaths.update({
			data,
			where: {
				id: data.id,
			},
		});

		return result;
	}

	async delete(data: RemotePaths) {
		await prisma.remotePaths.delete({
			where: {
				id: data.id,
			},
		});
	}

	async index() {
		const result = await prisma.remotePaths.findMany();

		return result;
	}

	async findById(id: string) {
		const result = await prisma.remotePaths.findUnique({
			where: {
				id,
			},
		});

		return result;
	}

	async findByApplicationId(ApplicationId: string) {
		const result = await prisma.remotePaths.findUnique({
			where: {
				application_id: ApplicationId,
			},
		});

		return result;
	}
}
