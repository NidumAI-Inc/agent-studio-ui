import axios from "axios";
import endPoints from "@/utils/end-points";

export type sip = {
  phone_number: string
  provider: "telnyx" | "twilio"
  email: string
  api_key: string
  api_secret: string
  label: string
  mapped_agent_name: string
}

export function getSIPsByEmail(email: string) {
  return axios.get(`${endPoints.backendUrl}/get_phone_numbers/${email}`).then(r => r.data?.details)
}

export function getSIPsFromTelynx(apiKey: string) {
  return axios.get("https://api.telnyx.com/v2/phone_numbers", {
    headers: { Authorization: `Bearer ${apiKey}` }
  }).then(r => r.data?.data)
}

type twiT = {
  accountSid: string
  authToken: string
}
export function getSIPsFromTwilio({ accountSid, authToken }: twiT) {
  return axios.get(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json`, {
    auth: {
      username: accountSid,
      password: authToken
    }
  }).then(r => r.data?.incoming_phone_numbers)
}

export function createSIP(payload: sip) {
  return axios.post(`${endPoints.backendUrl}/configure_sip`, payload).then(r => r.data)
}

export function updateSIP(payload: Partial<sip>) {
  return axios.put(`${endPoints.backendUrl}/update_sip/${payload?.phone_number}`, payload).then(r => r.data)
}

type pT1 = {
  email: string
  agent_name: string
  phone_number: string
}
export function updateSIPMapedAgent(payload: pT1) {
  return axios.put(`${endPoints.backendUrl}/map_agent`, payload).then(r => r.data)
}

export function deleteSIP(payload: Pick<sip, "email" | "phone_number">) {
  return axios.delete(`${endPoints.backendUrl}/delete_sip/${payload.phone_number}?email=${payload.email}`).then(r => r.data)
}
