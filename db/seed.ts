import { db, Profile, Tour, TourImage, TourStartDate, User } from 'astro:db';
import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';

import { TOURS_SIMPLE } from 'data/tours-simple';
import { TOUR_IMAGES } from 'data/tour-images';

type NewStartDate = typeof TourStartDate.$inferInsert;
type NewTourImage = typeof TourImage.$inferInsert;

async function seedTours() {
	console.log('=> 🌱 Seeding Tours...');

	const data = TOURS_SIMPLE.map((tour) => ({
		id: createId(),
		name: tour.name,
		slug: slugify(tour.name, { lower: true }),
		duration: tour.duration,
		maxGroupSize: tour.max_group_size,
		difficulty: tour.difficulty as 'easy' | 'moderate' | 'difficult',
		rating: tour.ratings_avg,
		ratingsQty: tour.ratings_qty,
		price: tour.price * 100,
		discount: tour.discount || null,
		summary: tour.summary,
		description: tour.description,
		isFeatured: tour.is_featured || false
	}));

	const insertedTours = await db
		.insert(Tour)
		.values(data)
		.returning({ id: Tour.id, name: Tour.name });

	// Insert start dates
	const startDatesData: NewStartDate[] = TOURS_SIMPLE.flatMap((tour) => {
		const tourId = insertedTours.find((t) => t.name === tour.name)?.id;
		if (!tourId) {
			console.error('=> ❌ Error finding tour:', tour.name);
			return [];
		}

		return tour.start_dates.map((date) => ({
			id: createId(),
			tourId,
			date: new Date(date)
		}));
	});
	await db.insert(TourStartDate).values(startDatesData);

	// Insert images
	const imagesData: NewTourImage[] = TOURS_SIMPLE.flatMap((tour) => {
		const tourId = insertedTours.find((t) => t.name === tour.name)?.id;
		if (!tourId) {
			console.error('=> ❌ Error finding tour:', tour.name);
			return [];
		}

		const tourImages = TOUR_IMAGES.find((ti) => ti.id === tour.id);
		if (!tourImages) {
			console.error('=> ❌ Error finding images for tour:', tour.name);
			return [];
		}

		return tourImages.images.map((imageKey) => ({
			id: createId(),
			tourId,
			imageKey
		}));
	});
	await db.insert(TourImage).values(imagesData);
}

// https://astro.build/db/seed
export default async function seed() {
	await seedTours();

	// Add test user
	const [user] = await db
		.insert(User)
		.values({
			id: createId(),
			email: 'sergio@email.com',
			password:
				'$argon2id$v=19$m=19456,t=2,p=1$JnjYnrVUpJDVQw+Q5pp9xA$ulaKm+2lz29AaybETB++En4TCiPB6j6z1dvip6FX2mA', // password
			acceptedTerms: true
		})
		.returning({ id: User.id });

	await db.insert(Profile).values({
		id: createId(),
		userId: user.id,
		firstName: 'Sergio',
		lastName: 'b'
	});

	// Add more seed functions here...
}
