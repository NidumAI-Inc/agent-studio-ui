import axios from 'axios';

import { getAgentById } from '@/actions';
import endPoints from '@/utils/end-points';

type props = {
  user_id: string
  agent_id: string
  context_id: string
  message: string
  messages: {
    role: string
    content: string
  }[]
}

async function getReply({
  user_id, agent_id, context_id,
  message, messages,
}: props) {
  const assistantDetails = await getAgentById({ userId: user_id, agentId: agent_id })

  let systemPrompt = assistantDetails?.system_prompt
  if (assistantDetails?.rag_enabled) {
    const { data: regData } = await axios.post(`${endPoints.backendUrl}/users/${user_id}/agents/${agent_id}/retrieve/?query=${message}&retrieval_len=5`)
    const txts = regData?.results?.[1]?.join(" ")
    systemPrompt = systemPrompt + " Information: " + txts
  }

  const chat = [
    {
      role: "system",
      content: systemPrompt
    },
    ...messages,
  ]

  const mlPayload = {
    agent_id,
    user_id,
    chat_id: context_id,
    chat,
  }

  const { data: botRes } = await axios.post(`${endPoints.backendUrl}/chat`, mlPayload)
  return botRes?.response || ""
}

export default getReply
