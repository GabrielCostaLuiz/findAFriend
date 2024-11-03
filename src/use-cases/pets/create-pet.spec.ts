import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to Create a Pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Pet Teste',
      age: 'CUB',
      size: 'SMALL',
      energy_level: 'HIGH',
      about: 'teste',
      environment: 'INDOOR',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
