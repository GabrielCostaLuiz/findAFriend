import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet', async () => {
    const org = {
      id: 'teste',
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

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password_hash })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Pet Teste',
        age: 'CUB',
        size: 'SMALL',
        energy_level: 'HIGH',
        about: 'teste',
        environment: 'INDOOR',
        org_id: org.id,
      })

    const getPetResponse = await request(app.server)
      .get(`/orgs/pets/${response.body.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getPetResponse.status).toBe(200)
  })
})
