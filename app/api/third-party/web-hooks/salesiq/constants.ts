
export const scope = "SalesIQ.conversations.READ,SalesIQ.conversations.CREATE,SalesIQ.webhooks.READ,SalesIQ.webhooks.CREATE,SalesIQ.webhooks.UPDATE,SalesIQ.webhooks.DELETE,SalesIQ.Apps.READ"

export type salesIQBaseProps = {
  salesIQDomain: string
  companyDomain: string
  access_token: string
}
export function salesIQBase(data: salesIQBaseProps) {
  return {
    baseUrl: `https://salesiq.zoho.${data.salesIQDomain}/api/v2/${data.companyDomain}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${data.access_token}`
    },
  }
}
