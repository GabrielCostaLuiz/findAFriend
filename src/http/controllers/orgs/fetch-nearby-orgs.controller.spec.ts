import request from 'supertest'

import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Nearby Orgs (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby orgs', async () => {
    const org = {
      author_name: 'John Doeesda',
      email: 'johnddasdssadoe@example.com',
      cep: '12345678',
      password_hash: '12345678910',
      phone: '123456789',
      street: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      state: 'SP',
      latitude: -23.55052,
      longitude: -46.633308,
      name: 'Org Teste',
      neighborhood: 'Tatuape',
    }

    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({ latitude: org.latitude, longitude: org.longitude })
      .expect(200)

    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs[0].name).toEqual(org.name)
  })
})
