import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$types: path.resolve('./src/types'),
			$components: path.resolve('./src/components'),
			$api: path.resolve('./src/api'),
			$static: path.resolve('./src/static'),
			$utils: path.resolve('./src/utils'),
			$stores: path.resolve('./src/stores')
		}
	}
};

export default config;
