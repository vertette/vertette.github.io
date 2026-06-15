import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { readdirSync } from 'fs'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getContentRoutes(dir: string, base: string) {
  try {
    return readdirSync(path.join(__dirname, dir))
      .filter((file) => !file.startsWith('.'))
      .map((file) => `/${base}/${file.replace(/(?:[0-9]{2,3}\.)?(.*)\.[a-z]{2,4}/, '$1')}`)
  } catch (e) {
    console.warn(`Could not read content from ${dir}:`, e.message)
    return []
  }
}

const postRoutes = getContentRoutes('/content/post', 'post')

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/png', href: '/img/favicon.png' }],
      script: [{ src: 'https://kit.fontawesome.com/f626f8f6d9.js', defer: 'true' }],
      title: "Vertette's Blog",
      meta: [
        {
          name: 'description',
          content: 'A blog where an obscure indie dev dumps his thoughts sometimes.',
        },
      ],
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
    },
  },
  nitro: {
    prerender: {
      routes: ['/', 'feed.xml', ...postRoutes],
      crawlLinks: true,
    },
  },
  content: {
    watch: {
      port: 4000,
      showURL: true,
    },
  },
  dev: true,
  ssr: false,
  compatibilityDate: '2026-06-12',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/tailwind.css'],
})
