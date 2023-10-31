import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetLatestAppVersions } from '@/core/factories/app-versions/make-get-latest-app-versions';

export async function getLatestAppVersionsController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const querySchema = z.object({
		application_id: z.optional(z.string()).default(''),
	});

	const { application_id } = querySchema.parse(request.query);

	try {
		const getLatestAppVersionsUseCase = makeGetLatestAppVersions();

		const appVersions = await getLatestAppVersionsUseCase.execute({
			applicationId: application_id,
		});

		return reply.status(200).send(appVersions);
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
