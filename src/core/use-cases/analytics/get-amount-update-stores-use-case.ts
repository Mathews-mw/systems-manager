import { prisma } from '@/libs/prisma';

interface IResponse {
	totalStores: number;
	totalStoreAppVersions: number;
	amountUpdatedStores: number;
	totalOutOfDateStores: number;
	outOfDateStores: string[];
}

export class GetAmountUpdateStoresUseCase {
	async execute(): Promise<IResponse> {
		const totalStores = await prisma.store.count();
		const totalStoreAppVersions = await prisma.storeAppVersion.count();

		const storeAppVersions = await prisma.storeAppVersion.findMany({
			include: {
				application: true,
				appVersion: true,
				store: {
					select: {
						name: true,
					},
				},
			},
		});

		const latestAppVersions = await prisma.appVersion.findMany({
			distinct: 'application_id',
			orderBy: {
				version: 'desc',
			},
		});

		const getLatestStoreVersions = storeAppVersions.filter((store) => {
			return latestAppVersions.find((item) => item.id === store.app_version_id);
		});

		const amountUpdatedStores = getLatestStoreVersions.length;

		const outOfDateStores = storeAppVersions
			.filter((store) => {
				return !latestAppVersions.find((item) => item.id === store.app_version_id);
			})
			.map((item) => item.store.name);

		const totalOutOfDateStores = outOfDateStores.length;

		return {
			totalStores,
			totalStoreAppVersions,
			amountUpdatedStores,
			totalOutOfDateStores,
			outOfDateStores,
		};
	}
}
