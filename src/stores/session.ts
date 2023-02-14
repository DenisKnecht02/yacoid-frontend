import { writable } from 'svelte/store';
import type { AuthToken } from '@authorizerdev/authorizer-js';
import type { Definition, UserDefinition } from '$types';

export const session = writable<AuthToken | undefined>(undefined);
export const currentSubmittedDefinition = writable<UserDefinition | undefined>(undefined);
export const currentRejectionLogDefinition = writable<UserDefinition | undefined>(undefined);
