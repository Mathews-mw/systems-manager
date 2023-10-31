import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetApplicationsAnalitycsUseCase } from '@/core/factories/analytics/make-get-applications-analytics';

export async function getApplicationsanalitycsController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	try {
		const getApplicationsAnalitycsUseCase = makeGetApplicationsAnalitycsUseCase();

		const result = await getApplicationsAnalitycsUseCase.execute();

		return reply.status(200).send(result);
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
