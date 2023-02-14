import type { Statistics } from '$types';
import { fetchGetRequest, type GenericResponse } from './api';

export async function fetchStatistics(): Promise<GenericResponse<Statistics>> {
	const response = await fetchGetRequest<Statistics>('common/statistics');

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}
