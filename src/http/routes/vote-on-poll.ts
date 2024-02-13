import { FastifyInstance } from 'fastify';
import {randomUUID } from 'node:crypto'
import { prisma } from '../../lib/prisma';
import { z } from 'zod';
import { request } from 'node:http';
import { redis } from '../../lib/redis';

export async function voteOnPoll(app: FastifyInstance){
  app.post('/polls/:pollId/votes', async (req, reply)=> {

  const voteOnPollBody = z.object({
    pollOptionId: z.string().uuid()
  });

  const voteOnPollParams = z.object({
    pollId: z.string().uuid(),
  });

  const { pollId } = voteOnPollParams.parse(req.params);
  const { pollOptionId } = voteOnPollBody.parse(req.body);

  //Cookie  verification
  let {sessionId } = req.cookies;

  //Verifica se usuario já votou antes
    if(sessionId){
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where:{
          sessionId_pollId:{
            sessionId,
            pollId,
          }
        }
      })
      if(userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId ){
        //Delete vote previus
        await prisma.vote.delete({
          where:{
            id:userPreviousVoteOnPoll.id}
          });
          //Modifica o rank no redis
          await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)
          //<--MRr
        //<--delete vote previus
      }else if(userPreviousVoteOnPoll){
          return reply.status(400).send({message:"User already voted on this poll"})
        }//<--

  if(!sessionId){
    sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId,{
        path: '/',
        maxAge: 60 * 60 * 24 * 30,  // 30 days,
        signed: true,
        httpOnly: true,
    });
  };//Cookie

  //Salva voto no  banco de dados
  await  prisma.vote.create({
    data:{
      sessionId,
      pollId,
      pollOptionId,
    }
    });

    await redis.zincrby(pollId,1,pollOptionId);


    return reply.status(201).send();

  }});
}
