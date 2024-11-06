import axios from "axios";

import { getSalesIqAccessToken } from "./tokens";
import { salesIQBase } from "./constants";

type props = {
  _id: string
  salesIQDomain: string
  companyDomain: string
}

export async function createSalesIQWebhook({ _id, webhookUrl, salesIQDomain, companyDomain }: props & { webhookUrl: string }) {
  const access_token = await getSalesIqAccessToken(_id)
  const { baseUrl, headers } = salesIQBase({
    access_token,
    salesIQDomain,
    companyDomain,
  })

  const { data: apps } = await axios.get(`${baseUrl}/apps`, { headers })
  const app_id = apps?.data?.[0]?.id

  const payload = {
    "type": "data",
    "url": `${webhookUrl}/api/third-party/chat/salesiq?id=${_id}`,
    "events": [
      "conversation.created",
      "conversation.visitor.replied"
    ],
    "app_ids": [app_id]
  }

  return axios.post(`${baseUrl}/webhooks`, payload, { headers })
}

export async function deleteSalesIQwebhook({ _id, webhook_id, ...rest }: props & { webhook_id: string }) {
  const access_token = await getSalesIqAccessToken(_id)
  const { baseUrl, headers } = salesIQBase({
    access_token,
    ...rest
  })

  return axios.delete(`${baseUrl}/webhooks/${webhook_id}`, { headers })
}