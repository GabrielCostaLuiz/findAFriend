import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  DATABASE_URL: z.string(),
  // DATABASE_CLIENT: z.enum(['dev']),
  JWT_SECRET: z.string(),
})

const envTest = envSchema.safeParse(process.env)

if (envTest.success === false) {
  console.error('❌ Invalid environment variables', envTest.error.format())

  throw new Error()
}

export const env = envTest.data
