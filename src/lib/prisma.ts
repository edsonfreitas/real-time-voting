import { PrismaClient } from '@prisma/client';

//Conect data base
export const prisma = new PrismaClient({
  log: ['query']
});
