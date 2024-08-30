import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { TourDetailWithDescription } from '@/db/types';

interface TourTabsProps {
	tour: TourDetailWithDescription;
}

export function TourTabs({ tour }: TourTabsProps) {
	return (
		<Tabs defaultValue="overview" className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="itinerary">Itinerary</TabsTrigger>
				<TabsTrigger value="reviews">Reviews</TabsTrigger>
			</TabsList>

			<TabsContent value="overview">
				<h3 className="mb-4 text-xl font-semibold">Tour Overview</h3>
				<p className="mb-6 text-gray-600">{tour.description}</p>

				<h4 className="mb-3 text-lg font-semibold">Tour Highlights</h4>
				<ul className="mb-6 text-gray-600">Highlights here...</ul>

				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{tour.images.map((image) => (
						<img key={image} src={image} alt={tour.name} className="rounded-lg" />
					))}
				</div>
			</TabsContent>

			<TabsContent value="itinerary">
				<h3 className="mb-4 text-xl font-semibold">Tour Itinerary</h3>
				<p className="mb-4 text-gray-600">A day-by-day breakdown of your adventure:</p>
				{[1, 2, 3, 4, 5, 6, 7].map((day) => (
					<div key={day} className="mb-4">
						<h4 className="mb-2 text-lg font-semibold">Day {day}</h4>
						<p className="text-gray-600">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
							odio vitae vestibulum.
						</p>
					</div>
				))}
			</TabsContent>

			<TabsContent value="reviews">
				<h3 className="mb-4 text-xl font-semibold">Customer Reviews</h3>

				<div className="space-y-6">
					<p>Customer reviews will be displayed here...</p>
				</div>
			</TabsContent>
		</Tabs>
	);
}
