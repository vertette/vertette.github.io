<template>
	<div
		class="relative mx-auto flex w-full flex-1 flex-col shadow-(--card-shadow) overflow-hidden rounded-xl border border-primary">
		<div v-if="$slots.title" class="bg-primary text-cta! font-bold flex flex-col gap-y-1 px-6 py-2 text-base">
			<slot name="title" />
		</div>
		<div
			v-if="$slots.default"
			class="bg-secondary shadow-primary flex flex-col flex-wrap gap-y-4 px-6 py-5 text-pretty text-justify">
			<slot />
		</div>
	</div>
</template>
