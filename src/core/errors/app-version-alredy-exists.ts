export class AppVersionAlredyExists extends Error {
	constructor(version: string, application: string) {
		super(`A versão ${version} da aplicação ${application} já está cadastrada.`);
	}
}
