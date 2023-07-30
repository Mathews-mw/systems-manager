import * as ftp from 'basic-ftp';

export class FtpManager {
	// private host: string;
	// private user: string;
	// private password: string;

	private cliente = new ftp.Client();

	constructor(host: string, user: string, password: string) {
		this.cliente.access({
			host,
			user,
			password,
			secure: false, // true for FTPS and false for FT
		});

		this.cliente.ftp.verbose = true;
	}

	async listFiles(path = '/') {
		try {
			const files = await this.cliente.list(path);

			return files;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
