// apps/main-auth/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@session/session';
import db from '@db/client'; 
import bcrypt from 'bcrypt';
import type { RowDataPacket } from 'mysql2';

type UserRow = RowDataPacket & {
  usr_id: number;
  usr_username: string;
  usr_password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const [rows] = await db.query<UserRow[]>(
      'SELECT usr_id, usr_username, usr_password FROM net_users WHERE usr_username = ?',
      [username]
    );
    const user = rows.length > 0 ? rows[0] : null;

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.usr_password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const session = await getIronSession(req, undefined, sessionOptions);
    session.user = { id: user.usr_id, username: user.usr_username, isLoggedIn: true };
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}