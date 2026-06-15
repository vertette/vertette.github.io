<script setup>
const props = defineProps({
  postArray: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['emit-author', 'emit-category'])
const emitAuth = (auth) => emit('emit-author', auth)
const emitCat = (cat) => emit('emit-category', cat)

const router = useRouter()
const goBack = () => {
  if (router.options.history.state.back) router.go(-1)
  else router.push('/')
}

const extractText = (node) => {
  if (Array.isArray(node)) return node.slice(2).map(extractText).join('')
  if (typeof node === 'string') return node
  return ''
}

const generateExcerpt = (bodyValue, wordLimit = 60) => {
  const fullText = bodyValue.map(extractText).join(' ')
  const wordArray = fullText.trim().split(/\s+/)
  const puncRegex = /[^A-Za-z0-9]$/m
  return wordArray.slice(0, wordLimit).join(' ').replace(puncRegex, '') + '…'
}
</script>
<template>
  <Card v-if="postArray.length" v-for="post in postArray" :id="postArray.length === 1 ? 'post' : ''" :key="post.path">
    <template v-slot:title>
      <h2>
        <NuxtLink :href="post.path">{{ post.title }}</NuxtLink>
      </h2>
      <div class="flex flex-col items-baseline justify-between lg:flex-row">
        <span
          ><i class="fa-solid fa-user mr-1" /> By <a @click="emitAuth(post.author)">{{ post.author }}</a></span
        >
        <span><i class="fa-solid fa-calendar mr-1" /> Posted {{ formatDateTime(post.date) }}</span>
        <span
          ><i class="fa-solid fa-folder mr-1" /> Filed under: <a @click="emitCat(post.category)">{{ post.category }}</a></span
        >
      </div>
    </template>
    <template v-slot:default v-if="postArray.length === 1">
      <ContentRenderer class="flex flex-col gap-4" :value="post" />
      <NuxtLink class="btn" @click="goBack">Back</NuxtLink>
    </template>
    <template v-slot:default v-else>
      {{ generateExcerpt(post.body.value) }}
      <NuxtLink class="btn" :href="post.path">Continue reading</NuxtLink>
    </template>
  </Card>
</template>
