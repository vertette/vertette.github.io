<script setup>
const router = useRouter()
const route = useRoute()

const post = await queryCollection('posts').path(route.path).first()
const postTitle = (post ? post.title : "Not Found") + " - Vertette's Blog" 

const filterByAuthor = (author) => router.push({ path: '/', query: { author } })
const filterByCat = (category) => router.push({ path: '/', query: { category } })

onMounted(() => {
  document.querySelectorAll('#post a').forEach((c) => {
    if (c.getAttribute('href') && c.getAttribute('href').startsWith('/'))
      c.addEventListener('click', (e) => {
        e.preventDefault()
        this.$router.push(c.getAttribute('href'))
      })
    else c.setAttribute('target', '_blank')
  })
})

useSeoMeta({
  title: postTitle,
})
</script>

<template>
  <Row>
    <CardColumn v-if="post" :postArray="[post]" :fullPost="true" @emit-author="filterByAuthor" @emit-category="filterByCat" />
    <NotFound v-else />
  </Row>
</template>
