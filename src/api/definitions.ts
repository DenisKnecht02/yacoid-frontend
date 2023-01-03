import {
	convertArray,
	convertFetchedDefinitionToDefinition,
	type Author,
	type Category,
	type Definition,
	type FetchedDefinition,
	type Source
} from '$types';
import { fetchGetRequest, fetchPostRequest, type FetchParams, type GenericResponse } from './api';

type GetFetchedDefinitionsResponse = {
	definitions: FetchedDefinition[];
};

export type GetDefinitionsResponse = {
	definitions: Definition[];
};

type GetFetchedDefinitionResponse = {
	definiton: FetchedDefinition;
};

export type GetDefinitionResponse = {
	definiton: Definition;
};

export async function fetchNewestDefinitions(
	limit: number = 4
): Promise<GenericResponse<Definition[]>> {
	const response = await fetchGetRequest<GetFetchedDefinitionsResponse>(
		'definitions/newest_definitions',
		{
			limit: limit
		}
	);

	let data: GetDefinitionsResponse | undefined = undefined;

	if (response.data) {
		data = {
			definitions: convertArray<FetchedDefinition, Definition>(
				response.data?.definitions,
				convertFetchedDefinitionToDefinition
			)
		};
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

export type GetPageRequest = {
	pageSize: number;
	page: number;
	filter?: DefinitionFilter;
};

export async function fetchDefinitionsPage(
	request: GetPageRequest
): Promise<GenericResponse<Definition[]>> {
	const response = await fetchPostRequest<GetFetchedDefinitionsResponse>(
		'definitions/page',
		request
	);

	let data: GetDefinitionsResponse | undefined = undefined;

	if (response.data) {
		data = {
			definitions: convertArray<FetchedDefinition, Definition>(
				response.data?.definitions,
				convertFetchedDefinitionToDefinition
			)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.definitions
	};
}

export async function fetchDefinitionById(id: string): Promise<GenericResponse<Definition>> {
	const response = await fetchGetRequest<GetFetchedDefinitionResponse>('definitions/definition', {
		id: id
	});

	let data: GetDefinitionResponse | undefined = undefined;

	if (response.data) {
		data = {
			definiton: convertFetchedDefinitionToDefinition(response.data?.definiton)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.definiton
	};
}

export type SubmitDefinitionRequest = {
	title: string;
	content: string;
	publishingDate?: string;
	category: Category;
	sourceId: string;
};

export type SubmitDefinitionResponse = {
	definitonId: string;
};

export async function fetchSubmitDefinition(
	request: SubmitDefinitionRequest
): Promise<GenericResponse<string>> {
	const response = await fetchPostRequest<SubmitDefinitionResponse>('definitions/submit', request);

	return {
		message: response.message,
		error: response.error,
		data: response.data?.definitonId
	};
}
