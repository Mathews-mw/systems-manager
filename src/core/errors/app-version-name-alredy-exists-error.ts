export class AppVersionNameAlredyExistsError extends Error {
	constructor(name: string) {
		super(`O nome do arquivo ${name} já foi cadastrado.`);
	}
}
