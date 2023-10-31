import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetStoresUseCase } from '@/core/factories/stores/make-get-stores';

export async function getStoresController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const querySchema = z.object({
		search: z.optional(z.string()).default(''),
		page: z.coerce.number().default(1),
		perPage: z.coerce.number().default(10),
	});

	const { search, page, perPage } = querySchema.parse(request.query);

	try {
		const getStoresUseCase = makeGetStoresUseCase();

		const result = await getStoresUseCase.execute({
			search,
			page,
			perPage,
		});

		return reply.status(200).send(result);
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
