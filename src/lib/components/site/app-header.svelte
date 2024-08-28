<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { MountainIcon } from 'lucide-svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Tours', href: '/tours' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<header class="flex h-16 items-center border-b border-gray-100 px-4 md:px-6">
	<a href="/" class="flex items-center justify-center">
		<MountainIcon class="size-8 text-primary" />
		<span class="ml-2 text-xl font-semibold">Outdoors Explorers</span>
	</a>

	<nav class="ml-auto flex gap-4 sm:gap-6">
		{#each links as { href, name } (name)}
			<a
				{href}
				data-sveltekit-preload-data="hover"
				class={cn(
					'text-sm font-light transition-colors hover:text-primary',
					$page.url.pathname === href ? 'font-semibold text-primary' : 'text-gray-700'
				)}
			>
				{name}
			</a>
		{/each}
	</nav>
</header>
