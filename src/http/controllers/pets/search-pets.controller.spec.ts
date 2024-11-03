import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = {
      id: 'test',
      author_name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      password_hash: '12345678910',
      phone: '123456789',
      street: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      state: 'SP',
      latitude: 3333,
      longitude: 3424,
      name: 'Org Test',
      neighborhood: 'Tatuape',
    }

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password_hash })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Pet Test',
        age: 'CUB',
        size: 'SMALL',
        energy_level: 'HIGH',
        about: 'test',
        environment: 'INDOOR',
        org_id: org.id,
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/orgs/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and age', async () => {
    const org = {
      id: 'test2',
      author_name: 'Jane Doe',
      email: 'janedoe@example.com',
      cep: '12345678',
      password_hash: '12345678910',
      phone: '987654321',
      street: 'Avenida Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      latitude: -23.55052,
      longitude: -46.633308,
      name: 'Org Test 2',
      neighborhood: 'Centro',
    }

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password_hash })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Young Pet',
        age: '1',
        size: 'SMALL',
        energy_level: 'HIGH',
        about: 'young pet',
        environment: 'INDOOR',
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, age: '1' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and all filters', async () => {
    const org = {
      author_name: 'Jack Smith',
      email: 'jacksmith@example.com',
      cep: '87654321',
      password_hash: '0987654321',
      phone: '456789123',
      street: 'Rua das Flores, 50',
      city: 'São Paulo',
      state: 'SP',
      latitude: -23.55052,
      longitude: -46.633308,
      name: 'Org Test 3',
      neighborhood: 'Jardins',
    }

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password_hash })

    const pets = [
      {
        name: 'Indoor Pet',
        age: '1',
        size: 'SMALL',
        energy_level: 'LOW',
        environment: 'INDOOR',
      },
      {
        name: 'Outdoor Pet',
        age: '2',
        size: 'MEDIUM',
        energy_level: 'MEDIUM',
        environment: 'OUTDOOR',
      },
      {
        name: 'Active Pet',
        age: '3',
        size: 'LARGE',
        energy_level: 'HIGH',
        environment: 'INDOOR',
      },
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/orgs/pets')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    const response = await request(app.server).get('/orgs/pets').query({
      city: org.city,
      size: 'SMALL',
      energy_level: 'HIGH',
      environment: 'INDOOR',
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
