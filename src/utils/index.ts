import { goto } from '$app/navigation';
import type { Params } from '$types';

export function changeRoute(goto: Function, href: string, params?: Params) {
	let url: string = `/${href}`;

	if (params) {
		let keys = Object.keys(params);
		for (let i = 0; i < keys.length; i++) {
			if (i === 0) url += `?${keys[i]}=${params[keys[i]]}`;
			else url += `&${keys[i]}=${params[keys[i]]}`;
		}
	}

	goto(url);
}
