import { convertArray, convertFetchedDefinitionToDefinition, type Author, type Category, type Definition, type FetchedDefinition, type Source } from '$types';
import { fetchGetRequest, fetchPostRequest, type GenericResponse } from './api';

type GetNewestFetchedDefinitionsResponse = {
	definitions: FetchedDefinition[];
};

export type GetNewestDefinitionsResponse = {
	definitions: Definition[];
};

export async function fetchNewestDefinitions(
	limit: number = 4
): Promise<GenericResponse<Definition[]>> {
	const response = await fetchGetRequest<GetNewestFetchedDefinitionsResponse>(
		'definitions/newest_definitions',
		{
			limit: limit
		}
	);

	let data: GetNewestDefinitionsResponse | undefined = undefined;

	if (response.data) {
		data = {
			definitions: convertArray<FetchedDefinition, Definition>(response.data?.definitions, convertFetchedDefinitionToDefinition)
		}
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.definitions
	};
}

export type GetPageCountRequest = {
	pageSize: number;
	filter?: DefinitionFilter;
};

export type GetPageCountResponse = {
	count: number;
};

export type DefinitionFilter = {
	content?: string;
	categories?: Category[];
	authorIds?: string[];
	publishingYears?: number[];
};

export async function fetchPageCount(
	request: GetPageCountRequest
): Promise<GenericResponse<number>> {
	const response = await fetchPostRequest<GetPageCountResponse>('definitions/page_count', request);
	return {
		message: response.message,
		error: response.error,
		data: response.data?.count
	};
}
