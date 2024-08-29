import { getAllTours } from '@/lib/tours';

export default async function ToursPage() {
	const tours = await getAllTours();

	return (
		<div>
			<h1>Tours</h1>
			<p>This is the tours page.</p>
			<pre>{JSON.stringify(tours, null, 2)}</pre>
		</div>
	);
}
