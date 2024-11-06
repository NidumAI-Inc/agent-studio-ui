import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import axios from 'axios';

import { getSalesIqAccessToken, salesIQBase } from '../../web-hooks';
import getCollection from '@/lib/get-collection';
import getReply from '../get-reply';

export async function GET(req: Request) {
  return NextResponse.json({ mesage: "I am working" }, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const salesiqData = await req.json()
    const id = searchParams.get('id') || ""

    if (!id) return new NextResponse("Id is missing", { status: 500 })

    const conversationId = salesiqData?.entity_id
    const message = salesiqData?.entity?.message?.text

    const thirdPartyCollection = await getCollection('third-party')
    const details = await thirdPartyCollection.findOne({ _id: new ObjectId(id) })

    if (!details) return new NextResponse("Details are missing", { status: 500 })

    const {
      assistant_id: agent_id,
      user_id,
    } = details as any

    const access_token = await getSalesIqAccessToken(id)
    const { baseUrl, headers } = salesIQBase({
      salesIQDomain: details?.salesIQDomain,
      companyDomain: details?.companyDomain,
      access_token,
    })

    const url = `${baseUrl}/conversations/${conversationId}/messages`
    const { data: list } = await axios.get(url, { headers })

    const messages = list?.data
      ?.filter((msg: any, i: number) => msg?.type === "text" && i !== 0)
      ?.map((msg: any) => ({
        role: !msg?.sender?.name?.startsWith("Visitor") ? "assistant" : "user",
        content: msg?.message?.text,
      }))

    if (!messages || messages?.length === 0) {
      return NextResponse.json({ mesage: "I am working" }, { status: 200 })
    }

    const reply = await getReply({
      agent_id,
      user_id,
      context_id: conversationId,
      messages,
      message,
    })

    const payload = {
      text: reply,
    }
    await axios.post(url, payload, { headers })

    return NextResponse.json({ mesage: "Bot details created" }, { status: 200 })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
