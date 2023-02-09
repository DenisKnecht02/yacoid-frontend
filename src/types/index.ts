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

export type Stats = {
	definitionCount: number;
  definitionCountInCurrentQuarter: number;
  sourceCount: number;
  sourceCountInCurrentQuarter: number;
  authorCount: number;
  authorCountInCurrentQuarter: number;
};

export type FetchedSource = {
	id: string;
	submittedBy: string;
	submittedByName: string;
	submittedDate: string;
	type: SourceType;
	authors: FetchedAuthor[];
	bookProperties: FetchedBookProperties;
	journalProperties: FetchedJournalProperties;
	webProperties: FetchedWebProperties;
};

export type SourceType = 'book' | 'journal' | 'web';

export type Source = {
	id: string;
	submittedBy: string;
	submittedByName: string;
	submittedDate: Date;
	type: SourceType;
	authors: Author[];
};

export type FetchedBookProperties = {
	title: string;
	pagesFrom?: number;
	pagesTo?: number;
	publicationDate?: string;
	publicationPlace?: string;
	edition?: string;
	publisher?: string;
	isbn?: string;
	ean?: string;
	doi?: string;
};

export type FetchedJournalProperties = {
	title: string;
	journalName: string;
	pagesFrom?: number;
	pagesTo?: number;
	publicationDate?: string;
	publicationPlace?: string;
	edition?: string;
	publisher?: string;
	doi?: string;
};

export type FetchedWebProperties = {
	articleName: string;
	url: string;
	websiteName: string;
	accessDate: string;
	publicationDate?: string;
};

export type BookSource = Source & BookProperties;

export type BookProperties = {
	title: string;
	pagesFrom?: number;
	pagesTo?: number;
	publicationDate?: Date;
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
	journalName: string;
	pagesFrom?: number;
	pagesTo?: number;
	publicationDate?: Date;
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

export type FetchedRejection = {
	id: string;
	rejectedBy: string;
	rejectedByName: string;
	rejectedDate: string;
	content: string;
};

export type Rejection = {
	id: string;
	rejectedBy: string;
	rejectedByName: string;
	rejectedDate: Date;
	content: string;
};

export type FetchedDefinition = {
	id: string;
	category: Category;
	content: string;
	source: FetchedSource;
	submittedBy: string;
	submittedByName: string;
	submittedDate: string;
};

export type Definition = {
	id: string;
	category: Category;
	content: string;
	source: Source;
	submittedBy: string;
	submittedByName: string;
	submittedDate: Date;
};

export type FetchedUserDefinition = {
	id: string;
	category: Category;
	content: string;
	source: FetchedSource;
	submittedBy: string;
	submittedByName: string;
	submittedDate: string;
	rejectionLog: FetchedRejection[];
	status: DefinitionStatus;
};

export type UserDefinition = {
	id: string;
	category: Category;
	content: string;
	source: Source;
	submittedBy: string;
	submittedByName: string;
	submittedDate: Date;
	rejectionLog: Rejection[];
	status: DefinitionStatus;
};

export type AuthorType = 'person' | 'organization';

export type FetchedAuthor = {
	id: string;
	slugId: string;
	submittedBy: string;
	submittedByName: string;
	submittedDate: string;
	type: AuthorType;
	personProperties: PersonAuthorProps;
	organizationProperties: OrganizationAuthorProps;
};

export type Author = AuthorProps & (PersonAuthorProps | OrganizationAuthorProps);

export type AuthorProps = {
	id: string;
	slugId: string; // more readable friendly id like "max-mustermann-8361"
	submittedBy: string;
	submittedByName: string;
	submittedDate: Date;
	type: AuthorType;
};

export function getDisplayName(author: Author): string {
	let displayName: string;

	if (author.type === 'person') {
		let personAuthor: PersonAuthor = author as PersonAuthor;
		displayName = `${personAuthor.lastName}, ${personAuthor.firstName}`;
	} else if (author.type === 'organization') {
		let organizationAuthor: OrganizationAuthor = author as OrganizationAuthor;
		displayName = organizationAuthor.organizationName;
	} else {
		displayName = 'Author type is invalid.';
	}

	return displayName;
}

export type PersonAuthorProps = {
	firstName: string;
	lastName: string;
};

export type OrganizationAuthorProps = {
	organizationName: string;
};

export type PersonAuthor = AuthorProps & PersonAuthorProps;
export type OrganizationAuthor = AuthorProps & OrganizationAuthorProps;

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
		let sourceBookProperties: BookProperties = convertFetchedBookPropertiesToBookProperties(
			fetchedSource.bookProperties
		);
		source = { ...source, ...sourceBookProperties };
		return source as BookSource;
	} else if (fetchedSource.type === 'journal') {
		source.journalProperties = undefined;
		let sourceJournalProperties: JournalProperties =
			convertFetchedJournalPropertiesToJournalProperties(fetchedSource.journalProperties);
		source = { ...source, ...sourceJournalProperties };
		return source as JournalSource;
	} else if (fetchedSource.type === 'web') {
		source.webProperties = undefined;
		let sourceWebProperties: WebProperties = convertFetchedWebPropertiesToWebProperties(
			fetchedSource.webProperties
		);
		source = { ...source, ...sourceWebProperties };
		return source as WebSource;
	}
	throw `Invalid source type ${fetchedSource.type} of source ${fetchedSource.id}`;
}

export function convertFetchedBookPropertiesToBookProperties(
	fetchedBookProperties: FetchedBookProperties
): BookProperties {
	return {
		...fetchedBookProperties,
		publicationDate: fetchedBookProperties.publicationDate
			? new Date(fetchedBookProperties.publicationDate)
			: undefined
	};
}

export function convertFetchedJournalPropertiesToJournalProperties(
	fetchedJournalProperties: FetchedJournalProperties
): JournalProperties {
	return {
		...fetchedJournalProperties,
		publicationDate: fetchedJournalProperties.publicationDate
			? new Date(fetchedJournalProperties.publicationDate)
			: undefined
	};
}

export function convertFetchedWebPropertiesToWebProperties(
	fetchedWebProperties: FetchedWebProperties
): WebProperties {
	return {
		...fetchedWebProperties,
		accessDate: new Date(fetchedWebProperties.accessDate),
		publicationDate: fetchedWebProperties.publicationDate
			? new Date(fetchedWebProperties.publicationDate)
			: undefined
	};
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

export type DefinitionStatus = 'approved' | 'pending' | 'declined';

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
