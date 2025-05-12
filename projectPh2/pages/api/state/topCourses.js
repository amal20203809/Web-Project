import { getTopCourses } from '../../../lib/repository/courseRepository.js';

export default async function handler(req, res) {
  const data = await getTopCourses(3);
  res.status(200).json(data);
}
