import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeReadAllUserNotificationsUseCase } from '@/core/factories/notifications/make-read-all-user-notifications-use-case';

export async function readAllUserNotificationController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const bodySchema = z.object({
		recipientId: z.string(),
	});

	const { recipientId } = bodySchema.parse(request.body);

	try {
		const readAllUserNotificationsUseCase = makeReadAllUserNotificationsUseCase();

		const { count } = await readAllUserNotificationsUseCase.execute({
			recipientId,
		});

		return reply.status(200).send({ message: `${count} notificações foram marcadas como lidas.` });
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
