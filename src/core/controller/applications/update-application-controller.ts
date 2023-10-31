import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { makeUpdateApplicationUseCase } from '@/core/factories/applications/make-update-application-use-case';

export async function updateApplicationController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramsSchema = z.object({
		id: z.string().uuid({ message: 'Somente parâmetros do tipo UUID' }),
	});

	const bodySchema = z.object({
		name: z.optional(z.string()),
		app_type: z.optional(z.enum(['EXE', 'DELPHI', 'MOBILE', 'WEB_APP'])),
		description: z.optional(z.string()),
	});

	const { id } = paramsSchema.parse(request.params);
	const { name, app_type, description } = bodySchema.parse(request.body);

	try {
		const updateApplicationUseCase = makeUpdateApplicationUseCase();

		const { application } = await updateApplicationUseCase.execute({
			id,
			name,
			app_type,
			description,
		});

		return reply.status(200).send({ message: `A aplicação ${application.name} foi atualizada com sucesso.` });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
