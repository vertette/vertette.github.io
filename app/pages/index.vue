<script setup>
const router = useRouter()
const route = useRoute()
const postsPerPage = 8

const currentPage = computed(() => Number(route.query.page) || 1)
const filterCategory = computed(() => route.query.category || '')
const filterAuthor = computed(() => route.query.author || '')

function buildBaseQuery() {
  let query = queryCollection('posts').order('date', 'DESC')
  if (filterCategory.value) query = query.where('category', 'LIKE', `%${filterCategory.value}%`)
  if (filterAuthor.value) query = query.where('author', '=', filterAuthor.value)
  return query
}

const { data } = await useAsyncData(
  () => `${currentPage.value}-${filterCategory.value}-${filterAuthor.value}`,
  async () => {
    const total = await buildBaseQuery().count()
    const posts = await buildBaseQuery()
      .skip((currentPage.value - 1) * postsPerPage)
      .limit(postsPerPage)
      .all()
    return { posts, total }
  },
  { watch: [currentPage, filterCategory, filterAuthor] },
)

const filteredPosts = computed(() => data.value?.posts ?? [])
const filteredPostsLength = computed(() => data.value?.total ?? 0)
const pageLength = computed(() => Math.ceil(filteredPostsLength.value / postsPerPage))

const buildQuery = (overrides, page = 1) => {
  const base = {
    ...(filterCategory.value && { category: filterCategory.value }),
    ...(filterAuthor.value && { author: filterAuthor.value }),
    ...overrides,
  }
  if (page > 1) base.page = page
  else delete base.page
  window.scrollTo(0, 0)

  return Object.fromEntries(Object.entries(base).filter(([, v]) => v))
}

const filterByAuthor = (author) => router.push({ query: buildQuery({ author, category: null }) })
const filterByCat = (category) => router.push({ query: buildQuery({ category, author: null }) })
const updatePosts = (pageNo) => {
  if (pageNo === currentPage.value) return
  router.push({ query: buildQuery({}, pageNo) })
}
</script>
<template>
  <Row>
    <CardColumn v-if="filteredPosts.length" :postArray="filteredPosts" @emit-author="filterByAuthor" @emit-category="filterByCat" />
    <NotFound v-else />
    <Pagination v-if="filteredPosts.length && filteredPostsLength > postsPerPage" :currentPage="currentPage" :pageLength="pageLength" @emit-number="updatePosts" />
  </Row>
</template>
