import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function createApplication(data) {
  return prisma.application.create({ data });
}
