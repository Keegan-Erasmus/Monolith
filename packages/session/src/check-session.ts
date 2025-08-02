import dbPool from "@db/client";

import bcrypt from 'bcrypt';

interface Session {
  id: number;
  sessionId: string;
  secretHash: string;
  createdAt: Date;
  userId: number;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) return false;
  let result = 0;
  for (let i = 0; i < a.byteLength; i++) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
}

const SALT_ROUNDS = 12;

async function hashSecret(secret: string): Promise<string> {
  return await bcrypt.hash(secret, SALT_ROUNDS);
}

async function executeQuery(query: string, params: any[] = []) {
  const [rows] = await dbPool.execute(query, params);
  return rows;
}

export async function verifySession(token: string): Promise<Session | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [sessionId, secret] = parts;

  const rows: any = await executeQuery(
    "SELECT ses_id, ses_session_id, ses_hash, ses_date_created, ses_ref_user FROM mon_session WHERE ses_session_id = ?",
    [sessionId]
  );

  if (!rows || rows.length !== 1) return null;

  const row = rows[0];
  const session: Session = {
    id: row.ses_id,
    sessionId: row.ses_session_id,
    secretHash: row.ses_hash, 
    createdAt: new Date(row.ses_date_created * 1000),
    userId: row.ses_ref_user,
  };

  // Check expiration
  const now = Date.now();
  if (now - session.createdAt.getTime() > 86400 * 1000) {
    // await executeQuery(
    // "DELETE FROM mon_session WHERE ses_session_id = ?",
    // [session.sessionId]
    // );
    return null;
  }

  // Hash the secret from token and compare with DB hash
  const isMatch = await bcrypt.compare(secret, session.secretHash);
  if (!isMatch) {
  return null;
  }
  return session;
}
