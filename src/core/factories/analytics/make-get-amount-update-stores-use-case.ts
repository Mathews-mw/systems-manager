import { GetAmountUpdateStoresUseCase } from '@/core/use-cases/analytics/get-amount-update-stores-use-case';

export function makeGetAmountUpdateStoresUseCase() {
	const getAmountUpdateStoresUseCase = new GetAmountUpdateStoresUseCase();

	return getAmountUpdateStoresUseCase;
}
