import { authOptions } from '@/lib/next-auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type props = Readonly<{
  children: React.ReactNode;
}>

async function Layout({ children }: props) {
  const session = await getServerSession(authOptions as any)

  if (!session) return redirect("/")

  return children
}

export default Layout
