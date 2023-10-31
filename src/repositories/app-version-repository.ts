import { prisma } from '@/libs/prisma';
import { AppVersion, Prisma } from '@prisma/client';
import {
	IQuerySearch,
	IFindByVersionRequest,
	ILatestVersionRequest,
	IAppVersionRepository,
} from './implementations/IAppVersionRepository';

export class AppVersionRepository implements IAppVersionRepository {
	async create(data: Prisma.AppVersionUncheckedCreateInput) {
		const newAppVersion = await prisma.appVersion.create({
			data,
		});

		return newAppVersion;
	}

	async update(app: AppVersion) {
		const result = await prisma.appVersion.update({
			data: app,
			where: {
				id: app.id,
			},
		});

		return result;
	}

	async delete(app: AppVersion) {
		await prisma.appVersion.delete({
			where: {
				id: app.id,
			},
		});
	}

	async index({ search, page, perPage }: IQuerySearch) {
		const totalOccurrences = await prisma.appVersion.count();
		const totalPages = Math.ceil(totalOccurrences / perPage);

		const appVersions = await prisma.appVersion.findMany({
			where: {
				OR: [
					{
						file_name: {
							contains: search,
							mode: 'insensitive',
						},
					},
				],
			},
			include: {
				application: true,
			},
			orderBy: {
				release_at: 'desc',
			},
			take: perPage,
			skip: (page - 1) * perPage,
		});

		return {
			totalOccurrences,
			totalPages,
			currentPage: page,
			appVersions,
		};
	}

	async getLatestVersions({ applicationId }: ILatestVersionRequest) {
		const latestVersions = await prisma.appVersion.findMany({
			where: {
				OR: [
					{
						application_id: {
							contains: applicationId,
						},
					},
				],
			},
			distinct: 'application_id',
			orderBy: {
				release_at: 'desc',
			},
		});

		return latestVersions;
	}

	async findById(id: string) {
		const appVersion = await prisma.appVersion.findUnique({
			where: {
				id,
			},
			include: {
				application: true,
			},
		});

		return appVersion;
	}

	async findByVersion({ version, applicationId }: IFindByVersionRequest) {
		const app = await prisma.appVersion.findUnique({
			where: {
				application_id_version: {
					application_id: applicationId,
					version,
				},
			},
		});

		return app;
	}
}
