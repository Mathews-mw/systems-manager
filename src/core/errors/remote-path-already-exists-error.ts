export class RemotePathAlreadyExistsError extends Error {
	constructor() {
		super(`Já existe um diretório para essa aplicação cadastrado.`);
	}
}
