import fastify from 'fastify';
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';

const PORT = 3333

const app = fastify();

//Conect data base
const prisma = new PrismaClient()

app.post('/poll', async (req, reply) => {

  const creatPollBody = z.object({
    title: z.string(),
  })

  const { title } = creatPollBody.parse(req.body)

   //Criar enquete no banco de dados
  const poll = await prisma.poll.create({
      data: {
        title,
      },
      })

      return reply.status(201).send({pollId: poll.id});

});



// Start server
app.listen({ port: PORT }).then(()=>{
  console.log( `Server is listening on ${PORT}`);
})
