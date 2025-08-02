import { NextRequest, NextResponse } from 'next/server';
import db from '@db/client';
import bcrypt from 'bcrypt';
import type { RowDataPacket } from 'mysql2';
import { createSession } from '@session/session'; // your custom session logic

export const runtime = 'nodejs';

type UserRow = RowDataPacket & {
  usr_id: number;
  usr_username: string;
  usr_password_hash: string; // fixed key name
};

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const [rows] = await db.query<UserRow[]>(
      'SELECT usr_id, usr_username, usr_password_hash FROM mon_user WHERE usr_username = ?',
      [username]
    );
    const user = rows.length > 0 ? rows[0] : null;

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.usr_password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Pass user ID to session creator
    const session = await createSession(user.usr_id);

    const response = NextResponse.json({ ok: true });

    response.cookies.set('session_token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
