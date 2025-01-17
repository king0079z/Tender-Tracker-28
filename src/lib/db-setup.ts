import pool from './db';

export async function setupDatabase() {
  const client = await pool.connect();
  try {
    // Create candidates table
    await client.query(`
      CREATE TABLE IF NOT EXISTS candidates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        stage INTEGER NOT NULL,
        status VARCHAR(50) NOT NULL,
        cv TEXT,
        interview_date TIMESTAMP,
        meeting_location TEXT,
        meeting_link TEXT,
        suggested_job_title TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create comments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
        interviewer_name VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create interviewers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS candidate_interviewers (
        candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
        interviewer_name VARCHAR(255) NOT NULL,
        PRIMARY KEY (candidate_id, interviewer_name)
      );
    `);

  } finally {
    client.release();
  }
}

// Run setup
setupDatabase().catch(console.error);