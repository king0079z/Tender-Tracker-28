import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT NOW()');
      res.status(200).json({ success: true, timestamp: result.rows[0].now });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
}