import { prisma } from './libs/prisma';

const result = prisma.storeAppVersion
	.findUnique({
		where: {
			id_store_id_app_version: {
				id_store: '5f0f2aaf-4997-466d-9319-feeeca15eab7',
				id_app_version: 'c437787f-b255-4524-8a1d-33664704fbec',
			},
		},
	})
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log(error);
	});
