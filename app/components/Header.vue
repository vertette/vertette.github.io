<script setup>
const props = defineProps(['currentMode'])
const emit = defineEmits(['change-mode'])

const linkArray = [
  { url: 'https://twitter.com/Vertette', icon: 'fa-brands fa-x-twitter' },
  { url: 'vertettegd@gmail.com', icon: 'fa-solid fa-envelope' },
  { url: 'https://cliax-games.com/', icon: 'fa-solid fa-globe' },
  { url: './feed.xml', icon: 'fa-solid fa-rss' },
]
</script>
<template>
  <header class="bg-primary text-cta! w-full">
    <Row class="h-full max-w-(--header-width)!">
      <div class="flex h-full w-full flex-row flex-wrap items-center justify-between gap-y-2 py-4">
        <div class="h-full">
          <h1><NuxtLink href="/">Vertette's Blog</NuxtLink></h1>
        </div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-sun" />
          <Checkbox @click="emit('change-mode', currentMode !== 'dark' ? 'dark' : '')" :class="{ active: currentMode === 'dark' }" tabindex="0" />
          <i class="fa-solid fa-moon" />
        </div>
        <div class="flex items-baseline gap-2">
          <h6>Stalk me:</h6>
          <a v-for="link in linkArray" :href="link.url" target="_blank"><i :class="link.icon" /></a>
        </div>
      </div>
    </Row>
  </header>
</template>
