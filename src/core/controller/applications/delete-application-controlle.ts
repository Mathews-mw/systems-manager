import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { makeDeleteApplicationUseCase } from '@/core/factories/applications/make-delete-application-use-case';

export async function deleteApplicationController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramsSchema = z.object({
		id: z.string().uuid({ message: 'Somente parâmetros do tipo UUID' }),
	});

	const { id } = paramsSchema.parse(request.params);

	try {
		const deleteApplicationUseCase = makeDeleteApplicationUseCase();

		const { message } = await deleteApplicationUseCase.execute(id);

		return reply.status(200).send({ message });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
