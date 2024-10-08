import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react(), db()],
	output: 'server',
	experimental: {
		serverIslands: true
	},
	security: {
		checkOrigin: true
	},
	vite: {
		optimizeDeps: {
			exclude: ['astro:db']
		}
	}
});
