import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { RemotePathAlreadyExistsError } from '@/core/errors/remote-path-already-exists-error';
import { makeCreateRemotePathUseCase } from '@/core/factories/remote-paths/make-create-remote-path-use-case';

export async function createRemotePathController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.object({
		application_id: z.string().uuid(),
		remote_path: z.string(),
	});

	const { application_id, remote_path } = bodySchema.parse(request.body);

	try {
		const createRemotePathUseCase = makeCreateRemotePathUseCase();

		const { remotePath } = await createRemotePathUseCase.execute({
			application_id,
			remote_path,
		});

		return reply.status(200).send({ message: `O diretório ${remotePath.remote_path} foi registrado com sucesso.` });
	} catch (error) {
		if (error instanceof RemotePathAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
