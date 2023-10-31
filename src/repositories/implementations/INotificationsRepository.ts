import { Notification, Prisma } from '@prisma/client';

export interface INotificaticationsRepository {
	create(notification: Prisma.NotificationUncheckedCreateInput): Promise<Notification>;
	update(notification: Notification): Promise<Notification>;
	updateManyByRecipientId(recipientId: string): Promise<number>;
	delete(notification: Notification): Promise<void>;
	index(): Promise<Notification[]>;
	findById(id: string): Promise<Notification | null>;
	findByRecipientId(recipientId: string): Promise<Notification[]>;
}
