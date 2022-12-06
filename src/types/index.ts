
/*
	Converts an array with items of type U to an array with items of type V
	with help of an converter function, that converts an item from type U to V
*/
export function convertArray<U, V>(array: U[], converter: ((item: U) => V)): V[] {

	const convertedArray: V[] = [];

	for (const item of array) {
		convertedArray.push(converter(item));
	}

	return convertedArray;

}

export type AuthorType = 'person' | 'organization';

export type FetchedDefinition = {
	id: number;
	category: Category;
	content: string;
	author: string;
	publishingDate: string;
	source: string;
	submittedBy: string;
	submittedOn: Date;
	status?: DefinitionStatus;
}

export function convertFetchedDefinitionToDefinition(fetchedDefinition: FetchedDefinition): Definition {
	return {
		...fetchedDefinition,
		publishingDate: new Date(fetchedDefinition.publishingDate)
	}
}

export type Definition = {
	id: number;
	category: Category;
	content: string;
	author: string;
	publishingDate: Date;
	source: string;
	submittedBy: string;
	submittedOn: Date;
	status?: DefinitionStatus;
};

export type DefinitionStatus = {
	status: 'approved' | 'pending' | 'declined';
	declinementMessage?: string;
};

export type AuthorProps = {
	id: string;
	slugId: string; // more readable friendly id like "max-mustermann-8361"
	submittedBy: string;
	submittedDate: Date;
	type: AuthorType;
};

export type PersonAuthorProps = {
	firstName: string;
	lastName: string;
};

export type OrganizationAuthorProps = {
	organizationName: string;
};

export type Author = AuthorProps & (PersonAuthorProps | OrganizationAuthorProps);

export type PersonAuthor = AuthorProps & PersonAuthorProps;
export type OrganizationAuthor = AuthorProps & OrganizationAuthorProps;

export type SourceType = 'book' | 'journal' | 'web';

export type Source = {
	id: string;
	submittedBy: string;
	submittedDate: Date;
	type: SourceType;
	authors: string[]; // ids of authors
	title: string;
};

export type BookSource = Source & {
	publicationDate: Date;
	publicationPlace: string;
	pagesFrom: number;
	pagesTo: number;
	edition?: string;
	publisher?: string;
	isbn?: string;
	ean?: string;
	doi?: string;
	web?: WebSourceProps;
};

export type JournalSource = Source & {
	articleName: string;
	publicationDate: Date;
	publicationPlace: string;
	pagesFrom: number;
	pagesTo: number;
	doi?: string;
	edition?: string;
	publisher?: string;
};

export type WebSourceProps = {
	url: string;
	accessDate: Date;
	publicationDate?: Date;
};

export type WebSource = Source & WebSourceProps;

export type Params = {
	[index: string]: string | undefined;
};

export type Gender = 'male' | 'female' | 'diverse';
export const Genders: Gender[] = ['male', 'female', 'diverse'];

export type Category =
	| 'human_intelligence'
	| 'artificial_intelligence'
	| 'machine_intelligence'
	| 'plant_intelligence'
	| 'alien_intelligence';
export const AllCategories: Category[] = [
	'human_intelligence',
	'artificial_intelligence',
	'machine_intelligence',
	'plant_intelligence',
	'alien_intelligence'
];

type CategoryLabelObject = {
	[index in Category]: string;
};

export const CategoryLabel: CategoryLabelObject = {
	human_intelligence: 'Human Intelligence',
	artificial_intelligence: 'Artificial Intelligence',
	alien_intelligence: 'Alien Intelligence',
	machine_intelligence: 'Machine Intelligence',
	plant_intelligence: 'Plant Intelligence'
};
