import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const toursTable = sqliteTable('tours', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),

	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	duration: integer('duration').notNull(),
	maxGroupSize: integer('max_group_size').notNull(),
	difficulty: text('difficulty', { enum: ['easy', 'moderate', 'difficult'] })
		.notNull()
		.default('moderate'),
	ratingsAverage: integer('ratings_average').default(0),
	ratingsQty: integer('ratings_qty').default(0),
	price: integer('price').notNull(),
	discount: integer('discount'),
	summary: text('summary').notNull(),
	description: text('description'),
	isFeatured: integer('is_featured', { mode: 'boolean' })
});

export const startDatesTable = sqliteTable('tour_start_dates', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),

	date: text('date').notNull(),

	// Relationships
	tourId: text('tour_id')
		.notNull()
		.references(() => toursTable.id, { onDelete: 'cascade' })
});

export const imagesTable = sqliteTable('images', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),

	imageKey: text('image_key').notNull().unique(),

	// Relationships -> This are DB constraints, not useful for the ORM
	tourId: text('tour_id').references(() => toursTable.id, { onDelete: 'cascade' })
});

// =======================================
// ========== ORM RELATIONSHIPS ==========
// =======================================
export const toursRelations = relations(toursTable, ({ many }) => ({
	startDates: many(startDatesTable),
	images: many(imagesTable)
}));

export const startDatesRelations = relations(startDatesTable, ({ one }) => ({
	tour: one(toursTable, {
		fields: [startDatesTable.tourId],
		references: [toursTable.id]
	})
}));

export const imagesRelations = relations(imagesTable, ({ one }) => ({
	tour: one(toursTable, {
		fields: [imagesTable.tourId],
		references: [toursTable.id]
	})
}));
