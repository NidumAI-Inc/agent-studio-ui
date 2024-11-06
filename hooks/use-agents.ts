import { useMutation, useQuery } from "@tanstack/react-query";

import { getAgentById, getAgentsByUserId, getFilesInAgent, sipPayloadT, updateAgent } from "@/actions";
import { useUser } from "./use-user";

export function useAgentsList() {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["agent-list", userId],
    queryFn: () => getAgentsByUserId(userId),
    enabled: !!userId,
  })
}

export function useAgentById(id: string) {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["agent", userId, id],
    queryFn: () => getAgentById({ userId, agentId: id }),
    enabled: !!userId && !!id,
  })
}

export function useUpdateAgent(id: string) {
  const { userId } = useUser()

  return useMutation({
    mutationFn: (payload: Partial<sipPayloadT>) => updateAgent({ userId, agentId: id }, payload)
  })
}

export function useFilesInAgentsList(agentId: string) {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["agent-files-list", userId, agentId],
    queryFn: () => getFilesInAgent({ userId, agentId }),
    enabled: !!userId && !!agentId,
  })
}
