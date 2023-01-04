/*
	Converts an array with items of type U to an array with items of type V
	with help of an converter function, that converts an item from type U to V
*/
export function convertArray<U, V>(array: U[], converter: (item: U) => V): V[] {
	const convertedArray: V[] = [];

	for (const item of array) {
		convertedArray.push(converter(item));
	}

	return convertedArray;
}

export type AuthorType = 'person' | 'organization';

export type FetchedAuthor = {
	id: string;
	slugId: string;
	submittedBy: string;
	submittedDate: string;
	type: AuthorType;
	personProperties: PersonAuthorProps;
	organizationProperties: OrganizationAuthorProps;
};

export type FetchedSource = {
	id: string;
	submittedBy: string;
	submittedDate: string;
	publishingDate: string;
	type: SourceType;
	authors: FetchedAuthor[];
	bookProperties: BookProperties;
	journalProperties: JournalProperties;
	webProperties: WebProperties;
};

export type FetchedRejection = {
	id: string;
	rejectedBy: string;
	rejectedDate: string;
	content: string;
};

export type Rejection = {
	id: string;
	rejectedBy: string;
	rejectedDate: Date;
	content: string;
};

export type FetchedDefinition = {
	id: string;
	category: Category;
	content: string;
	source: FetchedSource;
	submittedBy: string;
	submittedDate: string;
};

export type FetchedUserDefinition = {
	id: string;
	category: Category;
	content: string;
	source: FetchedSource;
	submittedBy: string;
	submittedDate: string;
	rejectionLog: FetchedRejection[];
};

export type Definition = {
	id: string;
	category: Category;
	content: string;
	source: Source;
	submittedBy: string;
	submittedDate: Date;
};

export type UserDefinition = {
	id: string;
	category: Category;
	content: string;
	source: Source;
	submittedBy: string;
	submittedDate: Date;
	rejectionLog: Rejection[];
};

export function convertFetchedDefinitionToDefinition(
	fetchedDefinition: FetchedDefinition
): Definition {
	return {
		...fetchedDefinition,
		submittedDate: new Date(fetchedDefinition.submittedDate),
		source: convertFetchedSourceToSource(fetchedDefinition.source)
	};
}

export function convertFetchedUserDefinitionToDefinition(
	fetchedUserDefinition: FetchedUserDefinition
): UserDefinition {
	return {
		...fetchedUserDefinition,
		submittedDate: new Date(fetchedUserDefinition.submittedDate),
		source: convertFetchedSourceToSource(fetchedUserDefinition.source),
		rejectionLog: convertArray<FetchedRejection, Rejection>(
			fetchedUserDefinition.rejectionLog,
			convertFetchedRejectionToRejection
		)
	};
}

export function convertFetchedRejectionToRejection(fetchedRejection: FetchedRejection): Rejection {
	return {
		...fetchedRejection,
		rejectedDate: new Date(fetchedRejection.rejectedDate)
	};
}

export function convertFetchedSourceToSource(fetchedSource: FetchedSource): Source {
	let source: any = { ...fetchedSource };
	source.authors = convertArray<FetchedAuthor, Author>(
		fetchedSource.authors,
		convertFetchedAuthorToAuthor
	);
	if (fetchedSource.type === 'book') {
		source.bookProperties = undefined;
		source = { ...source, ...fetchedSource.bookProperties };
		return source as BookSource;
	} else if (fetchedSource.type === 'journal') {
		source.journalProperties = undefined;
		source = { ...source, ...fetchedSource.journalProperties };
		return source as JournalSource;
	} else if (fetchedSource.type === 'web') {
		source.webProperties = undefined;
		source = { ...source, ...fetchedSource.webProperties };
		return source as WebSource;
	}
	throw `Invalid source type ${fetchedSource.type} of source ${fetchedSource.id}`;
}

export function convertFetchedAuthorToAuthor(fetchedAuthor: FetchedAuthor): Author {
	if (fetchedAuthor.type === 'person') {
		let author: any = { ...fetchedAuthor };
		author.personProperties = undefined;
		author.submittedDate = new Date(fetchedAuthor.submittedDate);
		author = { ...author, ...fetchedAuthor.personProperties };
		return author as PersonAuthor;
	} else if (fetchedAuthor.type === 'organization') {
		let author: any = { ...fetchedAuthor };
		author.organizationProperties = undefined;
		author.submittedDate = new Date(fetchedAuthor.submittedDate);
		author = { ...author, ...fetchedAuthor.organizationProperties };
		return author as OrganizationAuthor;
	}
	throw `Invalid author type ${fetchedAuthor.type} of author ${fetchedAuthor.id}`;
}

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
	publishingDate: Date;
	type: SourceType;
	authors: Author[];
};

export type BookSource = Source & BookProperties;

export type BookProperties = {
	title: string;
	pagesFrom: number;
	pagesTo: number;
	publicationDate: Date;
	publicationPlace?: string;
	edition?: string;
	publisher?: string;
	isbn?: string;
	ean?: string;
	doi?: string;
};

export type JournalSource = Source & JournalProperties;

export type JournalProperties = {
	title: string;
	articleName: string;
	pagesFrom: number;
	pagesTo: number;
	publicationDate: Date;
	publicationPlace?: string;
	edition?: string;
	publisher?: string;
	doi?: string;
};

export type WebProperties = {
	articleName: string;
	url: string;
	websiteName: string;
	accessDate: Date;
	publicationDate?: Date;
};

export type WebSource = Source & WebProperties;

export type Params = {
	[index: string]: string | undefined;
};


export type Category =
	| 'human_intelligence'
	| 'artificial_intelligence'
	| 'machine_intelligence'
	| 'plant_intelligence'
	| 'alien_intelligence';
export const Categories: Category[] = [
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
