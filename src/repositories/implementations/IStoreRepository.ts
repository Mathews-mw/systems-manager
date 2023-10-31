import { Prisma, Store } from '@prisma/client';

export interface IQuerySearch {
	search?: string;
	page: number;
	perPage: number;
}

export interface IStoreResponse {
	totalOccurrences: number;
	totalPages: number;
	currentPage: number;
	stores: Store[];
}

export interface IStoreRepository {
	create(data: Prisma.StoreCreateInput): Promise<Store>;
	createMany(data: Prisma.StoreCreateManyInput[]): Promise<number>;
	update(store: Store): Promise<Store>;
	delete(store: Store): Promise<void>;
	index({ page, perPage, search }: IQuerySearch): Promise<IStoreResponse>;
	findById(id: string): Promise<Store | null>;
	findByStoreId(storeId: number): Promise<Store | null>;
	findByIp(ip: string): Promise<Store | null>;
}
