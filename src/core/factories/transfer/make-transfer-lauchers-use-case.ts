import { StoreRepository } from '@/repositories/store-repository';
import { AppVersionRepository } from '@/repositories/app-version-repository';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { StoreAppVersionRepository } from '@/repositories/store-app-version-repository';
import { TransferLaunchersUseCase } from '@/core/use-cases/ftp-manager/transfer-launchers-use-case';
import { ApplicationsReository } from '@/repositories/applications-repository';

export function makeTransferLaunchersUseCase() {
	const notificationsRepository = new NotificationRepository();
	const storeRepository = new StoreRepository();
	const applicationRepstory = new ApplicationsReository();
	const appVersionRepository = new AppVersionRepository();
	const storeAppVersionRepository = new StoreAppVersionRepository();

	const transferLaunchersUseCase = new TransferLaunchersUseCase(
		storeRepository,
		applicationRepstory,
		appVersionRepository,
		storeAppVersionRepository,
		notificationsRepository
	);

	return transferLaunchersUseCase;
}
