// api/content.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // 1. Connect to TiDB
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
  });

  try {
    if (req.method === 'GET') {
      // Fetch all text/images saved in the DB
      const [rows] = await connection.execute('SELECT * FROM site_content');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      // Save new text/images from the Admin panel
      const { key, value } = req.body;
      await connection.execute(
        'INSERT INTO site_content (content_key, content_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_value = ?',
        [key, value, value]
      );
      return res.status(200).json({ message: 'Success' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    await connection.end();
  }
}