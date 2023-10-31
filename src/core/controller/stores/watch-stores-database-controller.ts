import { FastifyReply, FastifyRequest } from 'fastify';

import { StoreAlreadyExistsError } from '@/core/errors/store-already-exists-error';
import { makeWatchStoresDatabaseUseCase } from '@/core/factories/stores/make-watch-stores-database-use-case';

export async function watchStoresDataBaseController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	try {
		const watchStoresDatabaseUseCase = makeWatchStoresDatabaseUseCase();

		const result = await watchStoresDatabaseUseCase.execute();

		return reply.status(200).send(result);
	} catch (error) {
		if (error instanceof StoreAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
