import { goto } from '$app/navigation';

export function changeRoute(href: string) {
    goto('/' + href);
}

