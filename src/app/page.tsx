import Image from 'next/image';
import Link from 'next/link';
import {
	CalendarIcon,
	DollarSignIcon,
	FootprintsIcon,
	HourglassIcon,
	UserIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getFeaturedTours } from '@/lib/tours';
import { formatCurrency, formatDate } from '@/lib/utils';
import { TourList } from '@/db/types';

export default async function Home() {
	const featuredTours = await getFeaturedTours();

	return (
		<>
			<section className="relative h-[70vh] w-full py-12 md:py-24">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<Image
						src="/hero-1.webp"
						alt="Background Image"
						fill
						quality={80}
						priority
						className="pointer-events-none object-cover"
					/>
				</div>

				{/* Dark overlay */}
				<div className="absolute inset-0 z-10 bg-black opacity-50"></div>

				<div className="relative z-20 flex h-full items-center justify-center px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
								Discover Earth&apos;s Hidden Wonders
							</h1>
							<p className="mx-auto max-w-[700px] text-pretty text-gray-300 md:text-xl">
								Embark on eco-friendly journeys to the most breathtaking
								destinations on our planet.
							</p>
						</div>

						<div className="space-x-4">
							<Button asChild>
								<Link href="/tours">Explore Tours</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/about">Learn More</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section id="featured-tours" className="py-16">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-8">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Popular Tours
						</h2>
						<p className="mx-auto max-w-[700px] text-pretty text-gray-400 md:text-xl">
							Discover the most popular tours that our customers love.
						</p>
					</div>

					<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{featuredTours.map((tour) => (
							<FeaturedTourCard key={tour.id} tour={tour} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}

interface FeaturedTourCardProps {
	tour: TourList;
}

function FeaturedTourCard({ tour }: FeaturedTourCardProps) {
	return (
		<div className="group flex flex-col space-y-4">
			<div className="relative h-full overflow-hidden rounded-lg">
				<Image
					src={tour.images.at(0) as string}
					alt={tour.name}
					width={600}
					height={400}
					className="h-64 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				{/* Image gradient */}
				<div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary via-primary to-lime-500 opacity-50 transition-opacity duration-300 group-hover:opacity-0"></div>
			</div>

			<div className="flex h-full flex-col">
				<div className="mb-4 flex flex-col space-y-2">
					<Link
						href={`/tours/${tour.slug}`}
						className="underline-offset-2 hover:underline"
					>
						<h3 className="text-xl font-bold">{tour.name}</h3>
					</Link>
					<p className="text-gray-500">{tour.summary}</p>
				</div>

				<div className="mt-auto grid grid-cols-2 gap-3 text-sm text-gray-500">
					<div className="flex items-center space-x-2">
						<CalendarIcon className="size-5 text-primary" />
						<span>{formatDate(tour.startDates?.at(0) || '')}</span>
					</div>
					{/* <div className="flex items-center space-x-2">
								<DollarSignIcon className="size-5 text-primary" />
								<span>{formatCurrency(tour.price / 100)}</span>
							</div> */}
					<div className="flex items-center space-x-2">
						<UserIcon className="size-5 text-primary" />
						<span className="capitalize">{tour.maxGroupSize} people</span>
					</div>
					<div className="flex items-center space-x-2">
						<HourglassIcon className="size-5 text-primary" />
						<span className="capitalize">{tour.duration} days</span>
					</div>
					<div className="flex items-center space-x-2">
						<FootprintsIcon className="size-5 text-primary" />
						<span className="capitalize">{tour.difficulty}</span>
					</div>
				</div>

				<hr className="my-4 border-gray-200" />

				{/* Display the Tour price */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<DollarSignIcon className="size-5 text-primary" />
						<span className="text-xl font-semibold">
							{formatCurrency(tour.price / 100)}
						</span>
					</div>
					<Button>
						<Link href={`/tours/${tour.slug}`}>See Details</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
