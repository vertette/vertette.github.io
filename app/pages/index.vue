<script setup>
	const router = useRouter()
	const route = useRoute()

	const posts = await queryCollection("posts").order("date", "DESC").all()
	const currentPage = computed(() => Number(route.query.page) || 1)
	const filterCategory = computed(() => route.query.category || "")
	const filterAuthor = computed(() => route.query.author || "")
	const postsPerPage = 8

	const allFilteredPosts = computed(() =>
		[...new Set(posts)].filter(
			(p) =>
				(!filterCategory.value || p.category.includes(filterCategory.value)) &&
				(!filterAuthor.value || p.author === filterAuthor.value),
		),
	)
	const filteredPosts = computed(() =>
		allFilteredPosts.value.slice((currentPage.value - 1) * postsPerPage, currentPage.value * postsPerPage),
	)

	const pageLength = computed(() => Math.ceil(allFilteredPosts.value.length / postsPerPage))
	const filteredPostsLength = computed(() => allFilteredPosts.value.length)
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
	<Row class="py-6">
		<CardColumn :postArray="filteredPosts" @emit-author="filterByAuthor" @emit-category="filterByCat" />
		<Pagination
			v-if="filteredPosts.length && filteredPostsLength > postsPerPage"
			:currentPage="currentPage"
			:pageLength="pageLength"
			@emit-number="updatePosts" />
	</Row>
</template>
