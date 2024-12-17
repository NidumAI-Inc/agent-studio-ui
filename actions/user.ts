import axios from "axios";
import endPoints from "@/utils/end-points";

export function getUserMLId(email: string) {
  return axios.get(`/api/user/${email}`).then(r => r.data)
}

export function createUser(email: string) {
  return axios.post(`${endPoints.backendUrl}/users/`, { email })
}

export function forgetPass(email: string) {
  return axios.post("/api/auth/forget-pass", { email })
}

export function resetPass(payload: any) {
  return axios.post("/api/auth/reset-pass", payload)
}

type payloadT = {
  email: string
  password: string
}
export function updateUser(payload: payloadT) {
  return axios.put("/api/user", payload)
}

export function deleteUser(userId: string) {
  return axios.post(`/api/user/delete`, { userId })
}