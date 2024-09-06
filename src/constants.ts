const { MODE, SITE, VITE_APP_BOOKING_FEE, VITE_APP_PROCESSING_FEE, VITE_APP_SALES_TAX } =
	import.meta.env;

export const BASE_URL = MODE === 'development' ? 'http://localhost:4321' : SITE;
export const BOOKING_FEE = Number(VITE_APP_BOOKING_FEE);
export const PROCESSING_FEE = Number(VITE_APP_PROCESSING_FEE);
export const SALES_TAX = Number(VITE_APP_SALES_TAX);
