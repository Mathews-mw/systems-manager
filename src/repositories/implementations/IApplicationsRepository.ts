import { Application, Prisma, AppVersion, StoreAppVersion, RemotePaths } from '@prisma/client';

export interface IQuerySearch {
	search?: string;
	page: number;
	perPage: number;
}

export interface IResponse extends Application {
	AppVersion: AppVersion[];
	StoreAppVersion: StoreAppVersion[];
	RemotePaths: RemotePaths[];
}

export interface IApplicationsIndexResponse {
	totalOccurrences: number;
	totalPages: number;
	currentPage: number;
	applications: IResponse[];
}

export interface IApplicationRepository {
	create(data: Prisma.ApplicationCreateInput): Promise<Application>;
	update(application: Application): Promise<Application>;
	delete(application: Application): Promise<void>;
	index({ search, page, perPage }: IQuerySearch): Promise<IApplicationsIndexResponse>;
	findById(id: string): Promise<IResponse | null>;
}
