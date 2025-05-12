import { prisma } from '../prisma.js';

export async function getAllStats() {
  try {
    // 1. Top 3 Courses by Enrollment
    const topCourses = await prisma.course.findMany({
      take: 3,
      orderBy: {
        studentsEnrolled: {
          _count: 'desc'
        }
      },
      select: {
        name: true,
        _count: {
          select: { studentsEnrolled: true }
        }
      }
    });

    // 2. User Role Counts
    const roleCounts = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true
      }
    });

    // 3. Student Count per Category
    const rawCategoryCounts = await prisma.course.findMany({
      select: {
        category: true,
        _count: {
          select: { studentsEnrolled: true }
        }
      }
    });

    const categoryCountsMap = rawCategoryCounts.reduce((acc, course) => {
      const { category, _count } = course;
      acc[category] = (acc[category] || 0) + _count.studentsEnrolled;
      return acc;
    }, {});

    const categoryCounts = Object.entries(categoryCountsMap).map(([category, students]) => ({
      category,
      students
    }));

    // 4. Courses per Instructor
    const courseCountPerInstructor = await prisma.user.findMany({
      where: { role: 'instructor' },
      select: {
        name: true,
        _count: {
          select: { expertise: true }
        }
      }
    });

    // 5. Top Students by Completed Courses
    const topStudents = await prisma.user.findMany({
      where: { role: 'student' },
      orderBy: {
        completedCourses: {
          _count: 'desc'
        }
      },
      take: 3,
      select: {
        name: true,
        _count: {
          select: { completedCourses: true }
        }
      }
    });

    // 6. Courses with No Enrollments
    const emptyCourses = await prisma.course.findMany({
      where: {
        studentsEnrolled: {
          none: {}
        }
      },
      select: {
        name: true
      }
    });

    // 7. Total Courses and Students
    const totalCourses = await prisma.course.count();
    const totalStudents = await prisma.user.count({
      where: { role: 'student' }
    });

    const summary = {
      totalCourses,
      totalStudents
    };

    // 8. Failure Rate per Course
    const usersWithGrades = await prisma.user.findMany({
      where: {
        role: 'student',
        completedCourses: {
          some: {}
        }
      },
      select: {
        completedCourses: true
      }
    });

    const courseFailures = {};
    usersWithGrades.forEach(user => {
      user.completedCourses.forEach(course => {
        if (course.grade === 'F') {
          courseFailures[course.id] = (courseFailures[course.id] || 0) + 1;
        }
      });
    });

    const failureStats = Object.entries(courseFailures).map(([courseId, fails]) => ({
      courseId,
      fails
    }));

    // 9. Most Common Prerequisites
    const allCourses = await prisma.course.findMany({
      select: {
        prerequisites: true
      }
    });

    const prereqCount = {};
    allCourses.forEach(course => {
      course.prerequisites.forEach(p => {
        prereqCount[p.id] = (prereqCount[p.id] || 0) + 1;
      });
    });

    const topPrereqs = Object.entries(prereqCount)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // 10. Top 5 Students with Most Completed Courses
    const topCompleters = await prisma.user.findMany({
      where: { role: 'student' },
      orderBy: {
        completedCourses: {
          _count: 'desc'
        }
      },
      take: 5,
      select: {
        name: true,
        _count: {
          select: { completedCourses: true }
        }
      }
    });

    // Final Result
    return {
      topCourses,
      roleCounts,
      categoryCounts,
      courseCountPerInstructor,
      topStudents,
      emptyCourses,
      summary,
      failureStats,
      topPrereqs,
      topCompleters
    };

  } catch (err) {
    console.error('getAllStats() failed:', err);
    throw err;
  }
}
