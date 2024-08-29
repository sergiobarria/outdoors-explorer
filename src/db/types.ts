import * as schemas from './schema';

export type Tour = typeof schemas.toursTable.$inferSelect;
export type TourImage = typeof schemas.imagesTable.$inferSelect;
export type StartDate = typeof schemas.startDatesTable.$inferSelect;
export type TourList = Omit<Tour, 'created' | 'modified' | 'description'> & {
	images: string[];
	startDates: string[];
};
