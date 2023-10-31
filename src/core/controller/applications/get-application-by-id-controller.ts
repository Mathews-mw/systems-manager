import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { makeGetApplicationByIdUseCase } from '@/core/factories/applications/make-get-application-by-id-use-case';

export async function getApplicationByIdController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramsSchema = z.object({
		id: z.string().uuid({ message: 'Somente parâmetros do tipo UUID' }),
	});

	const { id } = paramsSchema.parse(request.params);

	try {
		const getApplicationByIdUseCase = makeGetApplicationByIdUseCase();

		const { application } = await getApplicationByIdUseCase.execute(id);

		return reply.status(200).send(application);
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
