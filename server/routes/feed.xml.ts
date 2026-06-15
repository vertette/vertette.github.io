import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const feed = new Feed({
    title: "Vertette's Blog",
    description: 'A blog where an obscure indie dev dumps his thoughts sometimes.',
    id: 'https://vertette.github.io/',
    link: 'https://vertette.github.io/',
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
      id: `https://vertette.github.io/${post.path}`,
      link: `https://vertette.github.io/${post.path}`,
      description: post.description ?? '',
      date: new Date(post.date),
    })
  }

  setHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
