import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetNotificationsUseCase } from '@/core/factories/notifications/make-get-notificartions-use-case';

export async function getNotificationsController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	try {
		const getNotificationsUseCase = makeGetNotificationsUseCase();

		const { notifications } = await getNotificationsUseCase.execute();

		return reply.status(200).send(notifications);
	} catch (error) {
		console.log(error);
		return reply.status(500).send();
	}
}
