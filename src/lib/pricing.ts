import { BOOKING_FEE, PROCESSING_FEE, SALES_TAX } from '@/constants';

/**
 * Calculate the total booking cost
 * @param basePrice - The base price per person for the booking in cents
 * @param numOfPeople - The number of people booking
 * @param discount - The discount percentage
 */
export function calculateBookingPrice(basePrice: number, numOfPeople: number, discount: number) {
	// Subtotal after discount
	const subtotal = basePrice * numOfPeople * (1 - discount / 100);

	// Sales tax calculation
	const salesTax = Math.round(subtotal * (SALES_TAX / 100));

	// Booking fee (already in cents)
	const bookingFee = BOOKING_FEE;

	// Calculate the sum before processing fee
	const beforeFee = subtotal + salesTax + bookingFee;

	// Processing fee calculation - Make sure PROCESSING_FEE is correct
	const processingFee = Math.round(beforeFee * (PROCESSING_FEE / 100));

	// Total
	const total = subtotal + salesTax + bookingFee + processingFee;

	return {
		subtotal,
		salesTax,
		bookingFee,
		processingFee,
		total
	};
}
