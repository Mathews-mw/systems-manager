import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { AppVersionAlredyExists } from '@/core/errors/app-version-alredy-exists';
import { LocalFileNotExistError } from '@/core/errors/local-file-not-exist-error';
import { makeUploadAppUseCase } from '@/core/factories/app-versions/make-upload-app-use-case';

export async function uploadAppController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const MAX_FILE_SIZE = 50000000;
	// const ACCEPTED_IMAGE_TYPES = ['application/zip'];

	const uploadFileSchema = z.object({
		fieldname: z.string().min(1, { message: 'Selecione um arquivo para enviar.' }),
		originalname: z.string(),
		encoding: z.string(),
		mimetype: z.string(),
		size: z.number().refine((file) => file <= MAX_FILE_SIZE, { message: 'Max file size is 50MB.' }),
		destination: z.string(),
		filename: z.string(),
		path: z.string(),
	});

	const bodySchema = z.object({
		id_app: z.string().uuid(),
		version: z.string(),
		version_type: z.enum(['N', 'P']),
	});

	const file = uploadFileSchema.parse(request.file);
	const { id_app, version, version_type } = bodySchema.parse(request.body);

	try {
		const uploadAppUseCase = makeUploadAppUseCase();

		const result = await uploadAppUseCase.execute({
			file,
			id_app,
			version,
			version_type,
		});

		return reply.status(200).send(result);
	} catch (error) {
		if (error instanceof AppVersionAlredyExists) {
			return reply.status(409).send({ message: error.message });
		}
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}
		if (error instanceof LocalFileNotExistError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
		return reply.status(500).send();
	}
}
