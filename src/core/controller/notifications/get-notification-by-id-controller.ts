import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { makeGetNotificationByIdUseCase } from '@/core/factories/notifications/make-get-notification-by-id-use-case';

export async function getNotificationByIdController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const paramsSchema = z.object({
		notificationId: z.string().uuid(),
	});

	const { notificationId } = paramsSchema.parse(request.params);

	try {
		const getNotificationByIdUseCase = makeGetNotificationByIdUseCase();

		const { notification } = await getNotificationByIdUseCase.execute({
			notificationId,
		});

		return reply.status(200).send(notification);
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		return reply.status(500).send();
	}
}
