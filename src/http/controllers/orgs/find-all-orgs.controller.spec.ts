import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find all Orgs (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should find all orgs', async () => {
    const response = await request(app.server).get('/orgs/findAll')

    expect(response.status).toBe(200)
  })
})
