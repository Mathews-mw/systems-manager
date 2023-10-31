import fs from 'node:fs';
import { resolve } from 'node:path';

import upload from '@/config/upload';
import { IStorageProvider } from './implementations/IStorageProvider';

export class StorageProvider implements IStorageProvider {
	async save(oldFileName: string, newPath: string): Promise<string> {
		await fs.promises.rename(resolve(upload.tmpFolder, oldFileName), newPath);

		return newPath;
	}

	async delete(file: string): Promise<void> {
		const fileName = resolve(upload.tmpFolder, file);

		try {
			await fs.promises.stat(fileName);
		} catch (error) {
			return;
		}

		await fs.promises.unlink(fileName);
	}
}
