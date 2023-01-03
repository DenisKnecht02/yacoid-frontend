import { writable } from 'svelte/store';
import type { AuthToken } from '@authorizerdev/authorizer-js';

export const session = writable<AuthToken | undefined>(undefined);
