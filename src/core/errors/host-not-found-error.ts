export class HostNotFoun extends Error {
	constructor(host: string) {
		super(`O host ${host} não foi encontrado.`);
	}
}
