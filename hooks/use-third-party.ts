import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getThirdPartyListByUserId,
  createThirdPartyConfig,
  updateThirdPartyConfig,
  deleteThirdPartyConfig
} from "@/actions";
import { useToast } from "./use-toast";
import { useUser } from "./use-user";

export function useThirdPartyList() {
  const { userId } = useUser()

  return useQuery({
    queryKey: ["third-party-list"],
    queryFn: () => getThirdPartyListByUserId(userId),
    enabled: !!userId,
    select: res => {
      const mapped = res?.reduce((prev: any, curr: any) => {
        if (prev[curr.type]) {
          prev[curr.type].push(curr)
        } else {
          prev[curr.type] = [curr]
        }

        return prev
      }, {})

      return Object.entries(mapped).map(([key, val]: any) => ({ type: key, list: val }))
    }
  })
}

export function useThirdPartyConfigMutate(isCreate: boolean) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: isCreate ? createThirdPartyConfig : updateThirdPartyConfig,
    onSuccess() {
      toast({ title: `Configurations ${isCreate ? "created" : "updated"} successfully` })
      queryClient.invalidateQueries({ queryKey: ["third-party-list"] })
    },
    onError(err) {
      toast({
        // @ts-ignore
        title: err.response.data || "Something went wrong!",
        description: "Please try again later"
      })
    }
  })
}

export function useThirdPartyConfigDelete() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: deleteThirdPartyConfig,
    onSuccess() {
      toast({ title: `Configurations deleted successfully` })
      queryClient.invalidateQueries({ queryKey: ["third-party-list"] })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })
}
