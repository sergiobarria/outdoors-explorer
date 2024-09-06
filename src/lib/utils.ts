export function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(amount);
}

export function calculateDiscountPrice(price: number, discount: number | null) {
	if (!discount) return price;
	return price - (price * discount) / 100;
}

export function formatDate(date?: string) {
	if (!date) return '';
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * Given a date string, return a formatted date and time string
 * @param date - Date string
 * @returns Formatted date and time string (e.g. 'Jan 1, 2021 at 12:00 PM')
 */
export function formatDateTime(dateString?: string) {
	if (!dateString) return '';

	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: 'UTC' // Assuming the time should be in UTC
	};

	return date.toLocaleString('en-US', options).replace(',', ' at');
}

export function calculateDiscount(price: number, discount: number) {
	return price - (price * discount) / 100;
}

export function calculateTotalPrice(price: number, quantity: number, discount: number | null) {
	const total = price * quantity;
	if (!discount) return total;
	return total - (total * discount) / 100;
}
