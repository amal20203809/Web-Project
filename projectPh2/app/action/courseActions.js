'use server';
import { getTopCourses } from '../../lib/repository/courseRepository.js';

export async function fetchTopCourses() {
  return await getTopCourses(3);
}
