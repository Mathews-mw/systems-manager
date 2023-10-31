import { prisma } from '@/libs/prisma';
import { Prisma, Store } from '@prisma/client';
import { IQuerySearch, IStoreRepository } from './implementations/IStoreRepository';

export class StoreRepository implements IStoreRepository {
	async create(data: Prisma.StoreCreateInput) {
		const newStore = await prisma.store.create({
			data,
		});

		return newStore;
	}

	async createMany(data: Prisma.StoreCreateManyInput[]) {
		const result = await prisma.store.createMany({
			data,
			skipDuplicates: true,
		});

		return result.count;
	}

	async update(store: Store) {
		const updateResult = await prisma.store.update({
			data: store,
			where: {
				id: store.id,
			},
		});

		return updateResult;
	}

	async delete(store: Store) {
		await prisma.store.delete({
			where: {
				id: store.id,
			},
		});
	}

	async index({ search, page, perPage }: IQuerySearch) {
		const totalOccurrences = await prisma.store.count();
		const totalPages = Math.ceil(totalOccurrences / perPage);

		const stores = await prisma.store.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive',
						},
					},
					{
						AND: {
							ip: {
								contains: search,
							},
						},
					},
				],
			},
			include: {
				StoreAppVersion: {
					include: {
						application: true,
						appVersion: true,
					},
				},
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

	async findById(id: string) {
		const store = await prisma.store.findUnique({
			where: {
				id,
			},
		});

		return store;
	}

	async findByStoreId(storeId: number) {
		const store = await prisma.store.findUnique({
			where: {
				id_loja: storeId,
			},
		});

		return store;
	}

	async findByIp(ip: string) {
		const store = await prisma.store.findUnique({
			where: {
				ip,
			},
		});

		return store;
	}

	// async test() {
	// 	const result = await prisma.store.findMany({
	// 		include: {
	// 			StoreAppVersion: {
	// 				include: {
	// 					application: true,
	// 					appVersion: true,
	// 				},
	// 				distinct: 'app_version_id',
	// 				orderBy: {
	// 					appVersion: {
	// 						release_at: 'desc',
	// 					},
	// 				},
	// 			},
	// 		},
	// 	});

	// 	return result;
	// }
}
