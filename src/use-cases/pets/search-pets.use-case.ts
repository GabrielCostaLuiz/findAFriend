import { PetsRepository } from './../../repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

interface SearchPetsResponse {
  pets: Pet[] | null
}

export class SearchPetsUseCase {
  constructor(
    //     private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return { pets }
  }
}
