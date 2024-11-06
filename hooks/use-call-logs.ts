import { useQuery } from "@tanstack/react-query";

import { getCallLogsByUserId, getChatLogsByUserId } from "@/actions";
import { useUser } from "./use-user";

export function useCallLogs() {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["call-logs", userId],
    queryFn: () => getCallLogsByUserId(userId),
    enabled: !!userId,
  })
}

export function useChatLogs() {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["chat-logs", userId],
    queryFn: () => getChatLogsByUserId(userId),
    enabled: !!userId,
  })
}
