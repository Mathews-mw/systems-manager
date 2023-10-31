import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { Prisma } from '@prisma/client';
import { makeCreateApplicationUseCase } from '@/core/factories/applications/make-create-application-use-case';

export async function createApplicationController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.object({
		name: z.string(),
		app_type: z.enum(['EXE', 'DELPHI', 'MOBILE', 'WEB_APP', 'LAUNCHER']),
		description: z.optional(z.string()),
	});

	const { name, app_type, description } = bodySchema.parse(request.body);

	try {
		const createApplicationUseCase = makeCreateApplicationUseCase();

		const { application } = await createApplicationUseCase.execute({
			name,
			app_type,
			description,
		});

		return reply.status(200).send({ message: `A aplicação ${application.name} foi registrada com sucesso.` });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				console.log(error);
				return reply.status(409).send({ message: 'Esse nome já foi cadastrado para algum sistema.' });
			}
		}

		console.log(error);
		return reply.status(500).send();
	}
}
