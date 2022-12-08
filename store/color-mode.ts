export const useColorModeStore = defineStore('colorMode', () => {
  const colorMode = useColorMode()

  const isDarkMode = computed(() => colorMode.value === 'dark')
  const isLightMode = computed(() => colorMode.value === 'light')

  function switchColorMode () {
    if (isDarkMode.value) {
      colorMode.preference = 'light'
    } else if (isLightMode.value) {
      colorMode.preference = 'dark'
    }
  }

  return {
    isDarkMode,
    isLightMode,
    switchColorMode
  }
})
