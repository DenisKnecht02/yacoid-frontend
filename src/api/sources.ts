import { fetchProtectedDeleteRequest, type GenericResponse } from './api';

export type getDeleteSourceResponse = {
	definitions: string[];
};

export async function fetchDeleteSource(
	token: string,
	id: string
): Promise<GenericResponse<string[]>> {
	const response = await fetchProtectedDeleteRequest<getDeleteSourceResponse>(token, 'sources', {
		id: id
	});

	return {
		message: response.message,
		error: response.error,
		data: response.data?.definitions
	};
}
