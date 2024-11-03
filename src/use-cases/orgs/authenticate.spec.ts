import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AutheticateUseCase } from './authenticate-use-case'

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AutheticateUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AutheticateUseCase(orgsRepository)
  })

  it('should be able to authentication org', async () => {
    const org1 = await orgsRepository.create({
      author_name: 'John Doeesda',
      email: 'johnddasdssadoe@example.com',
      cep: '12345678',
      password_hash: '12345678910',
      phone: '123456789',
      street: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      state: 'SP',
      latitude: 3333,
      longitude: 3424,
      name: 'Org Teste',
      neighborhood: 'Tatuape',
    })

    const { org } = await sut.execute({
      email: org1.email,
      password: org1.password_hash,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
