<script lang="ts">
	import type { PageData } from './$types';
	import {
		HourglassIcon,
		DollarSignIcon,
		UserIcon,
		FootprintsIcon,
		CalendarIcon
	} from 'lucide-svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import { formatCurrency, formatDate } from '$lib/utils';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();
</script>

<section class="w-full py-12 md:py-24">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center space-y-4 text-center">
			<div class="space-y-2">
				<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Discover Earth's Hidden Wonders
				</h1>
				<p class="mx-auto max-w-[700px] text-pretty text-gray-400 md:text-xl">
					Embark on eco-friendly journeys to the most breathtaking destinations on our
					planet.
				</p>
			</div>

			<div class="space-x-4">
				<Button href="/tours" class="">Export Tours</Button>
				<Button href="/about" variant="outline">Learn More</Button>
			</div>
		</div>
	</div>
</section>

<section id="featured-tours">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center space-y-8">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
				Popular Tours
			</h2>
			<p class="mx-auto max-w-[700px] text-pretty text-gray-400 md:text-xl">
				Discover the most popular tours that our customers love.
			</p>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.featuredTours as tour}
				<div class="flex flex-col space-y-4">
					<div class="relative">
						<img
							src={tour.images?.at(0)}
							alt={tour.name}
							class="h-64 w-full rounded-lg object-cover"
						/>
						<!-- Image green overlay gradient -->
						<div
							class="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary to-purple-700 opacity-50 transition-opacity duration-300 hover:opacity-0"
						></div>
					</div>

					<div class="flex h-full flex-col">
						<div class="mb-4 flex flex-col space-y-2">
							<h3 class="text-xl font-bold">{tour.name}</h3>
							<p class="text-gray-500">{tour.summary}</p>
						</div>

						<!-- Display price, maxGroupSize, duration and difficulty -->
						<div class="mt-auto grid grid-cols-2 gap-3 text-sm text-gray-500">
							<div class="flex items-center space-x-2">
								<CalendarIcon class="size-5 text-primary" />
								<span>{formatDate(tour.startDates?.at(0)?.date || '')}</span>
							</div>
							<!-- <div class="flex items-center space-x-2">
								<DollarSignIcon class="size-5 text-primary" />
								<span>{formatCurrency(tour.price / 100)}</span>
							</div> -->
							<div class="flex items-center space-x-2">
								<UserIcon class="size-5 text-primary" />
								<span class="capitalize">{tour.maxGroupSize} people</span>
							</div>
							<div class="flex items-center space-x-2">
								<HourglassIcon class="size-5 text-primary" />
								<span class="capitalize">{tour.duration} days</span>
							</div>
							<div class="flex items-center space-x-2">
								<FootprintsIcon class="size-5 text-primary" />
								<span class="capitalize">{tour.difficulty}</span>
							</div>
						</div>

						<hr class="my-4 border-gray-200" />
						<!-- Display price and go to details button -->
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-2">
								<DollarSignIcon class="size-5 text-primary" />
								<span class="text-xl font-semibold"
									>{formatCurrency(tour.price / 100)}</span
								>
							</div>
							<Button href={`/tours/${tour.slug}`}>See Details</Button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
