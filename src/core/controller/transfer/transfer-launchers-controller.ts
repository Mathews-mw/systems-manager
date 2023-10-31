import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeTransferLaunchersUseCase } from '@/core/factories/transfer/make-transfer-lauchers-use-case';

export async function transferLaunchersController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.object({
		store_id: z.string(),
		application_id: z.string(),
		version: z.string(),
	});

	const { application_id, store_id, version } = bodySchema.parse(request.body);

	try {
		const transferLaunchersUseCase = makeTransferLaunchersUseCase();

		reply.status(200).send({ message: 'Operação iniciada. Aguarde enquanto a transferência de arquivos é concluída.' });

		await transferLaunchersUseCase.execute({
			applicationId: application_id,
			storeId: store_id,
			version,
		});

		return reply.send();
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
