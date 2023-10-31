export class FtpAccessDeniedError extends Error {
	constructor() {
		super('Erro ao tentar acessar diretório. Cod: 550');
	}
}
