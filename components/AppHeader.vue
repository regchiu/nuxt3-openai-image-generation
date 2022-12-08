<template>
  <header>
    <div class="flex items-center border-b border-nuxt-gray/10 dark:border-white h-full px-1 py-4 max-w-8xl mx-auto sm:px-3 lg:px-6">
      <div class="flex items-center flex-1 justify-center lg:justify-start">
        <ClientOnly>
          <img
            class="h-8 mr-4 md:h-9 lg:mr-0"
            :src="nuxtLogoSrc"
            alt="Nuxt Logo"
          >
        </ClientOnly>
      </div>
      <div class="flex items-center">
        <button
          type="button"
          @click="colorModeStore.switchColorMode"
        >
          <ClientOnly>
            <Icon :name="colorModeIcon" />
          </ClientOnly>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useColorModeStore } from '@/store/color-mode'
const colorModeStore = useColorModeStore()
const nuxtLogoSrc = computed(() => colorModeStore.isDarkMode ? '/img/full-logo-green-light.svg' : '/img/full-logo-green-dark.svg')
const colorModeIcon = computed(() => colorModeStore.isDarkMode ? 'carbon:moon' : 'carbon:sun')
</script>
