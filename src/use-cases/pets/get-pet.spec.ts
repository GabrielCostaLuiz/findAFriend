import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet by id', async () => {
    const org = await orgsRepository.create({
      id: 'id1',
      author_name: 'John Doe',
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

    const petTest = await petsRepository.create({
      name: 'Pet Teste',
      age: 'CUB',
      size: 'SMALL',
      energy_level: 'HIGH',
      about: 'teste',
      environment: 'INDOOR',
      org_id: org.id,
    })

    const { pet } = await sut.execute({
      petId: petTest.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(expect.objectContaining({ name: 'Pet Teste' }))
  })
})
