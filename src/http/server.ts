import { fastify } from 'fastify';
import { createPoll } from './routes/create-poll'

const PORT = 3333

const app = fastify();

app.register(createPoll)
// Start server
app.listen({ port: PORT }).then(()=>{
  console.log( `Server is listening on ${PORT}`)
})
