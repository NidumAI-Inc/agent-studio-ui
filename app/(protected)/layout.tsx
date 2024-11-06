import { authOptions } from '@/lib/next-auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import '../styles/phone-number.css';

import SideBar from "@/components/side-bar";
import NavBar from "@/components/nav-bar";

type props = Readonly<{
  children: React.ReactNode;
}>

async function Layout({ children }: props) {
  const session = await getServerSession(authOptions as any)

  if (!session) return redirect("/")

  return (
    <main className="app-container h-screen overflow-hidden">
      <NavBar />

      <SideBar />

      {children}
    </main>
  )
}

export default Layout
