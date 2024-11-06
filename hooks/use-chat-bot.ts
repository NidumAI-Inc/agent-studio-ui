import { useMutation, useQuery } from "@tanstack/react-query";

import { createChatBot, generateDataCollectionsCSV, getChatBotDetails, getDataCollections, updateChatBot } from "@/actions";
import { useUser } from "./use-user";
import endPoints from "@/utils/end-points";

export function useChatBot(id: string) {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["chat-bot", userId, id],
    queryFn: () => getChatBotDetails({ assistant_id: id, user_id: userId }),
    enabled: !!id
  })
}

export function useDataCollected(id: string) {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["data-collected", userId, id],
    queryFn: () => getDataCollections({ assistant_id: id, user_id: userId }),
    enabled: !!id && !!userId,
    select: r => {
      const data: any[] = []
      const columsSet = new Set()
      r?.data?.forEach((d: any) => {
        const keys = Object.keys(d?.data)
        keys.forEach(k => columsSet.add(k))
        data.push(d?.data)
      })
      const colums: any[] = [...columsSet].map(d => ({ accessorKey: d, header: d }))
      return { data, colums }
    },
  })
}

export function useDownloadDataCollections(id: string) {
  const { userId } = useUser()

  return useMutation({
    mutationFn: () => generateDataCollectionsCSV({ assistant_id: id, user_id: userId }),
    onSuccess(res) {
      if (res?.csv_link) {
        const link = document.createElement('a')
        link.download = 'data-collected.csv'
        link.href = `${endPoints.backendUrl}${res?.csv_link}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  })
}

export function useCreateChatBot() {
  return useMutation({
    mutationFn: createChatBot,
  })
}

export function useUpdateChatBot() {
  return useMutation({
    mutationFn: updateChatBot,
  })
}