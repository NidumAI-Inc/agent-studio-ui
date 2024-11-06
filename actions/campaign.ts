import endPoints from "@/utils/end-points";
import axios from "axios";

type base = { email: string, campaign_id: string }

export function getCampaigns(email: string) {
  return axios.get(`${endPoints.backendUrl}/campaigns?email=${email}`).then(r => r.data?.campaigns)
}

export function getCampaignDetails({ email, campaign_id }: base) {
  return axios.get(`${endPoints.backendUrl}/campaigns/${campaign_id}?email=${email}`).then(r => r.data)
}

export function getCampaignStatus({ email, campaign_id }: base) {
  return axios.get(`${endPoints.backendUrl}/campaigns/${campaign_id}/status?email=${email}`).then(r => r.data?.status)
}

type pT = {
  email: string
  campaign_name: string
  mapped_agent_name: string
  campaign_description: string
}
export function createCampaign(payload: pT) {
  return axios.post(`${endPoints.backendUrl}/campaigns`, payload).then(r => r.data)
}

type pT2 = { file: File } & base
export function importCSVToCampaign({ file, campaign_id, email }: pT2) {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post(`${endPoints.backendUrl}/campaigns/${campaign_id}/import_csv?email=${email}`, formData).then(r => r.data)
}

type pT3 = { nums: string[] } & base
export function addNumsToCampaign({ campaign_id, nums, email }: pT3) {
  return axios.post(`${endPoints.backendUrl}/campaigns/${campaign_id}/add_numbers?email=${email}`, nums).then(r => r.data)
}

export function startCampaign({ campaign_id, email }: base) {
  return axios.post(`${endPoints.backendUrl}/campaigns/${campaign_id}/start?email=${email}`).then(r => r.data)
}

type pt4 = { campaign_id: string } & Partial<pT>
export function updateCampaign(payload: pt4) {
  const { campaign_id, email, ...rest } = payload
  return axios.put(`${endPoints.backendUrl}/campaigns/${campaign_id}?email=${email}`, rest).then(r => r.data)
}

export function deleteCampaign({ campaign_id, email }: base) {
  return axios.delete(`${endPoints.backendUrl}/campaigns/${campaign_id}?email=${email}`).then(r => r.data)
}

type pt5 = { phone_number: string } & base
export function deleteNumImCampaign(payload: pt5) {
  return axios.delete(`${endPoints.backendUrl}/campaigns/${payload.campaign_id}/phone_numbers?email=${payload.email}`, { data: { phone_number: payload.phone_number } }).then(r => r.data)
}

type pt6 = {
  old_phone_number: string
  new_phone_number: string
} & base
export function updateNumInCampaign(payload: pt6) {
  const { campaign_id, email, ...rest } = payload
  return axios.put(`${endPoints.backendUrl}/campaigns/${campaign_id}/phone_numbers?email=${email}`, rest).then(r => r.data)
}