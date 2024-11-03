import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets.use-case'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

describe('Search Pets Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets to params', async () => {
    const org = await orgsRepository.create({
      id: 'org1',
      author_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      password_hash: '123456',
      phone: '123456789',
      street: 'Rua dos Bobos, 0',
      city: 'Bahia',
      state: 'SP',
      latitude: 3333,
      longitude: 3424,
      name: 'Org Teste',
      neighborhood: 'Tatuape',
    })

    await petsRepository.create({
      name: 'Pet Teste',
      age: 'CUB',
      size: 'SMALL',
      energy_level: 'HIGH',
      about: 'teste',
      environment: 'INDOOR',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Pet Teste2',
      age: 'CUB2',
      size: 'SMALL2',
      energy_level: 'HIGH2',
      about: 'teste2',
      environment: 'INDOOR2',
      org_id: org.id,
    })

    const org2 = await orgsRepository.create({
      id: 'org2',
      author_name: 'Take',
      email: 'johndoe@example.com',
      cep: '12345678',
      password_hash: '123456',
      phone: '123456789',
      street: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      state: 'SP',
      latitude: 3333,
      longitude: 3424,
      name: 'Org Teste',
      neighborhood: 'Tatuape',
    })

    await petsRepository.create({
      name: 'Pet Teste3',
      age: 'CUB3',
      size: 'SMALL3',
      energy_level: 'HIGH3',
      about: 'teste3',
      environment: 'INDOOR3',
      org_id: org2.id,
    })

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })
})
