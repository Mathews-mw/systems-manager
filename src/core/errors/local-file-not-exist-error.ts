export class LocalFileNotExistError extends Error {
	constructor() {
		super(`O Arquivo local não foi encontrado.`);
	}
}
