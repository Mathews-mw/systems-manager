import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { makeDeleteAppVersionUseCase } from '@/core/factories/app-versions/mak-delete-app-version-use-case';

export async function deleteAppVersionController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = paramSchema.parse(request.params);

	try {
		const deleteAppVersionUseCase = makeDeleteAppVersionUseCase();

		const result = await deleteAppVersionUseCase.execute({
			id,
		});

		return reply.status(200).send(result);
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
