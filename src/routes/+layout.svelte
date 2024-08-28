<script lang="ts">
	import type { Snippet } from 'svelte';
	import inter from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import interItalic from '@fontsource-variable/inter/files/inter-latin-wght-italic.woff2?url';

	import '../app.css';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<!-- Preload fonts -->
	<link rel="preload" as="font" type="font/woff2" href={inter} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interItalic} crossorigin="anonymous" />

	<title>Outdoors Explorers</title>
</svelte:head>

{@render children()}
