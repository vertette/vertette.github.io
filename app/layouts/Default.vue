<template>
	<Container>
		<Header />
		<div class="flex w-full max-w-(--site-width) flex-1 flex-col gap-y-6 bg-(image:--content-bg) py-6">
			<slot />
		</div>
	</Container>
</template>
