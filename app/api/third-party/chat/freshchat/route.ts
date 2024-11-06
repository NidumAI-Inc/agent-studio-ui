import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import axios from 'axios';

import getCollection from '@/lib/get-collection';
import getReply from '../get-reply';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const freshChatData = await req.json()
    const id = searchParams.get('id') || ""

    if (!id) return new NextResponse("Id is missing", { status: 500 })

    const payload = freshChatData?.data?.message
    const conversationId = payload?.conversation_id
    const message = payload?.message_parts?.map((m: any) => m?.text?.content)?.join(" ")?.trim()
    const msgType = payload?.actor_type

    // console.log(conversationId, msgType, freshChatData?.action, message)
    // console.log(freshChatData)
    // console.log(freshChatData?.data?.message)
    // console.log(freshChatData?.data?.message?.message_parts)
    // console.log("")
    if (!msgType || msgType !== "user" || !message) {
      return NextResponse.json({ mesage: "No need for further call" }, { status: 200 })
    }

    const thirdPartyCollection = await getCollection('third-party')
    const details = await thirdPartyCollection.findOne({ _id: new ObjectId(id) })

    if (!details) return new NextResponse("Details are missing", { status: 500 })

    const {
      freshchat_chat_url,
      freshchat_api_key,
      assistant_id: agent_id,
      user_id,
    } = details as any

    const url = `https://${freshchat_chat_url}`
    const convoUrl = `${url}/conversations/${conversationId}/messages`
    const headers = {
      Authorization: `Bearer ${freshchat_api_key}`
    }

    const { data: list } = await axios.get(convoUrl, { headers })

    const messages = list?.messages
      ?.filter((msg: any) => msg?.actor_type !== "system")
      ?.map((msg: any) => ({
        role: msg?.actor_type === "agent" ? "assistant" : "user",
        content: msg?.message_parts?.map((m: any) => m?.text?.content)?.join(" ")?.trim(),
      }))?.reverse()

    // console.log(messages)
    if (messages.length === 0) {
      return NextResponse.json({ mesage: "No need for further call" }, { status: 200 })
    }

    const reply = await getReply({
      agent_id,
      user_id,
      context_id: conversationId,
      messages,
      message,
    })

    if (!reply) return NextResponse.json({ mesage: "No need for further call" }, { status: 200 })

    // const { data: agents } = await axios.get(`${url}/agents`, { headers })
    // const actor_id = agents?.agents?.[0]?.id
    // console.log({ actor_id })
    // if (!actor_id) {
    //   console.log("no actor_id")
    //   return NextResponse.json({ mesage: "No need for further call" }, { status: 200 })
    // }
    // console.log("final")

    const replyPayload = {
      message_parts: [{
        text: {
          content: reply
        }
      }],
      message_type: "normal",
      actor_type: "agent",
      actor_id: details?.actor_id,
    }

    // console.log("sending chat", convoUrl, replyPayload)
    await axios.post(convoUrl, replyPayload, { headers })

    return NextResponse.json({ mesage: "Bot details created" }, { status: 200 })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
