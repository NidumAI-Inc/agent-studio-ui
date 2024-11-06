import { NextResponse } from 'next/server';
import axios from 'axios';

import getCollection from '@/lib/get-collection';
import endPoints from '@/utils/end-points';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const system_prompt = searchParams.get('system_prompt') || ""
    const id = searchParams.get('id') || ""

    const [user_id, assistant_id] = id?.split("_")

    if (!user_id || !assistant_id) return new NextResponse("Id is missing", { status: 500 })

    const chatBotCollection = await getCollection('chat-bot')
    const bot = await chatBotCollection.findOne({ assistant_id })

    let payload: any = {
      ...bot
    }

    if (system_prompt !== "false" || !system_prompt) {
      const { data } = await axios.get(`${endPoints.backendUrl}/users/${user_id}/agents/${assistant_id}`)
      payload.system_prompt = data?.system_prompt
      payload.rag_enabled = data?.rag_enabled
    }

    return NextResponse.json(payload)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const chatBotCollection = await getCollection('chat-bot')
    await chatBotCollection.insertOne(data)

    return NextResponse.json({ mesage: "Bot details created" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()

    const chatBotCollection = await getCollection('chat-bot')

    const { assistant_id, ...rest } = data
    await chatBotCollection.updateOne({ assistant_id }, { "$set": rest }, { upsert: true })

    return NextResponse.json({ mesage: "bot details updated" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
