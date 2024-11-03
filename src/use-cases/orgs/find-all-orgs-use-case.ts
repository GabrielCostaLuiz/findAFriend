import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface FindAllOrgsUseCaseResponse {
  orgs: Org[] | null
}

export class FindAllOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(): Promise<FindAllOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.fillAll()

    if (!orgs) {
      throw new Error()
    }

    return {
      orgs,
    }
  }
}
