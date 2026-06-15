<script setup>
const userMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
const storedMode = localStorage.getItem('currentMode')
const currentMode = ref(storedMode ?? userMode)
const changeMode = () => {
  currentMode.value = currentMode.value !== 'dark' ? 'dark' : ''
}

watchEffect(() => {
  localStorage.setItem('currentMode', currentMode.value)
  if (currentMode.value) document.documentElement.classList.add(currentMode.value)
  else document.documentElement.classList.remove('dark')
})
</script>
<template>
  <Container>
    <Header :currentMode="currentMode" @change-mode="changeMode" />
    <div class="flex w-full max-w-(--site-width) flex-1 flex-col gap-y-6 bg-(image:--content-bg) py-6">
      <slot />
    </div>
  </Container>
</template>
