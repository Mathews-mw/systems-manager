export class ResourceNotFoundError extends Error {
	constructor() {
		super(`O recurso não foi encontrado.`);
	}
}
