<script setup>
	const linkArray = [
		{ url: "https://twitter.com/Vertette", icon: "fa-brands fa-x-twitter" },
		{ url: "vertettegd@gmail.com", icon: "fa-solid fa-envelope" },
		{ url: "https://cliax-games.com/", icon: "fa-solid fa-globe" },
	]
</script>
<template>
	<header class="bg-primary text-cta! w-full">
		<Row class="h-full max-w-(--header-width)!">
			<div class="flex h-full w-full flex-col lg:flex-row items-center justify-between py-4">
				<div class="h-full">
					<h1><NuxtLink href="/">Vertette's Blog</NuxtLink></h1>
				</div>
				<div class="flex gap-2">
					<h6>Stalk me:</h6>
					<a v-for="link in linkArray" :href="link.url" target="_blank"><i :class="link.icon" /></a>
				</div>
			</div>
		</Row>
	</header>
</template>
