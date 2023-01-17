import {
	convertArray,
	convertFetchedSourceToSource,
	type FetchedBookProperties,
	type FetchedJournalProperties,
	type FetchedSource,
	type FetchedWebProperties,
	type Source,
	type SourceType
 } from '$types';

import {
	fetchGetRequest,
	fetchPostRequest,
	fetchProtectedDeleteRequest,
	fetchProtectedPostRequest,
	type GenericResponse
} from './api';


//export type SourceTypeFilter: SourceType[]

export type GetDeleteSourceResponse = {
	definitions: string[];
};

export async function fetchDeleteSource(
	token: string,
	id: string
): Promise<GenericResponse<string[]>> {
	const response = await fetchProtectedDeleteRequest<GetDeleteSourceResponse>(token, 'sources', {
		id: id
	});

	return {
		message: response.message,
		error: response.error,
		data: response.data?.definitions
	};
}

type GetFetchedSourceResponse = {
	source: FetchedSource;
};

export type GetSourceResponse = {
	source: Source;
};

export async function fetchSourceById(id: string): Promise<GenericResponse<Source>> {
	const response = await fetchGetRequest<GetFetchedSourceResponse>('sources/source', {
		id: id
	});

	let data: GetSourceResponse | undefined = undefined;
	
	if (response.data) {
		data = {
			source: convertFetchedSourceToSource(response.data?.source)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.source
	};
}

export type CreateSourceRequest = {
	type: SourceType;
	authors: string[];
	bookProperties?: FetchedBookProperties;
	journalProperties?: FetchedJournalProperties;
	webProperties?: FetchedWebProperties;
}

export type CreateSourceResponse = {
	sourceId: string
}

export async function fetchCreateSource(
	token: string,
	request: CreateSourceRequest
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedPostRequest<CreateSourceResponse>(
		token,
		'sources',
		request
	);

	return {
		message: response.message,
		error: response.error,
		data: response.data?.sourceId
	};
}

//TODO: Filter testen und Request Testen


type SourceFilter = {
	approved?: boolean,
	types?: SourceType[],
	title?: string,
	authorIds?: string[]
}

export type GetSourcePageRequest = {
	page: number;
	pageSize: number;
	filter?:SourceFilter;
}

type GetFetchedSourcesResponse = {
	sources: FetchedSource[];
};

export type GetSourcePageResponse = {
	sources: Source[];
};

export async function fetchSourcePage(
	request: GetSourcePageRequest
): Promise<GenericResponse<Source[]>> {
	const response = await fetchPostRequest<GetFetchedSourcesResponse>(
		'sources/page',
		request
	);

	let data: GetSourcePageResponse | undefined = undefined;

	if (response.data) {
		data = {
			sources: convertArray<FetchedSource, Source>(
				response.data?.sources,
				convertFetchedSourceToSource
			)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.sources
	};
}