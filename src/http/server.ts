import { fastify } from 'fastify';
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll';

const PORT = 3333

const app = fastify();

//Cookie
app.register(cookie, {
  secret: "iekooc-oriemirp-orifnoc",
  hook: 'onRequest',
});

//Routes


//Registra rota no fastify
app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

// Start server
app.listen({ port: PORT }).then(()=>{
  console.log( `Server is listening on ${PORT}`)
})
