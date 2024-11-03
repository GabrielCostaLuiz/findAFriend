import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    const org = {
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
    }

    await request(app.server).post('/orgs').send(org)

    const response = await request(app.server).post('/orgs/authenticate').send({
      email: org.email,
      password: org.password_hash,
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
