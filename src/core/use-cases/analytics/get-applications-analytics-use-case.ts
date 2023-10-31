import { prisma } from '@/libs/prisma';

interface ItotalApptypes {
	_count: {
		_all: number;
	};
	app_type: string;
}

interface IResponse {
	totalApplications: number;
	totalApptypes: ItotalApptypes[];
}

export class GetApplicationsAnalyticsUseCase {
	async execute(): Promise<IResponse> {
		const totalApplications = await prisma.application.count();
		const totalApptypes = await prisma.application.groupBy({
			by: ['app_type'],
			_count: {
				_all: true,
			},
			orderBy: {
				app_type: 'asc',
			},
		});

		return {
			totalApplications,
			totalApptypes,
		};
	}
}
