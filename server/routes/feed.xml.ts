import { Feed } from 'feed'
const baseUrl = 'https://vertette.github.io'

export default defineEventHandler(async (event) => {
  const feed = new Feed({
    title: "Vertette's Blog",
    description: 'A blog where an obscure indie dev dumps his thoughts sometimes.',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    author: {
      name: 'Vertette',
      email: 'vertettegd@gmail.com',
    },
  })

  const posts = await queryCollection(event, 'posts').order('date', 'DESC').all()

  for (const post of posts) {
    feed.addItem({
      title: post.title ?? 'Untitled',
      id: `${baseUrl}${post.path}`,
      link: `${baseUrl}${post.path}`,
      image: `${baseUrl}${post.thumbnail}`,
      description: post.description ?? '',
      date: new Date(post.date),
      author: [
        {
          name: post.author,
        },
      ],
    })
  }

  setHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
