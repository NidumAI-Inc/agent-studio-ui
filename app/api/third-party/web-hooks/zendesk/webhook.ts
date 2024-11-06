import axios from 'axios';

import { getZendeskAccessToken } from './tokens';
import { zenDeskSunShineUrl } from './contants';

type dataT = {
  _id: string
  baseUrl: string
  displayName: string
  assistant_id: string
  zendesk_app_id: string
  zendesk_key_id: string
  zendesk_secret_key: string
}

export async function createZendsekWebhook(data: dataT) {
  const payload = {
    type: "custom",
    status: "active",
    displayName: data?.displayName,
    webhooks: [{
      target: `${data?.baseUrl}/api/third-party/chat/zendesk?id=${data?._id}`,
      triggers: ["conversation:message"],
      includeFullUser: true,
      includeFullSource: true
    }]
  }

  const { headers } = getZendeskAccessToken({
    secret_key: data?.zendesk_secret_key,
    key_id: data?.zendesk_key_id
  })

  const url = `${zenDeskSunShineUrl}/v2/apps/${data?.zendesk_app_id}/integrations`
  return axios.post(url, payload, { headers })
}

type deleteProps = {
  zendesk_app_id: string
  zendesk_key_id: string
  zendesk_secret_key: string
  zendesk_integration_id: string
}

export async function deleteZendeskwebhook(data: deleteProps) {
  const { headers } = getZendeskAccessToken({
    secret_key: data?.zendesk_secret_key,
    key_id: data?.zendesk_key_id
  })

  const url = `${zenDeskSunShineUrl}/v2/apps/${data?.zendesk_app_id}/integrations/${data?.zendesk_integration_id}`
  return axios.delete(url, { headers })
}