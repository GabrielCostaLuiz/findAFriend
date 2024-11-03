import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/orgs.routes'
import { petsRoutes } from './http/controllers/pets/pets.routes'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  // put your options here
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
