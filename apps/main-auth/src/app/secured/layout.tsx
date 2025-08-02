// src/app/secured/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@session/check-session';
import Navbar from "@components/navbar";

export default async function SecuredLayout({ children }: { children: React.ReactNode }) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      redirect('/login');
    }

    const session = await verifySession(sessionToken);

    if (!session) {
      redirect('/login');
    }

    return (
    <>
        <Navbar username="test" />
        <main>{children}</main>
    </>
    );  
  } catch (err) {
    // Log or handle unexpected errors
    redirect('/login');
  }
}
