export class FtpConnectionError extends Error {
	constructor() {
		super('Erro ao tentar a conexão com o cliente FTP');
	}
}
