#Initial Project
`npm init -y`

## Install Typescript

`npm install typescrit @types/node -D`

## Create tsconfig.json file

`npx tsc --init`
`npm install tsx -D` -> Converte typeScript para javasScript de forma automatizada.

## Servidor com fastify

`npm install fastify`

## Docker

`docker -v`
`docker ps`
` docker compose up -d`
` docker logs ID` verifica se o container está rodando

## ORM Prisma

`npm install -D prisma`
`npx prisma init`

Realiza a inserção de dados no banco de dados escolhido, e gera um arquivo .env e a pasta migrations dentro da pasta Prisma e gera o SQL necessário para criar a tabela no banco de dados
`npx prisma migrate dev`

Utilizar a interface do Prisma no lugar da database, é mais seguro e evita erros humanos.
`npx prisma studio`

  ## Biblioteca de validação de dados
  `npm install zod`

### Config do tsconfig de acordo com a versão do node

documentação (https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)

## Docker

Instalar o docker: https://docs.docker.com/get-docker/

Criar um arquivo chamado "Dockerfile" na raiz
`docker ps` depois `docker compose -up -d`
