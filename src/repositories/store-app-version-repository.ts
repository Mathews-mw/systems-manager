/* eslint-disable @typescript-eslint/ban-ts-comment */
import { prisma } from '@/libs/prisma';
import { Prisma, StoreAppVersion } from '@prisma/client';
import {
	IQuerySearch,
	IStoreAppVersionRepoitory,
	IFindByStoreAndAppIdRequest,
} from './implementations/IStoreAppVersionRepository';

export class StoreAppVersionRepository implements IStoreAppVersionRepoitory {
	async create(data: Prisma.StoreAppVersionUncheckedCreateInput) {
		const newItem = await prisma.storeAppVersion.create({
			data,
		});

		return newItem;
	}

	async update(data: StoreAppVersion) {
		const result = await prisma.storeAppVersion.update({
			data,
			where: {
				store_id_application_id: {
					store_id: data.store_id,
					application_id: data.application_id,
				},
			},
		});

		return result;
	}

	async delete(data: StoreAppVersion) {
		await prisma.storeAppVersion.delete({
			where: {
				id: data.id,
			},
		});
	}

	async index({ search, loja_id, page, perPage }: IQuerySearch) {
		const totalOccurrences = await prisma.storeAppVersion.count();
		const totalPages = Math.ceil(totalOccurrences / perPage);

		const stores = await prisma.store.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive',
						},
						id_loja: {
							equals: loja_id,
						},
					},
				],
			},
			include: {
				StoreAppVersion: true,
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
			stores,
		};
	}

	async findByStoreAndAppVersionId({ storeId, applicationId }: IFindByStoreAndAppIdRequest) {
		const result = await prisma.storeAppVersion.findUnique({
			where: {
				store_id_application_id: {
					store_id: storeId,
					application_id: applicationId,
				},
			},
		});
		return result;
	}
}
