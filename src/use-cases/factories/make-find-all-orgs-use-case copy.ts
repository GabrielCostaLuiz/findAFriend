import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { FindAllOrgsUseCase } from '../orgs/find-all-orgs-use-case'

export function makeFindAllOrgsUseCase() {
  return new FindAllOrgsUseCase(new PrismaOrgsRepository())
}
