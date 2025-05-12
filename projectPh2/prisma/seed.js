import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const users = JSON.parse(fs.readFileSync('data/users.json'));
  const courses = JSON.parse(fs.readFileSync('data/courses.json'));

  console.log('Seeding users...');
  for (const user of users) {
    const { expertise, completedCourses, ...userData } = user;
    await prisma.user.create({
      data: {
        ...userData,
        name: user.name || 'Unnamed'
      }
    });
  }

  console.log('Seeding courses...');
  for (const course of courses) {
    const { prerequisites, studentsEnrolled, ...courseData } = course;
    await prisma.course.create({
      data: {
        id: course.id,
        name: course.name,
        category: course.category,
        instructorId: course.instructor || null
      }
    });
  }

  console.log('Linking prerequisites...');
  for (const course of courses) {
    if (course.prerequisites?.length > 0) {
      await prisma.course.update({
        where: { id: course.id },
        data: {
          prerequisites: {
            connect: course.prerequisites.map(code => ({ id: code }))
          }
        }
      });
    }
  }

  console.log('Enrolling students...');
  for (const course of courses) {
    if (course.studentsEnrolled?.length > 0) {
      await prisma.course.update({
        where: { id: course.id },
        data: {
          studentsEnrolled: {
            connect: course.studentsEnrolled.map(username => ({ username }))
          }
        }
      });
    }
  }

  console.log('Linking completed courses...');
  for (const user of users) {
    if (user.role === 'student' && user.completedCourses?.length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          completedCourses: {
            connect: user.completedCourses.map(c => ({ id: c.name }))
          }
        }
      });
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
