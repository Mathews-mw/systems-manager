import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { StoreAlreadyExistsError } from '@/core/errors/store-already-exists-error';
import { makeCreateStoreUseCase } from '@/core/factories/stores/make-create-store-use-case';

export async function createStoreController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.object({
		id_loja: z.coerce.number(),
		name: z.string(),
		ip: z.string(),
	});

	const { id_loja, name, ip } = bodySchema.parse(request.body);

	try {
		const createStoreUseCase = makeCreateStoreUseCase();

		const createManyResult = await createStoreUseCase.execute({
			id_loja,
			name,
			ip,
		});

		return reply.status(200).send({ message: `Operação realizada com sucesso.` });
	} catch (error) {
		if (error instanceof StoreAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
