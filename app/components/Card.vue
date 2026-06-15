<template>
  <div class="border-primary relative mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-xl border shadow-(--card-shadow)">
    <div v-if="$slots.title" class="bg-primary text-cta! flex flex-col gap-y-1 px-6 py-2 text-base font-bold">
      <slot name="title" />
    </div>
    <div v-if="$slots.default" class="bg-secondary shadow-primary flex flex-col flex-wrap gap-y-4 px-6 py-5 text-justify text-pretty">
      <slot />
    </div>
  </div>
</template>
