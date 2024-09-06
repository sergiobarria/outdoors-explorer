import { defineTable, column, NOW } from 'astro:db';

export const Tour = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		name: column.text({ unique: true }),
		slug: column.text({ unique: true }),
		duration: column.number(),
		maxGroupSize: column.number({ name: 'max_group_size' }),
		difficulty: column.text(),
		rating: column.number({ optional: true }),
		ratingsQty: column.number({ name: 'ratings_qty', optional: true }),
		price: column.number(),
		discount: column.number({ optional: true, default: 0 }),
		summary: column.text(),
		description: column.text({ optional: true }),
		isFeatured: column.boolean({ name: 'is_featured', default: false }),
		archived: column.boolean({ default: false })
	}
});

export const TourStartDate = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		tourId: column.text({ references: () => Tour.columns.id }),
		date: column.date()
	}
});

export const TourImage = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		imageKey: column.text({ name: 'image_key' }),
		tourId: column.text({ name: 'tour_id', references: () => Tour.columns.id })
	}
});
