import { type SessionOptions } from 'iron-session';

export type UserSession = {
  id: number;
  email: string;
  isLoggedIn: true;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.COOKIE_DOMAIN,
    path: '/',
    sameSite: 'lax',
  },
};