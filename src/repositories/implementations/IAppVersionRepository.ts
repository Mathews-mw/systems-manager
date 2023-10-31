import { AppVersion, Prisma } from '@prisma/client';

export interface IQuerySearch {
	search?: string;
	page: number;
	perPage: number;
}

export interface ILatestVersionRequest {
	applicationId?: string;
}

export interface IFindByVersionRequest {
	applicationId: string;
	version: string;
}

export interface IResponse extends AppVersion {
	AppVersion: AppVersion[];
}

export interface IApplicationsIndexResponse {
	totalOccurrences: number;
	totalPages: number;
	currentPage: number;
	appVersions: AppVersion[];
}

export interface IAppVersionRepository {
	create(data: Prisma.AppVersionUncheckedCreateInput): Promise<AppVersion>;
	update(app: AppVersion): Promise<AppVersion>;
	delete(app: AppVersion): Promise<void>;
	index({ search, page, perPage }: IQuerySearch): Promise<IApplicationsIndexResponse>;
	getLatestVersions({ applicationId }: ILatestVersionRequest): Promise<AppVersion[]>;
	findById(id: string): Promise<AppVersion | null>;
	findByVersion({ version, applicationId }: IFindByVersionRequest): Promise<AppVersion | null>;
}
