import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// aparecer os logs no terminal

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
