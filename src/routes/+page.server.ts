import { db } from '$lib/db';
import { getImageUrl } from '$lib/s3';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const tours = await db.query.toursTable.findMany({
		columns: { description: false, created: false, modified: false },
		where: (record, { eq }) => eq(record.isFeatured, true),
		with: {
			startDates: {
				columns: { date: true }
			},
			images: {
				columns: { imageKey: true },
				orderBy: (record, { desc }) => [desc(record.created)],
				limit: 1
			}
		},
		limit: 3
	});

	const featuredTours = tours.map((tour) => ({
		...tour,
		images: tour.images.map((image) => getImageUrl(image.imageKey))
	}));
	console.log('🚀 ~ featuredTours ~ featuredTours:', featuredTours);
	return { featuredTours };
};
