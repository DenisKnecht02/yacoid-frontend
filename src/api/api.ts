export type GenericResponse<T> = {
	message: string;
	error: any; // TODO: { errorCode, errorMessage }
	data: T | undefined;
};

function generateBrokenRequest(error: any): GenericResponse<any> {
	return {
		message: 'Broken response',
		error: error,
		data: undefined
	};
}

export async function fetchPostRequest<T>(
	endpoint: string,
	body: any,
	headers?: HeadersInit
): Promise<GenericResponse<T>> {
	return new Promise<GenericResponse<T>>((resolve, reject) => {
		let url: string = `${import.meta.env['VITE_API_URL']}/api/v1/${endpoint}`;

		headers = { ...headers, 'Content-Type': 'application/json' };

		fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: headers,
			body: JSON.stringify(body)
		})
			.then((json) => json.json())
			.then((response: GenericResponse<T>) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(`Failed to fetch ${endpoint}`);
				console.error(error);
				resolve(generateBrokenRequest(error));
			});
	});
}

export type FetchParams = {
	[index: string]: string | number | undefined;
};
export async function fetchProtectedGetRequest<T>(
	token: string,
	endpoint: string,
	params?: FetchParams
): Promise<GenericResponse<T>> {
	return new Promise<GenericResponse<T>>((resolve, reject) => {
		let url: string = `${import.meta.env['VITE_API_URL']}/api/v1/${endpoint}`;

		if (params) {
			let keys = Object.keys(params);
			for (let i = 0; i < keys.length; i++) {
				if (i === 0) url += `?${keys[i]}=${params[keys[i]]}`;
				else url += `&${keys[i]}=${params[keys[i]]}`;
			}
		}

		fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			mode: 'cors'
		})
			.then((json) => json.json())
			.then((response: GenericResponse<T>) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(`Failed to fetch ${endpoint}`);
				console.error(error);
				resolve(generateBrokenRequest(error));
			});
	});
}

export async function fetchGetRequest<T>(
	endpoint: string,
	params?: FetchParams
): Promise<GenericResponse<T>> {
	return new Promise<GenericResponse<T>>((resolve, reject) => {
		let url: string = `${import.meta.env['VITE_API_URL']}/api/v1/${endpoint}`;

		if (params) {
			let keys = Object.keys(params);
			for (let i = 0; i < keys.length; i++) {
				if (i === 0) url += `?${keys[i]}=${params[keys[i]]}`;
				else url += `&${keys[i]}=${params[keys[i]]}`;
			}
		}

		fetch(url, {
			mode: 'cors'
		})
			.then((json) => json.json())
			.then((response: GenericResponse<T>) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(`Failed to fetch ${endpoint}`);
				console.error(error);
				resolve(generateBrokenRequest(error));
			});
	});
}

export async function fetchProtectedPostRequest<T>(
	token: string,
	endpoint: string,
	body: any,
	headers?: HeadersInit
): Promise<GenericResponse<T>> {
	return new Promise<GenericResponse<T>>((resolve, reject) => {
		let url: string = `${import.meta.env['VITE_API_URL']}/api/v1/${endpoint}`;

		headers = {
			...headers,
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		};

		fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: headers,
			body: JSON.stringify(body)
		})
			.then((json) => json.json())
			.then((response: GenericResponse<T>) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(`Failed to fetch ${endpoint}`);
				console.error(error);
				resolve(generateBrokenRequest(error));
			});
	});
}
