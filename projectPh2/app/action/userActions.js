'use server';
import { getStudents } from '../../lib/repository/userRepository.js';

export async function fetchStudents() {
  return await getStudents();
}
