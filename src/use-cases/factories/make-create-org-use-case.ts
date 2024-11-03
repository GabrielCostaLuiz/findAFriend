import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { CreateOrgUseCase } from '../orgs/create-org-use-case'

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new PrismaOrgsRepository())
}
