import type { FetchedStats, Stats } from "$types";
import { fetchGetRequest, type GenericResponse } from "./api";

type GetFetchedStatsResponse = {
	stats: FetchedStats;
};

export type GetStatsResponse = {
	stats: Stats;
};

export async function fetchStatistics(): Promise<GenericResponse<Stats>> {
	const response = await fetchGetRequest<GetFetchedStatsResponse>('common/statistics');

	let data: GetStatsResponse | undefined = undefined;
	
	if (response.data) {
		data = {
			stats: response.data.stats
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.stats
	};
}
