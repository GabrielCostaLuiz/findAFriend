import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org/org-already-exists.error'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  phone: string
  password_hash: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    author_name,
    cep,
    city,
    email,
    latitude,
    longitude,
    name,
    neighborhood,
    password_hash,
    state,
    street,
    phone,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password = await hash(password_hash, 6)

    const org = await this.orgsRepository.create({
      author_name,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password_hash: password,
      state,
      street,
      phone,
    })

    return { org }
  }
}
