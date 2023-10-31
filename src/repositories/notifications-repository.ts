import { prisma } from '@/libs/prisma';
import { Notification, Prisma } from '@prisma/client';
import { INotificaticationsRepository } from './implementations/INotificationsRepository';

export class NotificationRepository implements INotificaticationsRepository {
	async create(data: Prisma.NotificationUncheckedCreateInput): Promise<Notification> {
		const notification = await prisma.notification.create({
			data,
		});

		return notification;
	}

	async update(notification: Notification): Promise<Notification> {
		const result = await prisma.notification.update({
			data: notification,
			where: {
				id: notification.id,
			},
		});

		return result;
	}

	async delete(notification: Notification) {
		await prisma.notification.delete({
			where: {
				id: notification.id,
			},
		});
	}

	async updateManyByRecipientId(recipientId: string) {
		const result = await prisma.notification.updateMany({
			data: {
				reade_at: new Date(),
			},
			where: {
				recipient_id: recipientId,
				AND: {
					reade_at: {
						equals: null,
					},
				},
			},
		});

		return result.count;
	}

	async index() {
		const notifications = await prisma.notification.findMany({
			orderBy: {
				created_at: 'desc',
			},
		});

		return notifications;
	}

	async findById(id: string): Promise<Notification | null> {
		const notification = await prisma.notification.findUnique({
			where: {
				id,
			},
		});

		return notification;
	}

	async findByRecipientId(recipientId: string) {
		const notification = await prisma.notification.findMany({
			where: {
				recipient_id: recipientId,
			},
		});

		return notification;
	}
}
