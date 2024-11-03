import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface FindAllOrgsUseCaseResponse {
  orgs: Omit<Org, 'id' | 'email' | 'password_hash'>[] | null
}

export class FindAllOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(): Promise<FindAllOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.fillAll()

    if (!orgs) {
      throw new Error()
    }

    const sanitizedOrgs = orgs.map(
      ({ id, email, password_hash, ...rest }) => rest,
    )

    return {
      orgs: sanitizedOrgs,
    }
  }
}
