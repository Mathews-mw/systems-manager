import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetAppVersions } from '@/core/factories/app-versions/make-get-app-versions';

export async function getAppVersionsController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const querySchema = z.object({
		search: z.optional(z.string()).default(''),
		page: z.coerce.number().default(1),
		perPage: z.coerce.number().default(10),
	});

	const { search, page, perPage } = querySchema.parse(request.query);

	try {
		const getAppVersionsUseCase = makeGetAppVersions();

		const appVersions = await getAppVersionsUseCase.execute({
			search,
			page,
			perPage,
		});

		return reply.status(200).send(appVersions);
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
