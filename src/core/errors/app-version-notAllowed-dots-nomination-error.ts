export class AppVersionNotAllowedDotsNominationError extends Error {
	constructor() {
		super(`Não é permitido usar o ponto para compor o nome do arquivo.`);
	}
}
