import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';
import { redis } from '../../lib/redis';
import { title } from 'process';

export async function getPoll(app: FastifyInstance){
  app.get('/polls/:pollId', async (req, reply) => {

  const getPollParams = z.object({
    pollId: z.string().uuid(),
  });

  const { pollId } = getPollParams.parse(req.params)

   //Criar enquete no banco de dados
  const poll = await prisma.poll.findUnique({
      where:{
        id: pollId
      },
        include:{
          options: {
            select: {
              id: true,
              title:true,
            }
          }
        }
      })

      //Validade  se a enquete existe
      if(!poll){
        return reply.status(400).send({error:"Enquete não encontrada"})
      }//Validade  se a enquete existe

      //buscando rank no redis
      const result = await redis.zrange(pollId, 0 , -1, "WITHSCORES");
      //Maninulando data recebido
      const votes = result.reduce((obj, line, index)=>{
        if(index %2 === 0){
          const score = result[index +1];

          Object.assign(obj,{ [line]: Number(score)})
        }
        return obj;
      },{} as  Record<string,number>);


      console.log(votes)
      //buscando rank no redis



      return reply.send({
        poll:{
          id: poll.id,
          title:  poll.title,
          options: poll.options.map(option=>{
            return{
              id: option.id,
              title: option.title,
              score:(option.id in votes) ? votes[option.id] : 0,
            }
          })
        }
      });

});


}
