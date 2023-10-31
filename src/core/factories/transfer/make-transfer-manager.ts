import { StoreRepository } from '@/repositories/store-repository';
import { AppVersionRepository } from '@/repositories/app-version-repository';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { StoreAppVersionRepository } from '@/repositories/store-app-version-repository';
import { TransferManagerUseCase } from '../../use-cases/ftp-manager/transfer-manager-use-case';

export function makeTransferManagerUseCase() {
	const notificationsRepository = new NotificationRepository();
	const storeRepository = new StoreRepository();
	const appVersionRepository = new AppVersionRepository();
	const storeAppVersionRepository = new StoreAppVersionRepository();

	const transferManagerUseCase = new TransferManagerUseCase(
		storeRepository,
		appVersionRepository,
		storeAppVersionRepository,
		notificationsRepository
	);

	return transferManagerUseCase;
}
