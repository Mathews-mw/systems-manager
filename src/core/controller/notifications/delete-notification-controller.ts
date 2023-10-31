import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { makeDeleteNotificationUseCase } from '@/core/factories/notifications/make-delete-notification-use-case';

export async function deleteNotificationController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramsSchema = z.object({
		notificationId: z.string().uuid(),
	});

	const { notificationId } = paramsSchema.parse(request.params);

	try {
		const deleteNotificationUseCase = makeDeleteNotificationUseCase();

		const result = await deleteNotificationUseCase.execute({
			notificationId,
		});

		return reply.status(200).send(result);
	} catch (error) {
		if (error instanceof NotAllowedError) {
			return reply.status(409).send({ message: error.message });
		}

		return reply.status(500).send();
	}
}
