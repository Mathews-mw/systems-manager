import { resolve } from 'path';
import crypto from 'node:crypto';
import multer from 'fastify-multer';

const tmpFolder = resolve(process.cwd(), 'tmp');

export default {
	tmpFolder,

	storage: multer.diskStorage({
		destination: tmpFolder,
		filename: (request, file, callback) => {
			const fileHash = crypto.randomBytes(8).toString('hex');
			const fileName = `${fileHash}-${file.originalname.trim().replaceAll(' ', '')}`;

			return callback(null, fileName);
		},
	}),
};
