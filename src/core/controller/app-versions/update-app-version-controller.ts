import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { AppVersionAlredyExists } from '@/core/errors/app-version-alredy-exists';
import { AppVersionNameAlredyExistsError } from '@/core/errors/app-version-name-alredy-exists-error';
import { makeUpdateAppVersionUseCase } from '@/core/factories/app-versions/make-update-app-version-use-case';
import { AppVersionNotAllowedDotsNominationError } from '@/core/errors/app-version-notAllowed-dots-nomination-error';

export async function updateAppVersionController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramSchema = z.object({
		id: z.string().uuid(),
	});
	const bodySchema = z.object({
		file_name: z.optional(z.string()).transform((name) => name?.trim().replaceAll(' ', '')),
		version: z.optional(z.string()),
	});

	const { id } = paramSchema.parse(request.params);
	const { version, file_name } = bodySchema.parse(request.body);

	try {
		const updateAppVersionUseCase = makeUpdateAppVersionUseCase();

		const result = await updateAppVersionUseCase.execute({
			id,
			version,
			fileName: file_name,
		});

		return reply.status(200).send(result);
	} catch (error) {
		if (error instanceof AppVersionNameAlredyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		if (error instanceof AppVersionAlredyExists) {
			return reply.status(409).send({ message: error.message });
		}

		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		if (error instanceof AppVersionNotAllowedDotsNominationError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
