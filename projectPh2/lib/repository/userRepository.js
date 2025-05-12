import { prisma } from '../prisma.js';

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getStudents() {
  return prisma.user.findMany({
    where: { role: 'student' }
  });
}

export async function getInstructors() {
  return prisma.user.findMany({
    where: { role: 'instructor' },
    include: { expertise: true }
  });
}
