import {
	convertArray,
	convertFetchedDefinitionToDefinition,
	convertFetchedUserDefinitionToDefinition,
	type Author,
	type Category,
	type Definition,
	type FetchedDefinition,
	type FetchedUserDefinition,
	type Source,
	type UserDefinition
} from '$types';
import {
	fetchGetRequest,
	fetchPostRequest,
	fetchProtectedDeleteRequest,
	fetchProtectedGetRequest,
	fetchProtectedPostRequest,
	fetchProtectedPutRequest,
	type FetchParams,
	type GenericResponse
} from './api';

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

export type GetDefinitionPageCountRequest = {
	pageSize: number;
	filter?: DefinitionFilter;
};

export type GetDefinitionPageCountResponse = {
	count: number;
};

export type DefinitionFilter = {
	content?: string;
	approved?: boolean;
	userId?: string;
	categories?: Category[];
	authors?: string[];
	publishingYears?: number[];
};

export async function fetchDefinitionPageCount(
	request: GetDefinitionPageCountRequest,
	token?: string
): Promise<GenericResponse<number>> {
	let response: GenericResponse<GetDefinitionPageCountResponse>;
	if (token) {
		response = await fetchProtectedPostRequest<GetDefinitionPageCountResponse>(
			token,
			'definitions/page_count',
			request
		);
	} else {
		response = await fetchPostRequest<GetDefinitionPageCountResponse>(
			'definitions/page_count',
			request
		);
	}
	return {
		message: response.message,
		error: response.error,
		data: response.data?.count
	};
}

export type GetDefinitionPageRequest = {
	pageSize: number;
	page: number;
	filter?: DefinitionFilter;
};

type GetFetchedDefinitionsResponse = {
	definitions: FetchedDefinition[];
};

export async function fetchDefinitionsPage(
	request: GetDefinitionPageRequest,
	token?: string
): Promise<GenericResponse<Definition[]>> {
	let response: GenericResponse<GetFetchedDefinitionsResponse>;
	if (token) {
		response = await fetchProtectedPostRequest<GetFetchedDefinitionsResponse>(
			token,
			'definitions/page',
			request
		);
	} else {
		response = await fetchPostRequest<GetFetchedDefinitionsResponse>('definitions/page', request);
	}

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

type GetOwnDefinitionsResponse = {
	definitions: UserDefinition[];
};

type GetOwnFetchedDefinitionsResponse = {
	definitions: FetchedUserDefinition[];
};

// same request as fetchDefinitionsPage but this one will be used when the user wants to see his own definitions
// this request will respond with a UserDefinition that includes the rejection log and a status of the definition in addition to a "normal" definition
export async function fetchUsersOwnDefinitionsPage(
	request: GetDefinitionPageRequest,
	token?: string
): Promise<GenericResponse<UserDefinition[]>> {
	let response: GenericResponse<GetOwnFetchedDefinitionsResponse>;
	if (token) {
		response = await fetchProtectedPostRequest<GetOwnFetchedDefinitionsResponse>(
			token,
			'definitions/page',
			request
		);
	} else {
		response = await fetchPostRequest<GetOwnFetchedDefinitionsResponse>(
			'definitions/page',
			request
		);
	}

	let data: GetOwnDefinitionsResponse | undefined = undefined;

	if (response.data) {
		data = {
			definitions: convertArray<FetchedUserDefinition, UserDefinition>(
				response.data?.definitions,
				convertFetchedUserDefinitionToDefinition
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

export type ChangeDefinitionRequest = {
	id: string;
	title?: string;
	content?: string;
	sourceId?: string;
	category?: Category;
};

export async function fetchChangeDefinition(
	token: string,
	request: ChangeDefinitionRequest
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedPutRequest<string>(token, 'definitions', request);

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}

export async function fetchApproveDefinition(
	token: string,
	id: string
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedGetRequest<string>(token, 'definitions/approve', {
		id: id
	});

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}

export async function fetchDeleteDefinition(
	token: string,
	id: string
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedDeleteRequest<string>(token, 'definitions', {
		id: id
	});

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}
