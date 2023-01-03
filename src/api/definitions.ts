import {
	convertArray,
	convertFetchedDefinitionToDefinition,
	type Author,
	type Category,
	type Definition,
	type FetchedDefinition,
	type Source
} from '$types';
import {
	fetchGetRequest,
	fetchPostRequest,
	fetchProtectedPostRequest,
	type FetchParams,
	type GenericResponse
} from './api';

type GetFetchedDefinitionsResponse = {
	definitions: FetchedDefinition[];
};

export type GetDefinitionsResponse = {
	definitions: Definition[];
};

type GetFetchedDefinitionResponse = {
	definition: FetchedDefinition;
};

export type GetDefinitionResponse = {
	definition: Definition;
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
			definition: convertFetchedDefinitionToDefinition(response.data?.definition)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.definition
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
	token: string,
	request: SubmitDefinitionRequest
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedPostRequest<SubmitDefinitionResponse>(
		token,
		'definitions/submit',
		request
	);

	return {
		message: response.message,
		error: response.error,
		data: response.data?.definitonId
	};
}

export type RejectDefinitionRequest = {
	id: string;
	content: string;
};

export async function fetchRejectDefinition(
	token: string,
	request: RejectDefinitionRequest
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedPostRequest<string>(token, 'definitions/reject', request);

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}
