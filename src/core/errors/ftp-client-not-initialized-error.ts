export class FtpClientNotInitializedError extends Error {
	constructor() {
		super('O FTP Client não foi inicializado.');
	}
}
