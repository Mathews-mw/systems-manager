import { Application, Prisma } from '@prisma/client';

import { prisma } from '@/libs/prisma';
import { IApplicationRepository, IQuerySearch } from './implementations/IApplicationsRepository';

export class ApplicationsReository implements IApplicationRepository {
	async create(data: Prisma.ApplicationCreateInput) {
		const newApp = await prisma.application.create({
			data,
		});

		return newApp;
	}

	async update(application: Application) {
		const result = await prisma.application.update({
			data: application,
			where: {
				id: application.id,
			},
		});

		return result;
	}

	async delete(application: Application) {
		await prisma.application.delete({
			where: {
				id: application.id,
			},
		});
	}

	async index({ search, page, perPage }: IQuerySearch) {
		const totalOccurrences = await prisma.application.count();
		const totalPages = Math.ceil(totalOccurrences / perPage);

		const applications = await prisma.application.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive',
						},
					},
				],
			},
			include: {
				AppVersion: {
					orderBy: {
						version: 'desc',
					},
				},
				StoreAppVersion: true,
				RemotePaths: true,
			},
			orderBy: {
				name: 'asc',
			},
			take: perPage,
			skip: (page - 1) * perPage,
		});

		return {
			totalOccurrences,
			totalPages,
			currentPage: page,
			applications,
		};
	}

	async findById(id: string) {
		const application = await prisma.application.findUnique({
			where: {
				id,
			},
			include: {
				AppVersion: true,
				StoreAppVersion: true,
				RemotePaths: true,
			},
		});

		return application;
	}
}
