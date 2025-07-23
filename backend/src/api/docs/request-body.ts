import type { z } from 'zod'

const requestBody = (schema: z.ZodTypeAny) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
  }
}

export default requestBody
