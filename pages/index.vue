<template>
  <div class="py-12">
    <h1 class="text-3xl font-bold">
      OpenAI Image Generation
    </h1>
    <div class="mt-8 p-4 grid grid-cols-1 gap-6 items-start border rounded">
      <form
        class="grid grid-cols-1 gap-6"
        @submit.prevent="generateImage"
      >
        <label class="block">
          <span class="text-sm font-bold">API Key</span>
          <input
            v-model="apiKey"
            type="text"
            class="form-input rounded mt-1 block w-full dark:bg-nuxt-gray"
            placeholder="OpenAI API Key"
          >
        </label>
        <label class="block">
          <span class="text-sm font-bold">Prompt</span>
          <input
            v-model="prompt"
            type="text"
            class="form-input rounded mt-1 block w-full dark:bg-nuxt-gray"
            placeholder="Description an image"
          >
        </label>
        <label class="block">
          <span class="text-sm font-bold">Size</span>
          <select
            id="size"
            v-model="size"
            class="form-select rounded mt-1 block w-full dark:bg-nuxt-gray"
          >
            <option value="small">
              Small
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="large">
              Large
            </option>
          </select>
        </label>
        <button
          type="submit"
          class="inline-flex justify-center items-center rounded border border-transparent bg-nuxt-green py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-nuxt-green focus:outline-none focus:ring-2 focus:ring-nuxt-green focus:ring-offset-2"
          :class="{'animate-spi': loading }"
          :disabled="loading"
        >
          <Icon
            v-show="loading"
            class="mr-2 animate-spin"
            name="carbon:circle-dash"
            size="14px"
          />
          <span>Generate</span>
        </button>
        <span
          v-if="formErrorMessage"
          class="text-red-500"
        >
          {{ formErrorMessage }}
        </span>
      </form>
      <p v-if="loading">
        Generating...
      </p>
      <img
        v-else-if="!loading && imageUrl"
        :src="imageUrl"
        :width="imageSize"
        :height="imageSize"
        alt="Generation Image"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const apiKey = ref('')
const prompt = ref('')
const size = ref('large')
const imageSize = computed(() => {
  switch (size.value) {
    case 'large':
      return 1024
    case 'medium':
      return 512
    case 'small':
      return 256
    default:
      return 0
  }
})
const imageUrl = ref('')
const formErrorMessage = ref('')
const loading = ref(false)

async function generateImage () {
  formErrorMessage.value = ''
  loading.value = true

  const { data, error } = await useFetch('/api/openai-generate-image', {
    method: 'post',
    body: {
      apiKey: apiKey.value,
      prompt: prompt.value,
      size: size.value
    }
  })
  imageUrl.value = data.value ?? ''
  if (error.value) {
    formErrorMessage.value = error.value.data.data.error.message
  }
  loading.value = false
}

</script>
