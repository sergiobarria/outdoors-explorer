import { Button } from '@/components/ui/button';
import { getFeaturedTours } from '@/lib/tours';
import Image from 'next/image';

export default async function Home() {
	const tours = await getFeaturedTours();
	return (
		<div>
			hellowww
			<Button>Click me</Button>
			<pre>{JSON.stringify(tours, null, 2)}</pre>
		</div>
	);
}
