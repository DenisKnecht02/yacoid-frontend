import { goto } from '$app/navigation';
import type { Author, OrganizationAuthor, Params, PersonAuthor } from '$types';

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

export function getSingleAuthorDisplayName(authorParam: Author): string {
	let authorDisplayName: string = '';
	if (authorParam.type === 'person') {
		let personAuthor: PersonAuthor = authorParam as PersonAuthor;
		authorDisplayName = personAuthor.lastName + ', ' + personAuthor.firstName;
	} else {
		let organizationAuthor: OrganizationAuthor = authorParam as OrganizationAuthor;
		authorDisplayName = organizationAuthor.organizationName;
	}

	return authorDisplayName;
}
