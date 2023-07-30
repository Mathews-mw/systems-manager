import * as ftp from 'basic-ftp';
import path from 'path';

async function tfpExample() {
	const client = new ftp.Client();
	client.ftp.verbose = true;

	try {
		await client.access({
			host: '192.168.56.1',
			user: 'math',
			password: 'Mathews@2490195',
			secure: false, // true for FTPS and false for FT
		});

		console.log(await client.list());

		const localPath = path.resolve(process.cwd(), 'tmp');

		client.trackProgress((info) => {
			console.log('File', info.name);
			console.log('Type', info.type);
			console.log('Transferred', info.bytes);
			console.log('Transferred Overall', info.bytesOverall);
		});

		await client.uploadFrom(localPath, '/README.md');
	} catch (error) {
		console.log(error);
	}

	client.close();
}

tfpExample();
