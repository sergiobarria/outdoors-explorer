<script lang="ts">
	import type { Snippet } from 'svelte';
	import inter from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import interItalic from '@fontsource-variable/inter/files/inter-latin-wght-italic.woff2?url';

	import AppHeader from '$lib/components/site/app-header.svelte';
	import '../app.css';
	import AppFooter from '$lib/components/site/app-footer.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<!-- Preload fonts -->
	<link rel="preload" as="font" type="font/woff2" href={inter} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interItalic} crossorigin="anonymous" />

	<title>Outdoors Explorers</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<AppHeader />
	<main class="flex-1 pb-16">
		{@render children()}
	</main>
	<AppFooter />
</div>
