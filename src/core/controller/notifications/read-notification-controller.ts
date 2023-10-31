import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeReadNotificationUseCase } from '@/core/factories/notifications/make-read-notification-use-case';

export async function readNotificationController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.object({
		recipientId: z.string(),
		notificationId: z.string(),
	});

	const { notificationId, recipientId } = bodySchema.parse(request.body);

	try {
		const readNotificationUseCase = makeReadNotificationUseCase();

		const { notification } = await readNotificationUseCase.execute({
			notificationId,
			recipientId,
		});

		return reply.status(200).send({ message: `A notificação ${notification.title} foi marcada como lida.` });
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
