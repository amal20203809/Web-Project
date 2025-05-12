import { getAllStats } from '../../../lib/repository/statsRepository.js';

export default async function handler(req, res) {
  const data = await getAllStats();
  res.status(200).json(data);
}
