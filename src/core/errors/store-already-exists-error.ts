export class StoreAlreadyExistsError extends Error {
	constructor() {
		super(`O IP fornecido já está cadastrado.`);
	}
}
