import dbPool from "@db/client";

import bcrypt from 'bcrypt';



interface Session {
  id: number; // internal auto-increment ID
  sessionId: string; // secure public token prefix
  secretHash: string;
  createdAt: Date;
}

interface SessionWithToken extends Session {
  token: string;
}

function generateSecureRandomString(): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < bytes.length; i++) {
    id += alphabet[bytes[i] >> 3];
  }
  return id;
}

const SALT_ROUNDS = 12;

async function hashSecret(secret: string): Promise<string> {
  return await bcrypt.hash(secret, SALT_ROUNDS);
}

async function executeQuery(query: string, params: any[] = []) {
  const [rows] = await dbPool.execute(query, params);
  return rows;
}

export async function createSession(userId: number): Promise<SessionWithToken> {
  const now = new Date();
  const sessionId = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret(secret);

  const token = `${sessionId}.${secret}`;

  const result: any = await executeQuery(
    "INSERT INTO mon_session (ses_session_id, ses_hash, ses_date_created, ses_ref_user) VALUES (?, ?, ?, ?)",
    [sessionId, Buffer.from(secretHash), now.toISOString().slice(0, 19).replace('T', ' '), userId]
  );

  const ses_id = result.insertId;

  return {
    id: ses_id,
    sessionId,
    secretHash,
    createdAt: now,
    token,
  };
}
