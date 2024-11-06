import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import getCollection from '@/lib/get-collection';
import {
  createSalesIQWebhook, deleteZendeskwebhook,
  createZendsekWebhook, deleteSalesIQwebhook,
} from './web-hooks';
import axios from 'axios';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const assistant_id = searchParams.get('assistant_id') || ""

    if (!assistant_id) return new NextResponse("assistant_id is missing", { status: 500 })

    const thirdPartyCollection = await getCollection('third-party')
    const details = await thirdPartyCollection.findOne({ assistant_id })

    return NextResponse.json(details)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const thirdPartyCollection = await getCollection('third-party')

    if (data.type === "zendesk") {
      const alreadyFound = await thirdPartyCollection.findOne({ zendesk_app_id: data?.zendesk_app_id })
      if (alreadyFound) return new NextResponse("Same credencials used already", { status: 500 })

      const saved = await thirdPartyCollection.insertOne(data)

      const { data: zendeskRes } = await createZendsekWebhook({
        ...data,
        _id: saved.insertedId
      })

      await thirdPartyCollection.updateOne({ _id: saved.insertedId }, {
        "$set": { zendesk_integration_id: zendeskRes?.integration?.id }
      })
    }
    else if (data.type === "salesiq") {
      const alreadyFound = await thirdPartyCollection.findOne({ client_id: data?.client_id })
      if (alreadyFound) return new NextResponse("Same credencials used already", { status: 500 })

      const saved = await thirdPartyCollection.insertOne(data)

      const { data: webhookRes } = await createSalesIQWebhook({
        salesIQDomain: data.salesIQDomain,
        companyDomain: data.companyDomain,
        webhookUrl: data.baseUrl,
        _id: saved.insertedId.toString(),
      })

      await thirdPartyCollection.updateOne({ _id: saved.insertedId }, {
        "$set": { webhook_id: webhookRes?.data?.id }
      })
    }
    else if (data.type === "freshchat") {
      const alreadyFound = await thirdPartyCollection.findOne({ freshchat_chat_url: data?.freshchat_chat_url })
      if (alreadyFound) return new NextResponse("Same credencials used already", { status: 500 })

      const headers = {
        Authorization: `Bearer ${data?.freshchat_api_key}`
      }
      const { data: agents } = await axios.get(`${data?.freshchat_chat_url}/agents`, { headers })
      const actor_id = agents?.agents?.[0]?.id

      await thirdPartyCollection.insertOne({ ...data, actor_id })
    }

    return NextResponse.json({ mesage: "Channel created" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()

    const thirdPartyCollection = await getCollection('third-party')

    const { _id, ...rest } = data
    await thirdPartyCollection.updateOne({ _id: new ObjectId(_id) }, { "$set": rest })

    return NextResponse.json({ mesage: "Channel details updated" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('_id') || ""

    if (!id) return new NextResponse("_id is missing", { status: 500 })

    const _id = new ObjectId(id)

    const thirdPartyCollection = await getCollection('third-party')
    const details = await thirdPartyCollection.findOne({ _id })

    if (!details) return new NextResponse("details is missing", { status: 500 })

    if (details.type === "zendesk" && details?.zendesk_integration_id) {
      await deleteZendeskwebhook(details as any)
    }
    else if (details.type === "salesiq" && details?.webhook_id) {
      await deleteSalesIQwebhook(details as any)
    }

    await thirdPartyCollection.deleteOne({ _id })

    return NextResponse.json({ message: "deleted" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
