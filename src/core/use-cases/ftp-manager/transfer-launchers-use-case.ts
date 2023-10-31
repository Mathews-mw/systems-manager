import { FtpManager } from '@/shared/providers/ftp-manager';
import { selectLocalFile } from '@/utils/select-local-file';
import { FtpConnectionError } from '@/core/errors/ftp-connection-error';
import { FtpAccessDeniedError } from '@/core/errors/ftp-access-denied-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { LocalFileNotExistError } from '@/core/errors/local-file-not-exist-error';
import { IStoreRepository } from '@/repositories/implementations/IStoreRepository';
import { IAppVersionRepository } from '@/repositories/implementations/IAppVersionRepository';
import { FtpClientNotInitializedError } from '@/core/errors/ftp-client-not-initialized-error';
import { IApplicationRepository } from '@/repositories/implementations/IApplicationsRepository';
import { IStoreAppVersionRepoitory } from '@/repositories/implementations/IStoreAppVersionRepository';
import { INotificaticationsRepository } from '@/repositories/implementations/INotificationsRepository';

interface ITransferLaunchersUseCaseRequest {
	storeId: string;
	applicationId: string;
	version: string;
}

export class TransferLaunchersUseCase {
	private ftpManager: FtpManager | null = null;

	constructor(
		private storeRepository: IStoreRepository,
		private applicationRepstory: IApplicationRepository,
		private appVersionRepository: IAppVersionRepository,
		private storeAppVersionRepository: IStoreAppVersionRepoitory,
		private notificationsRepository: INotificaticationsRepository
	) {}

	private async initializeFtpManager(host: string) {
		this.ftpManager = await FtpManager.create(host);
	}

	private async handlerCloseConnection() {
		if (!this.ftpManager) {
			throw new FtpClientNotInitializedError();
		}

		await this.ftpManager.close();
	}

	private async handlerTransfer(data: { remotePath: string; localPath: string }) {
		if (!this.ftpManager) {
			throw new FtpClientNotInitializedError();
		}

		const result = await this.ftpManager.uploadFile({ localPath: data.localPath, remotePath: data.remotePath });

		return result;
	}

	private async handlerRemoveFile(path: string) {
		if (!this.ftpManager) {
			throw new FtpClientNotInitializedError();
		}

		const result = await this.ftpManager.remove(path);

		return result;
	}

	private async handlerListFiles(path: string) {
		if (!this.ftpManager) {
			throw new FtpClientNotInitializedError();
		}

		const files = await this.ftpManager.listFiles(path);

		return files;
	}

	private async handlerRenameFile(dataRequest: { path: string; newPath: string }) {
		if (!this.ftpManager) {
			throw new FtpClientNotInitializedError();
		}

		const result = await this.ftpManager.renameFile({ path: dataRequest.path, newPath: dataRequest.newPath });

		return result;
	}

	private async handlerEnsureDir(path: string) {
		if (!this.ftpManager) {
			throw new FtpClientNotInitializedError();
		}

		await this.ftpManager.ensureDir(path);
	}

	async execute({ storeId, applicationId, version }: ITransferLaunchersUseCaseRequest) {
		let originalFile: string | null = null;

		// Busca a loja que irá receber os arquivos
		const store = await this.storeRepository.findById(storeId);

		// Encontra a versão da aplicação que será enviada para a loja;
		const appVersion = await this.appVersionRepository.findByVersion({
			applicationId,
			version,
		});

		if (!store || !appVersion) {
			throw new ResourceNotFoundError();
		}

		// Busca pela aplicação
		const application = await this.applicationRepstory.findById(appVersion.application_id);

		if (!application) {
			throw new ResourceNotFoundError();
		}

		try {
			await this.initializeFtpManager(store.ip);
		} catch (error) {
			throw new FtpConnectionError();
		}

		// Verifica a existencia do diretório, caso não exista, será criado
		await this.handlerEnsureDir(application.RemotePaths[0].remote_path);

		// Verifica os arquivos existentes no diretório informado
		const remoteFiles = await this.handlerListFiles(application.RemotePaths[0].remote_path);

		for (const file of remoteFiles) {
			// Verifica se em meio aos arquivos exista um que contenha .new no seu nome
			const haveNewExtensionFile =
				file.name.toLocaleLowerCase().includes(application.name.toLocaleLowerCase()) && file.name.includes('.new');
			// Verifica se em meio aos arquivos exista um que contenha .old no seu nome
			const haveOldExtensionFile =
				file.name.toLocaleLowerCase().includes(application.name.toLocaleLowerCase()) && file.name.includes('.old');
			// Verifica a existência do arquivo original em meio aos arquivos
			// ***ESSA PESQUISA PELO ARQUIVO ORIGINAL ATUAL PRECISA SER MELHORADA***
			const isOriginalFile =
				file.name.toLocaleLowerCase().includes(application.name.toLocaleLowerCase()) &&
				file.name.includes('.exe') &&
				!file.name.endsWith('.new') &&
				!file.name.endsWith('.old');

			if (haveNewExtensionFile) {
				await this.handlerRemoveFile(`${application.RemotePaths[0].remote_path}/${file.name}`);
			}
			if (haveOldExtensionFile) {
				await this.handlerRemoveFile(`${application.RemotePaths[0].remote_path}/${file.name}`);
			}
			if (isOriginalFile) {
				originalFile = file.name;
			}
		}

		// Seleciona o arquivo para ser transferido
		const localPath = selectLocalFile({
			applicationName: application.name,
			fileName: appVersion.file_name,
		});

		if (!localPath) {
			throw new LocalFileNotExistError();
		}

		// Renomea o arquivo que será transferido para o padrão de .new
		const remoteFileName = `${appVersion.file_name.substring(17)}.new`;
		const remotePath = `${application.RemotePaths[0].remote_path}/${remoteFileName}`;

		try {
			// Envia o arquivo para a lojas
			const result = await this.handlerTransfer({ localPath, remotePath });

			if (result.code === 226) {
				if (originalFile) {
					// Renomea o arquivo atual que será substituído para .old
					await this.handlerRenameFile({
						path: `${application.RemotePaths[0].remote_path}/${originalFile}`,
						newPath: `${application.RemotePaths[0].remote_path}/${originalFile}.old`,
					});
				}

				const newCurrentPath = `${application.name}${appVersion.version}${appVersion.version_type}.exe`;

				// Renomea o arquivo transferido para extensão original
				await this.handlerRenameFile({
					path: `${application.RemotePaths[0].remote_path}/${remoteFileName}`,
					newPath: `${application.RemotePaths[0].remote_path}/${newCurrentPath}`,
				});

				const storeAppVersion = await this.storeAppVersionRepository.findByStoreAndAppVersionId({
					storeId: store.id,
					applicationId: application.id,
				});

				if (storeAppVersion) {
					storeAppVersion.app_version_id = appVersion.id;
					storeAppVersion.application_id = application.id;
					storeAppVersion.store_id = store.id;
					storeAppVersion.updated_at = new Date();

					await this.storeAppVersionRepository.update(storeAppVersion);
				} else {
					await this.storeAppVersionRepository.create({
						store_id: store.id,
						application_id: application.id,
						app_version_id: appVersion.id,
						updated_at: new Date(),
					});
				}
			}

			await this.notificationsRepository.create({
				recipient_id: '1',
				title: 'Transferência de versão realizada com sucesso.',
				content: `A transferencia da aplicação ${appVersion.file_name} de versão ${appVersion.version}-${appVersion.version_type} para a loja ${store.name} foi concluída. `,
			});

			await this.handlerCloseConnection();
			return { msg: 'FTP is completed' };
		} catch (error) {
			await this.notificationsRepository.create({
				recipient_id: '1',
				title: 'Falha na transferência de versão.',
				content: `A transferencia da aplicação ${appVersion.file_name} de versão ${appVersion.version}-${appVersion.version_type} para a loja ${store.name} falhou.`,
			});

			console.log('FTP Error: ', error);
			await this.handlerCloseConnection();
			throw new FtpAccessDeniedError();
		}
	}
}
