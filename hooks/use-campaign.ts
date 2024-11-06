import { useQuery } from "@tanstack/react-query";

import { getCampaignDetails, getCampaignStatus, getCampaigns } from "@/actions";
import { useUser } from "./use-user";

export function useCampaigns() {
  const { email } = useUser()

  return useQuery({
    queryKey: ["campaign-list", email],
    queryFn: () => getCampaigns(email),
    enabled: !!email
  })
}

export function useCampaignDetails(campaign_id: string) {
  const { email } = useUser()

  return useQuery({
    queryKey: ["campaign", email, campaign_id],
    queryFn: () => getCampaignDetails({ email, campaign_id }),
    enabled: !!email && !!campaign_id
  })
}

export function useCampaignStatus(campaign_id: string) {
  const { email } = useUser()

  return useQuery({
    queryKey: ["campaign-status", email, campaign_id],
    queryFn: () => getCampaignStatus({ email, campaign_id }),
    enabled: !!email && !!campaign_id
  })
}
