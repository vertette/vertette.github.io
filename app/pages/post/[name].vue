<script setup>
	const router = useRouter()
	const route = useRoute()

	const post = await queryCollection("posts").path(route.path).first()

	const filterByAuthor = (author) => router.push({ path: '/', query: { author } })
	const filterByCat = (category) => router.push({ path: '/', query: { category } })

	onMounted(() => {
		document.querySelectorAll("#post a").forEach((c) => {
			if (c.getAttribute("href") && c.getAttribute("href").startsWith("/"))
				c.addEventListener("click", (e) => {
					e.preventDefault()
					this.$router.push(c.getAttribute("href"))
				})
			else c.setAttribute("target", "_blank")
		})
	})

	useSeoMeta({
		title: post.title + " - Vertette's Blog",
	})
</script>

<template>
	<Row class="my-6">
		<CardColumn :postArray="[post]" @emit-author="filterByAuthor" @emit-category="filterByCat" />
	</Row>
</template>
