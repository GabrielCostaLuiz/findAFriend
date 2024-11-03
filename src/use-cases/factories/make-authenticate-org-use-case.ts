import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AutheticateUseCase } from '../orgs/authenticate-use-case'

export function makeAuthenticateOrgUseCase() {
  return new AutheticateUseCase(new PrismaOrgsRepository())
}
