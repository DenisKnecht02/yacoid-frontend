import {
	convertArray,
	convertFetchedAuthorToAuthor,
	type Author,
	type AuthorType,
	type FetchedAuthor,
	type OrganizationAuthorProps,
	type PersonAuthorProps
} from '$types';

import {
	fetchGetRequest,
	fetchPostRequest,
	fetchProtectedDeleteRequest,
	fetchProtectedPostRequest,
	fetchProtectedPutRequest,
	type GenericResponse
} from './api';

type GetFetchedAuthorResponse = {
	author: FetchedAuthor;
};

export type GetAuthorResponse = {
	author: Author;
};

export async function fetchAuthorById(id: string): Promise<GenericResponse<Author>> {
	const response = await fetchGetRequest<GetFetchedAuthorResponse>('authors/author', {
		id: id
	});

	let data: GetAuthorResponse | undefined = undefined;

	if (response.data) {
		data = {
			author: convertFetchedAuthorToAuthor(response.data.author)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.author
	};
}

export type CreateAuthorRequest = {
	type: AuthorType;
	personProperties?: PersonAuthorProps;
	organizationProperties?: OrganizationAuthorProps;
};

export type CreateAuthorResponse = {
	authorId: string;
};

export async function fetchCreateAuthor(
	token: string,
	request: CreateAuthorRequest
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedPostRequest<CreateAuthorResponse>(token, 'authors', request);

	return {
		message: response.message,
		error: response.error,
		data: response.data?.authorId
	};
}

export type AuthorFilter = {
	approved?: boolean;
	types?: AuthorType[];
	name?: string;
};

export type GetAuthorPageRequest = {
	page: number;
	pageSize: number;
	filter?: AuthorFilter;
};

type GetFetchedAuthorsResponse = {
	authors: FetchedAuthor[];
};

export type GetAuthorPageResponse = {
	authors: Author[];
};

export async function fetchAuthorPage(
	request: GetAuthorPageRequest,
	token?: string
): Promise<GenericResponse<Author[]>> {
	let response: GenericResponse<GetFetchedAuthorsResponse>;
	if (token) {
		response = await fetchProtectedPostRequest<GetFetchedAuthorsResponse>(
			token,
			'authors/page',
			request
		);
	} else {
		response = await fetchPostRequest<GetFetchedAuthorsResponse>('authors/page', request);
	}

	let data: GetAuthorPageResponse | undefined = undefined;

	if (response.data) {
		data = {
			authors: convertArray<FetchedAuthor, Author>(
				response.data?.authors,
				convertFetchedAuthorToAuthor
			)
		};
	}

	return {
		message: response.message,
		error: response.error,
		data: data?.authors
	};
}

export type GetAuthorPageCountRequest = {
	pageSize: number;
	filter?: AuthorFilter;
};

export type GetAuthorPageCountResponse = {
	count: number;
};

export async function fetchAuthorPageCount(
	request: GetAuthorPageCountRequest,
	token?: string
): Promise<GenericResponse<number>> {
	let response: GenericResponse<GetAuthorPageCountResponse>;
	if (token) {
		response = await fetchProtectedPostRequest<GetAuthorPageCountResponse>(
			token,
			'authors/page_count',
			request
		);
	} else {
		response = await fetchPostRequest<GetAuthorPageCountResponse>('authors/page_count', request);
	}

	return {
		message: response.message,
		error: response.error,
		data: response.data?.count
	};
}

export type ChangeAuthorRequest = {
	id: string;
	type: AuthorType;
	personProperties?: PersonAuthorProps;
	organizationProperties?: OrganizationAuthorProps;
};

export async function fetchChangeAuthor(
	token: string,
	request: ChangeAuthorRequest
): Promise<GenericResponse<string>> {
	const response = await fetchProtectedPutRequest<string>(token, 'authors', request);

	return {
		message: response.message,
		error: response.error,
		data: response.data
	};
}

export type GetDeleteAuthorResponse = {
	sources?: string[];
};

export async function fetchDeleteAuthor(
	token: string,
	id: string
): Promise<GenericResponse<string[] | undefined>> {
	const response = await fetchProtectedDeleteRequest<GetDeleteAuthorResponse>(token, 'authors', {
		id: id
	});

	return {
		message: response.message,
		error: response.error,
		data: response.data?.sources
	};
}
