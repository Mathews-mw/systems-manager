import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeTransferManagerUseCase } from '@/core/factories/transfer/make-transfer-manager';

export async function transferManagerController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.array(
		z.object({
			storeId: z.string(),
			appId: z.string(),
			version: z.number(),
		})
	);

	const data = bodySchema.parse(request.body);

	try {
		const transferManagerUseCase = makeTransferManagerUseCase();

		reply.status(200).send({ message: 'Operação iniciada. Aguarde enquanto a transferência de arquivos é concluída.' });

		await transferManagerUseCase.execute(data);

		return reply.status(200).send({ message: 'Operação iniciada. Aguarde enquanto a transferência de arquivos é concluída.' });
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
