import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFindAllOrgsUseCase } from '@/use-cases/factories/make-find-all-orgs-use-case copy'

export async function findAllOrgsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findAllOrgsUseCase = makeFindAllOrgsUseCase()

  try {
    const { orgs } = await findAllOrgsUseCase.execute()

    return reply.status(200).send(orgs)
  } catch (error) {
    if (error) {
      return reply.status(400).send({ message: error })
    }
  }
}
