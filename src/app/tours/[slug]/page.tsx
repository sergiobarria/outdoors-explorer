import { getTourBySlug } from '@/lib/tours';
import { notFound } from 'next/navigation';

export default async function TourDetailsPage({ params }: { params: { slug: string } }) {
	const tour = await getTourBySlug(params.slug);
	if (!tour) notFound();

	return (
		<div>
			<h1>Tour Details Slug: {params.slug}</h1>
			<p>This is the tour details page.</p>
			<pre>{JSON.stringify(tour, null, 2)}</pre>
		</div>
	);
}
