import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/next-auth-options";
import { redirect } from 'next/navigation';

async function Page() {
  const session = await getServerSession(authOptions as any)

  if (!session) return redirect("/signin")
  return redirect("/overview")
}

export default Page