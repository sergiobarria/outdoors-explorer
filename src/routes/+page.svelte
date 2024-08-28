<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
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
