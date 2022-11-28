export type AuthorType = 'person' | 'organization';

export type Definition = {
	id: number;
	category: Category;
	quote: string;
	author: string;
	publishing_date: string;
	source: string;
	submittedBy: string;
	submittedOn: Date;
	status?: DefinitionStatus;
};

export type DefinitionStatus = {
	status: 'Approved' | 'Pending' | 'Declined';
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
	| 'Human Intelligence'
	| 'Artificial Intelligence'
	| 'Machine Intelligence'
	| 'Plant Intelligence'
	| 'Alien Intelligence';
export const AllCategories: Category[] = [
	'Human Intelligence',
	'Artificial Intelligence',
	'Machine Intelligence',
	'Plant Intelligence',
	'Alien Intelligence'
];
