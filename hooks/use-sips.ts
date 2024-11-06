import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { getSIPsByEmail } from "@/actions";

export function useSipList() {
  const { data } = useSession()
  const email = data?.user?.email || ""

  return useQuery({
    queryKey: ["sip-list", email],
    queryFn: () => getSIPsByEmail(email),
    enabled: !!email,
  })
}
