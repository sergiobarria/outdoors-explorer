import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import slugify from 'slugify';
import * as dotenv from 'dotenv';

import { toursTable, startDatesTable, imagesTable } from '../src/db/schema';
import { TOURS_SIMPLE } from '../data/tours-simple';
import { TOUR_IMAGES } from '../data/tour-images';

dotenv.config({ path: '.env' });

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
	console.error('=> ❌ Missing environment variables');
	process.exit(1);
}

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
const db = drizzle(client);

async function seedTours() {
	console.log('=> 🌱 Seeding Tours...');

	for (const tour of TOURS_SIMPLE) {
		const result = await db
			.insert(toursTable)
			.values({
				name: tour.name,
				slug: slugify(tour.name, { lower: true }),
				duration: tour.duration,
				maxGroupSize: tour.max_group_size,
				difficulty: tour.difficulty as 'easy' | 'moderate' | 'difficult',
				ratingsAverage: tour.ratings_avg,
				ratingsQty: tour.ratings_qty,
				price: tour.price * 100,
				discount: tour.discount || null,
				summary: tour.summary,
				description: tour.description,
				isFeatured: tour.is_featured || false
			})
			.returning({ tourId: toursTable.id });

		const tourId = result.at(0)?.tourId;
		if (!tourId) {
			console.error('=> ❌ Error inserting tour:', tour.name);
			continue;
		}
		console.log(`=> ✅ Inserted tour: ${tour.name}`);

		// Insert start dates
		for (const date of tour.start_dates) {
			await db.insert(startDatesTable).values({
				date: new Date(date).toISOString(),
				tourId
			});

			console.log(`=> ✅ Inserted start date: ${date} for tour: ${tour.name}`);
		}

		// Upload images to R2
		const tourImages = TOUR_IMAGES.find((ti) => ti.id === tour.id);
		if (!tourImages) {
			console.error('=> ❌ Error finding images for tour:', tour.name);
			continue;
		}

		const data = tourImages.images.map((key) => ({ tourId, imageKey: key }));
		await db.insert(imagesTable).values(data);
		console.log(`=> ✅ Inserted images for tour: ${tour.name}`);
	}
}

async function cleanTables() {
	console.log('=> 🗑️ Deleting existing data...');

	await db.delete(toursTable);
	await db.delete(startDatesTable);
	await db.delete(imagesTable);
}

async function main() {
	console.log('=> 🌱 Seeding database...');

	try {
		await cleanTables();

		await seedTours();
	} catch (err: unknown) {
		console.error('=> ❌ Seeding failed:', err);
		process.exit(1);
	}
}

main();
