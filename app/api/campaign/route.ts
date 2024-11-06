import { NextResponse } from 'next/server';
import getCollection from '@/lib/get-collection';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')

    const campaignCollection = await getCollection('campaign')

    const campaigns = campaignCollection.find({ user_id })
    return NextResponse.json(campaigns)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const campaignCollection = await getCollection('campaign')
    await campaignCollection.insertOne(data)

    return NextResponse.json({ mesage: "Bot details created" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()

    const campaignCollection = await getCollection('campaign')

    const { _id, ...rest } = data
    await campaignCollection.updateOne({ _id }, { "$set": rest }, { upsert: true })

    return NextResponse.json({ mesage: "bot details updated" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
