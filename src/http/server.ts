import { fastify } from 'fastify';
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'

const PORT = 3333

const app = fastify();

//Registra rota no fastify

app.register(createPoll)
app.register(getPoll)

// Start server
app.listen({ port: PORT }).then(()=>{
  console.log( `Server is listening on ${PORT}`)
})
