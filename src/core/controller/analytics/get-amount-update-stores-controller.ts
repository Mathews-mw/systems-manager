import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetAmountUpdateStoresUseCase } from '@/core/factories/analytics/make-get-amount-update-stores-use-case';

export async function getAmountUpdateStoresController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	try {
		const getAmountUpdateStoresController = makeGetAmountUpdateStoresUseCase();

		const result = await getAmountUpdateStoresController.execute();

		return reply.status(200).send(result);
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
