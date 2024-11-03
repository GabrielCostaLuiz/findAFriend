import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository?: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }

  async findAll(params: FindAllParams) {
    const orgsByCity = this.orgsRepository!.items.filter(
      (item) => item.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) || null
  }
}