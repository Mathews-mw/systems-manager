import { Prisma, StoreAppVersion, Store } from '@prisma/client';

export interface IQuerySearch {
	search?: string;
	loja_id?: number;
	page: number;
	perPage: number;
}

export interface IFindByStoreAndAppIdRequest {
	storeId: string;
	applicationId: string;
}

interface IResponse extends Store {
	StoreAppVersion: StoreAppVersion[];
}

export interface IStoreAppVersionResponse {
	totalOccurrences: number;
	totalPages: number;
	currentPage: number;
	stores: IResponse[];
}

export interface IStoreAppVersionRepoitory {
	create(data: Prisma.StoreAppVersionUncheckedCreateInput): Promise<StoreAppVersion>;
	update(data: StoreAppVersion): Promise<StoreAppVersion>;
	delete(data: StoreAppVersion): Promise<void>;
	index({ search, loja_id, page, perPage }: IQuerySearch): Promise<IStoreAppVersionResponse>;
	findByStoreAndAppVersionId({ storeId, applicationId }: IFindByStoreAndAppIdRequest): Promise<StoreAppVersion | null>;
}
