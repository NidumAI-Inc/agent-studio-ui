import axios from "axios";

export function getThirdPartyListByUserId(user_id: string) {
  return axios.get(`/api/third-party/user?user_id=${user_id}`).then(r => r.data)
}

export function getThirdPartyApiDetails(assistant_id: string) {
  return axios.get(`/api/third-party?assistant_id=${assistant_id}`).then(r => r.data)
}

export function createThirdPartyConfig(payload: any) {
  return axios.post(`/api/third-party`, payload).then(r => r.data)
}

export function updateThirdPartyConfig(payload: any) {
  return axios.put("/api/third-party", payload).then(r => r.data)
}

export function deleteThirdPartyConfig(_id: string) {
  return axios.delete(`/api/third-party?_id=${_id}`).then(r => r.data)
}
