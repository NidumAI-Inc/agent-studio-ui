import axios from "axios";
import endPoints from "@/utils/end-points";

export function getCallLogsByUserId(userId: string) {
  return axios.get(`${endPoints.backendUrl}/call_logs/${userId}`).then(r => r.data)
}

export function getChatLogsByUserId(userId: string) {
  return axios.get(`${endPoints.backendUrl}/chat_logs?user_id=${userId}`).then(r => r.data)
}

type pT = {
  email: string
  agent_phone_number: string
  phone_number_to_dial: string
}
export function makeOutboundCall(payload: pT) {
  return axios.post(`${endPoints.backendUrl}/test_outgoing_call`, payload).then(r => r.data)
}

export function getOverviewByUserId(userId: string, type: string) {
  return axios.get(`${endPoints.backendUrl}/dashboard/${userId}/${type}`).then(r => r.data)
}

export function uploadImg(file: File) {
  const formData = new FormData()
  formData.append('image', file)

  return axios.post("/api/images/upload", formData).then(r => r.data)
}
