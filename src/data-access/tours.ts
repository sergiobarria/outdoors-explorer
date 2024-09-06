import { and, db, desc, eq, like, ne, Tour, TourImage, TourStartDate } from 'astro:db';

import { getImageUrl } from '@/lib/s3';

export async function getTourList(searchQuery: string | null, limit = 100) {
	const whereCondition = searchQuery
		? and(like(Tour.name, `%${searchQuery.toLowerCase()}%`), ne(Tour.archived, true))
		: ne(Tour.archived, true);

	const tours = await db
		.select({
			id: Tour.id,
			name: Tour.name,
			slug: Tour.slug,
			price: Tour.price,
			maxGroupSize: Tour.maxGroupSize,
			duration: Tour.duration,
			difficulty: Tour.difficulty,
			rating: Tour.rating,
			ratingsQty: Tour.ratingsQty,
			summary: Tour.summary,
			image: TourImage.imageKey,
			startDate: TourStartDate.date
		})
		.from(Tour)
		.leftJoin(TourImage, eq(Tour.id, TourImage.tourId))
		.leftJoin(TourStartDate, eq(Tour.id, TourStartDate.tourId))
		.where(whereCondition)
		.groupBy(Tour.id)
		.orderBy(desc(Tour.rating))
		.limit(limit)
		.all();

	return tours.map((tour) => ({
		...tour,
		image: getImageUrl(tour.image || '')
	}));
}

export async function getFeaturedTour() {
	const tour = await db
		.select({
			tour: { id: Tour.id, name: Tour.name, summary: Tour.summary, slug: Tour.slug },
			image: TourImage.imageKey
		})
		.from(Tour)
		.leftJoin(TourImage, eq(Tour.id, TourImage.tourId))
		.where(and(Tour.isFeatured, ne(Tour.archived, true)))
		.orderBy(desc(Tour.rating))
		.limit(1)
		.get();
	console.log('🚀 ~ getFeaturedTour ~ tour:', tour);

	if (!tour) return null;

	return {
		...tour.tour,
		image: getImageUrl(tour.image || '')
	};
}

export async function getPopularTours() {
	const tours = await db
		.select({
			id: Tour.id,
			name: Tour.name,
			slug: Tour.slug,
			summary: Tour.summary,
			rating: Tour.rating,
			duration: Tour.duration,
			difficulty: Tour.difficulty,
			price: Tour.price,
			image: TourImage.imageKey
			// images: sql<string>`GROUP_CONCAT(${TourImage.imageKey})`
		})
		.from(Tour)
		.leftJoin(TourImage, eq(Tour.id, TourImage.tourId))
		.where(and(ne(Tour.archived, true)))
		.groupBy(Tour.id)
		.orderBy(desc(Tour.rating))
		.limit(4)
		.all();

	return tours.map((tour) => ({
		...tour,
		image: getImageUrl(tour.image || '')
	}));
}

export async function getTourBySlug(slug: string) {
	const tour = await db
		.select({
			id: Tour.id,
			name: Tour.name,
			slug: Tour.slug,
			price: Tour.price,
			maxGroupSize: Tour.maxGroupSize,
			duration: Tour.duration,
			difficulty: Tour.difficulty,
			discount: Tour.discount,
			rating: Tour.rating,
			ratingsQty: Tour.ratingsQty,
			summary: Tour.summary,
			description: Tour.description
		})
		.from(Tour)
		.where(eq(Tour.slug, slug))
		.groupBy(Tour.id)
		.get();
	if (!tour) return null;

	const images = await db
		.select({ image: TourImage.imageKey })
		.from(TourImage)
		.where(eq(TourImage.tourId, tour.id))
		.all();

	const startDates = await db
		.select({ id: TourStartDate.id, date: TourStartDate.date })
		.from(TourStartDate)
		.where(eq(TourStartDate.tourId, tour.id))
		.all();

	return {
		...tour,
		images: images.map((image) => getImageUrl(image.image)),
		startDates
	};
}
