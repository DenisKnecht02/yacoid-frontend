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

/*
	There is always a FetchedXXX and XXX type (e.g., FetchedDefinition and Definition). The XXX type is used for the frontend and the FetchedXXX type
	is the one that comes back from the backend. They only differ in one single point. Regarding the FetchedXXX type, the dates are strings 
	whereas the dates of the XXX type are really of type Date. Using the convertArray function, one can convert the FetchedXXX type to the XXX type.
*/

export type Statistics = {
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

/*
	Difference between Definition and UserDefinition types:
		In addition to the Definition properties, the UserDefinition includes the recjection log and status of a definition as it will be used
		for the profile page where it's necessary to have these information.
*/

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
export const AuthorTypes: AuthorType[] = ['person', 'organization'];

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

export function getAuthorsDisplayNames(...authors: Author[]): string[] {
	let displayNames: string[] = [];

	authors.forEach((author: Author) => {
		if (author.type === 'person') {
			let personAuthor: PersonAuthor = author as PersonAuthor;
			displayNames.push(`${personAuthor.lastName}, ${personAuthor.firstName}`);
		} else if (author.type === 'organization') {
			let organizationAuthor: OrganizationAuthor = author as OrganizationAuthor;
			displayNames.push(organizationAuthor.organizationName);
		}
	});

	return displayNames;
}

export function getDefinitionPublishingDate(definition: Definition): Date | undefined {
	let publishingDate: Date | undefined;

	if (definition.source.type === 'book') {
		let bookSource: BookSource = definition.source as BookSource;
		publishingDate = bookSource.publicationDate;
	} else if (definition.source.type === 'journal') {
		let journalSource: JournalSource = definition.source as JournalSource;
		publishingDate = journalSource.publicationDate;
	} else if (definition.source.type === 'web') {
		let webSource: WebSource = definition.source as WebSource;
		publishingDate = webSource.publicationDate;
	}

	return publishingDate;
}

export function getSourceDisplayName(source: Source): string {
	let displayParts: string[] = [];

	if (source.type === 'book') {
		let bookSource: BookSource = source as BookSource;
		displayParts.push(bookSource.title);
		if (bookSource.pagesFrom) {
			if (bookSource.pagesTo) {
				if (bookSource.pagesFrom === bookSource.pagesTo) {
					displayParts.push(`p. ${bookSource.pagesFrom.toString()}`);
				} else {
					displayParts.push(`p. ${bookSource.pagesFrom}-${bookSource.pagesTo}`);
				}
			} else {
				displayParts.push(`p. ${bookSource.pagesFrom.toString()}`);
			}
		}
		if (bookSource.edition) displayParts.push(bookSource.edition);
		if (bookSource.publicationPlace) displayParts.push(bookSource.publicationPlace);
		if (bookSource.publisher) displayParts.push(bookSource.publisher);
	} else if (source.type === 'journal') {
		let journalSource: JournalSource = source as JournalSource;
		displayParts.push(journalSource.title, journalSource.journalName);
		if (journalSource.pagesFrom) {
			if (journalSource.pagesTo) {
				if (journalSource.pagesFrom === journalSource.pagesTo) {
					displayParts.push(`p. ${journalSource.pagesFrom.toString()}`);
				} else {
					displayParts.push(`p. ${journalSource.pagesFrom}-${journalSource.pagesTo}`);
				}
			} else {
				displayParts.push(`p. ${journalSource.pagesFrom.toString()}`);
			}
		}
		if (journalSource.edition) displayParts.push(journalSource.edition);
		if (journalSource.publicationPlace) displayParts.push(journalSource.publicationPlace);
		if (journalSource.publisher) displayParts.push(journalSource.publisher);
	} else if (source.type === 'web') {
		let webSource: WebSource = source as WebSource;
		displayParts.push(
			webSource.articleName,
			webSource.websiteName,
			webSource.url,
			webSource.accessDate.toLocaleDateString()
		);
	}

	return displayParts.join(', ');
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
