import { Configuration, OpenAIApi } from 'openai'
interface CreateImage {
  prompt: string
  n?: number
  size: 'small' | 'medium' | 'large'
  responseFormat?: string
  user?: string
}

type CreateImageRequestSize = '256x256' | '512x512' | '1024x1024'
const configuration = new Configuration({
  apiKey: useRuntimeConfig().openaiApiKey
})

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
  const body: CreateImage = await readBody(event)
  const { prompt, size } = body

  let imageSize: CreateImageRequestSize = '1024x1024'
  switch (size) {
    case 'small':
      imageSize = '256x256'
      break
    case 'medium':
      imageSize = '512x512'
      break
    case 'large':
      imageSize = '1024x1024'
      break
  }

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize
    })

    const imageUrl = response.data?.data[0]?.url ?? ''
    event.node.res.statusCode = 200
    return imageUrl
  } catch (error) {
    if ((error as any).response) {
      return sendError(event, createError({
        data: (error as any).response.data,
        statusMessage: (error as any).message
      }))
    } else if (error instanceof Error) {
      return sendError(event, createError({
        statusMessage: error.message
      }))
    }
  }
})
