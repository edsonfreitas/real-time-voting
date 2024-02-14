import { fastify } from 'fastify';
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll';
import { fastifyWebsocket } from '@fastify/websocket';
import { pollResults } from './ws/poll-results';

const PORT = 3333

const app = fastify();

//Cookie
app.register(cookie, {
  secret: "iekooc-oriemirp-orifnoc",
  hook: 'onRequest',
});

//Route websocket
app.register(fastifyWebsocket)

//Registra rota no fastify
app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

// Start server
app.listen({ port: PORT }).then(()=>{
  console.log( `Server is listening on ${PORT}`)
})
