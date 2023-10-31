import * as ftp from 'basic-ftp';

interface IUploadFileRequest {
	localPath: string;
	remotePath: string;
}

interface IRenameRequest {
	path: string;
	newPath: string;
}

export class FtpManager {
	private client = new ftp.Client();

	static async create(host: string): Promise<FtpManager> {
		const instance = new FtpManager();
		await instance.setup(host);
		return instance;
	}

	async close() {
		await this.client.close();
	}

	private async setup(host: string): Promise<void> {
		// fazer o tratamento do erro em caso que o host não seja válido!!
		await this.client.access({
			host,
			user: 'sistemas',
			password: 'equipedi',
			secure: false, // true for FTPS and false for FT
		});

		this.client.ftp.verbose = true;
	}

	async listFiles(path: string): Promise<ftp.FileInfo[]> {
		const files = await this.client.list(path);

		return files;
	}

	async ensureDir(remoteDirPath: string): Promise<void> {
		await this.client.ensureDir(remoteDirPath);
	}

	async uploadFile({ localPath, remotePath }: IUploadFileRequest): Promise<ftp.FTPResponse> {
		this.client.trackProgress((info) => {
			console.log('File', info.name);
			console.log('Type', info.type);
			console.log('Transferred', info.bytes);
			console.log('Transferred Overall', info.bytesOverall);
		});

		const result = await this.client.uploadFrom(localPath, remotePath);
		console.log('result: ', result);

		return result;
	}

	async renameFile({ path, newPath }: IRenameRequest): Promise<ftp.FTPResponse> {
		const result = await this.client.rename(path, newPath);

		return result;
	}

	async remove(path: string): Promise<ftp.FTPResponse> {
		const result = await this.client.remove(path);

		return result;
	}
}
