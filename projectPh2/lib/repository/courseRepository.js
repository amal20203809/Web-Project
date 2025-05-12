import { prisma } from '../prisma.js';

export async function getAllCourses() {
  return prisma.course.findMany();
}

export async function getTopCourses(limit = 3) {
  return prisma.course.findMany({
    take: limit,
    orderBy: {
      studentsEnrolled: {
        _count: 'desc'
      }
    },
    select: {
      name: true,
      _count: { select: { studentsEnrolled: true } }
    }
  });
}

export async function getCourseWithPrerequisites() {
  return prisma.course.findMany({
    include: {
      prerequisites: true
    }
  });
}
