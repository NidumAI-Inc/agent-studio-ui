import axios from "axios";
import endPoints from "@/utils/end-points";

type payT = { user_id: string, assistant_id: string }

export function getChatBotDetails({ user_id, assistant_id }: payT) {
  return axios.get(`/api/chat-bot?id=${user_id}_${assistant_id}&system_prompt=false`).then(r => r.data)
}
export function getDataCollections({ assistant_id, user_id }: payT) {
  return axios.get(`${endPoints.backendUrl}/get_data?agent_id=${assistant_id}&user_id=${user_id}`).then(r => r.data)
}

export function generateDataCollectionsCSV({ assistant_id, user_id }: payT) {
  return axios.get(`${endPoints.backendUrl}/generate_csv?agent_id=${assistant_id}&user_id=${user_id}`).then(r => r.data)
}

export function createChatBot(payload: any) {
  return axios.post(`/api/chat-bot`, payload).then(r => r.data)
}

export function updateChatBot(payload: any) {
  return axios.put("/api/chat-bot", payload).then(r => r.data)
}
