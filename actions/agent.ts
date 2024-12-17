import axios from "axios";
import endPoints from "@/utils/end-points";

export type sipPayloadT = {
  "agent_name": string
  "phone_number": string
  "provider": string
  "model": string
  "temperature": number
  "max_tokens": number
  "first_message": string
  "system_prompt": string
  "language": string
  "voice": string
  "rag_enabled": boolean
  agent_type: "sip" | "web"
}

type base = {
  userId: string
  agentId: string
}

export function createAgent(userId: string, payload: sipPayloadT) {
  return axios.post(`${endPoints.backendUrl}/users/${userId}/agents/`, payload).then(r => r.data)
}

export function getAgentsByUserId(userId: string) {
  return axios.get(`${endPoints.backendUrl}/users/${userId}/agents/`).then(r => r.data)
}

export function getAgentById({ userId, agentId }: base) {
  return axios.get(`${endPoints.backendUrl}/users/${userId}/agents/${agentId}`).then(r => r.data)
}

export function updateAgent(upadterpayload: base, payload: Partial<sipPayloadT>) {
  return axios.put(`${endPoints.backendUrl}/users/${upadterpayload.userId}/agents/${upadterpayload?.agentId}`, payload).then(r => r.data)
}

export function uploadFilesAgent(upadterpayload: base, payload: any) {
  return axios.post(`${endPoints.backendUrl}/users/${upadterpayload.userId}/agents/${upadterpayload?.agentId}/upload`, payload).then(r => r.data)
}

export function deleteFileAgent(payload: base & { filename: string }) {
  return axios.delete(`${endPoints.backendUrl}/users/${payload.userId}/agents/${payload?.agentId}/files?filename=${payload?.filename}`).then(r => r.data)
}

export function getFilesInAgent(upadterpayload: base) {
  return axios.get(`${endPoints.backendUrl}/users/${upadterpayload.userId}/agents/${upadterpayload?.agentId}/files`).then(r => r.data?.files)
}

export function deleteAgent({ userId, agentId }: base) {
  return axios.delete(`${endPoints.backendUrl}/users/${userId}/agents/${agentId}`).then(r => r.data)
}
