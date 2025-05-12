import { getAllStats } from '../../../../lib/repository/statsRepository.js';

export async function GET() {
  try {
    const data = await getAllStats();
    return Response.json(data);
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
