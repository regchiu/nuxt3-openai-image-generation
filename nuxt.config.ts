// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  typescript: {
    shim: false, // If you have enabled Take Over Mode or installed the TypeScript Vue Plugin (Volar), you can disable generating the shim for *.vue files
    strict: true
  },
  runtimeConfig: {
    openaiApiKey: ''
  },
  modules: [
    // See: https://github.com/nuxt-modules/color-mode
    '@nuxtjs/color-mode',
    // See: https://github.com/nuxt-modules/icon
    'nuxt-icon',
    // See: https://github.com/nuxt-modules/tailwindcss
    '@nuxtjs/tailwindcss',
    // See: https://pinia.vuejs.org/ssr/nuxt.html#installation
    [
      '@pinia/nuxt',
      {
        autoImports: [
        // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }]
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '', // remove -mode suffix for Tailwind Dark mode support
    storageKey: 'nuxt-color-mode'
  },
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.scss',
    configPath: 'tailwind.config',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true
  }
})
