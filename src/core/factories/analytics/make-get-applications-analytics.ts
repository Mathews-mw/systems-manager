import { GetApplicationsAnalyticsUseCase } from '@/core/use-cases/analytics/get-applications-analytics-use-case';

export function makeGetApplicationsAnalitycsUseCase() {
	const getApplicationsAnalitycsUseCase = new GetApplicationsAnalyticsUseCase();

	return getApplicationsAnalitycsUseCase;
}
