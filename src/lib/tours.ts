import 'server-only';

import { unstable_cache } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { getImageUrl } from './s3';

export const getFeaturedTours = unstable_cache(
	async () => {
		const result = await db.query.toursTable.findMany({
			columns: { description: false, created: false, modified: false },
			where: (records) => eq(records.isFeatured, true),
			with: {
				startDates: {
					columns: { date: true },
					orderBy: (records, { desc }) => [desc(records.date)]
				},
				images: {
					columns: { imageKey: true },
					limit: 1
				}
			},
			limit: 3
		});

		return result.map((tour) => ({
			...tour,
			images: tour.images.map((image) => getImageUrl(image.imageKey)),
			startDates: tour.startDates.map((date) => date.date)
		}));
	},
	['featured-tours'],
	{
		tags: ['featured-tours'],
		revalidate: 60 * 60 * 24 // 24 hours
	}
);

export const getTourBySlug = unstable_cache(
	async (slug: string) => {
		const result = await db.query.toursTable.findFirst({
			where: (records) => eq(records.slug, slug),
			with: {
				images: true,
				startDates: true
			}
		});

		if (!result?.id) return null;

		return {
			...result,
			images: result.images.map((image) => getImageUrl(image.imageKey)),
			startDates: result.startDates.map((date) => date.date)
		};
	},
	['tour'],
	{
		tags: ['tour'],
		revalidate: 60 * 60 * 24
	}
);
