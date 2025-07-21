export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nexus (Nuxt 3 - DaisyUI)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nexus - Nuxt 3 E-commerce Admin Dashboard' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js', body: true },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/filepond/4.32.6/filepond.min.js', body: true },
        { src: 'https://cdn.jsdelivr.net/npm/filepond-plugin-image-preview@4.6.12/dist/filepond-plugin-image-preview.min.js', body: true }
      ]
    }
  },
  css: [
    '@/assets/css/main.css',
    'filepond/dist/filepond.min.css',
    'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },
  build: {
    transpile: ['filepond']
  }
})
