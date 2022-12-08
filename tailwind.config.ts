import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindForms from '@tailwindcss/forms'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nuxt-green': '#00DC82',
        'nuxt-gray': '#18181B',
        'nuxt-white': '#FFFFFF'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    tailwindForms
  ]
}
