import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeCreateManyStoresUserCase } from '@/core/factories/stores/make-create-many-stores-use-case';

export async function createManyStoresController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.array(
		z.object({
			id_loja: z.coerce.number(),
			name: z.string(),
			ip: z.string(),
		})
	);

	const data = bodySchema.parse(request.body);

	try {
		const createManyStoresUseCase = makeCreateManyStoresUserCase();

		const createManyResult = await createManyStoresUseCase.execute(data);

		return reply.status(200).send({ message: `Foram criado um total de ${createManyResult.count} registros` });
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
