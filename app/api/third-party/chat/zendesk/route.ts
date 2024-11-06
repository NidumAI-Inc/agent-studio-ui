import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import axios from 'axios';

import { getZendeskAccessToken, zenDeskSunShineUrl } from '../../web-hooks/zendesk';
import getCollection from '@/lib/get-collection';
import getReply from '../get-reply';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const zendeskData = await req.json()
    const id = searchParams.get('id') || ""

    if (!id) return new NextResponse("Id is missing", { status: 500 })

    const payload = zendeskData?.events?.[0]?.payload
    const conversationId = payload?.conversation?.id
    const message = payload?.message?.content?.text

    const msgType = payload?.message?.author?.type

    if (!msgType || msgType === "business" || !message || !id) {
      return NextResponse.json({ mesage: "No need for further call" })
    }

    const thirdPartyCollection = await getCollection('third-party')
    const details = await thirdPartyCollection.findOne({ _id: new ObjectId(id) })

    if (!details) return new NextResponse("Details are missing", { status: 500 })

    const {
      zendesk_app_id: app_id,
      zendesk_key_id: key_id,
      zendesk_secret_key: secret_key,
      assistant_id: agent_id,
      user_id,
    } = details as any

    const url = `${zenDeskSunShineUrl}/v2/apps/${app_id}/conversations/${conversationId}/messages` // ?page[size]=10
    const { headers } = getZendeskAccessToken({ secret_key, key_id })

    const { data: list } = await axios.get(url, { headers })

    const messages = list?.messages
      ?.filter((msg: any) => msg?.source?.type !== "zd:answerBot" && !!msg?.content?.text)
      ?.map((msg: any) => ({
        role: msg?.author?.type === "business" ? "assistant" : "user",
        content: msg?.content?.text,
      }))

    const reply = await getReply({
      agent_id,
      user_id,
      context_id: conversationId,
      messages,
      message,
    })

    const replyPayload = {
      "author": {
        "type": "business"
      },
      "content": {
        "type": "text",
        "text": reply
      }
    }
    await axios.post(url, replyPayload, { headers })

    return NextResponse.json({ mesage: "Bot details created" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
