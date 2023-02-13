import type { Stats } from "$types";
import { fetchGetRequest, type GenericResponse } from "./api";


export async function fetchStatistics(): Promise<GenericResponse<Stats>> {
	const response = await fetchGetRequest<Stats>('common/statistics');

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}
