import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export async function createPoll(app: FastifyInstance){
  app.post('/poll', async (req, reply) => {

  const createPollBody = z.object({
    title: z.string(),
    options: z.array(z.string()),
  });

  const { title, options } = createPollBody.parse(req.body)

   //Criar enquete no banco de dados
  const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option =>{
              return {title: option}
            }),
          }
        }
      },
      })



      return reply.status(201).send({pollId: poll.id});

});


}
