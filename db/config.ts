import { defineDb } from 'astro:db';

import * as schemas from './schemas';

// https://astro.build/db/config
export default defineDb({
	tables: { ...schemas }
});
