<script lang="ts">
	import { page } from '$app/stores';
	import { HeartIcon } from 'lucide-svelte';

	import { cn } from '$lib/utils';

	const links = [
		{ name: 'Terms of Service', href: '/terms' },
		{ name: 'Privacy Policy', href: '/privacy' }
	];
</script>

<footer
	class="mt-auto flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-200 px-4 py-6 sm:flex-row md:px-6"
>
	<p class="text-xs text-gray-500">
		&copy; Outdoors Explorers. Made with <HeartIcon
			class="inline-block size-4 fill-rose-500 text-rose-500"
		/>.
	</p>

	<nav class="flex gap-4 sm:ml-auto sm:gap-6">
		{#each links as { href, name } (name)}
			<a
				{href}
				class={cn(
					'text-xs text-gray-500 underline-offset-4 hover:text-primary hover:underline',
					$page.url.pathname === href ? 'font-semibold text-primary' : 'text-gray-700'
				)}
			>
				{name}
			</a>
		{/each}
	</nav>
</footer>
