import { useQuery } from "@tanstack/react-query";

import { getOverviewByUserId } from "@/actions";
import { useUser } from "./use-user";

export type typeT = "day" | "week" | "month" | "overall"

export function useOverview(type: typeT = "week") {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["overview", userId, type],
    queryFn: () => getOverviewByUserId(userId, type),
    enabled: !!userId,
  })
}
