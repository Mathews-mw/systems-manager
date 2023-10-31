import path from 'path';
import { AppVersion, Store } from '@prisma/client';

import { FtpManager } from '@/shared/providers/ftp-manager';
import { IStoreRepository } from '@/repositories/implementations/IStoreRepository';
import { IAppVersionRepository } from '@/repositories/implementations/IAppVersionRepository';
import { IStoreAppVersionRepoitory } from '@/repositories/implementations/IStoreAppVersionRepository';
import { INotificaticationsRepository } from '@/repositories/implementations/INotificationsRepository';

interface IHandlerTransferRequest {
	host: string;
	localFileName: string;
	remoteFileName: string;
}

interface IhandlerRemoveFileRequest {
	host: string;
	remoteFile: string;
}

interface ITransferManagerUseCaseRequest {
	storeId: string;
	appId: string;
	version: number;
}

interface IFtpQueue {
	store: Store;
	appVersion: AppVersion;
}

export class TransferManagerUseCase {
	constructor(
		private storeRepository: IStoreRepository,
		private appVersionRepository: IAppVersionRepository,
		private storeAppVersionRepository: IStoreAppVersionRepoitory,
		private notificationsRepository: INotificaticationsRepository
	) {}

	private async handlerTransfer({ host, localFileName, remoteFileName }: IHandlerTransferRequest) {
		const ftpManager = await FtpManager.create(host);

		const localPath = path.resolve(process.cwd(), 'tmp', 'appManager', localFileName);
		const remotePath = `/AppManager/${remoteFileName}`;

		const result = await ftpManager.uploadFile({ localPath, remotePath });

		return {
			result,
		};
	}

	private async handlerRemoveFile({ host, remoteFile }: IhandlerRemoveFileRequest) {
		const ftpManager = await FtpManager.create(host);

		const result = await ftpManager.remove(remoteFile);

		return result;
	}

	async execute(data: ITransferManagerUseCaseRequest[]): Promise<void> {
		let storesUpdatedCount = 0;
		const sucessFtpQueue: IFtpQueue[] = [];
		const failureFtpQueue: IFtpQueue[] = [];

		for (const item of data) {
			// Encontra a loja que vai receber a transferência de arquivos;
			const store = await this.storeRepository.findById(item.storeId);

			// Encontra a versão da aplicação que será enviada para a loja;
			const appVersion = await this.appVersionRepository.findByVersion({
				id_app: item.appId,
				version: item.version,
			});

			if (!store || !appVersion) {
				console.log(`Nenhum registro encontrado para os parâmetros ${item.storeId}, ${item.appId} e ${item.version}`);
				continue;
			}

			// Verifica se a loja já possui alguma versão da aplicação armazenada;
			// Se sim, será substituída;
			const storeAppVersion = await this.storeAppVersionRepository.findByStoreAndAppId({
				storeId: item.storeId,
				appId: item.appId,
			});

			if (storeAppVersion) {
				// Procura o nome do arquivo que será deletado após a atualização no servidor da loja
				const toRemoveRemoteFile = await this.appVersionRepository.findById(storeAppVersion.id_app_version);

				try {
					await this.handlerTransfer({
						host: store.ip,
						localFileName: appVersion.file_name,
						remoteFileName: appVersion.file_name,
					});
				} catch (error) {
					console.log('Error FTP: ', error);

					failureFtpQueue.push({
						store,
						appVersion,
					});

					continue;
				}

				storeAppVersion.id_app = appVersion.id_app;
				storeAppVersion.id_app_version = appVersion.id;
				storeAppVersion.update_status = 'COMPLETED';

				await this.storeAppVersionRepository.update(storeAppVersion);

				sucessFtpQueue.push({
					store,
					appVersion,
				});

				storesUpdatedCount++;

				if (toRemoveRemoteFile) {
					try {
						await this.handlerRemoveFile({
							host: store.ip,
							remoteFile: toRemoveRemoteFile.file_name,
						});
					} catch (error) {
						console.log('Erro ao deteletar via FTP: ', error);
						continue;
					}
				}

				continue;
			}

			try {
				await this.handlerTransfer({
					host: store.ip,
					localFileName: appVersion.file_name,
					remoteFileName: appVersion.file_name,
				});
			} catch (error) {
				console.log('Error FTP: ', error);

				failureFtpQueue.push({
					store,
					appVersion,
				});

				continue;
			}

			const result = await this.storeAppVersionRepository.create({
				id_store: store.id,
				id_app: appVersion.id_app,
				id_app_version: appVersion.id,
				update_status: 'COMPLETED',
			});

			console.log('result: ', result);

			sucessFtpQueue.push({
				store,
				appVersion,
			});

			storesUpdatedCount++;
		}

		for (const item of sucessFtpQueue) {
			await this.notificationsRepository.create({
				recipient_id: '1',
				title: 'Transferência realizada com sucesso.',
				content: `A transferencia do arquivo ${item.appVersion.file_name} de versão ${item.appVersion.current_version} para a loja ${item.store.name} foi concluída.`,
			});
		}

		for (const item of failureFtpQueue) {
			await this.notificationsRepository.create({
				recipient_id: '1',
				title: 'Transferência falhou!',
				content: `Ocorreu algum erro na transferencia do arquivo ${item.appVersion.file_name} de versão ${item.appVersion.current_version} para a loja ${item.store.name}.`,
			});
		}

		console.log(`Foram atualizadas ${storesUpdatedCount} lojas.`);
	}
}
