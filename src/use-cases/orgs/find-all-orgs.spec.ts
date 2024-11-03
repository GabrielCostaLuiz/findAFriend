import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FindAllOrgsUseCase } from './find-all-orgs-use-case'

describe('Find All Ortgs Use Case', () => {
  let orgsrepository: InMemoryOrgsRepository
  let sut: FindAllOrgsUseCase

  beforeEach(() => {
    orgsrepository = new InMemoryOrgsRepository()

    orgsrepository.items.push({
      id: 'asd',
      author_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      password_hash: '123456',
      phone: '123456789',
      street: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      state: 'SP',
      latitude: new Decimal(11),
      longitude: new Decimal(11),
      name: 'Org Teste',
      neighborhood: 'Tatuape',
    })
    sut = new FindAllOrgsUseCase(orgsrepository)
  })

  it('should be able to get all orgs', async () => {
    const { orgs } = await sut.execute()

    expect(orgs).toHaveLength(1)
  })
})
