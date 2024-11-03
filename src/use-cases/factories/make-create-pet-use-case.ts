import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { CreatePetUseCase } from '../pets/create-pet-use-case'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository(),
  )
}
